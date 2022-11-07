<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav class="navbar">
    <div class="left">
      <h1 class="title">Fritter</h1>
    </div>
    <div class="right">
      <router-link to="/"> 🏡 Home </router-link>
      <router-link to="/collections"> 🔖 Saved Collections </router-link>
      <router-link to="/communities"> 👥 Communities </router-link>
      <router-link v-if="$store.state.username" to="/account">
        ⚙️ Account
      </router-link>
      <router-link v-else to="/login"> Login </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
  padding: 1vw 2vw;
  background-color: #7e8d85;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-weight: 400;
}

a {
  text-decoration: none;
  color: #f5f8fa;
  font-size: 17px;
}

a:visited {
  color: #f5f8fa;
}

.navbar h1 {
  color: #f5f8fa;
}

.title {
  font-size: 32px;
  margin: 0 5px;
}

img {
  height: 32px;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  font-size: 20px;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  align-items: center;
}

.right a {
  margin-left: 5px;
}

.alerts {
  width: 25%;
}
</style>
