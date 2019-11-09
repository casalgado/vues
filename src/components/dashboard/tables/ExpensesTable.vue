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
      return objects;
    }
  }
};
</script>
<style>
.b-table-row-selected {
  background-color: var(--color-background) !important;
  color: var(--color-neutral) !important;
}
</style>