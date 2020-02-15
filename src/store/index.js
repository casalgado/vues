import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
	state     : {
		uid           : '',
		ref           : '',
		period        : 'day',
		date          : moment().format(),
		activeForm    : {},
		dynamicFields : { 0: { id: 0, active: true, name: '', unitPrice: 0, quantity: 0, total: 0 } },
		selected      : []
	},
	mutations : {
		// user
		/*
		setUser(){
			state.uid = firebase.auth().currentUser
		},
		setRef(){
			state.ref = getUser(uid).ref
		} 
		*/
		// pagination
		next(state) {
			state.date = moment(state.date).add(1, state.period).format();
		},
		previous(state) {
			state.date = moment(state.date).subtract(1, state.period).format();
		},
		setPeriod(state, payload) {
			state.period = payload.period;
		},
		togglePeriod(state) {
			const p = [ 'day', 'week', 'month' ];
			let i = p.indexOf(state.period);
			state.period = p[(i + 1) % 3];
		},
		// table
		setSelected(state, payload) {
			state.selected = payload;
		},
		// form
		setActiveForm(state, payload) {
			state.activeForm = { ...payload };
		},
		updateActiveForm(state, payload) {
			state.activeForm = Object.assign(state.activeForm, payload);
		},
		updateField(state, payload) {
			state.dynamicFields[payload.id] = Object.assign({}, state.dynamicFields[payload.id], payload);
		},
		addField() {
			let id = Object.keys(this.state.dynamicFields).length;
			Vue.set(this.state.dynamicFields, id, {
				id        : id,
				active    : true,
				name      : '',
				unitPrice : 0,
				quantity  : 0,
				total     : 0
			});
		},
		removeField(state, payload) {
			state.dynamicFields[payload.id].active = false;
		}
	},
	actions   : {
		// Connect to Database and execute setUser and setRef mutations.
	},
	modules   : {}
});
