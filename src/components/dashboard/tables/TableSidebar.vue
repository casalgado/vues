<template>
  <div id="sidebar">
    <p id="scontent">
      Total Entries:
      <br />
      {{objects.length}}
      <br />Selected Rows:
      <br />
      {{ selected }}
    </p>
  </div>
</template>
<script>
// import moment from "moment";
export default {
  name: "TableSidebar",
  props: {
    objects: Array,
    selected: Array
  }
};
</script>
<style scoped>
</style>
