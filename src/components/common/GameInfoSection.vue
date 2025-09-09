<template>
  <div class="row mb-5">
    <!-- Colonne gauche avec image et note -->
    <div class="col-lg-5">
      <!-- Image du jeu -->
      <img :src="getImageUrl(game.image)" :alt="game.name" class="img-fluid rounded shadow-sm mb-4" @error="onImageError" />

      <!-- Note du jeu avec des étoiles -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Note des joueurs</h4>
        <div class="stars-container">
          <span class="h4 text-warning me-2">{{ game.rating }}/5</span>
          <!-- Affichage des étoiles selon la note -->
          <span v-for="i in 5" :key="i" class="star">
            <i :class="i <= Math.round(game.rating) ? 'bi-star-fill' : 'bi-star'"
               :style="{ color: i <= Math.round(game.rating) ? '#ffc107' : '#e4e5e9' }"></i>
          </span>
        </div>
      </div>

      <!-- Score Metacritic si disponible -->
      <div v-if="game.metacritic" class="mb-3">
        <h5>Score Metacritic</h5>
        <span class="badge p-2" :class="getMetacriticBadgeClass(game.metacritic)">
          {{ game.metacritic }}/100
        </span>
      </div>
    </div>

    <!-- Colonne droite avec les informations détaillées -->
    <div class="col-lg-7">
      <!-- Fil d'Ariane -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Accueil</router-link></li>
          <li class="breadcrumb-item"><router-link to="/games">Jeux</router-link></li>
          <li class="breadcrumb-item active">{{ game.name }}</li>
        </ol>
      </nav>

      <!-- Titre et badges -->
      <h1 class="display-5 fw-bold mb-3">{{ game.name }}</h1>
      <div class="mb-3">
        <!-- Badges pour plateformes -->
        <span v-for="platform in getFirstPlatforms(game.platforms)"
              :key="platform.platform.id"
              class="badge bg-primary me-1 p-2">
          {{ platform.platform.name }}
        </span>
        <!-- Badges pour genres -->
        <span v-for="genre in getFirstGenres(game.genres)"
              :key="genre.id"
              class="badge bg-success me-1 p-2">
          {{ genre.name }}
        </span>
        <!-- Badge année -->
        <span class="badge bg-secondary p-2 ms-1">{{ getYear(game.released) }}</span>
      </div>

      <!-- Description du jeu -->
      <p class="lead mb-4" v-html="getFormattedDescription(game.description)"></p>

      <!-- Caractéristiques techniques -->
      <div class="row mb-4">
        <!-- Développeurs -->
        <div class="col-md-6" v-if="game.developers && game.developers.length > 0">
          <h5>Développeur{{ game.developers.length > 1 ? 's' : '' }}</h5>
          <p>{{ game.developers.map(dev => dev.name).join(', ') }}</p>
        </div>
        <!-- Éditeurs -->
        <div class="col-md-6" v-if="game.publishers && game.publishers.length > 0">
          <h5>Éditeur{{ game.publishers.length > 1 ? 's' : '' }}</h5>
          <p>{{ game.publishers.map(pub => pub.name).join(', ') }}</p>
        </div>
        <!-- Date de sortie -->
        <div class="col-md-6">
          <h5>Date de sortie</h5>
          <p>{{ formatDate(game.released) }}</p>
        </div>
        <!-- ESRB Rating -->
        <div class="col-md-6" v-if="game.esrb_rating">
          <h5>Classification ESRB</h5>
          <p>{{ game.esrb_rating.name }}</p>
        </div>
        <!-- Plateformes complètes -->
        <div class="col-12" v-if="game.platforms && game.platforms.length > 0">
          <h5>Plateformes disponibles</h5>
          <p>{{ game.platforms.map(p => p.platform.name).join(', ') }}</p>
        </div>
        <!-- Tags -->
        <div class="col-12" v-if="game.tags && game.tags.length > 0">
          <h5>Tags</h5>
          <div class="mb-2">
            <span v-for="tag in getFirstTags(game.tags)"
                  :key="tag.id"
                  class="badge bg-light text-dark me-1 mb-1">
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Informations supplémentaires -->
      <div class="row mb-4">
        <div class="col-md-4" v-if="game.playtime">
          <h6>Temps de jeu moyen</h6>
          <p>{{ game.playtime }} heures</p>
        </div>
        <div class="col-md-4" v-if="game.updated">
          <h6>Dernière mise à jour</h6>
          <p>{{ formatDate(game.updated) }}</p>
        </div>
        <div class="col-md-4" v-if="game.website">
          <h6>Site officiel</h6>
          <p>
            <a :href="game.website" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">
              Visiter <i class="bi bi-box-arrow-up-right"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameInfoSection',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl(imageUrl) {
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  // Image par défaut locale ou base64
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4=';
},


    formatDate(dateString) {
      if (!dateString) return 'Non spécifiée';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },

    getYear(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).getFullYear();
    },

    getFormattedDescription(description) {
      if (!description) return 'Aucune description disponible.';

      // Nettoie le HTML et limite la longueur si nécessaire
      const cleanDescription = description.replace(/<[^>]*>/g, '');

      // Limite à 500 caractères pour éviter des descriptions trop longues
      if (cleanDescription.length > 500) {
        return cleanDescription.substring(0, 500) + '...';
      }

      return cleanDescription;
    },

    getFirstPlatforms(platforms) {
      if (!platforms || !Array.isArray(platforms)) return [];
      // Limite à 4 plateformes pour l'affichage en badge
      return platforms.slice(0, 4);
    },

    getFirstGenres(genres) {
      if (!genres || !Array.isArray(genres)) return [];
      // Limite à 3 genres pour l'affichage en badge
      return genres.slice(0, 3);
    },

    getFirstTags(tags) {
      if (!tags || !Array.isArray(tags)) return [];
      // Limite à 10 tags les plus pertinents
      return tags.slice(0, 10);
    },

    getMetacriticBadgeClass(score) {
      if (score >= 75) return 'bg-success';
      if (score >= 50) return 'bg-warning';
      return 'bg-danger';
    }
  }
}
</script>

<style scoped>
.star {
  font-size: 1.2rem;
  margin-right: 2px;
}

.stars-container {
  display: flex;
  align-items: center;
}

.badge {
  font-size: 0.8rem;
}

.lead {
  line-height: 1.6;
}

/* Style pour les liens externes */
a[target="_blank"] {
  text-decoration: none;
}

/* Style pour la description */
.lead {
  text-align: justify;
}
</style>
