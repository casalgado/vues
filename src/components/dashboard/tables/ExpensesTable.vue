<template>
  <div id="container" class="border">
    <div id="main">
      <p>Expenses Table</p>
      <b-table
        id="table"
        selectable
        :items="tableItems"
        :fields="fields"
        :select-mode="selectMode"
        selected-variant="active"
        @row-selected="onRowSelected"
      ></b-table>
    </div>
    <div id="sidebar">
      <p>
        Selected Rows:
        <br />
        {{ selected }}
      </p>
    </div>
  </div>
</template>
<script>
import { fetch } from "../../../firebase";
import moment from "moment";
export default {
  name: "DisplayTable",
  data() {
    return {
      modes: ["multi", "single", "range"],
      fields: [
        {
          key: "date",
          label: "Fecha",
          sortable: true
        },
        {
          key: "provider",
          label: "Proveedor",
          sortable: true
        },
        {
          key: "name",
          label: "Nombre",
          sortable: true
        },
        {
          key: "quantity",
          label: "CTD",
          sortable: true
        },
        {
          key: "total",
          label: "Total",
          sortable: true
        }
      ],
      selectMode: "multi",
      selected: [],
      tableItems: []
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    prepare(objects) {
      let items = objects.map(e => {
        e.date = moment(e.date).format("DD/MM");
        if (parseFloat(e.total / 1000) > 1) {
          e.total = "$" + e.total / 1000;
        }
        if (parseFloat(e.quantity / 1000) > 1) {
          e.quantity = e.quantity / 1000 + " k";
        }
        return e;
      });
      return items;
    },
    fetchObjects: function() {
      let date = `${this.$store.state.date}`;
      let period = `${this.$store.state.period}`;
      fetch("expenses", date, period).then(e => {
        this.tableItems = this.prepare(e);
      });
    }
  },
  mounted() {
    this.fetchObjects();
  },
  computed: {
    currentDate() {
      return `${this.$store.state.date}`;
    },
    currentPeriod() {
      return `${this.$store.state.period}`;
    },
    currentSheet() {
      return `${this.$route.params.sheet}`;
    }
  },
  watch: {
    currentDate() {
      this.fetchObjects();
    },
    currentPeriod() {
      this.fetchObjects();
    }
  }
};
</script>
<style scoped>
#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>