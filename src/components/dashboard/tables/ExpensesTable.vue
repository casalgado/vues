<template>
  <div class="border">
    <h1>Orders Table</h1>
    <h1>{{$route.params}}</h1>
    <h3>Computed: {{currentDate}}</h3>
    <button @click="getObjects">get</button>
    <p>current period = {{this.$store.state.period}}</p>
    <p>current sheet = {{this.currentSheet}}</p>
    <table>
      <tr class="table-header">
        <th>date</th>
        <th>client</th>
        <th>products</th>
        <th>total</th>
      </tr>
      <tr v-for="item in items" :key="item.key">
        <td>{{ item.date }}</td>
        <td>{{ item.client }}</td>
        <td>{{ item.products.length }}</td>
        <td>{{ item.total }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { orders } from "../../../firebase";
import moment from "moment";
export default {
  name: "OrdersTable",
  data() {
    return {
      items: []
    };
  },
  props: {
    table: String
  },
  computed: {
    currentDate() {
      return `${this.$store.state.date}`;
    },
    currentPeriod() {
      return `${this.$store.state.period}`;
    },
    currentSheet() {
      return `${this.$route.params.sheet}`;
    }
  },
  methods: {
    getObjects: function() {
      console.log(this.$route.params.sheet);
      orders
        .orderByChild("date")
        .startAt(
          moment(this.currentDate)
            .startOf(this.currentPeriod)
            .format()
        )
        .endAt(
          moment(this.currentDate)
            .endOf(this.currentPeriod)
            .format()
        )
        .once("value")
        .then(function(snapshot) {
          let data = snapshot.val();
          let objects = [];
          for (let key in data) {
            objects.push(data[key]);
          }
          return objects;
        })
        .then(
          objects =>
            (this.items = objects.map(function(e) {
              e.date = moment(e.date).format("DD/MM");
              return e;
            }))
        );
    }
  }
};
</script>
<style scoped></style>