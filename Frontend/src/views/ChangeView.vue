<template>
  <div class="about">
    <h1>Alterar Informações</h1>
    <h2>Lembre-se de colocar o email quando para fazer alteracoes na sua conta!</h2>
    <br />
    <BotaoInput v-model="user.name" input-placeholder="Nome" /> <br />
    <BotaoInput v-model="user.email" input-placeholder="Email" disabled /> <br />
    <BotaoInput v-model="user.phone" input-placeholder="Telefone" v-mask="'(##) #####-####'" /> <br />
    <BotaoInput v-model="user.password" input-placeholder="Senha" inputType="password" /> <br />
    <BotaoInput v-model="confirmPassword" input-placeholder="Confirmar Senha" inputType="password" /> <br />
    <BotaoRedondo @click="updateUser" class="m-2">Trocar</BotaoRedondo>
    <br />
    <BotaoRedondo @click="confirmDelete" class="m-2">Deletar</BotaoRedondo>
    <br />
  </div>
  <back-button></back-button>
  <br>
</template>

<script>

import BackButton from "@/components/BackButton.vue";
import BotaoInput from "@/components/BotaoInput.vue";
import BotaoRedondo from "@/components/BotaoRedondo.vue";
import { mask } from "vue-the-mask";
import userService from "@/services/userService"; // Importa o serviço de usuário configurado

export default {
  components: { BotaoInput, BotaoRedondo, BackButton },
  data() {
    return {
      user: {
        _id: "",
        name: "",
        email: "",
        phone: "",
        password: ""
      },
      confirmPassword: ""
    };
  },
  directives: { mask },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    // Busca dados do usuário no backend
    async fetchUserData() {
      try {
        const userData = await userService.getUser();
        this.user = userData;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Sua sessão expirou. Faça login novamente.");
          this.$router.push("/login");
        } else {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    },

    // Atualiza dados do usuário
      async updateUser() {
        try {
          const userData = { ...this.user };

          // Certifique-se de que o _id não está sendo enviado
          if (!userData._id) {
            delete userData._id;
          }

          console.log('Dados para atualização:', userData);
          const response = await userService.updateUser(this.user.email, userData);
          console.log('Resposta do servidor após atualização:', response);
          alert("Dados atualizados com sucesso!");
          this.$router.push("/");
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
          alert("Erro ao atualizar usuário: " + (error.response?.data?.message || error.message));
        }
      },

    // Confirmação e remoção do usuário
    async confirmDelete() {
      try {
        if (!this.user?.email) {
          throw new Error('Email do usuário não encontrado');
        }

        console.log('Iniciando processo de deleção para:', this.user.email);
        await userService.deleteUserByEmail(this.user.email);
        alert('Conta removida com sucesso!');
        // Redirecionar para logout ou página inicial após deletar
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro ao remover conta:', error);
        alert('Erro ao remover conta: ' + (error.response?.data?.message || error.message));
      }
    }
  }
};


</script>

<style scoped>
div {
  opacity: 1;
  animation: fadeIn 0.6s;
}

@keyframes fadeIn {
  0% {
    opacity: 0.5;
  }
  100%{
    opacity: 1;
  }
}

@media (max-width:  640px) {
  .about {
    padding-top: 5rem;
    align-items: center ;
  }
}
h1 {
  font-size: 25px;
  text-align: center;
  color: #0095c5;
}
</style>
