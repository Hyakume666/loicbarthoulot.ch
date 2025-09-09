<template>
    <div class="container py-5">
        <div class="card bg-dark shadow-lg p-5 rounded-4 mx-auto" style="max-width: 700px;">
            <h2 class="text-center mb-4 text-light">Contacter l'équipe du site</h2>
            <p class="text-light mb-4 text-center"><br>Utilisez ce formulaire si vous avez des questions à propos du site en général.<br>Nous ne répondrons pas aux messages concernant les news ou les jeux.<br><br></p>
            <p v-if="submitted" class="text-success text-center mt-3">
                <i class="fas fa-check-circle"></i>
            </p>

            <form v-else @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="name" class="form-label text-light">Nom </label>
                    <input type="text" id="name" name="name" placeholder="Votre nom/prénom ou pseudo" v-model="formData.name" class="form-control" required />
                </div>
                <div class="mb-4">
                    <label for="email" class="form-label text-light">Email </label>
                    <input type="email" id="email" name="email" placeholder="votreadresse@gmail.com" v-model="formData.email" class="form-control" required />
                </div>
                <div class="mb-4">
                    <label for="subject" class="form-label text-light">Sujet </label>
                    <input type="text" id="subject" name="subject" placeholder="Le sujet pour lequel vous nous contactez" v-model="formData.subject" class="form-control" required />
                </div>
                <div class="mb-4">
                    <label for="message" class="form-label text-light">Message </label>
                    <textarea id="message" name="message" placeholder="Votre message" v-model="formData.message" class="form-control" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-100">Envoyer</button>
            </form>
        </div>
    </div>

   <!-- Modale de confirmation -->
    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-light">
        <div class="modal-header">
            <h5 class="modal-title" id="confirmationModalLabel">Message envoyé</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fermer"></button>
        </div>
        <div class="modal-body">
            Merci ! Votre message a bien été reçu.
        </div>
        </div>
    </div>
    </div>


  </template>

  <script>

  import { Modal } from 'bootstrap';
  import { db } from '@/firebaseConfig'; // Import de la firebase
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Utilisation du module FireStore pour stockage de données

  export default {
    data() {
        return {
            formData: { name: '', email: '', subject: '', message: '' },
            submitted: false,
        };
    },
    methods: {
        async handleSubmit() {
    try {
        await addDoc(collection(db, "contactMessages"), {
            name: this.formData.name,
            email: this.formData.email,
            subject: this.formData.subject,
            message: this.formData.message,
            createdAt: serverTimestamp()
    });

    this.formData = { name: '', email: '', subject: '', message: '' };
    this.submitted = true;

    // Affiche la modale (popup) Bootstrap
    const modal = new Modal(document.getElementById('confirmationModal'));
    modal.show();

    // Masque l'alerte après 10 secondes
    setTimeout(() => (this.submitted = false), 10000);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  }
}

    }
  };
  </script>