<template>
  <div id="nav-container" fluid>
    <p v-if="this.db !== 'esalimento'" class="dev"></p>
    <b-dropdown
      dropup
      no-caret
      text="Crear"
      offset=""
      toggle-class="nav-dropdown"
      class="m-2 custom-dropdown custom-create-dropdown"
    >
      <b-dropdown-item>
        <router-link :to="{ name: 'CreateOrder' }"
          ><b-button variant="dark" class="nav-btn"
            >Pedido</b-button
          ></router-link
        >
      </b-dropdown-item>
      <b-dropdown-item>
        <router-link :to="{ name: 'CreateExpense' }"
          ><b-button variant="dark" class="nav-btn"
            >Gasto</b-button
          ></router-link
        >
      </b-dropdown-item>
      <b-dropdown-item>
        <router-link :to="{ name: 'CreateProduct' }"
          ><b-button variant="dark" class="nav-btn"
            >Producto</b-button
          ></router-link
        >
      </b-dropdown-item>

      <b-dropdown-item>
        <router-link :to="{ name: 'CreateClient' }"
          ><b-button variant="dark" class="nav-btn"
            >Cliente</b-button
          ></router-link
        >
      </b-dropdown-item>
    </b-dropdown>

    <b-dropdown
      dropup
      no-caret
      text="Mostrar"
      offset=""
      toggle-class="nav-dropdown"
      class="m-2 custom-dropdown"
    >
      <b-dropdown-item>
        <router-link :to="{ name: 'ShowOrders' }">
          <b-button variant="dark" class="nav-btn">Pedidos</b-button>
        </router-link>
      </b-dropdown-item>

      <b-dropdown-item>
        <router-link :to="{ name: 'ShowExpenses' }"
          ><b-button variant="dark" class="nav-btn"
            >Gastos</b-button
          ></router-link
        >
      </b-dropdown-item>

      <b-dropdown-item>
        <router-link :to="{ name: 'ShowClients' }"
          ><b-button variant="dark" class="nav-btn"
            >Clientes</b-button
          ></router-link
        >
      </b-dropdown-item>
      <b-dropdown-item>
        <router-link :to="{ name: 'ShowProducts' }"
          ><b-button variant="dark" class="nav-btn"
            >Productos</b-button
          ></router-link
        >
      </b-dropdown-item>

      <b-dropdown-item>
        <router-link :to="{ name: 'ShowCashIn' }"
          ><b-button variant="success" class="nav-btn"
            >Ingresos</b-button
          ></router-link
        >
      </b-dropdown-item>

      <b-dropdown-item>
        <router-link :to="{ name: 'ShowCashOut' }"
          ><b-button variant="success" class="nav-btn"
            >Egresos</b-button
          ></router-link
        >
      </b-dropdown-item>

      <b-dropdown-item>
        <router-link :to="{ name: 'ShowUnpaid' }"
          ><b-button variant="success" class="nav-btn"
            >Por Cobrar</b-button
          ></router-link
        >
      </b-dropdown-item>
      <b-dropdown-item>
        <router-link :to="{ name: 'ShowDashboard' }"
          ><b-button variant="primary" class="nav-btn"
            >Dashboard</b-button
          ></router-link
        >
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Navigation",
  data: function() {
    return {
      db: "",
    };
  },
  methods: {
    setRef() {
      this.db = "development";
    },
  },
  computed: {
    development: function() {
      const environment = process.env.NODE_ENV;
      if (environment === "development") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["ref"]),
  },
  watch: {
    ref() {
      this.db = this.ref;
    },
  },
};
</script>
<style scoped>
a {
  color: var(--color-neutral) !important;
  text-decoration: none !important;
}

.dev {
  position: absolute;
  left: 2%;
  bottom: 50px;
  width: 15px;
  height: 15px;
  border-radius: 99px;
  background-color: #bc1c1f;
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
