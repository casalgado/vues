<template>
  <ul>
    <li>
      <router-link :to="{ name: 'pedidos'}">Pedidos</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'gastos'}">Gastos</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'ordersForm' }">{{routes[2].title}}</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'newform' }">new Form</router-link>
    </li>
    <li>
      <router-link to="/dashboard">dashboard</router-link>
    </li>
    <li>
      <router-link to="/">home</router-link>
    </li>
    <li>
      <router-link to="/about">about</router-link>
    </li>
    <li>
      <router-link to="/dashboard/console">console</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "DashNav",
  data: function() {
    return {
      routes: [
        {
          name: "ordersTable",
          path: "/dashboard/table/orders",
          params: { sheet: "orders" },
          title: "Orders"
        },
        {
          name: "expensesTable",
          path: "/dashboard/table/expenses",
          params: { sheet: "expenses" },
          title: "Gastos"
        },
        {
          name: "form",
          path: "/form",
          title: "Form"
        },
        {
          name: "neworder",
          path: "/dashboard/table/orders/neworder",
          title: "neworder"
        }
      ]
    };
  }
};
</script>
<style scoped>
ul {
  width: 99vw;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  padding: 5px;
  grid-gap: 5px;
}

li {
  list-style-type: none;
}
</style>