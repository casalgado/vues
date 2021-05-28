import { initializeApp } from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";
import moment from "moment";
import store from "./store";
// @refactor
// where should the momentjs code go?

moment.updateLocale("es", {
  week: {
    dow: 0,
    doy: moment.localeData("es").firstDayOfYear(),
  },
});

moment.locale("es");

let config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "es-alimento.firebaseapp.com",
  databaseURL: "https://es-alimento.firebaseio.com",
  projectId: "es-alimento",
  storageBucket: "es-alimento.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

if (location.hostname === "localhost" && location.port !== "8080") {
  config = {
    databaseURL: "http://localhost:9000/?ns=es-alimento",
  };
}

const app = initializeApp(config);

const database = app.database();
const environment = process.env.NODE_ENV;
// console.log(environment);
export { database };
export { environment };

let ref = database.ref("development-esalimento");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    database
      .ref(`users/${user.uid}`)
      .once("value")
      .then(function(snapshot) {
        user.ref = snapshot.val().ref;
        if (environment === "production") {
          console.log("mode is production");
          console.log(ref.toString());
          store.dispatch("fetchUser", user);
          ref = database.ref(user.ref);
        } else if (environment === "development") {
          console.log("mode is development");
          console.log(ref.toString());
          user.ref = "";
          ref = database.ref("development-esalimento");
          store.dispatch("fetchUser", user);
        }
      });
  } else {
    store.dispatch("fetchUser", user);
  }
});
// console.log("ref");
// console.log(ref.toString());
export { ref };
