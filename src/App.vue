<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111;
  color: #eee;
}

.main {
  flex: 1;
  padding: 40px 20px;
  width: 100%;
  box-sizing: border-box;
}
</style>
