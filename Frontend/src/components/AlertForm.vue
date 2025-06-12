<template>
  <div class="alert-form">
    <br />
    <h3 class="inline-block bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
      Crie um Alerta
    </h3>
    <form @submit.prevent="submitAlert">
      <div>
        <br />
        <label for="alert_message">Mensagem:</label>
        <br />
        <input
            type="text"
            id="alert_message"
            v-model="formData.alert_message"
            required
            class="bg-gray-200 rounded-full p-1"
        />
        <br />
      </div>
      <div>
        <label for="severity_level" class="text-left hover:text-center">Nível de Gravidade: </label>
        <select id="severity_level" v-model="formData.severity_level" required>
          <option
              v-for="level in severityLevels"
              :key="level.value"
              :value="level.value"
          >
            {{ level.label }}
          </option>
        </select>
      </div>
      <div>
        <label for="alert_radius">Raio do Alerta (em metros):</label>
        <br />
        <input
            type="number"
            id="alert_radius"
            v-model="formData.alert_radius"
            required
            class="text-center bg-gray-200 rounded-full m-1"
        />
      </div>
      <br />
      <button
          type="submit"
          class="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Enviando...' : 'Enviar Alerta' }}
      </button>
    </form>
    <button
        @click="onCloseAlert"
        class="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-2"
    >
      Fechar
    </button>
  </div>
</template>

<script>
import { SEVERITY_LEVELS } from '../components/constants/severityLevels.js';

export default {
  name: 'AlertForm',
  props: {
    alertData: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        ...this.alertData,
        alert_time: new Date().toISOString(),  // Define o horário do alerta
        active: true,
        user_id: this.userId
      },
      severityLevels: SEVERITY_LEVELS
    };
  },
  watch: {
    alertData: {
      handler(newVal) {
        this.formData = {
          ...newVal,
          alert_time: new Date().toISOString(),
          active: true,
          user_id: this.userId
        };
      },
      deep: true
    },
    formData: {
      handler(newVal) {
        this.$emit('update:alertData', { ...newVal });
      },
      deep: true
    }
  },
  methods: {
    async submitAlert() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.formData.latitude = position.coords.latitude;
              this.formData.longitude = position.coords.longitude;
              this.$emit('submit', this.formData);
              // Emite o evento 'close' para o componente pai remover o formulário (se necessário)
              this.$emit('close');
              // Redireciona para a rota /Mapa
              this.$router.push('/Mapa');
            },
            (error) => {
              console.error('Erro ao obter localização: ', error);
              alert('Erro ao obter a localização. Por favor, habilite o acesso à localização e tente novamente.');
            }
        );
      } else {
        alert('Geolocalização não é suportada pelo seu navegador.');
      }
    },
    onCloseAlert() {
      this.$emit('close');
      this.$router.push('/Mapa');
    }
  },
  created() {
    console.log('AlertForm created with alertData:', this.alertData);
  }
};
</script>

<style scoped>
.alert-form {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  opacity: 1;
}
</style>
