<template>
  <div>
    <Pagination />
    <router-view></router-view>
  </div>
</template>
<script>
import Pagination from "@/components/dashboard/tables/Pagination.vue";

export default {
  name: "Table",
  components: {
    Pagination
  }
};
</script>
<style scoped>
</style>