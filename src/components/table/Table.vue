<template>
  <b-container fluid id="table-container" v-click-outside="clearSelected">
    <b-row>
      <b-col id="main" class="pr-0 pl-0">
        <b-table
          ref="mainTable"
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
          :tbody-tr-class="rowClass"
        >
          <template v-slot:cell(products)="data">
            <span v-html="data.value"></span>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "Table",
  components: {},
  props: {
    table: Object,
  },
  data() {
    return {
      selectMode: this.table.selectMode,
      selected: [],
    };
  },
  beforeCreate() {
    this.$store.commit("setSelected", []);
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    rowClass(item) {
      if (item.displayPaid && item.paid) {
        return "paid";
      } else {
        return "";
      }
    },
    clearSelected() {
      this.$refs.mainTable.clearSelected();
    },
  },
  computed: {},
  watch: {
    selected() {
      this.$store.commit("setSelected", this.selected);
    },
  },
};
</script>
<style scoped>
#table {
  border-bottom: 5px solid var(--color-secondary-light);
}

#table-container {
  max-width: 680px;
}
</style>
