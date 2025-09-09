<template>
  <div class="container p-4 mt-5 bg-dark text-light rounded shadow" style="max-width: 500px;">
    <h3>Connexion par e-mail</h3>
    <input v-model="email" type="email" class="form-control my-3" placeholder="Entrez votre e-mail" />
    <button class="btn btn-primary w-100" @click="sendLoginLink">Envoyer le lien</button>
    <p class="mt-3 text-info" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import { sendSignInLinkToEmail } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      message: ""
    };
  },
  methods: {
    async sendLoginLink() {
      const actionCodeSettings = {
        //url: "http://localhost:5173/#/finishSignIn", // test local
        url: "https://heg-web.github.io/projet24-hyakumeteam/#/finishSignIn", // prod github
        handleCodeInApp: true,
        android: {
          packageName: "com.example.app",
          installApp: false
        },
        ios: {
          bundleId: "com.example.app"
        }
      };

      try {
        await sendSignInLinkToEmail(auth, this.email, actionCodeSettings);
        window.localStorage.setItem("emailForSignIn", this.email);
        this.message = "Lien envoyé. Vérifiez votre boîte mail.";
      } catch (error) {
        console.error("Erreur :", error);
        this.message = "Erreur lors de l'envoi du lien.";
      }
    }
  }
};
</script>
