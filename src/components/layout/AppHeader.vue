<template>
  <!-- En-tête principal -->
  <header class="myHeader">
    <!-- Logo cliquable -->
    <router-link to="/">
      <img src="../icons/LBLogo2.png" alt="Logo" class="header-logo" />
    </router-link>

    <!-- Navigation -->
    <nav class="navbar">
      <router-link to="/" class="nav-link">ACCUEIL</router-link>
      <router-link to="/cv" class="nav-link">MON CV</router-link>
      <router-link to="/services" class="nav-link">SERVICES</router-link>
      <router-link to="/contact" class="nav-link">CONTACT</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "myHeader",
};
</script>

<style scoped>
.myHeader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  background-color: #222;
  color: white;
  padding: 15px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Le logo reste à gauche */
.header-logo {
  transition: transform 0.3s ease;
  height: 50px;
}

.header-logo:hover {
  transform: scale(1.1);
}

/* Navigation rapprochée */
.navbar {
  display: flex;
  gap: 1.2rem; /* réduit l’espace entre les liens */
  margin-left: auto; /* pousse la nav à droite mais pas collée au bord */
}

.nav-link {
  position: relative;
  color: #eee;
  font-size: 18px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

</style>
