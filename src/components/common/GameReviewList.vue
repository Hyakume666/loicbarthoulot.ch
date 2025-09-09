<template>
  <!-- Si des avis existent, on les affiche -->
  <div v-if="reviews.length > 0">
    <!-- Boucle sur chaque avis à afficher -->
    <div
      v-for="(review, index) in displayedReviews"
      :key="index"
      class="review-item mb-4 pb-3 border-bottom"
    >
      <!-- Entête avec nom et date -->
      <div class="d-flex justify-content-between">
        <h5>{{ review.name }}</h5>
        <small class="text-muted">{{ formatReviewDate(review.date) }}</small>
      </div>

      <!-- Note avec étoiles -->
      <div class="stars-container mb-2">
        <!-- 5 étoiles: pleines jusqu'à la note donnée, vides ensuite -->
        <span v-for="i in 5" :key="i" class="star">
          <i
            :class="i <= review.rating ? 'bi-star-fill' : 'bi-star'"
            :style="{ color: i <= review.rating ? '#ffc107' : '#e4e5e9' }"
          ></i>
        </span>
      </div>

      <!-- Texte du commentaire -->
      <p>{{ review.text }}</p>
    </div>

    <!-- Bouton pour voir plus d'avis si nécessaire -->
    <div v-if="reviews.length > displayLimit" class="text-center mt-4">
      <button class="btn btn-outline-primary" @click="$emit('show-more')">
        {{ showingAll ? 'Voir moins d\'avis' : `Voir plus d'avis (${reviews.length - displayLimit} restants)` }}
      </button>
    </div>
  </div>

  <!-- Message affiché s'il n'y a pas d'avis -->
  <div v-else class="text-center py-5">
    <p class="h5 text-muted mb-3">Aucun avis pour ce jeu</p>
    <p>Soyez le premier à partager votre expérience !</p>
  </div>
</template>

<script>
export default {
  name: 'GameReviewList',
  props: {
    // Liste des avis à afficher
    reviews: {
      type: Array,
      required: true
    },
    // Nombre maximum d'avis à afficher
    displayLimit: {
      type: Number,
      required: true
    },
    // Si tous les avis sont affichés ou non
    showingAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Calcule quels avis doivent être affichés
    displayedReviews() {
      // Si showingAll est vrai, affiche tous les avis
      // Sinon, affiche seulement le nombre limité d'avis
      return this.showingAll ? this.reviews : this.reviews.slice(0, this.displayLimit);
    }
  },
  methods: {
    // Formate la date au format français
    formatReviewDate(date) {
      if (!date) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    }
  }
}
</script>

<style scoped>
.stars-container {
  display: flex;
  align-items: center;
}

.star {
  font-size: 1.2rem;
  margin-right: 2px;
}

.review-item:last-child {
  border-bottom: none !important;
}
</style>
