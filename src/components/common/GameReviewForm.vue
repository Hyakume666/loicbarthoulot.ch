<template>
  <div class="mb-4 p-4 border rounded bg-light">
    <h4 class="mb-3">Votre avis</h4>

    <!-- Champ pour le nom -->
    <div class="mb-3">
      <label for="reviewerName" class="form-label">Votre nom</label>
      <input
        type="text"
        class="form-control"
        id="reviewerName"
        v-model="review.name"
        placeholder="Votre nom"
      >
    </div>

    <!-- Système de notation par étoiles -->
  <div class="mb-3">
    <label class="form-label">Votre note</label>
    <div class="stars-rating d-flex align-items-center">
      <!-- Boucle pour créer 5 étoiles -->
      <span
        v-for="i in 5"
        :key="i"
        class="star-rating"
        @click="review.rating = i"
        @mouseover="hoverRating = i"
        @mouseleave="hoverRating = 0"
      >
        <!-- Étoile pleine ou vide selon la note actuelle -->
        <i
          :class="['bi', (hoverRating || review.rating) >= i ? 'bi-star-fill' : 'bi-star']"
          :style="{
            color: (hoverRating || review.rating) >= i ? '#ffc107' : '#e4e5e9',
            cursor: 'pointer',
            fontSize: '1.5rem'
          }"
        ></i>
      </span>
      <span class="ms-2 text-muted">({{ review.rating || 0 }}/5)</span>
    </div>
  </div>

    <!-- Champ pour le commentaire -->
    <div class="mb-3">
      <label for="reviewText" class="form-label">Votre commentaire</label>
      <textarea
        class="form-control"
        id="reviewText"
        rows="4"
        v-model="review.text"
        placeholder="Partagez votre expérience avec ce jeu..."
      ></textarea>
    </div>

    <!-- Boutons pour annuler ou publier -->
    <div class="d-flex justify-content-end gap-2">
      <button class="btn btn-secondary" @click="$emit('cancel')">
        Annuler
      </button>
      <button class="btn btn-primary" @click="submit" :disabled="!isValid">
        Publier mon avis
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameReviewForm',
  props: {
    newReview: {
      type: Object,
      required: true
    },
    isValid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hoverRating: 0 // Pour l'effet de survol
    }
  },
  computed: {
    review: {
      get() {
        return this.newReview;
      },
      set(value) {
        this.$emit('update:newReview', value);
      }
    }
  },
  methods: {
    submit() {
      if (this.isValid) {
        this.$emit('submit');
      }
    }
  }
}
</script>

<style scoped>
.stars-rating {
  display: flex;
  align-items: center;
}
.star-rating {
  margin-right: 5px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
}
.star-rating:hover {
  transform: scale(1.2);
}
</style>
