<template>
  <b-container fluid id="nav-container">
    <b-dropdown
      dropup
      no-caret
      text="Crear"
      offset="-94"
      toggle-class="nav-dropdown"
      class="m-2"
    >
      <b-dropdown-item-button>
        <router-link :to="{ name: 'CreateOrder' }">crear pedido</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'CreateExpense' }">crear gasto</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'console' }">console</router-link>
      </b-dropdown-item-button>
    </b-dropdown>

    <b-dropdown
      dropup
      no-caret
      text="Mostrar"
      offset="0"
      toggle-class="nav-dropdown"
      class="m-2"
    >
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowOrders' }">Pedidos</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowExpenses' }">Gastos</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'clientes' }">Clientes</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowUnpaid' }">Por Cobrar</router-link>
      </b-dropdown-item-button>
    </b-dropdown>
  </b-container>
</template>
<script>
export default {
  name: "Navigation",
  data: function() {
    return {};
  },
};
</script>
<style scoped>
/* #nav-container {
  justify-items: start;
  align-items: center;
}

#nav-container > :first-child {
}

a {
  color: var(--color-primary) !important;
  text-decoration: none !important;
}

ul {
}

li {
  list-style-type: none;
} */
</style>
