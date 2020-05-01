<template>
  <div fluid id="nav-container">
    <b-dropdown
      dropup
      no-caret
      text="Crear"
      offset=""
      toggle-class="nav-dropdown"
      class="m-2 custom-dropdown"
    >
      <b-dropdown-item-button>
        <router-link :to="{ name: 'CreateOrder' }"
          ><b-button variant="secondary" class="nav-btn"
            >Crear Pedidos</b-button
          ></router-link
        >
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'CreateExpense' }"
          ><b-button variant="secondary" class="nav-btn"
            >Crear Gasto</b-button
          ></router-link
        >
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'CreateProduct' }"
          ><b-button variant="secondary" class="nav-btn"
            >Crear Producto</b-button
          ></router-link
        >
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'console' }">console</router-link>
      </b-dropdown-item-button>
    </b-dropdown>

    <b-dropdown
      dropup
      no-caret
      text="Mostrar"
      offset=""
      toggle-class="nav-dropdown"
      class="m-2"
    >
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowOrders' }">
          <b-button variant="secondary" class="nav-btn">Pedidos</b-button>
        </router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowExpenses' }"
          ><b-button variant="secondary" class="nav-btn"
            >Gastos</b-button
          ></router-link
        >
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowCashIn' }"
          ><b-button variant="secondary" class="nav-btn"
            >Ingresos</b-button
          ></router-link
        >
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowCashOut' }"
          ><b-button variant="secondary" class="nav-btn"
            >Egresos</b-button
          ></router-link
        >
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowClients' }"
          ><b-button variant="secondary" class="nav-btn"
            >Clientes</b-button
          ></router-link
        >
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'ShowUnpaid' }">Por Cobrar</router-link>
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
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
a {
  color: var(--color-neutral) !important;
  text-decoration: none !important;
}

@media only screen and (min-width: 768px) {
  .nav-btn {
    width: 165px;
  }
}

@media only screen and (max-width: 768px) {
  .nav-btn {
    width: 165px;
    /* padding-left: 3px;
    padding-right: 3px; */
  }
}

.custom-dropdown {
  background-color: var(--color-primary) !important;
}
/* #nav-container {
  justify-items: start;
  align-items: center;
}

#nav-container > :first-child {
}

ul {
}

li {
  list-style-type: none;
} */
</style>
