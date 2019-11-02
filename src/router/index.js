import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Table from '../components/dashboard/Table.vue';
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
				path      : 'table',
				name      : 'table',
				component : Table
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
