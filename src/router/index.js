import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Console from '../components/database/Console.vue';

Vue.use(VueRouter);

const routes = [
	{
		path      : '/',
		name      : 'home',
		component : Home
	},
	{
		path      : '/dashboard',
		name      : 'dashboard',
		component : Dashboard,
		children  : [
			{
				path      : 'pedidos/',
				name      : 'pedidos',
				component : () => import('../components/dashboard/tables/Orders.vue')
			},
			{
				path      : 'pedidos/nuevo/',
				name      : 'nuevoPedido',
				component : () => import('../components/dashboard/forms/OrdersForm.vue')
			},
			{
				path      : 'pedidos/editar/:id',
				name      : 'editarPedido',
				component : () => import('../components/dashboard/forms/OrdersForm.vue')
			},
			{
				path      : 'gastos/nuevo/',
				name      : 'nuevoGasto',
				component : () => import('../components/dashboard/forms/ExpensesForm.vue')
			},
			{
				path      : 'gastos/editar/:id',
				name      : 'editarGasto',
				component : () => import('../components/dashboard/forms/ExpensesForm.vue')
			},
			{
				path      : 'gastos/',
				name      : 'gastos',
				component : () => import('../components/dashboard/tables/Expenses.vue')
			},
			{
				path      : 'clientes/',
				name      : 'clientes',
				component : () => import('../components/dashboard/tables/Clients.vue')
			},
			{
				path      : 'console',
				component : Console
			}
		]
	},
	{
		path      : '/about',
		name      : 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component : () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
];

const router = new VueRouter({
	routes
});

export default router;
