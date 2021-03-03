vue<template>
  <div>
    <!-- <p @click="download">test</p> -->
    <download-csv
      class="btn btn-default export-button"
      :data="formattedObjects"
      :name="filename"
    >
      <p>Exportar por Cliente</p>
    </download-csv>
  </div>
</template>
<script>
import moment from "moment";
import { getOneWhere } from "@/firebase";
import _ from "lodash";
export default {
  name: "ButtonExportOrdersByClient",
  props: {
    objects: Array,
  },
  data() {
    return {
      formattedObjects: [],
      emails: {},
    };
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    formatObjects() {
      let fmo = [];
      let objs = _.orderBy(this.objects, "client");
      objs.forEach((e) => {
        fmo.push({
          cliente: e.client,
          fecha: e.date.split("T")[0],
          metodo: e.paymentMethod,
          productos: e.products.filter((j) => {
            return j.name !== "domicilio";
          }).length,
          domicilio:
            e.products.filter((j) => {
              return j.name == "domicilio";
            }).length >= 1
              ? "si"
              : "no",
          total: e.total,
        });

        // e.products.forEach((p) => {
        //   fmo.push({
        //     cliente: "",
        //     fecha: "",
        //     metodo: "",
        //     productos: p.name,
        //     domicilio: "",
        //     total: p.total,
        //   });
        // });
        // fmo.push({
        //   cliente: "",
        //   correo: "",
        //   cedula: "",
        //   direccion: "",
        //   telefono: "",
        //   producto: "",
        //   cantidad: "",
        //   subtotal: "",
        //   total: "",
        // });
      });
      return fmo;
    },
    filename() {
      let period = this.$store.state.period;
      let date = this.$store.state.date;
      let string = "Venta por Cliente ";
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
      console.log(this.emails);
      console.log(this.formattedObjects);
    },
  },
  watch: {
    formatObjects() {
      this.formattedObjects = this.formatObjects;
      this.formattedObjects.forEach(
        function(e) {
          if (e.cliente !== "") {
            getOneWhere("clients", "name", e.cliente).then((client) => {
              if (client) {
                this.emails[client.name] = client.email;
                e.correo = client.email;
                e.cedula = client.cc;
                e.direccion = client.address;
                e.telefono = client.phone;
              }
            });
          }
        }.bind(this)
      );
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
  width: 220px;
  padding: 0px;
  margin: 0 auto;
}
</style>
