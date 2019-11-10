<template>
  <div id="container" class="border">
    <div id="main">
      <p>Orders Table</p>
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
  name: "OrdersTable",
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
          key: "client",
          label: "Clientes",
          sortable: true
        },
        {
          key: "products",
          label: "Productos",
          sortable: true
        },
        {
          key: "quantity",
          label: "CTD",
          sortable: false
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
      let items = objects.map(function(e) {
        let quantity = [...e.products];
        e.products = e.products.map(e => e.name).join(",  ");
        e.quantity = quantity.map(e => e.quantity).join(", ");
        e.total = e.total / 1000 + "k";
        e.date = moment(e.date).format("DD/MM");
        if (e.paid == "") {
          e._rowVariant = "danger";
        } else {
          e.paid = moment(e.paid).format("DD/MM");
        }
        return e;
      });
      return items;
    },
    fetchObjects: function() {
      let date = `${this.$store.state.date}`;
      let period = `${this.$store.state.period}`;
      fetch("orders", date, period).then(e => {
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