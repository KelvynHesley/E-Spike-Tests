<template>
  <div :class="['alert-popup', `notification-${notification.type}`]">
    {{ notification.message }}
  </div>
</template>

<script>
export default {
  name: 'NotificationSystem',
  props: {
    notification: {
      type: Object,
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
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

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
</style>