import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Console from '../components/database/Console.vue';
import Form from '../components/dashboard/forms/Form.vue';
import OrdersForm from '../components/dashboard/forms/OrdersForm.vue';
import RenderForm from '../components/dashboard/forms/RenderForm.vue';

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
				path      : 'form/',
				name      : 'form',
				component : Form,
				children  : [
					{
						path      : 'orders/',
						name      : 'ordersForm',
						component : OrdersForm
					}
				]
			},
			{
				path      : 'newform',
				name      : 'newform',
				component : RenderForm
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
