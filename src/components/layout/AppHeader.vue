<template>
  <!-- En-tête principal -->
  <header class="header">
    <!-- Logo cliquable -->
    <router-link to="/">
      <img src="../icons/GameRadarLogoTR3.png" alt="GameRadar Logo" class="header-logo" />
    </router-link>

    <nav class="navbar">
  <router-link to="/" class="nav-link">ACCUEIL</router-link>
  <router-link to="/games" class="nav-link">JEUX</router-link>
  <router-link to="/news" class="nav-link">ACTUALITÉS</router-link>
  <router-link to="/contact" class="nav-link">CONTACT</router-link>

  <!-- Affiche ADMIN uniquement si connecté -->
  <template v-if="authChecked && userEmail">
    <router-link to="/admin" class="nav-link">ADMIN</router-link>
  </template>

  <!-- Zone d'authentification -->
  <template v-if="authChecked">
    <div v-if="userEmail" class="nav-user">
      Bienvenue, {{ userEmail }}
      <button @click="logout" class="btn btn-sm btn-outline-light ms-2">Déconnexion</button>
    </div>
    <router-link v-else to="/loginview" class="nav-link">LOGIN</router-link>
  </template>
</nav>

  </header>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default {
  data() {
    return {
      userEmail: null,
      authChecked: false
    };
  },
  mounted() {
  onAuthStateChanged(auth, (user) => {
  console.log("👤 État Firebase onAuthStateChanged :", user);
  this.userEmail = user?.email || null;
  this.authChecked = true;
  });
  },

  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          this.userEmail = null;
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Erreur de déconnexion :", error);
        });
    }
  }
};
</script>

<style scoped>

.header-logo {
  transition: transform 0.3s ease;
}

.header-logo:hover {
  transform: scale(1.1); /* Petit zoom sur le logo */
}


.header {
  position: fixed; /* rend le header fixe, top et left à 0 pour mettre le header en haut à gauche vu qu'on l'a retiré du flux normal avec fixed */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* pour être au dessus de tout le reste */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  color: white;
  padding: 15px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}


.site-title {
  font-size: 2rem;
  margin: 0;
}

.navbar {
  display: flex;
  gap: 2rem;
}

.nav-link {
  position: relative; /* pour que le soulignement du after se fasse sur chaque élément et pas sur tous en une fois */
  color: #eee;
  font-size: 19px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link::after { /* Soulignement après le passage de souris */
  content: "";
  position: absolute; /* position par rapport à son parent nav-link */
  left: 0;
  bottom: -4px; /* espace entre texte et soulignement */
  width: 0;
  height: 2px;
  background-color: #0D6EFD;
  transition: width 0.3s ease;
}

.nav-link:hover::after { /* Pour que ça prenne 100% du texte */
  width: 100%;
}

.nav-link:hover {
  color: #0D6EFD;
}

/* Quelques instructions CSS supplémentaires pour contrer le style vert d'origine de bootstrap (on l'appliquera également sur les autres liens du site) */

a.nav-link {
  color: #eee !important; 
  background-color: transparent !important;
  transition: color 0.3s ease;
}

a.nav-link:hover {
  color: #0D6EFD !important;
}

.header a{
  background-color: transparent !important;
}

.nav-user {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #0D6EFD;
  font-size: 16px;
  gap: 1rem;
}




</style>
