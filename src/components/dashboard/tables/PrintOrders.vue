<template>
  <div id="print">
    <div id="logo"></div>
    <div id="info">
      <h1>Cuenta de Cobro</h1>
      <br />
      <h1>{{ objects }}</h1>
      <h1>NIT:901909839-9</h1>
      <br />
      <h1>Debe A:</h1>
      <br />
      <h1>ESTEBAN SALGADO</h1>
      <h1>CC: 1045676132</h1>
      <br />
      <h1>La suma de $ONE MILLION DOLLARS</h1>
    </div>
    <div id="content">
      <ul>
        <li>con</li>
        <li>nora</li>
        <li>jones</li>
      </ul>
    </div>
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
</style>