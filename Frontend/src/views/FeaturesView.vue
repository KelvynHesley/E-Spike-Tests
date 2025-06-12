<template>
<div class="container mx-auto">
  <h1 class="text-3xl font-bold text-center text-blue-900">Conheça nosso aplicativo</h1>
    <br>
  <h2 class="text-2xl font-semibold text-center pb-4">Como funciona?</h2>
  <p class="text-gray-600">O aplicativo oferece diversas funcionalidades para auxiliar na sua segurança:</p>
    <br>
  <div class="flex flex-col items-center">
    <h3 class="text-xl font-medium text-blue-800 pb-2">1. Mapa Interativo</h3>
    <p class="text-gray-600">Visualize áreas de <span class="text-red-500 font-bold">maior</span> e <span class="text-green-500 font-bold">menor</span> risco em tempo real.</p>
  </div>

  <div class="flex flex-col items-center pt-4">
    <h3 class="text-xl font-medium text-blue-800 pb-2">2. Botão de Alerta</h3>
    <p class="text-gray-600">Notifique situações de perigo ou que causem <span class="text-red-500 font-bold">transtornos</span>.</p>
  </div>

  <div class="flex flex-col items-center pt-4">
    <h3 class="text-xl font-medium text-blue-800 pb-2">3. Criação de Ocorrências (Moderadores)</h3>
    <p class="text-gray-600">Registre eventos de forma detalhada e com cautela nas informações.</p>
  </div>

<br>
<BackButton></BackButton>
</div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import TextButton from "@/components/TextButton.vue";
export default {
  components: {TextButton, BackButton}
} 

</script>


<style>

</style>