<template>
  <div>
    <button class="btn btn-info" @click="e">encrypt</button>
    {{ products }}
  </div>
</template>
<script>
import { ref } from "@/firebaseInit";
import { getAll, update, getAllWhere } from "@/firebaseMethods";
import product_codes from "../../lib/product_codes";
export default {
  name: "Console",
  data() {
    return {
      products: [],
      orders: [],
    };
  },
  methods: {
    addProductCodesToProducts: function () {
      getAll(ref, "products").then((e) => {
        this.products = e;
        for (let i = 0; i < e.length; i++) {
          console.log(e[i]);
          let code;
          let product_object = product_codes.filter(
            (element) => element.name == e[i].name
          )[0];
          if (product_object) {
            code = product_object.codigo;
            update(ref, `products/${e[i].id}`, { code: code });
          }
        }
      });
    },
    addProductCodesToProductsinMemberships: function () {
      getAll(ref, "memberships").then((e) => {
        for (let i = 0; i < e.length; i++) {
          const m = e[i];
          console.log(e[i].id);
          let orders = Object.keys(m.plan);
          for (let j = 0; j < orders.length; j++) {
            const products = m.plan[orders[j]];
            for (let k = 0; k < products.length; k++) {
              let code;
              let product_object = product_codes.filter(
                (element) => element.name == products[k].name
              )[0];
              console.log(product_object);
              if (product_object) {
                code = product_object.codigo;
              } else {
                this.products.push(products[k].name);
                code = "";
              }
              products[k].code = code;
            }
          }
          console.log(m.plan);
          update(ref, `memberships/${m.id}`, { plan: m.plan });
        }
        // this.products = e;
        // for (let i = 0; i < e.length; i++) {
        //   console.log(e[i]);
        //   let code;
        //   let product_object = product_codes.filter(
        //     (element) => element.name == e[i].name
        //   )[0];
        //   if (product_object) {
        //     code = product_object.codigo;
        //     update(ref, `products/${e[i].id}`, { code: code });
        //   }
        // }
      });
    },
    addProductCodesToOrders: function () {
      getAll(ref, "orders").then((e) => {
        this.orders = e;
        for (let i = 0; i < e.length; i++) {
          let products = e[i].products;
          console.log(e[i]);
          for (let k = 0; k < products.length; k++) {
            let code;
            let product_object = product_codes.filter(
              (element) => element.name == products[k].name
            )[0];
            console.log(product_object);
            if (product_object) {
              code = product_object.codigo;
            } else {
              this.products.push(products[k].name);
              code = "";
            }
            products[k].code = code;
          }
          update(ref, `orders/${e[i].id}`, { products: products });
        }
      });
    },
    addProductCodesToProductsinElDiario: function () {
      getAllWhere(ref, "orders", "client", "el diario cafe").then((e) => {
        for (let i = 0; i < e.length; i++) {
          let products = e[i].products;
          for (let k = 0; k < products.length; k++) {
            let code;
            let product_object = product_codes.filter(
              (element) => element.name == products[k].name
            )[0];
            if (product_object) {
              code = product_object.codigo;
            } else {
              this.products.push(products[k].name);
              code = "";
            }
            products[k].code = code;
          }
          console.log(products);
          update(ref, `orders/${e[i].id}`, { products: products });
        }
      });
    },
    encryptClientNames: function () {
      // getAll(ref, "clients").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     update(ref, `clients/${e[i].id}`, { name: this.encrypt(e[i].name) });
      //   }
      // });
      // let clients_each_name;
      // getAll(ref, "memberships").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     update(ref, `memberships/${e[i].id}`, {
      //       clientName: this.encrypt(e[i].clientName),
      //     });
      //   }
      // });
      // getAll(ref, "orders").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     update(ref, `orders/${e[i].id}`, {
      //       client: this.encrypt(e[i].client),
      //     });
      //   }
      // });
      // getAll(ref, "optionsForMenus/clients").then((e) => {
      //   for (let i = 0; i < e.length; i++) {
      //     console.log(`optionsForMenus/clients/${e[i].name}`);
      //     update(ref, `optionsForMenus/clients/${e[i].id}`, {
      //       name: this.encrypt(e[i].name),
      //     });
      //   }
      // });
      // let memberships_each_clientName;
      // let optionsForMenus_clients_each_name;
      // let orders_each_client;
    },
    encrypt: function (str) {
      var alphabet = [
        "k",
        "n",
        "y",
        "e",
        "i",
        "z",
        "a",
        "p",
        "g",
        "ú",
        "v",
        "j",
        "h",
        "á",
        "l",
        "s",
        "u",
        "ñ",
        "é",
        "t",
        "f",
        "r",
        "q",
        "w",
        "c",
        "d",
        "m",
        "o",
        "b",
        "í",
        "x",
        "ó",
      ];
      let result = [];
      for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
          if (str[i] === alphabet[j]) {
            result.push(alphabet[(j + 9) % alphabet.length]);
          }
        }
      }

      return result.join("");
    },
  },
  mounted() {},
};
</script>
<style scoped>
button {
  margin: 15px;
}
</style>
