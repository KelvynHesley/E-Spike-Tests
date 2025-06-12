<template>
  <div class="icon-container">
    <svg class="button-icon pulsate h-48 w-160" fill="#EA9209" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 340 340" xml:space="preserve">
      <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M331.783,266.645L215.865,28.675C207.316,11.131,189.51,0,170,0
      s-37.316,11.131-45.865,28.675L8.217,266.645c-7.703,15.81-6.71,34.473,2.61,49.386C20.148,330.944,36.497,340,54.08,340h231.84
      c17.583,0,33.933-9.056,43.252-23.969C338.493,301.118,339.486,282.455,331.783,266.645z M170,284.167
      c-10.396,0-18.818-8.424-18.818-18.817c0-10.394,8.423-18.817,18.818-18.817c10.395,0,18.818,8.423,18.818,18.817
      C188.818,275.743,180.395,284.167,170,284.167z M186.448,223.357c-0.515,8.598-7.912,15.271-16.45,15.323
      c-8.532-0.054-15.942-6.723-16.445-15.323c-1.655-35.015-3.304-70.033-4.955-105.052c-0.18-13.54,12.115-21.198,21.399-21.138
      c9.291-0.062,21.581,7.598,21.405,21.138C189.749,153.325,188.091,188.339,186.448,223.357z"/>
    </svg>
  </div>
  <br>
  <br>
  <AnotherAlertButton>Alertar comportamento<br>suspeito</AnotherAlertButton>
  <br>
  <br>
  <h3 class="font-sans accent-gray-700 text-4x1">
    Lembre-se, se você estiver em perigo, não hesite
    <br>em ligar para a polícia! (190).
    <br>Seja breve na descrição!
    <br> OBS: Nao nos responsabilizamos pelo ocorrido, e pela informacao.
  </h3>
  <br>
  <back-button></back-button>
</template>

<script>

import { defineComponent } from "vue";
import AnotherAlertButton from "@/components/AnotherAlertButton.vue";
import BackButton from "@/components/BackButton.vue";

export default defineComponent({
  components: { BackButton, AnotherAlertButton }
});


</script>

<style scoped>
@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.pulsate {
  animation: pulsate 1.5s infinite;
}
</style>
