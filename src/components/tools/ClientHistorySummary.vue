<template>
  <table>
    <tr v-for="item in this.history" :key="item">
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
    getById(`${this.dbref}/clients/${this.cid}`).then((e) => {
      let keys = Object.keys(e.history);
      keys.forEach((k) => {
        e.history[k].products.forEach((p) => {
          this.history.push([
            `${moment(e.history[k].date).format("MM/DD")}`,
            `${p.quantity} ${p.name}`,
          ]);
        });
      });
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
