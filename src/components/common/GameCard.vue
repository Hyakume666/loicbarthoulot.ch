<template>
  <div class="col">
    <div class="card h-100 bg-dark text-white game-card">
      <!-- Image du jeu avec badges -->
      <div class="game-image-container">
        <img
          :src="getImageUrl(game.background_image)"
          :alt="game.name"
          class="card-img-top"
        />
        <div class="game-badges">
          <!-- Badges pour les plateformes -->
          <span
            v-for="platform in getFirstPlatforms(game.platforms)"
            :key="platform.platform.id"
            class="badge bg-primary me-1"
          >
            {{ platform.platform.name }}
          </span>
          <!-- Badges pour les genres -->
          <span
            v-for="genre in getFirstGenres(game.genres)"
            :key="genre.id"
            class="badge bg-success"
          >
            {{ genre.name }}
          </span>
        </div>
      </div>

      <!-- Informations du jeu -->
      <div class="card-body">
        <h5 class="card-title">{{ game.name }}</h5>
        <p class="card-text text-truncate">
          {{ getGameDescription(game) }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-text mb-0">
            <small class="text-muted">
              Année: {{ formatReleaseDate(game.released) }}
            </small>
          </p>
          <div v-if="game.rating" class="rating">
            <span class="badge bg-warning text-dark">
              <i class="bi bi-star-fill"></i> {{ game.rating }}/5
            </span>
          </div>
        </div>
        <router-link
          :to="{ name: 'GameDetails', params: { id: game.id } }"
          class="btn btn-sm btn-outline-primary w-100 mt-2"
        >
          Voir détails <i class="bi bi-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl(imagePath) {
      // Retourne l'URL de l'image
      return imagePath
    },

    formatReleaseDate(date) {
      if (!date) return 'Inconnu';
      return new Date(date).getFullYear();
    },

    getGameDescription(game) {
      if (game.short_description) {
        return game.short_description;
      }
      if (game.description_raw) {
        return game.description_raw.substring(0, 100) + '...';
      }
      return 'Découvrez ce jeu passionnant...';
    },

    getFirstPlatforms(platforms) {

      if (!platforms || !Array.isArray(platforms)) return [];
      return platforms.slice(0, 3);
    },

    getFirstGenres(genres) {

      if (!genres || !Array.isArray(genres)) return [];
      return genres.slice(0, 2);
    }
  }
};
</script>

<style scoped>
.game-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
  overflow: hidden;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.game-image-container {
  overflow: hidden;
  height: 250px;
  position: relative;
  background-color: #222;
}

.game-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s;
}

.game-card:hover .game-image-container img {
  transform: scale(1.05);
}

.game-badges {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
  max-width: 90%; /* Évite que les badges débordent */
}

.game-badges .badge {
  font-size: 0.75rem;
  margin-bottom: 2px;
}

/* Dégradé en bas de l'image pour mieux voir les badges */
.game-image-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
  pointer-events: none;
}

/* Style pour les images qui ne se chargent pas */
.game-image-container img[src*="placeholder"] {
  opacity: 0.7;
}
</style>
