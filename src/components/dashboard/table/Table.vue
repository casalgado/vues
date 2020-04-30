<template>
  <b-container fluid id="table-container" class>
    <b-row>
      <h4 id="title">{{ table.title }}</h4>
    </b-row>
    <b-row>
      <b-col sm="12" md="12" id="main" class="pr-0 pl-0">
        <Pagination :period="table.pagination" />
        <b-table
          selectable
          striped
          borderless
          id="table"
          responsive
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
      </b-col>
      <b-col v-if="this.sidebar" auto>
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
    sidebar: { default: true, type: Boolean },
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
}
</style>
