<template>
  <div>
    <button @click="importDatabase()" class="btn btn-danger">import database</button>
    <button @click="importOrders()" class="btn btn-danger">import orders</button>
  </div>
</template>
<script>
import db from "../../firebase";
export default {
  name: "Console",
  methods: {
    importDatabase: function() {
      let nodes = ["expenses", "products", "clients"];
      nodes.forEach(node => {
        db.ref("")
          .child(node)
          .once("value")
          .then(function(snapshot) {
            let objs = snapshot.val();
            return objs;
          })
          .then(objs => {
            for (let i = 0; i < Object.keys(objs).length; i++) {
              let obj = objs[Object.keys(objs)[i]];
              delete obj.id;
              db.ref(`backup/${node}`).push(obj);
            }
          });
      });
    },
    importOrders: function() {
      db.ref("")
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
              client: co.client,
              comment: co.comment,
              lastModified: co.lastModified,
              paid: co.paid,
              date: co.produced,
              products: [
                {
                  name: co.product,
                  quantity: co.quantity,
                  unitPrice: co.unitPrice,
                  total: co.total
                }
              ],
              total: co.total
            };
            let last_order = orders[orders.length - 1];
            if (
              last_order &&
              last_order.client == co.client &&
              last_order.date == co.produced
            ) {
              last_order.products.push({
                name: co.product,
                quantity: co.quantity,
                unitPrice: co.unitPrice,
                total: co.total
              });
              last_order.total = last_order.total += co.total;
            } else {
              orders.push(new_order);
            }
          }
          orders.map(e => {
            db.ref(`esalimento/orders`).push(e);
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