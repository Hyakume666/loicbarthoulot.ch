<template>
  <div class="custom-container mx-auto px-3">
    <GameFilters
      v-model:search="searchQuery"
      v-model:console="selectedConsole"
      v-model:genre="selectedGenre"
      v-model:sort="sortOption"
      :consoles="consoles"
      :genres="genres"
    ></GameFilters>

    <div v-if="loading && (gamesData.length === 0 || searchLoading)" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">
          {{ searchLoading ? 'Recherche en cours...' : 'Chargement initial...' }}
        </span>
      </div>
      <p class="mt-3">
        {{ searchLoading ? 'Recherche de jeux...' : 'Chargement des jeux...' }}
      </p>
    </div>

    <div v-else-if="displayedGames.length > 0">
      <p class="mb-3">{{ filteredGames.length }} jeux trouvés</p>
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-5">
        <GameCard
          v-for="game in displayedGames"
          :key="game.id"
          :game="game"
          @click="goToGameDetails(game.id)"
        />
      </div>

      <!-- Skeletons pendant le chargement de nouvelles pages -->
      <div v-if="loading && !searchLoading" class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-5 mt-4">
        <div v-for="n in 10" :key="`skeleton-${n}`" class="col">
          <div class="card h-100">
            <div class="skeleton-image"></div>
            <div class="card-body">
              <div class="skeleton-line skeleton-title"></div>
              <div class="skeleton-line skeleton-text"></div>
              <div class="skeleton-line skeleton-text short"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sentinel pour l'intersection observer (seulement si pas de recherche) -->
      <div v-if="!hasActiveFilters" ref="loadingSentinel" class="loading-sentinel" style="height: 20px;"></div>

      <div v-if="allGamesLoaded && !hasActiveFilters" class="text-center my-4">
        <p class="text-muted">Tous les jeux ont été chargés !</p>
      </div>
    </div>

    <div v-else-if="!loading && !searchLoading">
      <p class="text-center my-5">Aucun jeu trouvé correspondant aux critères de recherche.</p>
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/common/GameCard.vue';
import GameFilters from '@/components/common/GameFilters.vue';

export default {
  name: 'GameList',
  components: {
    GameCard,
    GameFilters,
  },
  data() {
    return {
      gamesData: [],
      searchResults: [], // 🆕 Résultats de recherche séparés
      searchQuery: '',
      selectedConsole: '',
      selectedGenre: '',
      sortOption: 'titleAsc',
      consoles: [],
      genres: [],
      loading: true,
      searchLoading: false, // 🆕 Loading spécifique à la recherche
      currentPage: 1,
      pageSize: 40,
      allGamesLoaded: false,
      observer: null,
      apiCache: new Map(),
      cacheExpiry: 5 * 60 * 1000,
      searchTimeout: null, // 🆕 Pour le debouncing
    };
  },

  computed: {
    hasActiveFilters() {
      return !!(this.searchQuery || this.selectedConsole || this.selectedGenre);
    },

    // 🆕 Utilise searchResults si recherche active, sinon gamesData
    baseGames() {
      return this.searchQuery ? this.searchResults : this.gamesData;
    },

    filteredGames() {
      if (!this.hasActiveFilters) {
        return this.gamesData;
      }

      return this.baseGames.filter(game => {
        const matchesSearch = !this.searchQuery ||
          game.name.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesConsole = !this.selectedConsole || (
          game.platforms &&
          game.platforms.some(platform =>
            platform.platform &&
            platform.platform.name === this.selectedConsole
          )
        );

        const matchesGenre = !this.selectedGenre || (
          game.genres &&
          game.genres.some(genre => genre.name === this.selectedGenre)
        );

        return matchesSearch && matchesConsole && matchesGenre;
      });
    },

    sortedGames() {
      const games = [...this.filteredGames];

      switch (this.sortOption) {
        case 'titleAsc':
          return games.sort((a, b) => a.name.localeCompare(b.name));
        case 'titleDesc':
          return games.sort((a, b) => b.name.localeCompare(a.name));
        case 'yearAsc':
          return games.sort((a, b) => {
            const yearA = a.released ? new Date(a.released).getFullYear() : 0;
            const yearB = b.released ? new Date(b.released).getFullYear() : 0;
            return yearA - yearB;
          });
        case 'yearDesc':
          return games.sort((a, b) => {
            const yearA = a.released ? new Date(a.released).getFullYear() : 0;
            const yearB = b.released ? new Date(b.released).getFullYear() : 0;
            return yearB - yearA;
          });
        default:
          return games;
      }
    },

    displayedGames() {
      return this.sortedGames;
    }
  },

  async mounted() {
    await this.fetchInitialData();
    this.setupIntersectionObserver();
  },

  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  },

  watch: {
    // 🆕 Recherche avec debouncing
    searchQuery(newQuery, oldQuery) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(() => {
        if (newQuery !== oldQuery) {
          this.handleSearchChange(newQuery);
        }
      }, 500); // Attendre 500ms après que l'utilisateur arrête de taper
    },

    selectedConsole() {
      this.handleFilterChange();
    },
    selectedGenre() {
      this.handleFilterChange();
    }
  },

  methods: {
    // 🆕 Gestion spécifique de la recherche
    async handleSearchChange(query) {
      if (!query.trim()) {
        this.searchResults = [];
        this.handleFilterChange();
        return;
      }

      console.log('🔍 Recherche:', query);
      this.searchLoading = true;

      try {
        await this.searchGames(query);
      } catch (error) {
        console.error('Erreur de recherche:', error);
      } finally {
        this.searchLoading = false;
      }
    },

    // 🆕 Recherche dans l'API
    async searchGames(query) {
      const cacheKey = `search_${query.toLowerCase()}`;
      const cached = this.apiCache.get(cacheKey);

      if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
        console.log('📦 Résultats de recherche depuis le cache');
        this.searchResults = cached.data;
        return;
      }

      try {
        // Chercher sur plusieurs pages pour avoir plus de résultats
        const searchPromises = [];
        for (let page = 1; page <= 3; page++) {
          const promise = fetch(
            `https://api.rawg.io/api/games?key=8561d396df7144f4950220c23b7d39ea&search=${encodeURIComponent(query)}&page_size=40&page=${page}`
          ).then(response => response.json());
          searchPromises.push(promise);
        }

        const responses = await Promise.all(searchPromises);

        const allResults = [];
        responses.forEach(data => {
          if (data.results) {
            allResults.push(...data.results);
          }
        });

        // Optimiser et dédupliquer
        const uniqueResults = this.deduplicateGames(
          allResults.map(game => this.optimizeGameData([game])[0])
        );

        // Sauver en cache
        this.apiCache.set(cacheKey, {
          data: uniqueResults,
          timestamp: Date.now()
        });

        this.searchResults = uniqueResults;
        console.log(`✅ ${uniqueResults.length} jeux trouvés pour "${query}"`);

      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        this.searchResults = [];
      }
    },

    // 🆕 Déduplication des jeux
    deduplicateGames(games) {
      const seen = new Set();
      return games.filter(game => {
        if (seen.has(game.id)) {
          return false;
        }
        seen.add(game.id);
        return true;
      });
    },

    async fetchInitialData() {
      try {
        // Charger les 3 premières pages en parallèle pour un démarrage plus rapide
        const initialPages = [1, 2, 3];
        const promises = initialPages.map(page => this.fetchGamesPage(page));

        await Promise.all(promises);
        this.currentPage = 3;

        // Charger les filtres en parallèle
        this.fetchFilters();

      } catch (error) {
        console.error('Erreur lors du chargement initial:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGamesPage(page) {
      const cacheKey = `games_page_${page}`;
      const cached = this.apiCache.get(cacheKey);

      if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
        console.log(`📦 Page ${page} chargée depuis le cache`);
        this.gamesData.push(...cached.data);
        return cached.data;
      }

      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=8561d396df7144f4950220c23b7d39ea&page_size=${this.pageSize}&page=${page}`
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const games = this.optimizeGameData(data.results || []);

        // Sauver en cache
        this.apiCache.set(cacheKey, {
          data: games,
          timestamp: Date.now()
        });

        this.gamesData.push(...games);

        if (games.length < this.pageSize) {
          this.allGamesLoaded = true;
        }

        return games;
      } catch (error) {
        console.error(`Erreur page ${page}:`, error);
        return [];
      }
    },

    optimizeGameData(games) {
      return games.map(game => ({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        ratings_count: game.ratings_count,
        platforms: game.platforms?.slice(0, 4),
        genres: game.genres?.slice(0, 3)
      }));
    },

    async loadMoreGames() {
      if (this.loading || this.allGamesLoaded || this.hasActiveFilters) return;

      this.loading = true;
      this.currentPage += 1;

      try {
        const promises = [
          this.fetchGamesPage(this.currentPage),
          this.fetchGamesPage(this.currentPage + 1)
        ];

        await Promise.all(promises);
        this.currentPage += 1;

      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        this.loading = false;
      }
    },

    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '300px',
        threshold: 0.1,
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasActiveFilters) {
            console.log('🔄 Lazy loading déclenché');
            this.loadMoreGames();
          }
        });
      }, options);

      this.$nextTick(() => {
        const sentinel = this.$refs.loadingSentinel;
        if (sentinel && this.observer) {
          this.observer.observe(sentinel);
        }
      });
    },

    handleFilterChange() {
      this.$nextTick(() => {
        if (this.observer) {
          this.observer.disconnect();
          this.setupIntersectionObserver();
        }
      });
    },

    async fetchFilters() {
      try {
        const [genres] = await Promise.all([
          this.fetchGenres()
        ]);

        this.genres = genres;
        this.extractConsolesFromGames();

        console.log('✅ Filtres chargés');
      } catch (error) {
        console.error('Erreur lors de la récupération des filtres:', error);
      }
    },

    extractConsolesFromGames() {
      const consoleSet = new Set();

      this.gamesData.forEach(game => {
        if (game.platforms?.length > 0) {
          game.platforms.forEach(platform => {
            if (platform.platform?.name) {
              consoleSet.add(platform.platform.name);
            }
          });
        }
      });

      this.consoles = Array.from(consoleSet)
        .sort()
        .map((name, index) => ({
          id: index + 1,
          name: name
        }));
    },

    async fetchGenres() {
      try {
        const cacheKey = 'genres';
        const cached = this.apiCache.get(cacheKey);

        if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
          return cached.data;
        }

        const response = await fetch('https://api.rawg.io/api/genres?key=8561d396df7144f4950220c23b7d39ea');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const genres = data.results.map(genre => ({
          id: genre.id,
          name: genre.name
        }));

        this.apiCache.set(cacheKey, {
          data: genres,
          timestamp: Date.now()
        });

        return genres;
      } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
        return [];
      }
    },

    goToGameDetails(gameId) {
      this.$router.push({ name: 'GameDetails', params: { id: gameId } });
    },
  },
};
</script>

<style scoped>
.skeleton-image {
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 0.375rem 0.375rem 0 0;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  margin-bottom: 8px;
  border-radius: 4px;
}

.skeleton-title {
  height: 20px;
  width: 80%;
}

.skeleton-text {
  width: 100%;
}

.skeleton-text.short {
  width: 60%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.loading-sentinel {
  margin: 20px 0;
}
</style>
