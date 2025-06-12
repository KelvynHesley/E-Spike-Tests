<template>
  <div class="alert-popup">
    <p><strong>Mensagem:</strong> {{ alert.message }}</p>
    <p><strong>Gravidade:</strong> {{ translateSeverity(alert.severity) }}</p>
    <p><strong>Hora:</strong> {{ formatTime(alert.time) }}</p>
  </div>
</template>

<script>
export default {
  name: 'AlertNotification',
  props: {
    alert: {
      type: Object,
      required: true
    },
    translateSeverity: {
      type: Function,
      required: true
    },
    formatTime: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
.alert-popup {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  opacity: 100%;
  z-index: 1000;
}
</style>