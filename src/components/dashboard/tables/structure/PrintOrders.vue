<template>
  <div id="page">
    <div id="logo">
      <img alt="Es Alimento logo" src="https://i.imgur.com/oh4fort.png" />
    </div>
    <div id="header">
      <ul>
        <li>ES ALIMENTO SAS</li>
        <li>NIT: 983-291881-1</li>
        <li>cra 52 # 79 - 253</li>
      </ul>
    </div>
    <div id="client_info">
      <ul>
        <li>Cliente:</li>
        <li>{{invoice.client}}</li>
        <li>Id:</li>
        <li>12.231.223</li>
        <li>Direccion:</li>
        <li>Cra 55 # 82 - 14</li>
        <li>Telefono:</li>
        <li>231 342 6432</li>
      </ul>
    </div>
    <div id="invoice_info">
      <ul>
        <li>Factura de Venta</li>
        <li>.</li>
        <li>Fecha:</li>
        <li>{{date}}</li>
        <li>Numero:</li>
        <li>P-15-124</li>
      </ul>
    </div>
    <div id="objects">
      <table>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Descripcion</th>
          <th class="text-right">Cantidad</th>
          <th class="text-right">Vr Unitario</th>
          <th class="text-right">Vr Total</th>
        </tr>
        <tr v-for="row in invoice.rows" :key="row.index">
          <td class="text-left">{{ row.name}}</td>
          <td class="text-left">{{ row.product}}</td>
          <td class="text-right">{{row.quantity}}</td>
          <td class="text-right">{{row.unitPrice}}</td>
          <td class="text-right">{{row.total}}</td>
        </tr>
      </table>
    </div>
    <div id="footer">Recibe ___________________________</div>
    <div id="totals">
      Total:
      <span>{{invoice.total}}</span>
    </div>
  </div>
</template>

<script>
import { save } from "../../../../firebase";
import moment from "moment";
export default {
  name: "PrintOrders",
  props: {
    objects: Array
  },
  data() {
    return {
      date: moment().format("DD-MM-YYYY")
    };
  },
  methods: {
    sameClient: function(objects) {
      if (objects.length > 0) {
        let client = objects[0].client;
        return (
          objects.map(e => e.client).filter(e => e == client).length ==
          objects.length
        );
      } else {
        return false;
      }
    },
    saveInput: function() {
      console.log(this.invoice);
      save("invoices", this.invoice);
    }
  },
  computed: {
    selected() {
      return this.$store.state.selected;
    },
    rows: function() {
      if (this.objects.length > 0) {
        let rows = [];
        if (this.sameClient(this.selected)) {
          let selected = this.selected.map(e => e.name);
          for (let i = 0; i < selected.length; i++) {
            let object = this.objects.find(e => e.name == selected[i]);
            let products = object.products;
            for (let j = 0; j < products.length; j++) {
              let index = rows.length;
              rows.push({
                index: index,
                name: object.name,
                product: products[j].name,
                quantity: products[j].quantity,
                unitPrice: products[j].unitPrice,
                total: products[j].total
              });
            }
          }
          return rows;
        } else {
          return [{ name: "must be same client" }];
        }
      } else {
        return [];
      }
    },
    total: function() {
      if (this.selected.length > 0) {
        return (
          this.selected
            .map(e => parseFloat(e.total.slice(0, -1)))
            .reduce((a, b) => a + b) * 1000
        );
      } else {
        return 0;
      }
    },
    invoice: function() {
      return {
        client: "el caminante",
        rows: this.rows,
        total: this.total
      };
    }
  }
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