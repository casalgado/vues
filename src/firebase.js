import { initializeApp } from 'firebase';
import firebase from 'firebase';
import moment from 'moment';
import store from './store';
// @refactor
// where should the momentjs code go?
moment.locale('es');
moment.locale('en', {
	week : {
		dow : 0,
		doy : moment.localeData('en').firstDayOfYear()
	}
});

const app = initializeApp({
	apiKey            : process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain        : 'es-alimento.firebaseapp.com',
	databaseURL       : 'https://es-alimento.firebaseio.com',
	projectId         : 'es-alimento',
	storageBucket     : 'es-alimento.appspot.com',
	messagingSenderId : process.env.VUE_APP_FIREBASE_SENDER_ID,
	appId             : process.env.VUE_APP_FIREBASE_APP_ID
});

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		database.ref(`users/${user.uid}`).once('value').then(function(snapshot) {
			user.ref = snapshot.val().ref;
			store.dispatch('fetchUser', user);
		});
	} else {
		store.dispatch('fetchUser', user);
	}
});

const database = app.database();

export { database };

export function getUser() {
	return firebase.auth().currentUser;
}

export function getByDate(ref, date, period) {
	return new Promise(function(resolve) {
		database
			.ref(ref)
			.orderByChild('date')
			.startAt(moment(date).startOf(period).format())
			.endAt(moment(date).endOf(period).format())
			.once('value')
			.then(function(snapshot) {
				let data = snapshot.val();
				let objects = [];
				for (let key in data) {
					data[key].id = key;
					objects.push(data[key]);
				}
				resolve(objects);
			});
	});
}

export function getAll(ref) {
	return new Promise(function(resolve) {
		database.ref(ref).once('value').then(function(snapshot) {
			let data = snapshot.val();
			let objects = [];
			for (let key in data) {
				data[key].id = key;
				objects.push(data[key]);
			}
			resolve(objects);
		});
	});
}

export function getAllWithProp(ref, prop, value) {
	return new Promise(function(resolve) {
		database.ref(ref).orderByChild(prop).equalTo(value).once('value').then(function(snapshot) {
			let data = snapshot.val();
			let objects = [];
			for (let key in data) {
				data[key].id = key;
				objects.push(data[key]);
			}
			resolve(objects);
		});
	});
}

export function save(ref, payload) {
	return new Promise(function(resolve) {
		database.ref(ref).push(payload).then(function(value) {
			resolve(value);
			console.log('@ save():');
			console.log(value);
			console.log('-------------');
		});
	});
}

export function getById(fullPath) {
	return new Promise(function(resolve) {
		database.ref(fullPath).once('value').then(function(snapshot) {
			resolve(snapshot.val());
		});
	});
}
