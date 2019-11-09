<template>
  <div class="home">
    <img alt="Es Alimento logo" src="https://i.imgur.com/tETJGS8.jpg" />
    <HelloWorld msg="Es Alimento" />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/home/Login.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Login
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>