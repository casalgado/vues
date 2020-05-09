<template>
  <div id="chs">
    <table>
      <tr v-for="(item, index) in this.history" :key="index">
        <td id="tdn">{{ item[0] }}</td>
        <td id="tdv">{{ item[1] }}</td>
      </tr>
    </table>
  </div>
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
      clientId: "",
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
  watch: {
    selectedIds() {
      console.log("this");
    },
  },
};
</script>
<style scoped>
#chs {
  max-height: 300px;
  overflow-y: scroll;
}

#chs::-webkit-scrollbar {
  background: var(--color-secondary) !important;
  border-radius: 5px;
}

#chs::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-top: 2px solid var(--color-secondary);
  border-bottom: 2px solid var(--color-secondary);
  border-radius: 5px;
}

#tdn {
  text-align: left;
  width: 77px;
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
