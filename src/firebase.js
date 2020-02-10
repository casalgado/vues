import { initializeApp } from 'firebase';
import firebase from 'firebase';
import moment from 'moment';
// @refactor
// where should the code below go (momentjs)?
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

const database = app.database();
const db = database.ref('esalimento');
const orders = database.ref('esalimento/orders');
const expenses = database.ref('esalimento/expenses');
console.log(firebase.auth().currentUser);

export { database, db, orders, expenses };

export function getUser() {
	return firebase.auth().currentUser;
}

export function fetchByDate(ref, date, period) {
	return new Promise(function(resolve) {
		database
			.ref(`esalimento/${ref}`)
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

export function fetchAll(ref) {
	return new Promise(function(resolve) {
		database.ref(`esalimento/${ref}`).once('value').then(function(snapshot) {
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
		database.ref(`esalimento/${ref}`).push(payload).then(function(value) {
			resolve(value);
			console.log(value);
		});
	});
}

export function fetchById(ref, id) {
	return new Promise(function(resolve) {
		database.ref(`esalimento/${ref}/${id}`).once('value').then(function(snapshot) {
			resolve(snapshot.val());
		});
	});
}

// export function CheckIfFriendsPending(id2) {
// 	return new Promise(function(resolve, reject) {
// 		var userID = getFirebase().auth().currentUser.uid;
// 		var indicator = false;
// 		getFirebase().database().ref('members/' + userID + '/PendingFR').once('value').then(function(snap) {
// 			function userMatch(user) {
// 				if (!!user.From && user.From === userID && (user.To === id2 || user.To === userID)) {
// 					return resolve();
// 				}
// 			}
// 			snap.forEach(function(childSnapshot) {
// 				var childObject = childSnapshot.val();
// 				userMatch(childObject);
// 			});
// 			return reject();
// 		});
// 	});
// }
