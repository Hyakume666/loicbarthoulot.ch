<template>
  <div class="mb-4">
    <div class="row g-3">
      <div class="col-md-4">
        <label for="search" class="form-label">Rechercher un jeu:</label>
        <input
          type="text"
          id="search"
          :value="search"
          @input="$emit('update:search', $event.target.value)"
          placeholder="Entrez un nom de jeu..."
          class="form-control"
        />
      </div>

      <div class="col-md-2">
        <label for="console" class="form-label">Filtrer par console:</label>
        <select
          id="console"
          :value="console"
          @change="$emit('update:console', $event.target.value)"
          class="form-select"
        >
          <option value="">Toutes les consoles</option>
          <option v-for="c in consoles" :key="c.id" :value="c.name">{{ c.name }}</option>
        </select>
      </div>

      <div class="col-md-2">
        <label for="genre" class="form-label">Filtrer par genre:</label>
        <select
          id="genre"
          :value="genre"
          @change="$emit('update:genre', $event.target.value)"
          class="form-select"
        >
          <option value="">Tous les genres</option>
          <option v-for="g in genres" :key="g.id" :value="g.name">{{ g.name }}</option>
        </select>
      </div>

      <div class="col-md-4">
        <label for="sort" class="form-label">Trier par:</label>
        <select
          id="sort"
          :value="sort"
          @change="$emit('update:sort', $event.target.value)"
          class="form-select"
        >
          <option value="titleAsc">Titre (A-Z)</option>
          <option value="titleDesc">Titre (Z-A)</option>
          <option value="yearAsc">Année (croissant)</option>
          <option value="yearDesc">Année (décroissant)</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameFilters',
  props: {
    search: String,
    console: String,
    genre: String,
    sort: String,
    consoles: Array,
    genres: Array,
  },
  emits: [
    'update:search',
    'update:console',
    'update:genre',
    'update:sort',
  ],
};
</script>
