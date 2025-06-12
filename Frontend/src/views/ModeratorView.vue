<template>
  <transition name="fade">
    <div class="moderator">
      <h2 class="istok-web-regular">
        Coloque suas credenciais abaixo:
      </h2>
      <BotaoInput input-placeholder="    Email/Username"></BotaoInput>
      <br>
      <BotaoInput input-placeholder="    Senha"></BotaoInput>
      <br>
      <BotaoRedondo> Entrar </BotaoRedondo>
      <br>
      <br>
      <br>
      <br>
      <back-button></back-button>
      <RouterLink class="text-blue-500">Quero me tornar moderador</RouterLink>
      <footer>© 2024 - Todos os direitos reservados</footer>
    </div>
  </transition>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoInput from '@/components/BotaoInput.vue';
import BotaoRedondo from '@/components/BotaoRedondo.vue';

export default {
  name: 'ModeratorView',
  components: {
    BackButton,
    BotaoInput,
    BotaoRedondo,
  }
};
</script>

<style scoped>
.moderator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  opacity: 0; /* Inicia com a div invisível */
  animation: fadeIn 1s ease-in forwards; /* Animação para tornar a div visível */
  height: 100vh; /* Garantir que o contêiner ocupe a altura total da tela */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Faz a div se tornar completamente visível ao final da animação */
  }
}

.body {
  background-color: white;
}

.istok-web-regular {
  font-size: 24px;
  margin-bottom: 20px;
}

.text-blue-500 {
  color: blue;
}

footer {
  margin-top: 20px;
}
</style>
