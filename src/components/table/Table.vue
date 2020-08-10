<template>
  <b-container id="table-container" v-click-outside="clearSelected" fluid>
    <b-row>
      <b-col id="main" class="pr-0 pl-0">
        <b-table
          id="table"
          ref="mainTable"
          selectable
          striped
          borderless
          class=""
          :items="table.formattedObjects || table.objects"
          :fields="table.fields"
          :select-mode="selectMode"
          selected-variant="active"
          :tbody-tr-class="rowClass"
          @row-selected="onRowSelected"
        >
          <template v-slot:cell(products)="data">
            <span v-html="data.value" />
          </template>
          <template v-slot:cell(paymentMethod)="data" class="p-icon-cont">
            <img
              v-if="data.item.paymentMethod == 'transferencia'"
              src="../../assets/paymentIcons-01.svg"
              alt=""
              class="p-icon"
            />
            <img
              v-if="data.item.paymentMethod == 'efectivo'"
              src="../../assets/paymentIcons-02.svg"
              alt=""
              class="p-icon"
            />
          </template>
          <div class="icon"></div>
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
  computed: {},
  watch: {
    selected() {
      this.$store.commit("setSelected", this.selected);
    },
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
};
</script>
<style scoped>
#table {
  border-bottom: 5px solid var(--color-secondary-light);
}

#table-container {
  max-width: 680px;
}

.icon {
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: white;
}

.p-icon {
  width: 25px;
}
</style>
