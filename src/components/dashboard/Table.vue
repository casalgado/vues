<template>
  <div>
    <button @click="getRefs">get</button>
    <Pagination />
    <p>{{date}}</p>
    <ul>
      <li v-for="item in items" :key="item.key">
        <p>{{ item.client }}</p>
        <p>{{ item.product }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import Pagination from "@/components/dashboard/Pagination.vue";
import db from "../../firebase";
import moment from "moment";

export default {
  name: "Table",
  components: {
    Pagination
  },
  data() {
    return {
      items: [],
      date: moment().format()
    };
  },
  props: {
    table: String
  },
  methods: {
    getRefs: function() {
      db.child("orders")
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
    },
    setRefs: function() {
      db.child("clients").push({ name: "pedro" });
    }
  }
};
</script>
<style scoped>
</style>