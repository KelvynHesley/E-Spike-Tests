<template>
  <transition name="fade">
    <div class="home">
      <div class="logo-container">
        <!-- Coluna da imagem logo -->
        <div class="logo-column">
          <img src="../components/imgs/logo1.jpg" alt="Logo E-Spike" class="logo-img" />
        </div>

        <!-- Coluna do texto e botões -->
        <div class="text-column">
          <h2 class="text-3xl lg:text-4xl">Seja bem-vindo</h2>
          <h2 class="text-3xl lg:text-4xl">ao E-Spike!</h2>
          <br />
          <h1 class="text-blue-700 left-0"> Use agora o sistema de prevençao de riscos! Entenda como está o seu arredor. </h1>
          <br>
          <BotaoRedondo rotaBtn="/Cadastro">Cadastre-se</BotaoRedondo>
          <br>
          <br>
          <BotaoRedondo rotaBtn="/Login">Login</BotaoRedondo>
        </div>
      </div>
      <footer>
        <h4>© 2024 - Todos os direitos reservados</h4>
      </footer>
    </div>
  </transition>
</template>

<script>
import BotaoRedondo from '@/components/BotaoRedondo.vue';

export default {
  name: 'HomeView',
  components: {
    BotaoRedondo
  }
};
</script>

<style scoped>
.home {
  text-align: justify-all;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px; /* Espaço entre a logo e o texto/botões */
  flex-direction: row; /* Lado a lado no desktop */
}

.logo-column {
  flex: 1;
}

.text-column {
  flex: 2;
  text-align: left; /* Alinha o conteúdo à esquerda */
}

.logo-img {
  max-width: 500px; /* Tamanho máximo da logo */
  height: auto;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

footer {
  margin-top: 10px;
}

/* Media query para telas menores */
@media (max-width: 767px) {
  .logo-container {
    flex-direction: column; /* Empilha a logo em cima e os botões embaixo no mobile */
  }

  .text-column {
    text-align: center; /* Centraliza o texto e os botões em telas menores */
  }

  .logo-img {
    max-width: 290px; /* Diminui o tamanho da logo em telas menores */
  }

  .text-3xl {
    font-size: 24px; /* Ajuste de tamanho para textos menores */
  }

  .lg\:text-4xl {
    font-size: 32px;
  }
}
</style>
