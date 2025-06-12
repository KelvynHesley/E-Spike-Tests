<template>
    <button :class="classeBotao" @click="alertarComportamentoSuspeito">
      <slot>Texto Padrão</slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'AnotherAlertButton',
    data() {
      return {
        classeBotao: 'botao-redondo', // Classe CSS para o botão
        classeBotaoAzul: 'botao-azul',
      };
    },
    methods: {
      alertarComportamentoSuspeito() {
        this.$router.push({ name: 'Mapa', query: { alert: true } });
      },
    },
  };
  </script>
  
  <style scoped>
  .botao-redondo {
    background-color: #ff4800;
    color: rgb(255, 255, 255);
    border: none;
    padding: 20px 30px;
    border-radius: 100px; /* Agora o botão é arredondado! */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 20px;
  }
  .botao-redondo:hover {
    background-color: #ff7417; /* Cor de fundo ao passar o mouse */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra mais escura */
  }
  .botao-redondo {
    transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Tempo e tipo de transição */
  }
  </style>
  