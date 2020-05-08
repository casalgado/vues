import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard",
    component: () => import("@/components/Home.vue"),
    children: [
      {
        path: "pedidos/",
        name: "ShowOrders",
        component: () => import("../components/pages/show/ShowOrders.vue"),
      },
      {
        path: "gastos/",
        name: "ShowExpenses",
        component: () => import("../components/pages/show/ShowExpenses.vue"),
      },
      {
        path: "clients/",
        name: "ShowClients",
        component: () => import("../components/pages/show/ShowClients.vue"),
      },
      {
        path: "porcobrar/",
        name: "ShowUnpaid",
        component: () => import("../components/pages/show/ShowUnpaid.vue"),
      },
      {
        path: "dashboard/",
        name: "ShowDashboard",
        component: () => import("../components/pages/show/ShowDashboard.vue"),
      },
      {
        path: "ingresos/",
        name: "ShowCashIn",
        component: () => import("../components/pages/show/ShowCashIn.vue"),
      },
      {
        path: "egresos/",
        name: "ShowCashOut",
        props: { pagination: "day" },
        component: () => import("../components/pages/show/ShowExpenses.vue"),
      },
      {
        path: "/crear/pedido/",
        name: "CreateOrder",
        component: () => import("@/components/pages/create/CreateOrder.vue"),
      },
      {
        path: "/editar/pedido/:oid",
        name: "EditOrder",
        component: () => import("@/components/pages/create/CreateOrder.vue"),
        props: true,
      },
      {
        path: "/crear/gasto/",
        name: "CreateExpense",
        component: () => import("@/components/pages/create/CreateExpense.vue"),
      },
      {
        path: "/editar/gasto/:oid",
        name: "EditExpense",
        component: () => import("@/components/pages/create/CreateExpense.vue"),
        props: true,
      },
      {
        path: "crear/producto/",
        name: "CreateProduct",
        component: () => import("@/components/pages/create/CreateProduct.vue"),
      },
      {
        path: "crear/cliente/",
        name: "CreateClient",
        component: () => import("@/components/pages/create/CreateClient.vue"),
      },
      {
        path: "console/",
        name: "console",
        component: () => import("@/components/pages/Console.vue"),
      },

      /*
			{
				path      : 'pedidos/editar/:id',
				name      : 'editarPedido',
				component : () => import('@/components/dashboard/forms/OrdersForm.vue')
			},
			{
				path      : 'gastos/nuevo/',
				name      : 'nuevoGasto',
				component : () => import('@/components/dashboard/forms/ExpensesForm.vue')
			},
			{
				path      : 'gastos/editar/:id',
				name      : 'editarGasto',
				component : () => import('@/components/dashboard/forms/ExpensesForm.vue')
			},
			{
				path      : 'gastos/',
				name      : 'gastos',
				component : () => import('@/components/dashboard/tables/Expenses.vue')
			},
			{
				path      : 'clientes/',
				name      : 'clientes',
				component : () => import('@/components/dashboard/tables/Clients.vue')
			}
			,
			*/
    ],
  },
  {
    path: "/landing",
    name: "landing",
    component: () => import("@/components/Landing.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
