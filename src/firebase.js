import { initializeApp } from 'firebase';
import moment from 'moment';

const app = initializeApp({
	apiKey            : 'AIzaSyBHfxD6HppqwQm75Pg6u1oLuYB-Phy3HCc',
	authDomain        : 'es-alimento.firebaseapp.com',
	databaseURL       : 'https://es-alimento.firebaseio.com',
	projectId         : 'es-alimento',
	storageBucket     : 'es-alimento.appspot.com',
	messagingSenderId : '753348054477',
	appId             : '1:753348054477:web:d3da8ff9e84aaf6c7a8884'
});

const database = app.database();
const db = database.ref('esalimento');
const orders = database.ref('esalimento/orders');
const expenses = database.ref('esalimento/expenses');

export { database, db, orders, expenses };

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

export function save(ref, payload) {
	return new Promise(function(resolve) {
		database.ref(`esalimento/${ref}`).push(payload).then(function(value) {
			resolve(value);
			console.log(value);
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
