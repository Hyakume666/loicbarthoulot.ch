<template>
  <div class="container py-5">
    <div class="card bg-dark shadow-lg p-5 rounded-4 mx-auto" style="max-width: 700px;">
      <h2 class="text-center mb-4 text-light">Me contacter</h2>
      <p class="text-light mb-4 text-center">
        Utilisez ce formulaire pour toute question, projet ou demande de service.<br>
        Je vous répondrai dès que possible.
      </p>

      <form action="https://formspree.io/f/xnnbwjww" method="POST">
        <div class="mb-4">
          <label for="name" class="form-label text-light">Nom</label>
          <input type="text" id="name" name="name" placeholder="Votre nom/prénom ou pseudo" class="form-control" required />
        </div>
        <div class="mb-4">
          <label for="email" class="form-label text-light">Email</label>
          <input type="email" id="email" name="_replyto" placeholder="votreadresse@gmail.com" class="form-control" required />
        </div>
        <div class="mb-4">
          <label for="subject" class="form-label text-light">Sujet</label>
          <input type="text" id="subject" name="subject" placeholder="Sujet de votre message" class="form-control" required />
        </div>
        <div class="mb-4">
          <label for="message" class="form-label text-light">Message</label>
          <textarea id="message" name="message" placeholder="Votre message" class="form-control" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>
