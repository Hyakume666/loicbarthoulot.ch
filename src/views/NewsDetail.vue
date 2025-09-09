<template>
  <div class="container py-5" v-if="article">
    <!-- Titre de l'article -->
    <h1 class="display-4 fw-bold mb-4 border-bottom pb-2">{{ article.title }}</h1>

    <div class="d-flex flex-wrap align-items-center mb-4 small gap-3">
      <span><i class="bi bi-calendar-event me-1"></i> {{ formatDate(article.date) }}</span>
      <span><i class="bi bi-eye me-1"></i> {{ article.views.toLocaleString() }} vues</span>
      <span><i class="bi bi-person-circle me-1"></i> {{ article.author }}</span>
    </div>

    <div class="mb-4">
      <img :src="getUrl(article.imageUrl)" class="img-fluid rounded shadow-sm" :alt="article.title">
    </div>

    <!-- Contenu principal de l'article (pris avec v-html) -->
    <div v-html="article.content" class="article-content"></div>

    <div class="mt-5">
      <router-link to="/news" class="btn btn-outline-primary">
        ← Retour aux actualités
      </router-link>
    </div>
  </div>

  <!-- Si l'article est introuvable -->
  <div v-else class="container py-5 text-center">
    <h2 class="text-danger mb-4">Article introuvable</h2>
    <router-link to="/news" class="btn btn-outline-primary">Retour aux actualités</router-link>
  </div>
</template>


<script>
// Fonction qui récupère un article par son ID
import { getNewsById } from '@/data/news';

export default {
  name: 'NewsDetail',

  // Données locales du composant : on stocke ici l'article à afficher
  data() {
    return {
      article: null // est null car remplis à la création
    };
  },

  // Méthode pour le formatage
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },
    getUrl(path) {
      const base = window.location.hostname !== 'localhost' ? '/projet24-hyakumeteam' : '';
      return base + (path || '/images/default-news.png');
}

  },

  // Dès que le composant est créé, on récupère l'article correspondant à l'ID dans l'URL
  created() {
    const id = this.$route.params.id;           // On récupère l'ID de l'article via l'URL
    this.article = getNewsById(id);             // On récupère l'article correspondant depuis les données
  }
};
</script>

<style scoped>
.article-content p {
  margin-bottom: 1rem;
  line-height: 1.7;
}
</style>
