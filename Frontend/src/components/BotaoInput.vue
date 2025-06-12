<template>
  <div>
    <input
      :type="inputType"
      :placeholder="inputPlaceholder"
      class="rounded-input"
      v-model="inputValue"
      @input="$emit('update:modelValue', inputValue)"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    inputPlaceholder: {
      type: String,
      default: 'Digite aqui'
    },
    modelValue: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.modelValue
    };
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    }
  }
};
</script>

<style scoped>
.rounded-input {
  background-color: rgb(223, 223, 223);
  width: 100%;
  padding: 10px;
  border: 0px solid #ffffff;
  border-radius: 80px;
  font-size: 20px;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.2);
}
</style>
