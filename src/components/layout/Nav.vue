<template>
  <div>
    <ul>
      <li>
        <router-link to="/dashboard">dashboard</router-link>
      </li>
      <li>
        <router-link to="/">home</router-link>
      </li>
      <li>
        <router-link to="/about">about</router-link>
      </li>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <div></div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data: function() {
    return {
      list: ["1", "2", "3", "4", "5"]
    };
  }
};
</script>
<style scoped>
</style>