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
    </div>

    <div id="table-container">
      <div v-for="(table, index) in formattedTables" v-bind:key="index">
        <table>
          <tr>
            <th>{{ labeledPeriod(table.date) }}</th>
          </tr>
          <tr
            v-for="(client, index) in table.clients"
            v-bind:key="index + 10"
            :class="client.status"
          >
            <td class="name-cell">{{ client.name }}</td>
            <td>{{ client.total }}</td>
          </tr>
        </table>
        <ul id="clientSummary">
          <li>ausente: {{ table.clientSummary.absent }}</li>
          <li>nuevo: {{ table.clientSummary.new }}</li>
          <li>viejo: {{ table.clientSummary.old }}</li>
          <li>persistente:{{ table.clientSummary.persistent }}</li>
          <li>total:{{ table.clientSummary.total }}</li>
        </ul>
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
        rangeOptions: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
      },
      tablesForRendering: [],
      clients: [],
    };
  },
  computed: {
    formattedTables: function () {
      let tables = [...this.tablesForRendering];
      tables.reverse();
      // combine duplicates in each list
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
        let combinedClients = [];
        for (let j = 0; j < currentTable.clients.length; j++) {
          let currentObject = currentTable.clients[j];
          let included = false;
          for (let k = 0; k < combinedClients.length; k++) {
            let includedObject = combinedClients[k];
            if (currentObject.name === includedObject.name) {
              includedObject.total += currentObject.total;
              included = true;
            }
          }
          if (!included) {
            combinedClients.push(currentObject);
          }
        }
        tables[i].clients = combinedClients;
      }
      //combine all lists so that they have the same number of clients
      let allNames = [];
      // first we get a list of all names
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        for (let j = 0; j < currentTable.clients.length; j++) {
          allNames.push(currentTable.clients[j].name);
        }
      }
      let uniqueNames = [...new Set(allNames)];

      // then we pad each list with names that are not present
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        let currentTableNames = tables[i].clients.map((e) => e.name);

        for (let j = 0; j < uniqueNames.length; j++) {
          if (!currentTableNames.includes(uniqueNames[j])) {
            currentTable.clients.push({ name: uniqueNames[j], total: 0 });
          }
        }
        currentTable.clients = currentTable.clients.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }

      // add status to each of the clients of the lists
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        console.log(currentTable.newClients.sort());
        for (let j = 0; j < currentTable.clients.length; j++) {
          currentTable.clients[j].status = "";
          if (currentTable.clients[j].total == 0) {
            currentTable.clients[j].status = "darkened";
            currentTable.clientSummary.absent += 1;
          } else {
            if (
              currentTable.newClients.includes(currentTable.clients[j].name)
            ) {
              currentTable.clients[j].status = "new";
              currentTable.clientSummary.new += 1;
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
    sortTablesBy() {},
    format: function (clients) {
      let items = clients.map((e) => {
        return {
          name: e.client,
          total: e.total,
          type: e.type,
          date: e.date,
          status: "",
        };
      });
      return items;
    },
    getObjects: function () {
      let date = moment(this.date);
      for (let i = 0; i < this.form.range; i++) {
        let dateClone = moment(date).format(); // clone is necessary to label the tables correctly
        let emptyClientSummary = Object.assign(
          {},
          {
            absent: 0,
            new: 0,
            old: 0,
            persistent: 0,
          }
        );
        getByDateRange("orders", "date", date, this.form.period)
          .then((e) => {
            let clients = this.format(JSON.parse(JSON.stringify(e))); // format creates a map with only the info we need

            let table = {
              date: dateClone,
              clients: clients,
              clientSummary: emptyClientSummary,
            };
            return table;
          })
          .then((table) => {
            let tdate = moment(table.date).format();
            getByDateRange(`clients`, "since", tdate, this.form.period).then(
              (e) => {
                table.newClients = JSON.parse(JSON.stringify(e)).map(
                  (e) => e.name
                );

                this.tablesForRendering.push(table);
              }
            );
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
  grid-template-columns: repeat(3, 1fr);
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
  overflow: auto;
  height: 90vh;
  width: 98%;
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