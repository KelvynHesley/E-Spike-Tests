<template>
  <button class="custom-button" @click="voltar">
    <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 30 L 50 70 L 90 30" stroke="black" stroke-width="5" fill="none" />
    </svg>
  </button>
</template>

<script>
export default {
  methods: {
    voltar() {
      this.$router.go(-1); // Navega para a página anterior no histórico do Vue Router
    }
  }
}
</script>

<style scoped>
.custom-button {
  display: flex;
  align-items: center; /* Vertical centering */
  justify-content: center; /* Horizontal centering */
  padding: 10px 15px;
  border: none;
  border-radius: 40px;
  background-color: #ffffff; /* Green background */
  cursor: pointer;
  animation: fadeIn 1s ease-in-out;
  padding-right: 12px; /* Remove extra right padding */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.button-container {
  display: flex;
  justify-content: center; /* Centralizes horizontally */
  align-items: center; /* Centralizes vertically */
  height: 100vh; /* Altura total da viewport */
}

.custom-button svg {
  /* Center the SVG within the button using margin: auto */
  margin: auto;
  color: black;
}

/* Hover and focus styles (optional) */
.custom-button:hover {
  background-color: #ffffff; /* Darker green on hover */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.custom-button:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
