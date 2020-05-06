<template>
  <table>
    <tr v-for="(item, index) in this.history" :key="index">
      <td id="tdn">{{ item[0] }}</td>
      <td id="tdv">{{ item[1] }}</td>
    </tr>
  </table>
</template>
<script>
import { getById } from "@/firebase";
import moment from "moment";
export default {
  name: "ClientHistorySummary",
  props: {
    cid: String,
    dbref: String,
  },
  data() {
    return {
      history: [],
    };
  },
  mounted() {
    getById("clients", `${this.cid}`).then((e) => {
      if (e.history) {
        let keys = Object.keys(e.history);
        let ordersTotal = 0;
        keys.forEach((k) => {
          ordersTotal++;
          e.history[k].products.forEach((p) => {
            this.history.push([
              `${moment(e.history[k].date).format("MM/DD")}`,
              `${p.quantity} ${p.name}`,
            ]);
          });
        });
        this.history.unshift([ordersTotal, "pedidos"]);
      } else {
        this.history.unshift([0, "pedidos"]);
      }
    });
  },
};
</script>
<style scoped>
#tdn {
  text-align: left;
}

#tdv {
  text-align: left;
  padding-left: 15px;
}

#tdn,
#tdv {
  font-size: 15px;
}
</style>
