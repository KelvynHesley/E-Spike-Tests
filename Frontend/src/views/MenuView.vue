<template>
  <div class="flex flex-col items-center space-y-4 w-full max-w-xl mx-auto opacity-0 animate-fadeIn">
    <TextButton class="menu-btn w-80 h-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold text-center shadow-lg transition-transform duration-300 hover:shadow-xl relative overflow-hidden transform hover:-translate-y-1">
      MENU
    </TextButton>

    <TextButton
        class="menu-option relative w-96 h-16 rounded-full bg-gray-100 flex gap-4 items-center px-5 transition-all duration-300 hover:bg-gray-200 hover:translate-x-1"
        rotaBtn="/About"
    >
      <div class="icon-circle w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span class="font-medium text-gray-700">Sobre Nós</span>
    </TextButton>

    <TextButton
        class="menu-option relative w-96 h-14 rounded-full bg-gray-100 flex justify-between items-center px-5 transition-all duration-300 hover:bg-gray-200 hover:translate-x-1"
        rotaBtn="/Terms"
    >
      <div class="icon-circle w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <span class="font-medium text-gray-700 whitespace-nowrap">Termos de usuário</span>
    </TextButton>

    <TextButton
        class="menu-option relative w-96 h-14 rounded-full bg-gray-100 flex items-center px-5 transition-all duration-300 hover:bg-gray-200 hover:translate-x-1 active-menu-option"
        rotaBtn="/Features"
    >
      <div class="icon-circle w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <span class="font-medium text-gray-700">Funcionalidades</span>
    </TextButton>

    <TextButton
        class="menu-option relative w-96 h-14 rounded-full bg-gray-100 flex items-center px-5 transition-all duration-300 hover:bg-gray-200 hover:translate-x-1"
        rotaBtn="/Change"
    >
      <div class="icon-circle w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <span class="font-medium text-gray-700">Alterar Dados</span>
    </TextButton>

    <BackButton></BackButton>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoRedondo from "@/components/BotaoRedondo.vue";
import GrayTextButton from "@/components/GrayTextButton.vue";
import NormalText from "@/components/NormalText.vue";
import TextButton from "@/components/TextButton.vue";

export default {
  components: {
    BackButton,
    TextButton,
    NormalText,
    BotaoRedondo,
    GrayTextButton,
  },
  mounted() {
    // Adicionar interatividade quando o componente for montado
    this.$nextTick(() => {
      const menuOptions = document.querySelectorAll('.menu-option');
      menuOptions.forEach(option => {
        option.addEventListener('click', function() {
          // Remove a classe active de todos os botões
          menuOptions.forEach(btn => {
            btn.classList.remove('active-menu-option');
          });
          // Adiciona a classe active ao botão clicado
          this.classList.add('active-menu-option');
        });
      });
    })
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in forwards;
}

/* Efeito do triângulo laranja */
.menu-option::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 12px solid #FF8C00;
  opacity: 0;
  transition: all 0.3s ease;
}

.menu-option:hover::before {
  opacity: 1;
  left: -5px;
}

/* Efeito de brilho no botão principal */
.menu-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.menu-btn:hover::after {
  left: 100%;
}

/* Efeitos ao passar o mouse */
.menu-option:hover .icon-circle {
  @apply bg-blue-500 text-white transform rotate-12;
}

.active-menu-option {
  @apply bg-blue-50 shadow-md;
}

.active-menu-option .icon-circle {
  @apply bg-blue-500 text-white;
}

/* Garante que todos os ícones tenham a mesma cor básica */
.icon-circle svg {
  @apply text-gray-400;
}

.active-menu-option .icon-circle svg {
  @apply text-white;
}

/* Corrige a inconsistência de cores entre os botões */
.menu-option {
  @apply bg-gray-100;
}
</style>