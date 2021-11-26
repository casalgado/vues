<template>
  <div id="reports">
    <button @click="generate">Generar</button>
    <div id="table-container">
      <table v-for="(item, index) in formattedTables" v-bind:key="index">
        <tr>
          <th>{{ labeledPeriod(item.date) }}</th>
        </tr>
        <tr v-for="(object, index) in item.objects" v-bind:key="index + 10">
          <td class="name-cell">{{ object.name }}</td>
          <td>{{ object.total }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "ShowClientHistoryReport",
  components: {},
  data() {
    return {
      form: {
        period: "month",
        range: 4,
      },
      tablesForRendering: [],
      objects: [],
    };
  },
  computed: {
    formattedTables: function () {
      let tables = [...this.tablesForRendering];
      // remove duplicates in each list
      for (let i = 0; i < tables.length; i++) {
        let withoutDuplicates = [];
        let currentTable = tables[i];
        for (let j = 0; j < currentTable.objects.length; j++) {
          let currentObject = currentTable.objects[j];
          let included = false;
          for (let k = 0; k < withoutDuplicates.length; k++) {
            let includedObject = withoutDuplicates[k];
            if (currentObject.name === includedObject.name) {
              includedObject.total += currentObject.total;
              included = true;
            }
          }
          if (!included) {
            withoutDuplicates.push(currentObject);
          }
        }
        tables[i].objects = withoutDuplicates;
      }
      //combine all lists so that they have the same number of objects
      let allNames = [];
      // first we get a list of all names
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        for (let j = 0; j < currentTable.objects.length; j++) {
          allNames.push(currentTable.objects[j].name);
        }
      }
      let uniqueNames = [...new Set(allNames)];
      console.log(uniqueNames);
      // then we pad each list with names that are not present
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        let currentTableNames = tables[i].objects.map((e) => e.name);
        console.log(currentTableNames);
        for (let j = 0; j < uniqueNames.length; j++) {
          if (!currentTableNames.includes(uniqueNames[j])) {
            currentTable.objects.push({ name: uniqueNames[j], total: 0 });
          }
        }
        currentTable.objects = currentTable.objects.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      // add status to each of the objects of the lists
      // this methods

      return tables.reverse();
    },
    ...mapState(["ref", "date", "period", "selected"]),
  },
  methods: {
    format: function (objects) {
      let items = objects.map((e) => {
        return {
          name: e.client,
          total: e.total,
          type: e.type,
          status: "new",
        };
      });
      return items;
    },
    getObjects: function () {
      let date = moment(this.date);
      for (let i = 0; i < this.form.range; i++) {
        let dateClone = moment(date).format(); // clone is necessary label the tables correctly
        getByDateRange("orders", "date", date, this.form.period).then((e) => {
          let objects = this.format(JSON.parse(JSON.stringify(e)));
          let table = {
            date: dateClone,
            objects: objects,
          };
          this.tablesForRendering.push(table);
        });
        date.subtract(1, this.form.period).format();
      }
    },
    generate: function () {
      this.getObjects();
    },
    labeledPeriod: function (date) {
      let period = this.form.period;
      if (period == "day") {
        return moment(date).format("dddd DD MMM");
      } else if (period == "month") {
        return moment(date).format("MMMM");
      } else {
        return `${moment(date).startOf(period).format("DD MMM")}  -  ${moment(
          date
        )
          .endOf(period)
          .format("DD MMM")}`;
      }
    },
  },
};
</script>

<style scoped>
table {
  min-width: 250px;
}

#table-container {
  display: grid;
  grid-template-columns: repeat(12, fit-content(250px));
  grid-auto-flow: column;
  overflow: auto;
  height: 90vh;
}

.new {
  background-color: lightsteelblue;
  color: black;
}

.name-cell {
  text-align: left;
  text-overflow: clip;
  padding-left: 5px;
  padding-right: 5px;
}
</style>