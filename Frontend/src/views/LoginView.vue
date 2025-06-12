<template>
  <transition name="fade">
    <div class="login" role="main">
      <div class="flex">
        <div class="login-container">
          <h1 class="istok-web-regular" tabindex="0">Seja bem vindo de volta!</h1>
          <p tabindex="0">Coloque seu email e senha abaixo</p>
          <br>
          <form @submit.prevent="login" aria-labelledby="login-heading">
            <h2 id="login-heading" class="sr-only">Formulário de Login</h2>

            <div class="input-wrapper">
              <BotaoInput
                  v-model="email"
                  inputPlaceholder="Email"
                  :error="errors.email"
                  :aria-label="'Email' + (errors.email ? ', erro: ' + errors.email : '')"
                  aria-required="true"
                  aria-invalid="errors.email ? true : false"
                  id="email-input">
              </BotaoInput>
              <div class="tooltip-container">
                <span
                    class="tooltip-trigger"
                    @mouseenter="activeTooltip = 'email'"
                    @mouseleave="activeTooltip = null"
                    @focus="activeTooltip = 'email'"
                    @blur="activeTooltip = null"
                    tabindex="0"
                    role="button"
                    aria-label="Ajuda sobre o campo de email"
                    aria-describedby="email-tooltip">?</span>
                <span class="tooltip-text" v-if="activeTooltip === 'email'" id="email-tooltip">Digite o email cadastrado na sua conta</span>
              </div>
            </div>

            <div class="input-wrapper">
              <BotaoInput
                  v-model="password"
                  inputPlaceholder="Senha"
                  inputType="password"
                  :error="errors.password"
                  :aria-label="'Senha' + (errors.password ? ', erro: ' + errors.password : '')"
                  aria-required="true"
                  aria-invalid="errors.password ? true : false"
                  id="password-input">
              </BotaoInput>
              <div class="tooltip-container">
                <span
                    class="tooltip-trigger"
                    @mouseenter="activeTooltip = 'password'"
                    @mouseleave="activeTooltip = null"
                    @focus="activeTooltip = 'password'"
                    @blur="activeTooltip = null"
                    tabindex="0"
                    role="button"
                    aria-label="Ajuda sobre o campo de senha"
                    aria-describedby="password-tooltip">?</span>
                <span class="tooltip-text" v-if="activeTooltip === 'password'" id="password-tooltip">Sua senha deve conter no mínimo 6 caracteres</span>
              </div>
            </div>

            <div v-if="errorMessage" class="error-message" role="alert" aria-live="assertive">
              {{ errorMessage }}
            </div>
            <BotaoRedondo
                type="submit"
                :disabled="isLoading"
                aria-busy="isLoading">
              {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </BotaoRedondo>
          </form>
          <br>
          <back-button aria-label="Voltar para a página anterior"></back-button>
        </div>
      </div>

      <footer role="contentinfo">
        <h4 tabindex="0">© 2024 - Todos os direitos reservados</h4>
      </footer>
    </div>
  </transition>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoInput from '@/components/BotaoInput.vue';
import BotaoRedondo from '@/components/BotaoRedondo.vue';
import {authService} from "@/services/ApiService.js";

export default {
  name: 'LoginView',
  components: {
    BackButton,
    BotaoInput,
    BotaoRedondo,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      isLoading: false,
      activeTooltip: null,
      errors: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    validateForm() {
      this.errors = {
        email: '',
        password: ''
      };

      if (!this.email) this.errors.email = 'E-mail é obrigatório';
      if (!this.password) this.errors.password = 'Senha é obrigatória';

      return !this.errors.email && !this.errors.password;
    },
    async login() {
      if (!this.validateForm()) {
        // Anunciar erro para leitores de tela
        this.$nextTick(() => {
          const firstErrorField = this.errors.email ? 'email-input' : 'password-input';
          document.getElementById(firstErrorField)?.focus();
        });
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await authService.login({
          email: this.email,
          password: this.password
        });

        const {token} = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', response.data.userId);
        console.log('Resposta do login:', response.data);

        // Redirecionar para a página do mapa
        this.$router.push('/Mapa');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais. Erro definido: ' + error;
      } finally {
        this.isLoading = false;
      }
    },
    // Adicionando suporte para navegação por teclado
    handleKeyboardNav(event) {
      if (event.key === 'Escape') {
        this.activeTooltip = null;
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyboardNav);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyboardNav);
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

.flex {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.error-message {
  color: red;
  margin: 10px 0;
  font-size: 14px;
}

h1 {
  color: #000000;
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
}

footer {
  padding: 20px;
  text-align: center;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Estilos do tooltip */
.input-wrapper {
  position: relative;
  width: 100%;
}

.tooltip-container {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 1;
}

.tooltip-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #666;
  font-size: 12px;
  cursor: pointer;
}

.tooltip-trigger:focus {
  outline: 2px solid #4A90E2;
  box-shadow: 0 0 3px #4A90E2;
}

.tooltip-text {
  position: absolute;
  right: 0;
  top: -30px;
  background-color: #333;
  color: white;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}

.tooltip-text::after {
  content: '';
  position: absolute;
  bottom: -4px;
  right: 8px;
  border-width: 4px 4px 0;
  border-style: solid;
  border-color: #333 transparent transparent;
}

/* Classe para elementos visíveis apenas para leitores de tela */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Melhorar o contraste para melhor legibilidade */
.tooltip-trigger:focus-visible {
  outline: 3px solid #4A90E2;
}

/* Melhoria de foco para todos os elementos interativos */
a:focus, button:focus, [role="button"]:focus, input:focus, select:focus, textarea:focus {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}
</style>