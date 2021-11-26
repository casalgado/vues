<template>
  <div id="reports">
    <button @click="generate">Generar</button>
    <div id="table-container">
      {{ tablesForRendering }}
      <Table
        v-for="(item, index) in tablesForRendering"
        v-bind:key="index"
        :table="table"
      />
    </div>
  </div>
</template>

<script>
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";
import Table from "../../table/Table";
export default {
  name: "ShowClientHistoryReport",
  components: {
    Table,
  },
  data() {
    return {
      form: {
        period: "week",
        range: 4,
      },
      tablesForRendering: [],
      table: {
        fields: [
          {
            key: "name",
            label: "Cliente",
            sortable: true,
            tdClass: "justifyLeft slim orderClient",
            thClass: "slim",
          },
          {
            key: "total",
            label: "Total",
            sortable: true,
            tdClass: "justifyLeft slim orderClient",
            thClass: "slim",
          },
        ],
        objects: [],
      },
      formattedObjects: [],
    };
  },
  computed: { ...mapState(["ref", "date", "period", "selected"]) },
  methods: {
    format: function (objects) {
      let items = objects.map((e) => {
        console.log(e);
        return {
          name: e.client,
          total: e.total,
          type: e.type,
        };
      });
      return items;
    },
    getObjects: function () {
      getByDateRange("orders", "date", this.date, this.form.period).then(
        (e) => {
          this.table.objects = this.format(JSON.parse(JSON.stringify(e)));
        }
      );
      let tablesForRendering = [];
      for (let i = 0; i < 2; i++) {
        let table = Object.assign({}, this.table);
        table.objects = this.table.objects;
        tablesForRendering.push(table);
      }
      this.tablesForRendering = tablesForRendering;
    },
    createTablesForRendering: function (arrayOfGroupsOfObjectsByPeriod) {
      /* 
      this method takes in an array of orders grouped by period.
      it creates a table object with each of the groups of the input array.
      it returns an array of table objects to render, each with different objects property.
      */
      const tablesForRendering = [];
      for (let i = 0; i < arrayOfGroupsOfObjectsByPeriod.length; i++) {
        let table = Object.assign({}, this.table);
        table.objects = arrayOfGroupsOfObjectsByPeriod[i];
        tablesForRendering.push(table);
      }
      return tablesForRendering;
    },
    generate: function () {
      this.getObjects();
      /*
      this methods generates the report. 
      The first step is to query the database to get a group of objects for each period in the range. 

      getObjects(period, range)

              const arrayOfGroupsOfObjectsByPeriod = []
              for let i = 0, i < range, i++
                let group = getObjects('orders', 'date', this.date, this.form.period)
                arrayOfGroupsOfObjectsByPeriod.unshif(group)
              end 
      
      
      */
    },
  },
};
</script>

<style scoped>
#table-container div {
}

#table-container {
  display: grid;
  grid-auto-flow: column;
}
</style>