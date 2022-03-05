<template>
  <div id="invoice">
    <div id="logo">
      <img alt="Es Alimento logo" src="https://i.imgur.com/oh4fort.png" />
    </div>
    <div id="header">
      <ul>
        <li>ES ALIMENTO SAS</li>
        <li>RUT: 1045676132</li>
        <li>car 73 # 86 - 43</li>
        <li>322 374 4173</li>
      </ul>
    </div>
    <div id="client_info">
      <ul>
        <li>Cliente:</li>
        <li>{{ invoice.client.name }}</li>
        <li>Direccion:</li>
        <li>{{ invoice.client.address }}</li>
        <li>Telefono:</li>
        <li>{{ invoice.client.phone }}</li>
      </ul>
    </div>
    <div id="invoice_info">
      <ul>
        <li>Factura de Venta</li>
        <li>{{ " " }}</li>
        <li>Fecha de Facturacion:</li>
        <li>{{ date }}</li>
      </ul>
    </div>
    <div id="objects">
      <table>
        <tr>
          <!-- <th class="text-left">Entregado</th> -->
          <th class="text-left">Descripcion</th>
          <th class="text-right">Cantidad</th>
          <th class="text-right">Vr Unitario</th>
          <th class="text-right">Vr Total</th>
        </tr>
        <tr v-for="row in invoice.rows" :key="row.index">
          <!-- <td class="text-left">{{ row.date }}</td> -->
          <td class="text-left">{{ row.product }}</td>
          <td class="text-right">{{ row.quantity }}</td>
          <td class="text-right">{{ row.unitPrice }}</td>
          <td class="text-right">{{ row.total }}</td>
        </tr>
      </table>
    </div>
    <div id="footer">Recibe ___________________________</div>
    <div id="totals">
      Total:
      <span>{{ invoice.total }}</span>
    </div>
  </div>
</template>

<script>
import { save, getOneWhere } from "@/firebase";
import moment from "moment";
import numeral from "numeral";
export default {
  name: "PrintOrders",
  props: {
    objects: Array,
  },
  data() {
    return {
      date: moment().format("DD-MM-YYYY"),
      invoice: {
        client: {},
        rows: this.rows,
        total: this.total,
      },
    };
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    rows: function () {
      if (this.objects.length > 0) {
        let rows = [];
        if (this.sameClient(this.selected)) {
          console.log(this.selected);
          let selected = this.selected.map((e) => e.id);
          for (let i = 0; i < selected.length; i++) {
            let object = this.objects.find((e) => e.id == selected[i]);

            let products = object.products;
            for (let j = 0; j < products.length; j++) {
              let index = rows.length;
              rows.push({
                index: index,
                date: moment(object.deliver).format("DD/MM/YYYY"),
                product: products[j].name,
                quantity: parseInt(products[j].quantity),
                unitPrice: numeral(products[j].unitPrice).format("0,0"),
                total: numeral(products[j].total).format("0,0"),
              });
            }
          }
          console.log(rows);
          return this.groupByProduct(rows);
        } else {
          return [{ name: "must be same client" }];
        }
      } else {
        return [];
      }
    },
    total: function () {
      if (this.selected.length > 0) {
        return numeral(
          this.selected.reduce((a, b) => ({
            total: numeral(a.total).value() + numeral(b.total).value(),
          })).total
        ).format("0,0");
      } else {
        return 0;
      }
    },
  },
  methods: {
    sameClient: function (objects) {
      if (objects.length > 0) {
        let client = objects[0].client;
        return (
          objects.map((e) => e.client).filter((e) => e == client).length ==
          objects.length
        );
      } else {
        return false;
      }
    },
    saveInput: function () {
      save("invoices", this.invoice, this);
    },
    groupByProduct: function (rows) {
      let allProducts = [...new Set(rows.map((e) => e.product))];
      let grouped = {};
      console.log(allProducts);
      console.log(rows);
      for (let i = 0; i < allProducts.length; i++) {
        grouped[allProducts[i]] = { unitPrice: 0, total: 0, quantity: 0 };
        for (let k = 0; k < rows.length; k++) {
          if (rows[k].product == allProducts[i]) {
            grouped[rows[k].product].total += numeral(rows[k].total).value();
            grouped[rows[k].product].quantity += numeral(
              rows[k].quantity
            ).value();
          }
        }
      }
      console.log(grouped);
      let g = Object.keys(grouped).map((e, i) => {
        return {
          index: i,
          date: moment().format("DD/MM/YYYY"),
          product: e,
          total: grouped[e].total,
          quantity: grouped[e].quantity,
          unitPrice: grouped[e].total / grouped[e].quantity,
        };
      });
      return g;
    },
    sameProduct: function (obj1, obj2) {
      console.log([obj1, obj2]);
      if (obj1) {
        return obj1.product == obj2.product;
      }
      return false;
    },
    sameUnitPrice: function (obj1, obj2) {
      if (obj1) {
        return obj1.unitPrice == obj2.unitPrice;
      }
      return false;
    },
  },
  watch: {
    selected() {
      if (this.sameClient(this.selected)) {
        getOneWhere("clients", "name", this.selected[0].client).then((c) => {
          this.invoice.client = c;
          this.invoice.rows = this.rows;
          this.invoice.total = this.total;
        });
      }
    },
  },
};
</script>
<style scoped>
.text-left {
  text-align: start;
}

.text-right {
  text-align: right;
}

#page {
  font-family: "Courier New", Courier, monospace;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: left;
  margin: 2cm 4cm 2cm 4cm;
  padding-bottom: 1cm;
  border-bottom: 1px solid black;
}

ul {
  list-style-type: none;
  text-align: left;
}

#logo {
  justify-self: end;
}

#logo img {
  height: 3cm;
}

#header ul {
  margin-top: 15px;
}

#client_info ul,
#invoice_info ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#client_info ul :nth-child(2) {
  text-transform: capitalize;
}

#client_info,
#invoice_info {
  width: 100%;
  border-top: 1px solid black;
  padding-top: 0.4cm;
  margin-top: 1cm;
}

#objects {
  width: 100%;
  grid-column: span 2;
  border-top: 1px dashed black;
  border-bottom: 1px dashed black;
  padding-top: 0.4cm;
  padding-bottom: 0.4cm;
}

#objects table {
  width: 100%;
}

#totals {
  margin-top: 2cm;
  justify-self: end;
}

#footer {
  margin-top: 2cm;
}

#totals span {
  margin-left: 6px;
}
</style>
