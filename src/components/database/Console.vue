<template>
  <div>
    <button @click="importOrders()" class="btn btn-danger">import orders</button>
    <button @click="importDatabase()" class="btn btn-danger">import rest of database</button>
  </div>
</template>
<script>
import { database } from "../../firebase";
export default {
  name: "Console",
  methods: {
    importDatabase: function() {
      let nodes = ["expenses", "products", "clients"];
      nodes.forEach(node => {
        database
          .ref("devAccount")
          .child(node)
          .once("value")
          .then(function(snapshot) {
            let objs = snapshot.val();
            return objs;
          })
          .then(objs => {
            console.log(objs);
            for (let i = 0; i < Object.keys(objs).length; i++) {
              let obj = objs[Object.keys(objs)[i]];
              delete obj.id;
              database.ref(`esalimento/${node}`).push(obj);
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
        .then(objs => {
          let orders = [];
          for (let i = 0; i < Object.keys(objs).length; i++) {
            let co = objs[Object.keys(objs)[i]];
            let new_order = {
              name: "P-19-" + orders.length + 1,
              client: co.client,
              comment: co.comment,
              lastModified: co.lastModified,
              paid: co.paid,
              date: co.produced,
              products: [
                {
                  name: co.product,
                  quantity: parseInt(co.quantity),
                  unitPrice: parseInt(co.unitPrice),
                  total: parseInt(co.total)
                }
              ],
              total: parseInt(co.total)
            };
            let last_order = orders[orders.length - 1];
            if (
              last_order &&
              last_order.client == co.client &&
              last_order.date == co.produced
            ) {
              last_order.products.push({
                name: co.product,
                quantity: parseInt(co.quantity),
                unitPrice: parseInt(co.unitPrice),
                total: parseInt(co.total)
              });
              let lo = parseInt(last_order.total);
              let cot = parseInt(co.total);
              last_order.total = lo += cot;
            } else {
              orders.push(new_order);
            }
          }
          orders.map(e => {
            database.ref(`esalimento/orders`).push(e);
          });
        });
    }
  }
};
</script>
<style scoped>
button {
  margin: 15px;
}
</style>