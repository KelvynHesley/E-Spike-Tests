<template>
  <button :class="classeBotao" @click="handleClick" :disabled="disabled">
    <slot>Texto Padrão</slot>
  </button>
</template>

<script>
export default {
  name: 'BotaoRedondo',
  props: {
    rotaBtn: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      classeBotao: 'botao-redondo',
    };
  },
  methods: {
    handleClick() {
      if (this.rotaBtn) {
        this.$router.push(this.rotaBtn);
      } else {
        this.$emit('click');
      }
    }
  }
};
</script>

<style scoped>
.botao-redondo {
  background-color: #f66700;
  color: rgb(255, 255, 255);
  border: none;
  padding: 20px 30px;
  border-radius: 100px;
  box-shadow: 5px 15px 16px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  cursor: pointer;
}
.botao-redondo:hover {
  background-color: #ff2f00;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.botao-redondo {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.botao-redondo:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
