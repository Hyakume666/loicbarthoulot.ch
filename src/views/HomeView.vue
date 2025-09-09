<template>
  <!-- Bannière -->
  <section class="home-banner mb-5">
    <div class="home-banner-content">
      <h1>Bienvenue sur GameRadar</h1>
      <p>Découvrez les meilleures sorties et actus jeux vidéo</p>
      <div class="d-flex gap-3 justify-content-center flex-wrap">
        <router-link to="/news" class="btn btn-primary">Voir les news</router-link>
        <router-link to="/games" class="btn btn-primary">Voir les jeux</router-link>
      </div>
    </div>
  </section>

  <div class="container">
    <!-- Dernières actualités (Card cliquable ici aussi)-->
    <section class="mb-5">
      <h2 class="mb-4">Dernières actualités</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="news in newsItems" :key="news.id" class="col">
          <router-link :to="`/news/${news.id}`" class="card h-100 bg-dark text-white news-card text-decoration-none">
            <img :src="getUrl(news.imageUrl)" class="card-img-top" :alt="news.title" style="height: 180px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">{{ news.title }}</h5>
              </div>
          </router-link>
        </div>

      </div>
    </section>

    <!-- Jeux en vedette -->
    <section class="mb-5">
      <h2 class="mb-4">Jeux en vedette</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="game in featuredGames" :key="game.id" class="col">
          <router-link
            :to="`/game/${game.id}`"
            class="card h-100 bg-dark text-white game-card text-decoration-none"
          >
            <img
              :src="getUrl(game.imageUrl)"
              class="card-img-top"
              :alt="'Image de ' + game.title"
              style="height: 180px; object-fit: cover;"
            >
            <div class="card-body text-center">
              <h5 class="card-title">{{ game.title }}</h5>
              <div class="mb-2">
                <span
                  v-for="c in (Array.isArray(game.console) ? game.console : [game.console])"
                  :key="c"
                  class="badge bg-primary me-1"
                >
                  {{ c }}
                </span>
                <span class="badge bg-success">{{ game.genre }}</span>
              </div>
              <p class="card-text text-muted">{{ game.year }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>


    <!-- Prochaines sorties -->
    <section class="mb-5">
    <h2 class="mb-4">Prochaines sorties</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="game in upcomingGames" :key="game.id" class="col">
        <router-link
          :to="`/game/${game.id}`"
          class="card h-100 bg-dark text-white game-card text-decoration-none"
        >
          <div class="position-relative">
            <img
              :src="getUrl(game.imageUrl)"
              class="card-img-top"
              :alt="'Image de ' + game.title"
              style="height: 180px; object-fit: cover;"
            >
            <span class="position-absolute top-0 end-0 badge bg-danger m-2">
              {{ formatReleaseDate(game.releaseDate) }}
            </span>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">{{ game.title }}</h5>
            <div class="mb-2">
              <span
                v-for="c in (Array.isArray(game.console) ? game.console : [game.console])"
                :key="c"
                class="badge bg-primary me-1"
              >
                {{ c }}
              </span>
              <span class="badge bg-success">{{ game.genre }}</span>
            </div>
            <p class="card-text text-muted">
              Sortie : {{ formatDateFull(game.releaseDate) }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </section>

  </div>
</template>


<script>
import { gamesData } from '@/data/games';
import { getLatestNews } from '@/data/news';


export default {
  name: 'HomeView',
  data() {
    return {
      featuredGameIds: [1, 3, 5],
      newsItems: []
    };
  },
  computed: {
    featuredGames() {
      return gamesData.filter(game => this.featuredGameIds.includes(game.id));
    },
  upcomingGames() {
      const today = new Date();
      // Filtrer les jeux dont la date de sortie est dans le futur
      return gamesData
        .filter(game => {
          if (!game.releaseDate) return false;
          const releaseDate = new Date(game.releaseDate);
          return releaseDate > today;
        })
        .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
        .slice(0, 3); // Limiter à 3 jeux
    }
  },

  mounted() {
  this.newsItems = getLatestNews(3); // Récupère les 3 dernières actus
  },
  methods: {
    getUrl(path) {
      return (window.location.hostname !== 'localhost' ? '/projet24-hyakumeteam' : '') + path;
    },
    goToGameDetails(gameId) {
      this.$router.push({ name: 'GameDetails', params: { id: gameId } });
    },
    formatReleaseDate(dateString) {
      if (!dateString) return 'À venir';
      const options = { month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },
    formatDateFull(dateString) {
      if (!dateString) return 'Date non confirmée';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
  }
};
</script>


<style scoped>

.home-banner {
  width: 100%;
  height: 300px;
  background-image: url('/images/01_pokemon_layout-k1JB--835x437@IlSole24Ore-Web.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
  border-radius: 8px;

}

.home-banner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.home-banner-content {
  position: relative;
  z-index: 1;
}

.game-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.game-card:hover {
  transform: translateY(-5px);
}

.news-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-5px);
}

</style>
