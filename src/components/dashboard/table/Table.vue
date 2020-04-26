<template>
  <b-container fluid id="table-container" class>
    <b-row>
      <h4 id="title">{{ table.title }}</h4>
    </b-row>
    <b-row>
      <b-col sm="12" md="8" id="main">
        <Pagination :period="table.pagination" />
        <b-table
          selectable
          striped
          borderless
          id="table"
          responsive="true"
          class=""
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
      </b-col>
      <b-col auto>
        <TableSidebar :objects="table.objects" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Pagination from "./Pagination";
import TableSidebar from "./Sidebar";
export default {
  name: "Table",
  components: {
    Pagination,
    TableSidebar,
  },
  props: {
    table: Object,
  },
  data() {
    return {
      selectMode: this.table.selectMode,
      selected: [],
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
  },
  watch: {
    selected() {
      this.$store.commit("setSelected", this.selected);
    },
  },
};
</script>
<style scoped>
#title {
  width: 100%;
  text-align: center;
  background-color: gray;
}
</style>
