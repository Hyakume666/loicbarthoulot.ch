<template>
  <!-- Bannière -->
  <section class="home-banner mb-5">
    <div class="home-banner-content">
      <h1>Bienvenue sur mon site</h1>
      <p>Montage, dépannage et optimisation de PC – à votre service</p>
      <div class="d-flex gap-3 justify-content-center flex-wrap">
        <router-link to="/services" class="btn btn-primary">Voir mes services</router-link>
        <router-link to="/contact" class="btn btn-outline-light">Me contacter</router-link>
      </div>
    </div>
  </section>

  <div class="container">
    <!-- Services principaux -->
    <section class="mb-5">
      <h2 class="mb-4">Mes services</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="service in services" :key="service.id" class="col">
          <div class="card h-100 bg-dark text-white service-card">
            <img v-if="service.imageUrl" :src="service.imageUrl" class="card-img-top" :alt="service.title" style="height: 180px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">{{ service.title }}</h5>
              <p class="card-text">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Forfaits populaires -->
    <section class="mb-5">
      <h2 class="mb-4">Forfaits populaires</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="pack in packs" :key="pack.id" class="col">
          <div class="card h-100 bg-dark text-white service-card">
            <div class="card-body text-center">
              <h5 class="card-title">{{ pack.title }}</h5>
              <p class="card-text">{{ pack.description }}</p>
              <span class="badge bg-success">{{ pack.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      services: [
        {
          id: 1,
          title: 'Montage de PC sur mesure',
          description: 'Assemblage complet avec tests et installation système.',
          imageUrl: '/images/services/montage.jpg'
        },
        {
          id: 2,
          title: 'Dépannage & réparation',
          description: 'Diagnostic et réparation de matériel ou de logiciels défectueux.',
          imageUrl: '/images/services/depannage.jpg'
        },
        {
          id: 3,
          title: 'Nettoyage et entretien',
          description: 'Nettoyage interne du PC, remplacement de pâte thermique, dépoussiérage.',
          imageUrl: '/images/services/nettoyage.jpg'
        },
        {
          id: 4,
          title: 'Installation de logiciels',
          description: 'Installation de Windows, drivers, antivirus et logiciels essentiels.',
          imageUrl: '/images/services/logiciels.jpg'
        },
        {
          id: 5,
          title: 'Optimisation & performance',
          description: 'Réglages BIOS/Windows, optimisation gaming et bureautique.',
          imageUrl: '/images/services/optimisation.jpg'
        },
        {
          id: 6,
          title: 'Conseil matériel',
          description: 'Aide au choix de composants adaptés à vos besoins et budget.',
          imageUrl: '/images/services/conseil.jpg'
        }
      ],
      packs: [
        {
          id: 1,
          title: 'Pack Gaming',
          description: 'Montage + installation Windows + optimisation gaming.',
          price: 'CHF 149.-'
        },
        {
          id: 2,
          title: 'Pack Entretien',
          description: 'Nettoyage complet + remplacement de pâte thermique.',
          price: 'CHF 89.-'
        },
        {
          id: 3,
          title: 'Pack Bureautique',
          description: 'Montage + installation logiciels essentiels (Office, antivirus).',
          price: 'CHF 129.-'
        }
      ]
    };
  }
};
</script>

<style scoped>
.home-banner {
  width: 100%;
  height: 300px;
  background-image: url('/images/banner-pc.jpg'); /* mets une image générique d’ordi */
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
  border-radius: 8px;
}
.home-banner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.home-banner-content { position: relative; z-index: 1; }

.service-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.service-card:hover {
  transform: translateY(-5px);
}
</style>
