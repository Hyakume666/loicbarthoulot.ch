<script>
import { auth } from "@/firebaseConfig";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default {
  data() {
    return {
      status: "Connexion en cours..."
    };
  },
  async mounted() {
    const link = window.location.href;
    const storedEmail = localStorage.getItem("emailForSignIn") || prompt("Saisissez votre e-mail :");

    if (!isSignInWithEmailLink(auth, link)) {
      this.status = "Lien invalide ou expiré.";
      return;
    }

  try {
    await signInWithEmailLink(auth, storedEmail, link);
    console.log("Lien utilisé avec :", storedEmail);

    // Attente manuelle pour que Firebase aie le temps de mettre à jour l’état
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Firebase auth.currentUser après connexion :", auth.currentUser);

    localStorage.removeItem("emailForSignIn");
    this.status = "Connexion réussie ! Redirection...";
    this.$router.push("/");
  } catch (error) {
    console.error("Erreur :", error);
    this.status = "Erreur lors de la connexion.";
  }

  }
};
</script>
