<template>
  <div id="page">
    <div v-for="order in orders" :key="order.index" class="row">
      <p class="box orden">orden</p>
      <p class="name">{{ order.client }}</p>
      <p class="address">{{ order.address }}</p>
      <p>{{ order.method }}</p>
      <p class="box bolsas"># bolsas</p>
      <p class="comment">{{ order.comment }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintDelivery",
  props: {
    orders: Array,
  },
};
</script>

<style scoped>
#page {
  margin: 2cm 1cm 2cm 1cm;
  padding-bottom: 1cm;
}
.row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-top: 1px solid black;
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding: 0.2cm;
}

.row:last-child {
  border-bottom: 1px solid black;
}

.row p {
  margin: 0px;
}

.box {
  height: 2cm;
  width: 3cm;
  border-right: 1px solid black;
  border-left: 1px solid black;
  justify-self: center;
  display: table-cell;
  vertical-align: bottom;
}

.name {
  text-transform: capitalize;
  grid-row: span 2;
}

.box {
  grid-row: span 2;
}

.address,
.comment {
  grid-column: span 2;
}

.address {
  border-bottom: 1px solid gray;
}
</style>