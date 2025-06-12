<template>
  <br>
  <div class="about">
    <br>
    <br>
    <h1 class="text-3xl font-bold">Quem somos?</h1>
    <br>
    <section class="secao">
      <h2 class="text-2xl font-semibold mb-2">Nossa Missão</h2>
      <p class="text-lg leading-relaxed">
        Nossa missão é adquirir e aplicar conhecimentos na área de desenvolvimento de software,
        com o objetivo de criar soluções tecnológicas eficientes e inovadoras.
        Valorizamos a aprendizagem contínua e a colaboração, acreditando que a troca de ideias e
        experiências é essencial para o crescimento pessoal e profissional.
      </p>
    </section>

    <section class="secao">
      <h2 class="text-2xl font-semibold mb-2">Nossa Visão</h2>
      <p class="text-lg leading-relaxed">
        Aspiramos a nos tornar profissionais de destaque no mercado de tecnologia,
        reconhecidos pela qualidade e inovação dos nossos projetos. Queremos contribuir para o
        desenvolvimento da indústria de software no Brasil, ajudando a resolver problemas reais com
        soluções criativas e eficazes.
      </p>
    </section>
  </div>
  <BackButton></BackButton>
</template>


<script>
import BackButton from '@/components/BackButton.vue';
import BotaoRedondo from '@/components/BotaoRedondo.vue';

export default {
  name: 'AboutView',
  components: {
    BotaoRedondo,
    BackButton
  },
}
</script>

<style>

.about {
  text-align: center;
  padding: 20px;
}

.secao {
  margin-bottom: 20px;
}

h1 {
  color: #000000;
  font-size: 2.5rem; /* Tamanho da fonte em rem (responsivo) */
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* Estilos responsivos para telas menores (ex: tablets) */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.25rem;
  }
}


</style>