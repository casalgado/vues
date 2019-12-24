<template>
  <div id="container" class>
    <h4 id="title">{{table.title}}</h4>
    <div id="main">
      <Pagination :period="table.pagination" />
      <b-table
        selectable
        striped
        borderless
        id="table"
        class="text-nowrap"
        :items="table.formattedObjects || table.objects"
        :fields="table.fields"
        :select-mode="selectMode"
        selected-variant="active"
        @row-selected="onRowSelected"
      >
        <template v-slot:cell(products)="data">
          <span v-html="data.value"></span>
        </template>
        <template v-slot:cell(quantity)="data">
          <span v-html="data.value"></span>
        </template>
      </b-table>
    </div>

    <TableSidebar :objects="table.objects" />
  </div>
</template>
<script>
import Pagination from "./Pagination";
import TableSidebar from "./TableSidebar";
export default {
  name: "RenderTable",
  components: {
    Pagination,
    TableSidebar
  },
  props: {
    table: Object
  },
  data() {
    return {
      selectMode: this.table.selectMode,
      selected: []
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    }
  },
  watch: {
    selected() {
      this.$store.commit("setSelected", this.selected);
    }
  }
};
</script>
<style scoped>
#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

#title {
  grid-column: span 2;
}
</style>