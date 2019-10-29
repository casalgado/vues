<template>
  <div>
    <p>{{ items }}</p>
    <button @click="getRefs">get</button>
    <button @click="setRefs">set</button>
  </div>
</template>
<script>
import db from "../firebase";

export default {
  name: "Table",
  props: {
    table: String
  },
  methods: {
    getRefs: function() {
      db.ref("esalimento")
        .once("value")
        .then(function(snapshot) {
          let object = snapshot.val();
          alert(JSON.stringify(object));
        });
    },
    setRefs: function() {
      db.ref("esalimento/orders").push({ test: "test" });
    }
  },
  data: function() {
    return {
      items: "test"
    };
  }
};
</script>
<style scoped>
</style>