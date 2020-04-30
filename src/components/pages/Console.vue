<template>
  <div>
    <button @click="importOrders()" class="btn btn-danger">
      import orders
    </button>
    <button @click="importDatabase()" class="btn btn-danger">
      import rest of database
    </button>
    <button @click="testUser()" class="btn btn-info">test user</button>
    <p>{{ this.sanitize("medio pan masa madre") }}</p>
  </div>
</template>
<script>
import { database } from "@/firebase";
import { mapState } from "vuex";

export default {
  name: "Console",
  methods: {
    testUser: function() {
      database
        .ref(`users/${this.uid}`)
        .once("value")
        .then(function(snapshot) {
          alert(snapshot.key);
        });
    },
    importDatabase: function() {
      let nodes = ["expenses", "clients"];
      nodes.forEach((node) => {
        database
          .ref("devAccount")
          .child(node)
          .once("value")
          .then(function(snapshot) {
            let objs = snapshot.val();
            return objs;
          })
          .then((objs) => {
            console.log(objs);
            for (let i = 0; i < Object.keys(objs).length; i++) {
              let obj = objs[Object.keys(objs)[i]];
              delete obj.id;
              database.ref(`esalimento/${node}`).push(obj);
            }
            if (node == "expenses") {
              let providers = [];
              for (let i = 0; i < Object.keys(objs).length; i++) {
                let obj = objs[Object.keys(objs)[i]];
                let provider = obj.provider;
                if (!providers.includes(provider)) {
                  providers.push(provider);
                  database.ref(`esalimento/providers`).push({ name: provider });
                }
              }
              let categories = [];
              for (let i = 0; i < Object.keys(objs).length; i++) {
                let obj = objs[Object.keys(objs)[i]];
                let category = obj.category;
                if (!categories.includes(category)) {
                  categories.push(category);
                  database
                    .ref(`esalimento/categories`)
                    .push({ name: category });
                }
              }
            }
          });
      });
    },
    importOrders: function() {
      database
        .ref("devAccount")
        .child("orders")
        .once("value")
        .then(function(snapshot) {
          let objs = snapshot.val();
          return objs;
        })
        .then((objs) => {
          let orders = [];
          for (let i = 0; i < Object.keys(objs).length; i++) {
            // co stands for current object or current order
            let co = objs[Object.keys(objs)[i]];
            let new_order = {
              name: "P-" + this.zeroPad(orders.length + 1, 3),
              client: co.client,
              comment: co.comment,
              lastModified: co.lastModified,
              paid: co.paid,
              invoice: "",
              date: co.produced,
              deliver: co.delivered,
              products: [
                {
                  name: this.sanitize(co.product),
                  quantity: parseInt(co.quantity),
                  unitPrice: parseInt(co.unitPrice),
                  total: parseInt(co.total),
                },
              ],
              total: parseInt(co.total),
            };
            let last_order = orders[orders.length - 1];
            if (
              last_order &&
              last_order.client == co.client &&
              last_order.date == co.produced
            ) {
              last_order.products.push({
                name: this.sanitize(co.product),
                quantity: parseInt(co.quantity),
                unitPrice: parseInt(co.unitPrice),
                total: parseInt(co.total),
              });
              let lo = parseInt(last_order.total);
              let cot = parseInt(co.total);
              last_order.total = lo += cot;
            } else {
              orders.push(new_order);
            }
          }
          orders.map((e) => {
            database.ref(`esalimento/orders`).push(e);
          });
          let products = [];
          for (let i = 0; i < Object.keys(objs).length; i++) {
            let obj = objs[Object.keys(objs)[i]];
            let product = this.sanitize(obj.product);
            if (!products.includes(product)) {
              products.push(product);
              database.ref(`esalimento/products`).push({ name: product });
            }
          }
          console.log(products.sort());
        });
    },
    sanitize: function(string) {
      string = string.trim();
      "pan de masa madre integral" == string ? (string = "pan integral") : null;
      "pan de integral pequeño" == string
        ? (string = "pan integral pequeño")
        : null;
      "pan integral y avena grande" == string
        ? (string = "pan integral")
        : null;
      "pan integral con avena  pequeño" == string
        ? (string = "pan integral pequeño")
        : null;
      "pan de uva integral" == string ? (string = "pan integral de uva") : null;
      "pan de masa madre pequeño integral" == string
        ? (string = "pan integral pequeño")
        : null;
      "pan de masa madre integral pequeño" == string
        ? (string = "pan integral pequeño")
        : null;
      "pan de masa madre integral  pequeño" == string
        ? (string = "pan integral pequeño")
        : null;
      "pan de masa madre integral y avena" == string
        ? (string = "pan integral")
        : null;
      "pan de masa madre original pequeño" == string
        ? (string = "pan de masa madre pequeño")
        : null;
      "pan de masa madre queso grande" == string
        ? (string = "pan de queso costeño")
        : null;
      "pan de masa madre queso pequeño" == string
        ? (string = "pan de queso costeño pequeño")
        : null;
      "pan de masa madre semillas" == string
        ? (string = "pan de semillas")
        : null;
      "pan de masa madre uva pequeño" == string
        ? (string = "pan de uva pequeño")
        : null;
      "pan de masa madre zaatar" == string ? (string = "pan de zaatar") : null;
      "pan de masa madre y zaatar" == string
        ? (string = "pan de zaatar")
        : null;
      "pan de masa madre zaatar grande" == string
        ? (string = "pan de zaatar")
        : null;
      "pan de masa madre zaatar pequeño" == string
        ? (string = "pan de zaatar pequeño")
        : null;
      "pan de masa madre zaatar pequeño grande" == string
        ? (string = "pan de zaatar pequeño")
        : null;
      "pan de uva fermentada" == string ? (string = "pan de uva") : null;
      "pan de zaatar grande" == string ? (string = "pan de zaatar") : null;
      "pan pequeño zatar" == string ? (string = "pan de zaatar pequeño") : null;
      "pan de zatar grande" == string ? (string = "pan de zaatar") : null;
      "pan de zatar" == string ? (string = "pan de zaatar") : null;
      "pan de masa madre de zatar pequeño" == string
        ? (string = "pan de zaatar pequeño")
        : null;
      "pan integral con avena" == string ? (string = "pan integral") : null;
      "pan integral y avena" == string ? (string = "pan integral") : null;
      "pan integral y avena pequeño" == string
        ? (string = "pan integral")
        : null;
      "pan pequeño integral" == string
        ? (string = "pan integral pequeño")
        : null;
      "pan pequeño uva fermentada" == string
        ? (string = "pan de uva pequeño")
        : null;
      "pan de uva fermentada pequeño" == string
        ? (string = "pan de uva pequeño")
        : null;
      "pan uva pequeño" == string ? (string = "pan de uva pequeño") : null;
      "pan zaatar pequeño" == string
        ? (string = "pan de zaatar pequeño")
        : null;
      "pan masa madre de zatar pequeño" == string
        ? (string = "pan de zaatar pequeño")
        : null;
      "pan pequeño zaatar" == string
        ? (string = "pan de zaatar pequeño")
        : null;
      "panes de hamburguesa" == string ? (string = "pan de hamburguesa") : null;
      "pan de hamburgesa" == string ? (string = "pan de hamburguesa") : null;
      "panes de hamburguesa 80gr" == string
        ? (string = "pan de hamburguesa")
        : null;
      "panes de hamburguesa 90gr" == string
        ? (string = "pan de hamburguesa")
        : null;
      "panes hamburguesa" == string ? (string = "pan de hamburguesa") : null;
      "tora de zanahoria" == string ? (string = "torta de zanahoria") : null;
      "torta de banao" == string ? (string = "torta de pan con banano") : null;
      "torta de banano" == string ? (string = "torta de pan con banano") : null;
      "torta de pan y  banano" == string
        ? (string = "torta de pan con banano")
        : null;
      "torta de pan y banano" == string
        ? (string = "torta de pan con banano")
        : null;
      "domicilio reembolsable" == string ? (string = "domicilio") : null;
      "domicilo" == string ? (string = "domicilio") : null;
      "domicilio diepa" == string ? (string = "domicilio") : null;
      "domicilo diepa" == string ? (string = "domicilio") : null;
      "domicilo henao" == string ? (string = "domicilio") : null;
      "domicilio henao" == string ? (string = "domicilio") : null;
      "domi reembolsable" == string ? (string = "domicilio") : null;
      "fermento" == string ? (string = "fermento de pimenton") : null;
      "salsa de pimentones fermentado" == string
        ? (string = "fermento de pimenton")
        : null;
      "medio pan de masa madre" == string
        ? (string = "pan de masa madre pequeño")
        : null;
      "medio pan masa madre" == string
        ? (string = "pan de masa madre pequeño")
        : null;
      "pan de masa madre costeño" == string
        ? (string = "pan de queso costeño")
        : null;
      "pan pequeño queso" == string
        ? (string = "pan de queso costeño pequeño")
        : null;
      "pan de queso costeno" == string
        ? (string = "pan de queso costeño")
        : null;
      "pan de queso costeño" == string
        ? (string = "pan de queso costeño")
        : null;
      "pan de masa madre costeño pequeño" == string
        ? (string = "pan de queso costeño pequeño")
        : null;
      "pan de masa madre de queso pequeño" == string
        ? (string = "pan de queso costeño pequeño")
        : null;
      "pan de masa madre original" == string
        ? (string = "pan de masa madre")
        : null;
      "paquete de pan de bono" == string
        ? (string = "pan de bono paquete")
        : null;
      "torta de chia" == string ? (string = "torta de naranja") : null;
      "briosh" == string ? (string = "brioche") : null;
      "brioshe" == string ? (string = "brioche") : null;
      "pan de hamburguesa 80 gr" == string
        ? (string = "pan de hamburguesa")
        : null;
      "pan de hamburguesa 90gr" == string
        ? (string = "pan de hamburguesa")
        : null;

      return string;
    },
    zeroPad: function(value, digits) {
      var zeroes = new Array(digits).join("0");
      return (zeroes + value).slice(-digits);
    },
  },
  computed: mapState(["uid"]),
};
</script>
<style scoped>
button {
  margin: 15px;
}
</style>
