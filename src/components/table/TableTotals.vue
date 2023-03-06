<template>
  <p v-if="this.selected.length == 0" id="tableTotals">
    Venta: {{ total[1] }} <br />Domicilio: {{ total[2] }} <br />
    Total: {{ total[0] }}
  </p>
  <p v-else id="tableTotals">Venta: {{ total[0] }}</p>
</template>
<script>
import numeral from "numeral";
export default {
  name: "TableTotals",
  props: {
    objects: Array,
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    total: function () {
      if (this.objects.length > 0) {
        if (this.selected.length == 0) {
          let total = this.objects.reduce((a, b) => ({
            total: parseInt(a.total) + parseInt(b.total),
          })).total;

          let productSales = 0;
          let deliveryIncome = 0;
          for (let i = 0; i < this.objects.length; i++) {
            const element = this.objects[i];
            let products = element.products;
            for (let j = 0; j < products.length; j++) {
              let product = products[j];
              if (product.code == "000001") {
                deliveryIncome += parseInt(product.total);
              } else {
                productSales += parseInt(product.total);
              }
            }
          }
          numeral(productSales).format("0,0");
          return [
            numeral(total).format("0,0"),
            numeral(productSales).format("0,0"),
            numeral(deliveryIncome).format("0,0"),
          ];
        } else {
          let total = 0;
          console.log(this.selected);
          this.selected.forEach((e) => {
            if (parseInt(e.total) > 0) {
              total =
                total + numeral(e.total.slice(0, -1)).multiply(1000).value();
            }
          });
          return [numeral(total).format("0,0")];
        }
      } else {
        return ["-", "-", "-"];
      }
    },
  },
};
</script>
<style scoped>
#tableTotals {
  font-weight: bold;
}
</style>
