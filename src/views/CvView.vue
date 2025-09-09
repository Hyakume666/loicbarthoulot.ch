<template>
  <div class="container py-5 cv-page">
    <!-- Titre principal -->
    <h1 class="text-center mb-5">Mon CV</h1>

    <!-- Profil -->
    <section class="mb-5">
      <h2 class="section-title">Profil</h2>
      <p>
        Je suis constamment motivé par le désir d'acquérir de nouvelles compétences et j'aime relever les défis.
        Je suis capable et à l'aise de mener à bien un projet dans un environnement collaboratif.
      </p>
    </section>

    <!-- Coordonnées -->
    <section class="mb-5">
      <h2 class="section-title">Coordonnées</h2>
      <ul class="list-unstyled">
        <li><strong>📍 Adresse :</strong> Rue des Vieux-Patriotes 54, 2300 La Chaux-de-Fonds</li>
        <li><strong>📞 Téléphone :</strong> +41 78 822 97 72</li>
        <li><strong>📧 Email :</strong> <a href="mailto:barthoulot12@gmail.com">barthoulot12@gmail.com</a></li>
        <li><strong>🔗 LinkedIn :</strong> <a href="https://www.linkedin.com/in/loic-barthoulot/" target="_blank">Mon profil</a></li>
      </ul>
    </section>

    <!-- Compétences -->
    <section class="mb-5">
      <h2 class="section-title">Compétences</h2>
      <div class="row">
        <div class="col-md-6">
          <ul>
            <li>Java, OOP, Git, HTML, CSS, JavaScript, RAD</li>
            <li>SQL avancé, SGBDR, triggers, XML</li>
            <li>UML, BPMN, MVC, n-tiers, SOA, MDA</li>
            <li>Analyse métier, processus, agile, Service Design</li>
          </ul>
        </div>
        <div class="col-md-6">
          <ul>
            <li>Montage et configuration PC, overclocking basique</li>
            <li>Benchmark & stress tests</li>
            <li>UX, gamification, RGPD, cybersécurité</li>
            <li>Comptabilité de base</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Expériences -->
    <section class="mb-5">
      <h2 class="section-title">Expérience professionnelle</h2>
      <ul class="timeline">
        <li>
          <strong>Responsable sécurité IT</strong> – PC-Shop Informatique (07/2023 – Actuel)
        </li>
        <li>
          <strong>Assistant logistique</strong> – Ynovatec SA (03/2023 – 06/2023)
        </li>
        <li>
          <strong>Stagiaire</strong> – PC-Shop Informatique (08/2020 – 08/2021)
        </li>
        <li>
          <strong>Vendeur</strong> – Station Eni (10/2018 – 11/2019)
        </li>
        <li>
          <strong>Commissionnaire</strong> – BBV Laboratoires SA (12/2017 – 09/2018)
        </li>
        <li>
          <strong>Agent de sécurité</strong> – NSA Sécurité (08/2015 – 09/2017)
        </li>
      </ul>
    </section>

    <!-- Formation -->
    <section class="mb-5">
      <h2 class="section-title">Formation</h2>
      <ul class="timeline">
        <li><strong>Bachelor HES-SO Informatique de Gestion</strong> – HE-Arc (2023 – en cours)</li>
        <li><strong>Bachelor Ingénieur logiciel</strong> – HE-Arc (2021 – 2023, non terminé)</li>
        <li><strong>CFC Employé de commerce + Maturité</strong> – CIFOM ESTER (2012 – 2015)</li>
      </ul>
    </section>

    <!-- Langues -->
    <section class="mb-5">
      <h2 class="section-title">Langues</h2>
      <ul>
        <li>Français : langue maternelle</li>
        <li>Anglais : B1 (CESC Certificate Intermediate)</li>
        <li>Allemand : A2 (Fit in Deutsch A2)</li>
      </ul>
    </section>

    <!-- Bouton téléchargement -->
    <div class="text-center">
      <a href="/cv/BARTHOULOT_CV.pdf" download class="btn btn-primary btn-lg">
        📥 Télécharger le CV en PDF
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CvView",
};
</script>

<style scoped>
.cv-page {
  color: #eee;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #0D6EFD;
  display: inline-block;
  padding-bottom: 5px;
}

.timeline {
  list-style: none;
  padding-left: 0;
}
.timeline li {
  margin-bottom: 10px;
}
</style>
