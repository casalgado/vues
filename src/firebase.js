import { initializeApp } from 'firebase';

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
export { database, db, orders };
