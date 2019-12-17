<template>
  <div>
    <div id="container" class>
      <h4 id="title">{{table.title}}</h4>
      <div id="main">
        <Pagination />
        <b-table
          selectable
          striped
          borderless
          id="table"
          :items="table.objects"
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
      <TableSidebar :objects="table.objects" :selected="selected" />
    </div>
    <PrintOrders :objects="selected" />
  </div>
</template>
<script>
import PrintOrders from "./PrintOrders";
import Pagination from "./Pagination";
import TableSidebar from "./TableSidebar";
export default {
  name: "RenderTable",
  components: {
    Pagination,
    TableSidebar,
    PrintOrders
  },
  props: {
    table: Object
  },
  data() {
    return {
      selectMode: "multi",
      selected: []
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    }
  }
};
</script>
<style scoped>
@media screen {
  #container {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  #title {
    grid-column: span 2;
  }

  #scontent {
    position: sticky;
    top: 0px;
  }

  #print {
    display: none;
  }
}

@media print {
  #container,
  #title,
  #scontent {
    display: none;
  }

  #print {
    color: black;
    display: block;
  }
}
</style>