<template>
  <div class="principal min-h-screen grid place-items-center">
    <transition name="fade">
      <div class="about">
        <div class="container mx-auto px-4 max-w-2xl">
          <h2 class="istok-web-regular text-2xl text-center mb-6">
            Insira os seus dados <br> nos campos abaixo:
          </h2>

          <!-- Grid do formulário -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Primeira coluna -->
            <div class="space-y-4">
              <div>
                <BotaoInput v-model="user.name" inputPlaceholder="Nome"></BotaoInput>
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <div>
                <BotaoInput v-model="user.email" inputPlaceholder="Email"></BotaoInput>
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>

              <div>
                <BotaoInput v-model="user.phone" inputPlaceholder="Telefone" v-mask="'(##) #####-####'"></BotaoInput>
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
            </div>

            <!-- Segunda coluna -->
            <div class="space-y-4">
              <div>
                <BotaoInput v-model="user.cpf" inputPlaceholder="CPF" v-mask="'###.###.###-##'"></BotaoInput>
                <span v-if="errors.cpf" class="error-message">{{ errors.cpf }}</span>
              </div>

              <div>
                <BotaoInput v-model="user.password" inputPlaceholder="Senha" inputType="password"></BotaoInput>
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
              </div>

              <div>
                <BotaoInput v-model="confirmPassword" inputPlaceholder="Confirmar Senha" inputType="password"></BotaoInput>
                <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
              </div>
            </div>
          </div>

          <!-- Campos de largura total -->
          <div class="mt-6 space-y-4">
            <div class="user-type">
              <label class="block mb-2">Tipo de Usuário:</label>
              <div class="space-x-4">
                <label class="inline-flex items-center">
                  <input type="radio" v-model="user.user_type" value="user" class="mr-2">
                  Usuário
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="user.user_type" value="mod" class="mr-2">
                  Moderador
                </label>
              </div>
            </div>

            <div class="terms">
              <label class="inline-flex items-center text-red-600">
                <input type="checkbox" id="termos-de-uso" v-model="aceitouTermos" class="mr-2">
                Aceito os termos de uso (obrigatório)
              </label>
              <span v-if="errors.terms" class="error-message block">{{ errors.terms }}</span>

              <router-link to="/Terms" class="text-blue-500 hover:text-blue-900 block mt-2">
                <h3>Clique aqui para ver os termos</h3>
              </router-link>
            </div>

            <div class="flex justify-center mt-6 px-10 py-2">
              <back-button></back-button>
              <br><br>
              <BotaoRedondo :disabled="!aceitouTermos || loading" @click="register" class="m-1.5">
                Avançar
              </BotaoRedondo>
            </div>
          </div>

          <footer class="mt-8 text-center">
            <h4>© 2024 - Todos os direitos reservados</h4>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoInput from '@/components/BotaoInput.vue';
import BotaoRedondo from '@/components/BotaoRedondo.vue';
import { mask } from 'vue-the-mask';
import userService from "@/services/userService";

export default {
  name: 'Cadastro',
  components: {
    BackButton,
    BotaoRedondo,
    BotaoInput,
  },
  data() {
    return {
      aceitouTermos: false,
      user: {
        name: '',
        email: '',
        phone: '',
        cpf: '',
        password: '',
        user_type: 'user',
      },
      confirmPassword: '',
      loading: false,
      errors: {
        name: '',
        email: '',
        phone: '',
        cpf: '',
        password: '',
        confirmPassword: '',
        terms: ''
      }
    };
  },
  directives: { mask },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        name: '',
        email: '',
        phone: '',
        cpf: '',
        password: '',
        confirmPassword: '',
        terms: ''
      };

      if (!this.user.name) {
        this.errors.name = 'Nome é obrigatório';
        isValid = false;
      }

      if (!this.user.email) {
        this.errors.email = 'Email é obrigatório';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.user.email)) {
        this.errors.email = 'Email inválido';
        isValid = false;
      }

      if (!this.user.phone) {
        this.errors.phone = 'Telefone é obrigatório';
        isValid = false;
      }

      if (!this.user.cpf) {
        this.errors.cpf = 'CPF é obrigatório';
        isValid = false;
      }

      if (!this.user.password) {
        this.errors.password = 'Senha é obrigatória';
        isValid = false;
      } else if (this.user.password.length < 8) {
        this.errors.password = 'A senha deve ter pelo menos 8 caracteres';
        isValid = false;
      }

      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Confirme sua senha';
        isValid = false;
      } else if (this.user.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'As senhas não coincidem';
        isValid = false;
      }

      if (!this.aceitouTermos) {
        this.errors.terms = 'Você precisa aceitar os termos de uso';
        isValid = false;
      }

      return isValid;
    },
    async register() {
      if (this.loading) return;

      if (!this.validateForm()) {
        return;
      }

      this.loading = true;

      try {
        const userData = {
          name: this.user.name.trim(),
          email: this.user.email.toLowerCase().trim(),
          phone: this.user.phone,
          cpf: this.user.cpf,
          password: this.user.password,
          user_type: this.user.user_type
        };

        const response = await userService.createUser(userData);

        if (response.status === 201) {
          alert('Usuário registrado com sucesso!');
          this.$router.push('/Mapa');
        }
      } catch (error) {
        let errorMessage = 'Erro ao registrar usuário.' + error;
        if (error.response) {
          switch (error.response.status) {
            case 409:
              errorMessage = 'Este email já está em uso.';
              break;
            case 400:
              errorMessage = 'Dados inválidos. Verifique as informações fornecidas.';
              break;
          }
        }
        alert(errorMessage);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.about {
  display: flex;
  min-height: 50vh;
  background-color: rgb(255, 255, 255);
  padding: 1.25rem;
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Ajustes para mobile */
@media (max-width: 640px) {
  .about {
    padding: 1rem;
    padding-top: 10rem;
  }

  .container {
    width: 100%;
    padding: 0 0.5rem;
  }
}
</style>