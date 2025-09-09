<template>
  <!-- Si le jeu est chargé, on affiche ses détails -->
  <div v-if="game" class="container py-5">
    <!-- Section d'information du jeu -->
    <GameInfoSection :game="game" />

    <!-- Section des avis et commentaires -->
    <div class="card shadow-sm mb-5">
      <!-- En-tête avec titre et bouton pour ajouter un avis -->
      <div class="card-header bg-light d-flex justify-content-between align-items-center">
        <h3 class="mb-0">Avis des joueurs</h3>
        <button class="btn btn-primary" @click="showReviewForm = !showReviewForm">
          {{ showReviewForm ? 'Annuler' : 'Ajouter un avis' }}
        </button>
      </div>

      <div class="card-body">
        <!-- Formulaire pour ajouter un avis (s'affiche seulement quand on clique sur le bouton) -->
        <GameReviewForm
          v-if="showReviewForm"
          v-model:newReview="newReview"
          :isValid="isReviewValid"
          @submit="submitReview"
          @cancel="showReviewForm = false"
        />

        <!-- Liste des avis déjà publiés -->
        <GameReviewList
          :reviews="reviews"
          :displayLimit="displayLimit"
          :showingAll="showingAll"
          @show-more="showMore"
        />
      </div>
    </div>

    <!-- Bouton pour revenir à la liste des jeux -->
    <div class="text-center mt-5">
      <router-link to="/games" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-2"></i> Retour à la liste des jeux
      </router-link>
    </div>
  </div>

  <!-- Si le jeu n'est pas encore chargé, on affiche un message de chargement -->
  <div v-else class="container py-5 text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Chargement...</span>
    </div>
    <p class="mt-3">Chargement des détails du jeu...</p>
  </div>
</template>

<script>
import GameInfoSection from '@/components/common/GameInfoSection.vue';
import GameReviewForm from '@/components/common/GameReviewForm.vue';
import GameReviewList from '@/components/common/GameReviewList.vue';

export default {
  name: 'GameDetails',

  components: {
    GameInfoSection,
    GameReviewForm,
    GameReviewList
  },

  data() {
    return {
      game: null,              // Stocke les données du jeu sélectionné
      reviews: [],             // Liste des avis des utilisateurs
      showReviewForm: false,   // Contrôle si le formulaire d'avis est visible ou non
      loading: true,           // État de chargement

      // Structure pour un nouvel avis
      newReview: {
        name: '',              // Nom de l'utilisateur
        rating: 0,             // Note sur 5
        text: '',              // Commentaire
        date: null             // Date d'ajout
      },

      displayLimit: 3,         // Nombre d'avis à afficher par défaut
      showingAll: false        // Si on affiche tous les avis ou non
    };
  },

  computed: {
    // Vérifie si le formulaire d'avis est valide
    isReviewValid() {
      return this.newReview.name.trim() !== '' &&   // Le nom n'est pas vide
             this.newReview.rating > 0 &&           // Une note a été donnée
             this.newReview.text.trim() !== '';     // Le commentaire n'est pas vide
    }
  },

  async created() {
    await this.fetchGameDetails();
  },

  methods: {
    async fetchGameDetails() {
      try {
        // Récupère l'ID du jeu depuis l'URL
        const gameId = this.$route.params.id;

        // Appel à l'API RAWG pour obtenir les détails du jeu
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=8561d396df7144f4950220c23b7d39ea`);

        if (!response.ok) {
          throw new Error('Game not found');
        }

        const gameData = await response.json();

        // Transformation des données pour correspondre à votre structure existante
        this.game = {
          id: gameData.id,
          name: gameData.name,
          title: gameData.name, // Alias pour compatibilité
          description: gameData.description_raw || gameData.description || 'Aucune description disponible.',
          image: gameData.background_image,
          released: gameData.released,
          rating: gameData.rating,
          metacritic: gameData.metacritic,
          platforms: gameData.platforms?.map(p => ({
            id: p.platform.id,
            name: p.platform.name,
            platform: p.platform
          })) || [],
          publishers: gameData.publishers?.map(pub => ({
            id: pub.id,
            name: pub.name
          })) || [],
          developers: gameData.developers?.map(dev => ({
            id: dev.id,
            name: dev.name
          })) || [],
          genres: gameData.genres?.map(genre => ({
            id: genre.id,
            name: genre.name
          })) || [],
          esrb_rating: gameData.esrb_rating,
          playtime: gameData.playtime,
          website: gameData.website,
          stores: gameData.stores?.map(store => ({
            id: store.store.id,
            name: store.store.name,
            url: store.url
          })) || []
        };

        console.log('Détails du jeu récupérés:', this.game);

        // Charge les avis depuis localStorage pour ce jeu spécifique
        this.loadReviewsFromLocalStorage();

      } catch (error) {
        console.error('Erreur lors de la récupération du jeu:', error);
        // Redirige vers la page 404 si le jeu n'est pas trouvé
        this.$router.push({ name: 'NotFound' });
      } finally {
        this.loading = false;
      }
    },

    // Ajoute un nouvel avis
    submitReview() {
      // Vérifie que l'avis est valide
      if (!this.isReviewValid) return;

      // Crée un objet avis avec la date actuelle
      const reviewToAdd = {
        ...this.newReview,       // Copie les données du formulaire
        date: new Date(),        // Ajoute la date d'aujourd'hui
        id: Date.now()          // ID unique basé sur le timestamp
      };

      // Ajoute l'avis au début de la liste
      this.reviews.unshift(reviewToAdd);

      // Sauvegarde en localStorage
      this.saveReviewsToLocalStorage();

      // Réinitialise le formulaire
      this.newReview = { name: '', rating: 0, text: '', date: null };

      // Cache le formulaire
      this.showReviewForm = false;

      // Message de confirmation
      alert('Votre avis a été publié avec succès !');
    },

    saveReviewsToLocalStorage() {
      const key = `reviews-game-${this.game.id}`;
      localStorage.setItem(key, JSON.stringify(this.reviews));
    },

    loadReviewsFromLocalStorage() {
      const key = `reviews-game-${this.game.id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          this.reviews = JSON.parse(saved);
        } catch (error) {
          console.error('Erreur lors du chargement des avis:', error);
          this.reviews = [];
        }
      }
    },

    // Affiche plus d'avis
    showMore() {
      this.showingAll = !this.showingAll;
    }
  }
};
</script>
