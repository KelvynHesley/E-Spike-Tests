<template>
  <button :class="classeBotao" @click="navigate">
    <slot>Texto Padrão</slot>
  </button>
</template>

<script>
export default {
  name: 'GrayTextButton', // Nome do componente
  props: {
    rotaBtn: {
      type: String,
    }
  },
  data() {
    return {
      classeBotao: 'botao-redondo', // Classe CSS para o botão
    };
  },
  methods: {
    navigate() {
      // Navegar para a rota especificada
      this.$router.push(this.rotaBtn);
    },
  },
};
</script>

<style scoped>
.botao-redondo {
  background-color: #787878;
  color: rgb(255, 255, 255);
  border: none;
  width: 200px; /* Largura fixa */
  height: 80px; /* Altura fixa */
  border-radius: 75px; /* Raio para manter o botão circular */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3vw 4vh;
}
.botao-redondo:hover {
  background-color: #3f535a; /* Cor de fundo ao passar o mouse */
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; /* Sombra mais escura */
}
.botao-redondo {
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Tempo e tipo de transição */
}
</style>
