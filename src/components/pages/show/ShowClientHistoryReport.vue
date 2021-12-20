<template>
  <div id="reports">
    <div id="controls">
      <InputSelect
        v-model="form.period"
        :options="form.periodOptions"
        :label="'periodo'"
        :allow-text="false"
      />
      <InputSelect
        v-model="form.range"
        :options="form.rangeOptions"
        :label="'cantidad'"
        :allow-text="false"
      />
      <b-button @click="generate" type="submit" variant="primary" id="submit"
        >Generar</b-button
      >
      <b-button @click="sortBy('name')" variant="info">Nombre</b-button>
      <b-button @click="sortBy('value')" variant="info">Valor</b-button>
      <b-button @click="sortBy('persistent')" variant="info"
        >Persistente</b-button
      >
      <b-button @click="sortBy('new')" variant="info">Nuevo</b-button>
    </div>

    <div id="table-container">
      <div v-for="(table, index) in tablesForRendering" v-bind:key="index">
        <ul id="clientSummary">
          <li>ausente: {{ table.clientSummary.absent }}</li>
          <li>nuevo: {{ table.clientSummary.new }}</li>
          <li>viejo: {{ table.clientSummary.old }}</li>
          <li>persistente:{{ table.clientSummary.persistent }}</li>
          <li>total:{{ table.clientSummary.total }}</li>
        </ul>
        <table>
          <tr>
            <th>{{ labeledPeriod(table.date) }}</th>
          </tr>
          <tr
            v-for="(client, index) in table.clients"
            v-bind:key="index + 99"
            :class="client.status"
          >
            <td class="name-cell">{{ client.name }}</td>
            <td>{{ client.total }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import InputSelect from "../../inputs/InputSelect";
import { getByDateRange } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "ShowClientHistoryReport",
  components: { InputSelect },
  data() {
    return {
      form: {
        period: "week",
        range: "1",
        periodOptions: [
          { value: "week", text: "semanas" },
          { value: "month", text: "meses" },
        ],
        rangeOptions: Array(12)
          .fill()
          .map((_, i) => `${i + 1}`),
      },
      tablesForRendering: [],
      clients: [],
      ordersFromDatabase: [],
      newClients: [],
      allTables: [],
      activeSorting: [],
    };
  },
  computed: {
    newClientsNames: function () {
      return this.newClients
        .flat()
        .map((e) => e.name)
        .sort();
    },
    clientTableItems: function () {
      let orders = [...this.ordersFromDatabase];
      let tableItems = [];
      for (let i = 0; i < orders.length; i++) {
        tableItems.push(
          this.combineDuplicates(
            orders[i].map((e) => {
              return {
                name: e.client,
                total: e.total,
                type: e.type,
                date: e.date,
                status: "",
              };
            })
          )
        );
      }
      return tableItems;
    },
    allClients: function () {
      return this.combineDuplicates(
        [...this.ordersFromDatabase].flat().map((e) => {
          return { name: e.client, total: e.total };
        })
      );
    },
    formattedTables: function () {
      console.log("method being called twice?");
      let tables = [...this.allTables];
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        currentTable.clientSummary = Object.assign(
          {},
          {
            absent: 0,
            new: 0,
            old: 0,
            persistent: 0,
          }
        );
        currentTable.clients = this.padList(this.clientTableItems[i]);

        /* method below adds status to the client objects in the table
        there are four possible status objects can have */
        let newClientsNamesClone = this.newClientsNames;
        for (let j = 0; j < currentTable.clients.length; j++) {
          currentTable.clients[j].status = "";
          if (currentTable.clients[j].total == 0) {
            currentTable.clients[j].status = "darkened";
            currentTable.clientSummary.absent += 1;
          } else {
            if (newClientsNamesClone.includes(currentTable.clients[j].name)) {
              currentTable.clients[j].status = "new";
              currentTable.clientSummary.new += 1;
              newClientsNamesClone.splice(
                newClientsNamesClone.indexOf(currentTable.clients[j].name),
                1
              );
            } else {
              if (i > 0) {
                let objectsFromLastPeriod = tables[i - 1].clients;
                for (let k = 0; k < objectsFromLastPeriod.length; k++) {
                  if (
                    objectsFromLastPeriod[k].total > 0 &&
                    objectsFromLastPeriod[k].name ==
                      currentTable.clients[j].name
                  ) {
                    currentTable.clients[j].status = "persistent";
                    currentTable.clientSummary.persistent += 1;
                  }
                }
              }
              if (currentTable.clients[j].status == "") {
                currentTable.clients[j].status = "old";
                currentTable.clientSummary.old += 1;
              }
            }
          }
          currentTable.clientSummary.total =
            currentTable.clientSummary.absent +
            currentTable.clientSummary.new +
            currentTable.clientSummary.persistent +
            currentTable.clientSummary.old;
        }
      }

      return tables;
    },
    ...mapState(["ref", "date", "period", "selected"]),
  },
  methods: {
    sortBy: function (type) {
      let tables = this.tablesForRendering;
      switch (type) {
        case "name":
          this.activeSorting = this.sortByName();
          break;
        case "value":
          this.activeSorting = this.sortByValue();
          break;
        case "persistent":
          this.activeSorting = this.sortByPersistent(tables);
          break;
        case "new":
          this.activeSorting = this.sortByNew(tables);
          break;
        default:
          this.activeSorting = this.sortByName(tables);
          break;
      }
      for (let i = 0; i < tables.length; i++) {
        tables[i].clients = [...tables[i].clients].sort(
          (a, b) =>
            this.activeSorting.indexOf(a.name) -
            this.activeSorting.indexOf(b.name)
        );
      }
      this.$forceUpdate();
    },
    sortByName: function () {
      return [...this.allClients]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((e) => e.name);
    },
    sortByValue: function () {
      return [...this.allClients]
        .sort((a, b) => b.total - a.total)
        .map((e) => e.name);
    },
    sortByPersistent: function (tables) {
      let counting = [];
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i].clients;
        for (let j = 0; j < table.length; j++) {
          if (i == 0) {
            counting.push({
              name: table[j].name,
              persistent: 0,
            });
          } else {
            counting[j].persistent += table[j].status == "persistent" ? 1 : 0;
          }
        }
      }
      return counting
        .sort((a, b) => b.persistent - a.persistent)
        .map((e) => e.name);
    },
    sortByNew: function (tables) {
      let counting = [];
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i].clients;
        for (let j = 0; j < table.length; j++) {
          if (i == 0) {
            counting.push({
              name: table[j].name,
              new: 0,
            });
          }
          counting[j].new += table[j].status == "new" ? tables.length - i : 0;
        }
      }
      return counting.sort((a, b) => b.new - a.new).map((e) => e.name);
    },
    combineDuplicates: function (array) {
      let combined = [];
      for (let j = 0; j < array.length; j++) {
        let currentObject = array[j];
        let included = false;
        for (let k = 0; k < combined.length; k++) {
          let includedObject = combined[k];
          if (currentObject.name === includedObject.name) {
            includedObject.total += currentObject.total;
            included = true;
          }
        }
        if (!included) {
          combined.push(currentObject);
        }
      }
      return combined;
    },
    padList: function (arrayOfClientObjects) {
      let arrayOfClientNames = arrayOfClientObjects.map((e) => e.name);
      let arrayOfAllNameStrings = this.allClients.map((e) => {
        return e.name;
      });
      for (let j = 0; j < arrayOfAllNameStrings.length; j++) {
        if (!arrayOfClientNames.includes(arrayOfAllNameStrings[j])) {
          arrayOfClientObjects.push({
            name: arrayOfAllNameStrings[j],
            total: 0,
          });
        }
      }
      return arrayOfClientObjects.sort((a, b) => a.name.localeCompare(b.name));
    },
    getObjects: function () {
      let date = moment(this.date);
      for (let i = 0; i < this.form.range; i++) {
        let dateClone = moment(date).format(); // clone is necessary to label the tables correctly
        getByDateRange("orders", "date", date, this.form.period).then((e) => {
          this.ordersFromDatabase.unshift(JSON.parse(JSON.stringify(e)));
          this.allTables.unshift({ date: dateClone });
        });
        getByDateRange(`clients`, "since", date, this.form.period).then((e) => {
          this.newClients.unshift(JSON.parse(JSON.stringify(e)));
        });

        date.subtract(1, this.form.period).format();
      }
    },
    generate: function () {
      this.tablesForRendering = [];
      this.clients = [];
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
  watch: {
    formattedTables() {
      this.tablesForRendering = this.formattedTables;
    },
  },
};
</script>

<style scoped>
td,
th {
  height: 15px;
}

tr {
  border-bottom: 1px solid gray;
}

li {
  list-style-type: none;
}

#controls {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px;
  align-items: center;
}

#submit {
  margin: 3px 20px 3px 20px;
}

.f-group {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

#table-container {
  display: grid;
  grid-template-columns: repeat(12, fit-content(280px));
  grid-auto-flow: column;
  overflow-x: auto;
}

.name-cell {
  text-align: left;
  text-overflow: clip;
  padding-left: 5px;
  padding-right: 5px;
  max-width: 216px;
}

.darkened {
  color: rgb(63, 63, 63);
}

.new {
  background-color: lightsteelblue;
  color: black;
}

.old {
}

.persistent {
  background-color: rgb(139, 184, 139);
}
</style>