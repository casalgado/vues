<template>
  <div id="reports">
    <button @click="generate">Generar</button>
    <div id="table-container">
      <div v-for="(table, index) in formattedTables" v-bind:key="index">
        <table>
          <tr>
            <th>{{ labeledPeriod(table.date) }}</th>
          </tr>
          <tr
            v-for="(object, index) in table.objects"
            v-bind:key="index + 10"
            :class="object.status"
          >
            <td class="name-cell">{{ object.name }}</td>
            <td>{{ object.total }}</td>
          </tr>
        </table>
        <ul id="clientSummary">
          <li>ausente: {{ table.clientSummary.absent }}</li>
          <li>nuevo: {{ table.clientSummary.new }}</li>
          <li>viejo: {{ table.clientSummary.old }}</li>
          <li>persistente:{{ table.clientSummary.persistent }}</li>
        </ul>
      </div>
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
      tables.reverse();
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

      // then we pad each list with names that are not present
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        let currentTableNames = tables[i].objects.map((e) => e.name);

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
      for (let i = 0; i < tables.length; i++) {
        let currentTable = tables[i];
        console.log(currentTable.newClients.sort());
        for (let j = 0; j < currentTable.objects.length; j++) {
          if (currentTable.objects[j].total == 0) {
            currentTable.objects[j].status = "darkened";
            currentTable.clientSummary.absent += 1;
          } else if (
            currentTable.newClients.includes(currentTable.objects[j].name)
          ) {
            currentTable.objects[j].status = "new";
            currentTable.clientSummary.new += 1;
          } else {
            if (currentTable.objects[j].status != "darkened") {
              currentTable.objects[j].status = "old";
              currentTable.clientSummary.old += 1;
            }

            if (i > 0) {
              let objectsFromLastPeriod = tables[i - 1].objects;
              for (let k = 0; k < objectsFromLastPeriod.length; k++) {
                if (
                  objectsFromLastPeriod[k].total > 0 &&
                  objectsFromLastPeriod[k].name == currentTable.objects[j].name
                ) {
                  currentTable.objects[j].status = "persistent";
                  currentTable.clientSummary.persistent += 1;
                  currentTable.clientSummary.old -= 1;
                }
              }
            }
          }
        }
      }

      return tables;
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
          date: e.date,
          status: "",
        };
      });
      return items;
    },
    getObjects: function () {
      let date = moment(this.date);
      for (let i = 0; i < this.form.range; i++) {
        let dateClone = moment(date).format(); // clone is necessary label the tables correctly
        getByDateRange("orders", "date", date, this.form.period)
          .then((e) => {
            let objects = this.format(JSON.parse(JSON.stringify(e)));
            let table = {
              date: dateClone,
              objects: objects,
              clientSummary: {
                absent: 0,
                new: 0,
                old: 0,
                persistent: 0,
              },
            };
            return table;
          })
          .then((table) => {
            let tdate = moment(table.date).format();
            console.log(tdate);
            getByDateRange(`clients`, "since", tdate, this.form.period).then(
              (e) => {
                table.newClients = JSON.parse(JSON.stringify(e)).map(
                  (e) => e.name
                );
                console.log(table.newClients);
                this.tablesForRendering.push(table);
              }
            );
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

#table-container {
  display: grid;
  grid-template-columns: repeat(12, fit-content(250px));
  grid-auto-flow: column;
  overflow: auto;
  height: 90vh;
}

.name-cell {
  text-align: left;
  text-overflow: clip;
  padding-left: 5px;
  padding-right: 5px;
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