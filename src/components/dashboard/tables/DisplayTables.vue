<template>
  <div class="border">
    <p>Orders Table</p>
    <div>
      <b-table
        id="table"
        selectable
        :items="tableItems"
        :fields="fields"
        :select-mode="selectMode"
        selected-variant="active"
        @row-selected="onRowSelected"
      ></b-table>
      <p>
        Selected Rows:
        <br />
        {{ selected }}
      </p>
    </div>
  </div>
</template>
<script>
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
      selected: []
    };
  },
  props: {
    objects: Array
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
    },
    tableItems() {
      let items = this.prepare(this.objects);
      return items;
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    prepare(objects) {
      if (this.$route.params.sheet == "orders") {
        let items = objects.map(function(e) {
          let quantity = [...e.products];
          e.products = e.products.map(e => e.name).join(",  ");
          e.quantity = quantity.map(e => e.quantity).join(", ");
          e.date = moment(e.date).format("DD/MM");
          if (e.paid == "") {
            e._rowVariant = "warning";
          } else {
            e.paid = moment(e.paid).format("DD/MM");
          }
          return e;
        });
        return items;
      } else {
        return objects;
      }
    }
  }
};
</script>
<style>
.b-table-row-selected {
  background-color: var(--color-background) !important;
  color: var(--color-neutral);
}
</style>