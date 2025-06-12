<template>
  <div class="menu-wrapper">
    <button class="menu-button" @click="goToMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MenuIcon',
  methods: {
    goToMenu() {
      this.menuButton.classList.add('clicked');
      setTimeout(() => {
        this.menuButton.classList.remove('clicked');
        this.$router.push('/Menu'); // Redireciona após a animação
      }, 200);
    }
  },
  mounted() {
    this.menuButton = document.querySelector('.menu-button');
  }
}
</script>

<style scoped>
.menu-wrapper {
  display: flex;
  justify-content: flex-start; /* Alinha o botão à esquerda */
  padding-right: 80px;
}

.menu-button {
  display: inline-block;
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: relative;
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  animation: fadeIn 1.5s ease-in-out; /* Manter o fade-in inicial */
}

.menu-button span { /*responsavel pelos tres riscos */
  display: block;
  width: 20px;
  height: 3px;
  background-color: #000000;
  margin: 5px auto;
}

.menu-button.clicked {
  animation: clickEffect 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes clickEffect {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
