<template>
  <div id="reports">
    <button @click="generate">Generar</button>
    <div id="table-container">
      <table v-for="(item, index) in tablesForRendering" v-bind:key="index">
        <tr
          v-for="(object, index) in item"
          v-bind:key="index + 3"
          :class="object.status"
        >
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
export default {
  name: "ShowClientHistoryReport",
  components: {},
  data() {
    return {
      form: {
        period: "week",
        range: 4,
      },
      tablesForRendering: [],
      objects: [],
    };
  },
  computed: { ...mapState(["ref", "date", "period", "selected"]) },
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
      getByDateRange("orders", "date", this.date, this.form.period).then(
        (e) => {
          this.objects = this.format(JSON.parse(JSON.stringify(e)));
          this.tablesForRendering.push(
            this.format(JSON.parse(JSON.stringify(e)))
          );
        }
      );
    },
    generate: function () {
      this.getObjects();
    },
  },
};
</script>

<style scoped>
table {
  width: 250px;
}

#table-container {
  display: grid;
  grid-template-columns: fit-content(250px);
  grid-auto-flow: column;
}

.new {
  background-color: lightsteelblue;
  color: black;
}

.name-cell {
  text-align: left;
  text-overflow: clip;
  padding-left: 5px;
}
</style>