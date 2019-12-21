<template>
  <div id="sidebar">
    <p id="sidebar-content">
      <br />Selected:
      <br />
      {{ selected.length }}
      <br />Objects:
      <br />
      {{objects.length}}
      <br />Total:
      <br />
      {{ totals }}
    </p>
    <div v-if="selectedOne" class="crud-buttons">
      <b-button>paid</b-button>
      <b-button>edit</b-button>
      <b-button>delete</b-button>
    </div>
    <div v-if="selectedMany" class="crud-buttons">
      <b-button>paid</b-button>
      <b-button>edit</b-button>
      <b-button>delete</b-button>
    </div>
    <div v-if="sameClient">
      <b-button onclick="window.print()">Save and Print</b-button>
    </div>
  </div>
</template>
<script>
// import moment from "moment";
export default {
  name: "TableSidebar",
  props: {
    objects: Array,
    selected: Array
  },
  computed: {
    sameClient: function() {
      if (this.selected.length > 0) {
        let client = this.selected[0].client;
        return (
          this.selected.map(e => e.client).filter(e => e == client).length ==
          this.selected.length
        );
      } else {
        return false;
      }
    },
    totals: function() {
      if (this.objects.length > 0) {
        if (this.selected.length == 0) {
          return (
            this.objects.reduce((a, b) => ({ total: a.total + b.total }))
              .total /
              1000 +
            "k"
          );
        } else {
          return (
            this.selected
              .map(e => parseInt(e.total.slice(0, -1)))
              .reduce((a, b) => a + b) + "k"
          );
        }
      } else {
        return "0";
      }
    },
    selectedOne: function() {
      return this.selected.length == 1;
    },
    selectedMany: function() {
      return this.selected.length > 1;
    }
  }
};
</script>
<style scoped>
</style>
