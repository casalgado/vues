<template>
  <div class="home">
    <img alt="Es Alimento logo" src="https://i.imgur.com/tETJGS8.jpg" />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/home/Login.vue";

export default {
  name: "home",
  components: {
    Login
  }
};
</script>

<style scoped>
img {
  width: 100%;
  max-width: 520px;
}
</style>