const API_KEY = '8561d396df7144f4950220c23b7d39ea';
const BASE_URL = 'https://api.rawg.io/api';

const rawgApi = {
  async fetchGames(page = 1, pageSize = 10, search = '') {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}&search=${encodeURIComponent(search)}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des jeux');
    }
    return await response.json();
  },
};

export default rawgApi;
