import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path      : '/',
		name      : 'dashboard',
		component : () => import('@/components/dashboard/Dashboard.vue'),
		children  : [
			{
				path      : 'pedidos/',
				name      : 'pedidos',
				component : () => import('../components/dashboard/pages/ShowOrders.vue')
			},
			{
				path      : 'gastos/',
				name      : 'gastos',
				component : () => import('../components/dashboard/pages/ShowExpenses.vue')
			},
			{
				path      : 'pedidos/crear/',
				name      : 'crearPedido',
				component : () => import('@/components/dashboard/pages/create/createOrder.vue')
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
			{
				path      : 'console',
				component : () => import('@/components/dashboard/pages/Console.vue')
			}
		]
	},
	{
		path      : '/landing',
		name      : 'landing',
		component : () => import('@/components/Landing.vue')
	}
];

const router = new VueRouter({
	routes
});

export default router;
