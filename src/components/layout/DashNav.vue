<template>
  <div id="container">
    <b-dropdown dropup no-caret text="+" offset="-60" toggle-class="nav-dropdown" class="m-2">
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ordersForm' }">{{routes[2].title}}</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'newform' }">new Form</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link to="/dashboard">dashboard</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link to="/">home</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link to="/about">about</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link to="/dashboard/console">console</router-link>
      </b-dropdown-item-button>
    </b-dropdown>
    <b-dropdown dropup no-caret text="=" offset="-60" toggle-class="nav-dropdown" class="m-2">
      <b-dropdown-item-button>
        <router-link :to="{ name: 'pedidos'}">Pedidos</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'gastos'}">Gastos</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'clientes'}">Clientes</router-link>
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
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
#container {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  justify-items: start;
  align-items: center;
  grid-gap: 20px;
}

#container > :first-child {
  justify-self: end;
}

a {
  color: var(--color-primary) !important;
  text-decoration: none !important;
}

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