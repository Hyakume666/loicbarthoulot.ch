<script setup> // Récupère la base URL de l'app (pour les chemin relatifs en prod)
  const privacyLink = import.meta.env.BASE_URL + 'PrivacyV2.pdf';
</script>


<template>
  <footer class="footer bg-dark text-white py-4">
    <div class="container">
      <div class="row align-items-center">
        <!-- Privacy Link à gauche -->
        <div class="col-md-4 text-md-start text-center">
          <a :href="privacyLink" class="privacy-link" target="_blank"> <!-- Méthode réutilisable grâce à la constante plus haut -->
            Politique de Confidentialité
          </a>
        </div>

        <!-- Copyright au centre -->
        <div class="col-md-4 text-center">
          <p class="mb-0">© 2025 Loïc Barthoulot. Tous droits réservés.</p>
        </div>

        <!-- Social Media Links à droite --> 
        <div class="col-md-4 text-md-end text-center">
          <ul class="list-inline">
            <li class="list-inline-item mx-2">
              <a href="https://www.facebook.com" target="_blank" class="social-link">
                <i class="fab fa-facebook fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item mx-2">
              <a href="https://x.com/" target="_blank" class="social-link">
                <i class="fab fa-x-twitter fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item mx-2">
              <a href="https://www.instagram.com" target="_blank" class="social-link">
                <i class="fab fa-instagram fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item mx-2">
              <a href="https://www.discord.com" target="_blank" class="social-link">
                <i class="fab fa-discord fa-2x"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #222;
  color: #fff;
  padding: 20px 0;
}

.social-link {
  color: #fff;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0.8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  line-height: 0;
  vertical-align: middle;
  background-color: transparent !important;
}

.social-link:hover {
  transform: scale(1.2);
  opacity: 1;
  color: #0D6EFD;
}

/* Correction pour s'assurer de la mise en place de la liste de boutons des réseaux (Et par ailleurs pour corriger le hover vert non désiré) */
ul.list-inline {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.privacy-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  opacity: 0.8;
  background-color: transparent !important;
}

.privacy-link:hover {
  opacity: 1;
  color: #0D6EFD;
}
</style>
