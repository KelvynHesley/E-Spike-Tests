<template>
  <transition name="fade">
    <div class="map-view">
      <GoogleMap :apiKey="googleMapsApiKey" :points="points" @marker-clicked="onMarkerClicked" />
      <br />

      <!-- Sistema de Notificações -->
      <transition-group
          name="notification"
          tag="div"
          class="notifications-container"
      >
        <div
            v-for="notification in activeNotifications"
            :key="notification.id"
            :class="[
            'notification',
            `notification-${notification.type}`,
            `severity-${notification.severity.toLowerCase()}`
          ]"
        >
          <div class="notification-content">
            <strong>{{ notification.message }}</strong>
            <span v-if="notification.time" class="notification-time">
              {{ formatTime(notification.time) }}
            </span>
          </div>
          <button
              @click="removeNotification(notification.id)"
              class="notification-close"
          >
            ×
          </button>
        </div>
      </transition-group>

      <!-- Resto do seu template existente -->
      <div v-if="showAlertForm" class="alert-form">
        <!-- ... seu código existente do formulário de alerta ... -->
      </div>

      <div v-if="showOccurrenceForm" class="occurrence-form">
        <!-- ... seu código existente do formulário de ocorrência ... -->
      </div>

      <div class="menu-container">
        <!-- ... seu código existente do menu ... -->
      </div>
    </div>
  </transition>
</template>

<script>
import AlertButton from "@/components/AlertButton.vue";
import BackButton from "@/components/BackButton.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import MenuIcon from "@/components/MenuIcon.vue";
import alertService from "@/services/alertService";
import MarkerService from "../../../BackendJ/service/MarkerService.js";

export default {
  name: "MapView",
  components: {
    BackButton,
    MenuIcon,
    GoogleMap,
    AlertButton,
  },
  data() {
    return {
      // ... seus dados existentes ...
      googleMapsApiKey: "",
      points: [],
      showAlertForm: false,
      showOccurrenceForm: false,
      selectedMarkerPosition: null,
      isSubmitting: false,

      // Novo sistema de notificações
      activeNotifications: [],
      notificationId: 0,

      alertData: {
        alert_message: "",
        severity_level: "Low",
        alert_radius: 1000,
      },
      occurrenceData: {
        description: "",
        occurrence_type: "Crime",
      },
    };
  },
  methods: {
    // Novo método para gerenciar notificações
    showNotification(message, type = 'info', severity = 'low') {
      const notification = {
        id: this.notificationId++,
        message,
        type,
        severity,
        time: new Date().toISOString()
      };

      this.activeNotifications.push(notification);

      // Remove a notificação após 5 segundos
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, 5000);
    },

    removeNotification(id) {
      this.activeNotifications = this.activeNotifications.filter(n => n.id !== id);
    },

    // Método de submissão de alerta atualizado
    async submitAlert() {
      try {
        this.isSubmitting = true;

        if (!this.alertData.alert_message || !this.alertData.severity_level || !this.alertData.alert_radius) {
          throw new Error('Por favor, preencha todos os campos obrigatórios');
        }

        const position = await this.getUserPosition();
        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('Usuário não autenticado. userId ausente.');
        }

        const alertData = {
          alert_radius: Number(this.alertData.alert_radius),
          severity_level: this.alertData.severity_level,
          alert_message: this.alertData.alert_message,
          latitude: position.latitude,
          longitude: position.longitude,
          alert_time: new Date().toISOString(),
          user_id: userId
        };

        const response = await alertService.createAlert(alertData);

        // Mostra notificação de sucesso
        this.showNotification(
            'Alerta criado com sucesso!',
            'success',
            alertData.severity_level
        );

        // Mostra notificação do próprio alerta
        this.showNotification(
            alertData.alert_message,
            'alert',
            alertData.severity_level
        );

        this.showAlertForm = false;
        await this.fetchPoints();

        this.alertData = {
          alert_message: "",
          severity_level: "Low",
          alert_radius: 1000
        };
      } catch (error) {
        console.error('Erro ao submeter alerta:', error);
        let errorMessage = 'Erro ao criar alerta.';
        if (error.response?.data?.message) {
          errorMessage += ' ' + error.response.data.message;
        } else if (error.message) {
          errorMessage += ' ' + error.message;
        }
        this.showNotification(errorMessage, 'error', 'high');
      } finally {
        this.isSubmitting = false;
      }
    },

    // ... seus outros métodos existentes ...
  }
};
</script>

<style scoped>
/* Seus estilos existentes */
.map-view {
  /* ... */
}

/* Novos estilos para as notificações */
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.notification {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  animation: slideIn 0.3s ease-out;
}

.notification-content {
  flex: 1;
  margin-right: 12px;
}

.notification-time {
  display: block;
  font-size: 0.8em;
  opacity: 0.8;
  margin-top: 4px;
}

.notification-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0.6;
}

.notification-close:hover {
  opacity: 1;
}

/* Tipos de notificação */
.notification-success {
  background-color: #48bb78;
  color: white;
}

.notification-error {
  background-color: #f56565;
  color: white;
}

.notification-info {
  background-color: #4299e1;
  color: white;
}

.notification-alert {
  background-color: #ecc94b;
  color: black;
}

/* Níveis de severidade */
.severity-high {
  border-left: 4px solid #e53e3e;
}

.severity-medium {
  border-left: 4px solid #ecc94b;
}

.severity-low {
  border-left: 4px solid #4299e1;
}

/* Animações */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-enter-active {
  animation: slideIn 0.3s ease-out;
}

.notification-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>