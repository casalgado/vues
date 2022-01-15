<template>
  <div>
    <download-csv
      class="btn btn-default export-button"
      :data="formattedObjects"
      name="Persistentes.csv"
    >
      <p>Exportar por Persistente</p>
    </download-csv>
  </div>
</template>

<script>
export default {
  name: "ButtonExportReportByPersistent",
  props: {
    orderedClients: Array,
    tables: Array,
  },
  computed: {
    formattedObjects: function () {
      let forExport = [];
      for (let i = 0; i < this.orderedClients.length; i++) {
        const client = this.orderedClients[i];
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
        forExport.push({ client: client, numberOfOrders: numberOfOrders });
      }
      return forExport;
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