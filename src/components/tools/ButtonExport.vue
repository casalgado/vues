<template>
  <div>
    <!-- <p @click="download">test</p> -->
    <download-csv
      class="btn btn-default export-button"
      :data="formattedObjects"
      :name="filename"
    >
      <p>Export</p>
    </download-csv>
  </div>
</template>
<script>
import moment from "moment";
import _ from "lodash";
export default {
  name: "ButtonExport",
  props: {
    objects: Array,
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    formattedObjects() {
      let fmo = [];
      let objs = _.orderBy(this.objects, "client");
      objs.forEach((e) => {
        fmo.push({
          cliente: e.client,
          producto: "",
          cantidad: "",
          subtotal: "",
          total: e.total,
        });
        e.products.forEach((p) => {
          fmo.push({
            cliente: "",
            producto: p.name,
            cantidad: p.quantity,
            subtotal: p.total,
            total: "",
          });
        });
        fmo.push({
          cliente: "",
          producto: "",
          cantidad: "",
          subtotal: "",
          total: "",
        });
      });
      return fmo;
    },
    filename() {
      let period = this.$store.state.period;
      let date = this.$store.state.date;
      let string = "Ingresos ";
      if (period == "day") {
        string += moment(date).format("dddd DD MMM");
      } else if (period == "month") {
        string += moment(date).format("MMMM");
      } else {
        string += `${moment(date)
          .startOf(period)
          .format("DD MMM")}  -  ${moment(date)
          .endOf(period)
          .format("DD MMM")}`;
      }
      return (string += ".csv");
    },
  },
  methods: {
    download: function() {
      console.log(this.formattedObjects);
    },
  },
};
</script>
<style scoped>
p {
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;
  margin: 0 auto;
}

p:hover {
  background-color: var(--color-primary);
}

.export-button {
  width: 120px;
  padding: 0px;
  margin: 0 auto;
}
</style>
