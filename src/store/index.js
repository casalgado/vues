import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
	state     : {
		period : 'day',
		date   : moment().format()
	},
	mutations : {
		next(state) {
			state.date = moment(state.date).add(1, state.period).format();
		},
		previous(state) {
			state.date = moment(state.date).subtract(1, state.period).format();
		},
		setPeriod(state, payload) {
			state.period = payload.period;
		}
	},
	actions   : {},
	modules   : {}
});
