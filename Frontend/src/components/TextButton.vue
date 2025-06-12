<template>
  <button :class="classeBotao" @click="navigate">
    <slot>Texto Padrão</slot>
  </button>
</template>

<script>
export default {
  name: 'TextButton', // Nome do componente
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
};
</script>
<style scoped>
.botao-redondo {
  background-color: #00bbff;
  color: white;
  border: none;
  width: 200px;
  height: 80px;
  border-radius: 40px; /* Para garantir que o botão seja arredondado corretamente */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0; /* Remover padding extra para centralizar o texto corretamente */
}
.botao-redondo:hover {
  background-color: #00b5f6; /* Cor de fundo ao passar o mouse */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra mais escura */
}
.botao-redondo {
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Tempo e tipo de transição */
}
</style>
