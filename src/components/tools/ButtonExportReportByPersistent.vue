<template>
  <div>
    <download-csv
      class="btn btn-default export-button"
      :data="formattedObjects"
      name="Persistentes.csv"
    >
      <p>Exportar por Persistente</p>
    </download-csv>
    <div @click="populateClientList">preparar reporte</div>
    {{ clientsWithInfo.length > 0 ? "reporte listo" : "reporte no preparado" }}
  </div>
</template>

<script>
import { ref } from "@/firebaseInit";
import { getOneWhere } from "@/firebaseMethods";
export default {
  name: "ButtonExportReportByPersistent",
  props: {
    orderedClients: Array,
    tables: Array,
  },
  data() {
    return {
      clientsWithInfo: [],
    };
  },
  computed: {
    formattedObjects: function () {
      let forExport = [];
      for (let i = 0; i < this.clientsWithInfo.length; i++) {
        const client = this.clientsWithInfo[i].name;
        let numberOfOrders = 0;
        for (let j = 0; j < this.tables.length; j++) {
          const tableItems = this.tables[j].clients;
          for (let k = 0; k < tableItems.length; k++) {
            const item = tableItems[k];
            if (client == item.name && item.total > 0) {
              numberOfOrders += 1;
            }
          }
        }
        forExport.push({
          numberOfOrders: numberOfOrders,
          client: this.clientsWithInfo[i].name,
          phone: this.clientsWithInfo[i].phone,
          lastOrderDate: this.clientsWithInfo[i].lastOrderDate,
          lastOrder: this.clientsWithInfo[i].lastOrder,
        });
      }
      return forExport;
    },
  },
  methods: {
    getClientInfo: function (name) {
      getOneWhere(ref, "clients", "name", name).then((e) => {
        if (e) {
          let lastOrder = [];
          let lastOrderDate = "";
          if (e.history) {
            e.history[Object.keys(e.history).at(-1)].products.forEach((e) => {
              lastOrder.push(e.quantity);
              lastOrder.push(e.name);
            });
            lastOrderDate = e.history[Object.keys(e.history).at(-1)].date;
          } else {
            console.log(e.name);
          }

          this.clientsWithInfo.push({
            name: e.name,
            lastOrder: lastOrder.join(" "),
            lastOrderDate: lastOrderDate.split("T")[0],
            phone: e.phone,
          });
        } else {
          this.clientsWithInfo.push({
            name: name,
            lastOrder: "",
            phone: "",
          });
        }
      });
    },
    populateClientList: function () {
      // for (let i = 0; i < this.orderedClients.length; i++) {
      //   this.getClientInfo(this.orderedClients[i]);
      // }
      console.log(this.orderedClients);
      console.log(this.tables);
    },
  },
};
</script>

<style scoped>
p {
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;
  margin: 0 auto;
}

p:hover {
  background-color: var(--color-primary);
}

.export-button {
  width: 220px;
  padding: 0px;
  margin: 0 auto;
}
</style>
