<template>
  <div id="container">
    <b-dropdown dropup no-caret text="+" offset="-60" toggle-class="nav-dropdown" class="m-2">
      <b-dropdown-item-button>
        <router-link :to="{ name: 'crearPedido' }">crear pedido</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link :to="{ name: 'nuevoGasto' }">crear gasto</router-link>
      </b-dropdown-item-button>
      <b-dropdown-item-button>
        <router-link to="/dashboard">dashboard</router-link>
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
    return {};
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