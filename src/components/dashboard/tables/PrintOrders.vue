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
        <li>cliente:</li>
        <li>{{objects[0]}}</li>
        <li>id:</li>
        <li>12.231.223</li>
        <li>direccion:</li>
        <li>cra 55 # 82 - 14</li>
        <li>telefono:</li>
        <li>231 342 6432</li>
      </ul>
    </div>
    <div id="invoice_info">
      <ul>
        <li>Factura de Venta</li>
        <li>.</li>
        <li>Fecha:</li>
        <li>06-12-2019</li>
        <li>Numero:</li>
        <li>P-15-124</li>
      </ul>
    </div>
    <div id="objects">
      <table>
        <tr>
          <th class="text-left">No. Pedido</th>
          <th class="text-left">Descripcion</th>
          <th class="text-right">Cantidad</th>
          <th class="text-right">Vr Unitario</th>
          <th class="text-right">Vr Total</th>
        </tr>
        <!-- <tr>
          <td class="text-left">{{objects[0].name}}</td>
          <td class="text-left">{{objects[0].products}}</td>
          <td class="text-right">{{objects[0].quantity}}</td>
          <td class="text-right">{{objects[0].total}}</td>
          <td class="text-right">{{objects[0].total}}</td>
        </tr>-->
      </table>
    </div>
    <div id="footer">footer</div>
    <div id="totals">totals</div>
  </div>
</template>

<script>
export default {
  name: "PrintOrders",
  props: {
    objects: Array
  },
  data() {
    return {};
  },
  methods: {}
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: left;
  margin: 2cm 4cm 2cm 4cm;
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
  border-top: 2px solid black;
  padding-top: 0.4cm;
  margin-top: 1cm;
}

#objects {
  width: 100%;
  grid-column: span 2;

  border-top: 3px double white;
}

#objects table {
  width: 100%;
}
</style>