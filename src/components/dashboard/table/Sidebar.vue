<template>
  <div id="sidebar">
    <div id="sidebar-content">
      <p>
        <br />Selected:
        <br />
        {{ selected.length }}
        <br />Objects:
        <br />
        {{ objects.length }}
        <br />Total:
        <br />
        {{ totals }}
      </p>
      <div v-if="selectedOne" class="crud-buttons">
        <ButtonPaid :oid="selected[0].id" :path="'orders'" />
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
      <div>
        <b-button @click="exportTable">export</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonPaid from "./../buttons/ButtonPaid";
import moment from "moment";
export default {
  name: "Sidebar",
  components: { ButtonPaid },
  props: {
    objects: Array
  },
  methods: {
    exportTable: function() {
      let flattened = [];
      this.objects.forEach(e => {
        console.log(e);
        e.date = moment(e.date).format("DD-MM-YYYY");
        e.paid = moment(e.paid).format("DD/MM");
        delete e.bug_probe;
        if (e.products) {
          e.products.forEach(p => {
            let c = Object.assign({}, e);
            c.product = p.name;
            c.quantity = p.quantity;
            c.unitPrice = p.unitPrice;
            c.total = p.total;
            flattened.push(c);
          });
        } else {
          flattened.push(e);
        }
      });
      console.log(flattened);
      let header = Object.keys(flattened[0]);
      let rows = flattened.map(e => {
        delete e.products;
        return Object.values(e);
      });
      let csvContent = header + rows.map(e => e.join(",")).join("\n");
      console.log(csvContent);
    }
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
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
      if (this.objects.length > 0 && this.objects[0].total) {
        if (this.selected.length == 0) {
          return this.objects.reduce((a, b) => ({
            total: parseInt(a.total) + parseInt(b.total)
          })).total;
        } else {
          return this.objects.reduce((a, b) => ({
            total: parseInt(a.total) + parseInt(b.total)
          })).total;
        }
      } else {
        return "-";
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
#sidebar-content {
  position: sticky;
  top: 0px;
}
</style>
