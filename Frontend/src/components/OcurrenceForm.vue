<template>
  <div class="occurrence-form">
    <h3 class="bg-blue-900 text-white rounded-full p-2">Registrar Ocorrência</h3>
    <br>
    <form @submit.prevent="submitOccurrence">
      <div>
        <label for="description" class="p-2">Descrição:</label>
        <input
            type="text"
            id="description"
            v-model="formData.description"
            required
            class="bg-gray-200 rounded-full"
        />
      </div>
      <br>
      <div>
        <label for="occurrence_type" class="p-2">Tipo de Ocorrência: <br> </label>
        <select
            id="occurrence_type"
            v-model="formData.occurrence_type"
            required
            class="bg-gray-200 rounded-full p-1"
        >
          <option v-for="type in occurrenceTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>
      <br>
      <button type="submit" class="bg-blue-400 rounded-full text-white p-3 hover:bg-blue-600">Enviar Ocorrência</button>
    </form>
    <button @click="$emit('close')" class="bg-red-600 text-white rounded-full p-3 m-1 hover:bg-red-800">Fechar</button>
  </div>
</template>

<script>
import { OCCURRENCE_TYPES } from '../components/constants/ocurrenceTypes.js';

export default {
  name: 'OccurrenceForm',
  props: {
    occurrenceData: {
      type: Object,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      formData: { ...this.occurrenceData },
      occurrenceTypes: OCCURRENCE_TYPES
    };
  },
  watch: {
    occurrenceData: {
      handler(newVal) {
        this.formData = { ...newVal };
      },
      deep: true
    },
    formData: {
      handler(newVal) {
        this.$emit('update:occurrenceData', { ...newVal });
      },
      deep: true
    }
  },
  methods: {
    submitOccurrence() {
      this.formData.latitude = this.lat;
      this.formData.longitude = this.lng;
      this.formData.date_time = new Date().toISOString();
      this.formData.status = 'ativo';
      console.log("Enviando dados da ocorrência:", this.formData);
      this.$emit('submit', this.formData);
    }
  }
};
</script>

<style scoped>
.occurrence-form {
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
