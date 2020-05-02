<template>
  <b-container fluid id="table-container" class>
    <b-row>
      <h6 id="title">{{ table.title }}</h6>
    </b-row>
    <b-row>
      <b-col id="main" class="pr-0 pl-0">
        <Pagination :period="table.pagination" />
        <b-table
          selectable
          striped
          borderless
          id="table"
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
    </b-row>
  </b-container>
</template>
<script>
import Pagination from "./Pagination";
export default {
  name: "Table",
  components: {
    Pagination,
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
  computed: {
    mdsize: function() {
      return this.sidebar ? "6" : "12";
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
  font-weight: bold;
}

#table {
  border-bottom: 5px solid var(--color-secondary-light);
}

#table-container {
  max-width: 680px;
}
</style>
