<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>

#app {
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

</style>

