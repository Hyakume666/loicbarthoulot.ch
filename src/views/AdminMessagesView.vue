<template>
  <div class="container py-5">
    <h2 class="mb-4">Messages du formulaire de contact</h2>

    <div v-if="loading" class="text-muted">Chargement des messages...</div>
    <div v-else-if="messages.length === 0">Aucun message trouvé.</div>

    <div v-else class="list-group">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="list-group-item bg-dark text-white mb-3 rounded shadow-sm p-4"
      >
        <h5 class="mb-1">{{ msg.subject }}</h5>
        <p class="mb-1"><strong>Nom :</strong> {{ msg.name }}</p>
        <p class="mb-1"><strong>Email :</strong> {{ msg.email }}</p>
        <p class="mb-1"><strong>Message :</strong> {{ msg.message }}</p>
        <small class="text-muted">Reçu le {{ formatDate(msg.createdAt) }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default {
  name: 'AdminMessagesView',
  data() {
    return {
      messages: [],
      loading: true
    };
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return 'Date inconnue';
      const date = timestamp.toDate();
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  async mounted() {
    try {
      const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      this.messages = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.list-group-item {
  border: none;
}
</style>
