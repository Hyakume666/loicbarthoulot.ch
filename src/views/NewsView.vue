<template>
  <!-- Conteneur principal avec marge verticale -->
  <div class="container py-5">
    <h1 class="display-5 fw-bold mb-4">Actualités</h1>
    <p class="lead mb-5">Restez à jour avec les dernières news du monde du gaming.</p>

    <!-- Liste des actualités avec des cards -->
    <div class="row row-cols-1 row-cols-md-2 g-4 mb-5">
      <div v-for="news in newsList" :key="news.id" class="col">
        <!-- Chaque carte est un lien vers la page de détail de l'article -->
        <router-link :to="`/news/${news.id}`" class="card h-100 bg-dark text-white text-decoration-none">
          
          <!-- Image en haut de la carte (image par défaut si vide) -->
          <img :src="getUrl(news.imageUrl)" class="card-img-top" :alt="news.title">
          <!--<p class="text-danger small">{{ getUrl(news.imageUrl) }}</p>--> <!-- Je la garde ici au cas où il faut retester d'autres liens, ça m'a beaucoup aidé -->




          <!-- Contenu principal de la carte -->
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary">{{ news.category }}</span>
              <small class="text-muted">{{ formatDate(news.date) }}</small>
            </div>
            <h5 class="card-title">{{ news.title }}</h5>
            <p class="card-text">{{ news.summary }}</p>
          </div>

          <!-- Pied de carte -->
          <div class="px-3 py-2 bg-dark small border-top d-flex justify-content-between">
            <span><i class="bi bi-person-circle me-1"></i>{{ news.author }}</span>
            <span><i class="bi bi-eye me-1"></i>{{ news.views.toLocaleString() }} vues</span>
          </div>
          
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
// Importation des données d'actualités
import { newsData } from '@/data/news';

export default {
  name: 'NewsView', // Nom du composant

  // Données du composant
  data() {
    return {
      newsList: newsData // Liste des actualités à afficher
    };
  },

  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    getUrl(path) {
      const base = window.location.hostname !== 'localhost' ? '/projet24-hyakumeteam' : '';
        return base + (path || '/images/default-news.png'); // La ligne de la délivrance, si path est vide null ou undefined alors on utilise ce chemin
    }


  }
};
</script>

<style scoped>

.card {
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

/* Ancien design au cas où
.card-img-top {
  height: 200px;
  object-fit: cover;
}
*/

.card-img-top {
  width: 100%;
  height: auto;
  max-height: 180px;
  object-fit: contain;
}
</style>
