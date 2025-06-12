<template>
  <transition name="fade">
    <div class="map-view" data-cy="mapa">
      <!-- Componente do Google Maps -->
      <GoogleMap
          :apiKey="googleMapsApiKey"
          :points="processedPoints"
          @marker-clicked="onMarkerClicked"
          @map-clicked="onMapClick"
      />

      <!-- Legenda do mapa -->
      <MapLegend v-if="showLegend" />

      <br />

      <!-- Componente de formulário de alerta -->
      <AlertForm
          v-if="showAlertForm"
          :alertData="alertData"
          :userId="userId"
          :isSubmitting="isSubmitting"
          @submit="submitAlert"
          @close="closeAlertForm"
      />

      <!-- Componente de formulário de ocorrência -->
      <OccurrenceForm
          v-if="showOccurrenceForm"
          :occurrenceData="occurrenceData"
          :lat="selectedMarkerPosition ? selectedMarkerPosition.lat : 0"
          :lng="selectedMarkerPosition ? selectedMarkerPosition.lng : 0"
          @submit="submitOccurrence"
          @close="closeOccurrenceForm"
      />

      <!-- Componente de informações do marcador -->
      <MarkerInfoPanel
          v-if="selectedMarker"
          :marker="selectedMarker"
          @close="selectedMarker = null"
      />

      <!-- Componente de alerta -->
      <AlertNotification
          v-if="alert && alert.visible"
          :alert="alert"
          :translateSeverity="translateSeverity"
          :formatTime="formatTime"
      />

      <!-- Componente de notificação -->
      <NotificationSystem
          v-if="notification && notification.show"
          :notification="notification"
      />

      <!-- Menu de navegação (mantido intacto) -->
      <div class="menu-container">
        <div class="menu-items">
          <div class="menu-item" align="left">
            <MenuIcon />
          </div>
          <div class="menu-item center">
            <BackButton />
          </div>
          <div class="menu-item">
            <AlertButton rotaBtn="/Suspect" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AlertButton from "@/components/AlertButton.vue";
import BackButton from "@/components/BackButton.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import MenuIcon from "@/components/MenuIcon.vue";
import MapLegend from "@/components/MapLegend.vue";

// Importar componentes refatorados
import AlertForm from "../components/AlertForm.vue";
import OccurrenceForm from "../components/OcurrenceForm.vue";
import MarkerInfoPanel from "../components/MarkerInfoPanel.vue";
import AlertNotification from "../components/AlertNotification.vue";
import NotificationSystem from "../components/NotificationSystem.vue";

// Importar composables
import { useGeolocation } from "../composables/useGeolocation";
import { useNotification } from "../composables/useNotification.js";
import { useMarkerManager } from "../composables/useMarkerManager";
import { useAlertManager } from "../composables/useAlertManager";

export default {
  name: "MapView",
  components: {
    BackButton,
    MenuIcon,
    GoogleMap,
    AlertButton,
    AlertForm,
    OccurrenceForm,
    MarkerInfoPanel,
    AlertNotification,
    NotificationSystem,
    MapLegend
  },
  setup() {
    const { getUserPosition } = useGeolocation();
    const { notification, showNotification } = useNotification();
    const { processedPoints, selectedMarker, fetchMarkers, fetchMarkerInfo, refreshMarkers } = useMarkerManager();
    const { alert, checkLatestAlert, fetchPoints } = useAlertManager();

    return {
      getUserPosition,
      notification,
      showNotification,
      processedPoints,
      selectedMarker,
      fetchMarkers,
      fetchMarkerInfo,
      refreshMarkers,
      alert,
      checkLatestAlert,
      fetchPoints
    };
  },
  data() {
    return {
      googleMapsApiKey: "",
      showAlertForm: false,
      showOccurrenceForm: false,
      showLegend: true,
      selectedMarkerPosition: null,
      isSubmitting: false,
      userId: localStorage.getItem('userId'),
      alertData: {
        alert_message: "",
        severity_level: "Low",
        alert_radius: 1000,
      },
      occurrenceData: {
        description: "",
        occurrence_type: "Crime",
      },
      updateInterval: null
    };
  },
  mounted() {
    this.fetchMarkers();
    this.fetchPoints();
    this.checkForAlert();
    this.checkLatestAlert();

    // Configurar atualização periódica
    this.updateInterval = setInterval(() => {
      this.refreshMarkers();
    }, 30000);
  },
  beforeDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  },
  methods: {
    checkForAlert() {
      const alert = this.$route.query.alert;
      if (alert) {
        this.showAlertForm = true;
      }
    },

    async submitAlert(formData) {
      try {
        this.isSubmitting = true;

        if (!formData.alert_message || !formData.severity_level || !formData.alert_radius) {
          throw new Error('Por favor, preencha todos os campos obrigatórios');
        }

        if (!this.userId) {
          throw new Error('Usuário não autenticado. userId ausente.');
        }

        formData.user_id = this.userId;
        formData.alert_time = new Date().toISOString();
        formData.active = true;

        const position = await this.getUserPosition();
        formData.latitude = position.latitude;
        formData.longitude = position.longitude;

        console.log('Tentando criar alerta com dados:', formData);

        await this.$services.alert.createAlert(formData);
        this.showNotification('Alerta criado com sucesso!', 'success');
        this.showAlertForm = false;
        await this.fetchPoints();
        this.alertData = { alert_message: "", severity_level: "Low", alert_radius: 1000 };
      } catch (error) {
        console.error('Erro ao submeter alerta:', error);
        let errorMessage = 'Erro ao criar alerta.';
        if (error.response?.data?.message) {
          errorMessage += ' ' + error.response.data.message;
        } else if (error.message) {
          errorMessage += ' ' + error.message;
        }
        this.showNotification(errorMessage, 'error');
      } finally {
        this.isSubmitting = false;
      }
    },

    async submitOccurrence(formData) {
      try {
        // Verificar se temos um validador de ocorrências
        if (this.$validators && this.$validators.occurrence) {
          const validationErrors = this.$validators.occurrence.validate(formData, this.selectedMarkerPosition);

          if (validationErrors.length > 0) {
            throw new Error(`Erros de validação: ${validationErrors.join(', ')}`);
          }
        }

        // Preparar dados da ocorrência
        const occurrenceData = {
          ...formData,
          latitude: this.selectedMarkerPosition.lat,
          longitude: this.selectedMarkerPosition.lng,
          date_time: new Date().toISOString(),
          status: 'ativo',
          __v: 0
        };

        console.log("Enviando dados da ocorrência:", occurrenceData);

        // Fazer a requisição usando OcurrenceService
        const savedOccurrence = await this.$services.occurrence.createOcurrence(occurrenceData);
        console.log('Ocorrência salva com sucesso:', savedOccurrence);

        // Atualizar a lista de pontos e fechar o formulário
        await this.fetchMarkers();
        this.showNotification('Ocorrência registrada com sucesso!', 'success');
        this.showOccurrenceForm = false;
        this.resetForm();
      } catch (error) {
        console.error('Erro ao submeter ocorrência:', error);
        this.showNotification(error.message || 'Erro ao registrar ocorrência', 'error');
      }
    },

    resetForm() {
      this.occurrenceData = {
        description: '',
        occurrence_type: 'Crime'
      };
      this.selectedMarkerPosition = null;
    },

    onMapClick(event) {
      console.log('Clique no mapa em:', event);
      this.selectedMarkerPosition = {
        lat: event.lat,
        lng: event.lng
      };
      this.showOccurrenceForm = true;
    },

    async onMarkerClicked(marker) {
      console.log('Marcador clicado:', marker);
      const markerId = marker.id || marker._id;

      if (!markerId) {
        console.error('ID do marcador está undefined');
        return;
      }

      this.selectedMarker = await this.fetchMarkerInfo(markerId);
    },

    closeAlertForm() {
      console.log('Fechando formulário de alerta');
      this.showAlertForm = false;
      this.alertData = {
        alert_message: "",
        severity_level: "Low",
        alert_radius: 1000,
      };
    },

    closeOccurrenceForm() {
      this.showOccurrenceForm = false;
      this.occurrenceData = {
        description: "",
        occurrence_type: "Crime",
      };
      this.selectedMarkerPosition = null;
    },

    translateSeverity(severity) {
      const translations = {
        Low: 'Baixo',
        Medium: 'Médio',
        High: 'Alto',
      };
      return translations[severity] || severity;
    },

    formatTime(time) {
      return new Date(time).toLocaleTimeString('pt-BR');
    }
  }
};
</script>

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
  height: 100vh;
  position: relative;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.menu-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  opacity: 1;
}

.menu-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

.center {
  text-align: center;
}
</style>