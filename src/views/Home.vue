<template>
  <div class="home">
    <img alt="Es Alimento logo" src="https://i.imgur.com/tETJGS8.jpg" />
    <HelloWorld msg="Es Alimento" />
    <Table title="Test Table" />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Table from "@/components/Table.vue";
import Login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Table,
    Login
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>