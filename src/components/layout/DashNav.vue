<template>
  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'table', params: routes[0].params}">{{routes[0].title}}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'table', params: routes[1].params}">{{routes[1].title}}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'table', params: routes[2].params}">{{routes[2].title}}</router-link>
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
    <div></div>
  </div>
</template>
<script>
export default {
  name: "DashNav",
  data: function() {
    return {
      routes: [
        {
          name: "table",
          path: "/dashboard/table",
          params: { sheet: "orders" },
          title: "Pedidos"
        },
        {
          name: "table",
          path: "/dashboard/table",
          params: { sheet: "expenses" },
          title: "Gastos"
        },
        {
          name: "table",
          path: "/dashboard/table",
          params: { sheet: "clients" },
          title: "Clientes"
        }
      ]
    };
  }
};
</script>
<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;
  grid-gap: 5px;
}

li {
  text-align: left;
}
</style>