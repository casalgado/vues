<template>
  <div>
    <div id="container" class="border">
      <p id="title">{{table.title}}</p>
      <div id="main">
        <Pagination />
        <b-table
          id="table"
          selectable
          :items="table.objects"
          :fields="table.fields"
          :select-mode="selectMode"
          selected-variant="active"
          @row-selected="onRowSelected"
        ></b-table>
      </div>
      <div id="sidebar">
        <p id="scontent">
          Selected Rows:
          <br />
          {{ selected }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "./Pagination";
export default {
  name: "RenderTable",
  components: {
    Pagination
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
</style>