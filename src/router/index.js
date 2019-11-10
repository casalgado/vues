import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Table from '../components/dashboard/tables/Table.vue';
import OrdersTable from '../components/dashboard/tables/OrdersTable.vue';
import ExpensesTable from '../components/dashboard/tables/ExpensesTable.vue';
import Console from '../components/database/Console.vue';
import Form from '../components/dashboard/forms/Form.vue';
import OrdersForm from '../components/dashboard/forms/OrdersForm.vue';

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
				path      : 'table/',
				name      : 'table',
				component : Table,
				children  : [
					{
						path      : 'orders/',
						name      : 'ordersTable',
						component : OrdersTable
					},
					{
						path      : 'expenses/',
						name      : 'expensesTable',
						component : ExpensesTable
					}
				]
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
