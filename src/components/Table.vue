<template>
  <div>
    <button @click="getRefs">get</button>
    <ul>
      <li v-for="item in items" v-bind:key="item.key">
        <p>{{ item.client }}</p>
        <p>{{ item.product }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import db from "../firebase";

export default {
  name: "Table",
  data() {
    return {
      items: []
    };
  },
  props: {
    table: String
  },
  methods: {
    getRefs: function() {
      db.ref("devAccount/orders")
        .once("value")
        .then(function(snapshot) {
          let data = snapshot.val();
          let objects = [];
          for (let key in data) {
            objects.push(data[key]);
          }
          return objects;
        })
        .then(objects => (this.items = objects));
    }
  }
};
</script>
<style scoped>
</style>