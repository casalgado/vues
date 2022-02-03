<template>
  <div id="page">
    <div class="row" v-for="(p, i) in sortedCodes(arrayOfCodes)" :key="i">
      <p>{{ go(p).name }}</p>
      <p>{{ go(p).quantity }}</p>
      <p>{{ getWeight(p) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintProduction",
  props: {
    orders: Array,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    groupByCode: function () {
      let products = this.products;
      let grouped = {};
      let included = [];
      for (let i = 0; i < products.length; i++) {
        if (!products[i].code) {
          products[i].code = i;
        }
        if (included.includes(products[i].code)) {
          grouped[products[i].code].quantity =
            parseInt(grouped[products[i].code].quantity) +
            parseInt(products[i].quantity);
        } else {
          included.push(products[i].code);
          grouped[products[i].code] = {
            name: products[i].name,
            quantity: products[i].quantity,
          };
        }
      }
      delete grouped["000001"];
      return grouped;
    },
    arrayOfCodes: function () {
      return Object.keys(this.groupByCode);
    },
  },
  methods: {
    go: function (code) {
      return this.groupByCode[code];
    },
    productList: function () {
      let products = [];
      this.orders.forEach((e) => {
        e.products.forEach((p) => {
          products.push(p);
        });
      });
      this.products = products;
    },
    getCategory: function (code_string) {
      return code_string[0] + code_string[1];
    },
    getFlavor: function (code_string) {
      return code_string[2] + code_string[3];
    },
    getFlour: function (code_string) {
      return code_string[4];
    },
    getSize: function (code_string) {
      return code_string[5];
    },
    sortedCodes: function (array) {
      return array
        .sort((a, b) => (this.getSize(a) > this.getSize(b) ? -1 : 1))
        .sort((a, b) => (this.getFlour(a) > this.getFlour(b) ? 1 : -1))
        .sort((a, b) => (this.getFlavor(a) > this.getFlavor(b) ? -1 : 1))
        .sort((a, b) => (this.getCategory(a) > this.getCategory(b) ? 1 : -1));
    },
    getWeight: function (code_string) {
      let unitWeight;
      if (this.getCategory(code_string) == "01") {
        switch (this.getSize(code_string)) {
          case "3":
            unitWeight = 1000;
            break;
          case "2":
            unitWeight = 500;
            break;
          case "1":
            unitWeight = 250;
            break;

          default:
            break;
        }
        console.log(this.go(code_string).quantity);
        return `${unitWeight * this.go(code_string).quantity}g`;
      } else {
        return "";
      }
    },
  },
  watch: {
    orders: function () {
      this.productList();
    },
  },
};
</script>

<style scoped>
#page {
  margin: 2cm 1cm 2cm 1cm;
  padding-bottom: 2cm;
  font-size: 1.2em;
}

.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid black;
  height: 2cm;
}

.row:last-child {
  border-bottom: 1px solid black;
}

.row p {
  text-align: left;
  padding-left: 10px;
}
</style>