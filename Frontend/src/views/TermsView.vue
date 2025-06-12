<template>
  <div class="container mx-auto p-4 md:px-8">
    <TextButton class="text-left mb-4 center">Termos de <br>Usuário</TextButton>
    <div class='text-justify'v-if="paginaAtual <= paginas.length">
      <p v-for="(paragrafo, idx) in paginas[paginaAtual - 1]" :key="idx" class="mb-2">
        {{ paragrafo }}
      </p>
    </div>

    <div class="paginacao mt-4">
      <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="paginacao-btn">
        Anterior
      </button>
      <button
          v-for="pagina in totalPaginas"
          :key="pagina"
          @click="irParaPagina(pagina)"
          :class="{ ativo: pagina === paginaAtual }"
          class="paginacao-btn"
      >
        {{ pagina }}
      </button>
      <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas" class="paginacao-btn">
        Próxima
      </button>
    </div>
  </div>
  <back-button></back-button>
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import TextButton from '@/components/TextButton.vue';

export default {
  components: {
    BackButton,
    TextButton
  },
  data() {
    return {
      paginaAtual: 1,
      paginas: [
        [
          "Aceitação dos Termos: Ao acessar e usar este serviço, você confirma que leu, entendeu e concorda em estar vinculado por estes Termos de Uso.",
          "Alterações nos Termos: Reservamo-nos o direito de modificar estes termos a qualquer momento. Sua decisão de continuar a visitar e usar o serviço após tais alterações constitui sua aceitação das novas condições.",
          "Privacidade e Proteção de Dados Pessoais: Respeitamos a privacidade dos nossos usuários. Qualquer informação pessoal coletada é tratada em conformidade com a LGPD.",
          "Comunicações: Ao criar uma conta conosco, você concorda em receber comunicações eletrônicas de nossa parte, incluindo e-mails, mensagens de texto, chamadas e notificações push.",
          "Uso do Serviço: Você concorda em usar o serviço apenas para fins legais e de maneira que não infrinja os direitos de terceiros ou restrinja o uso do serviço por qualquer terceiro.",
          "",
        ],
        [
          "Conteúdo do Usuário: Você é responsável por todo o conteúdo que transmite ou carrega no serviço e afirma possuir todos os direitos necessários para tal conteúdo.",
          "Conduta do Usuário: Você concorda em não usar o serviço para enviar ou disponibilizar qualquer material que seja ilegal, prejudicial, ameaçador, abusivo, assediante, difamatório, vulgar, obsceno, invasivo da privacidade de outro ou de outra forma censurável.",
          "Direitos Autorais e Propriedade Intelectual: O serviço e seus conteúdos originais, características e funcionalidades são e permanecerão de propriedade exclusiva dos proprietários do serviço e seus licenciadores.",
          "Terminação: Reservamo-nos o direito de encerrar ou suspender seu acesso ao serviço, sem aviso prévio, por qualquer motivo, incluindo violação dos Termos."
        ],
        [
          "Isenção de Garantias: O serviço é fornecido 'como está' e 'conforme disponível' e não garantimos que o serviço será ininterrupto ou livre de erros.",
          "Limitação de Responsabilidade: Em nenhum caso, o serviço ou seus diretores, funcionários ou agentes serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos resultantes do seu uso ou incapacidade de usar o serviço.",
          "Lei Aplicável: Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar o conflito de disposições legais.",
          "Alterações: Reservamo-nos o direito de alterar ou substituir estes Termos a qualquer momento. Se uma revisão for material, forneceremos um aviso com pelo menos 30 dias de antecedência antes que os novos termos entrem em vigor.",
          "Contato: Para quaisquer questões ou dúvidas sobre estes Termos, entre em contato conosco, presencialmente."
        ]
      ]
    };
  },
  computed: {
    totalPaginas() {
      return this.paginas.length;
    },
  },
  methods: {
    irParaPagina(pagina) {
      this.paginaAtual = pagina;
    },
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
      }
    },
    proximaPagina() {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
      }
    },
  },
};
</script>

<style scoped>
.paginacao {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.paginacao-btn {
  padding: 6px 12px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.paginacao-btn.ativo {
  font-weight: bold;
  background-color: #007bff;
  color: white;
}

.paginacao-btn:disabled {
  background-color: #ddd;
  color: #aaa;
}

@media (max-width: 640px) {
  .container {
    padding: 2rem 1rem;
    padding-top: 15rem;
  }

  .paginacao-btn {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
}

</style>
