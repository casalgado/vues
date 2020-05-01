import { initializeApp } from "firebase";
import firebase from "firebase";
import moment from "moment";
import store from "./store";
// @refactor
// where should the momentjs code go?

moment.locale("en", {
  week: {
    dow: 0,
    doy: moment.localeData("en").firstDayOfYear(),
  },
});
moment.locale("es");

const app = initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "es-alimento.firebaseapp.com",
  databaseURL: "https://es-alimento.firebaseio.com",
  projectId: "es-alimento",
  storageBucket: "es-alimento.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    database
      .ref(`users/${user.uid}`)
      .once("value")
      .then(function(snapshot) {
        user.ref = snapshot.val().ref;
        store.dispatch("fetchUser", user);
      });
  } else {
    store.dispatch("fetchUser", user);
  }
});

const database = app.database();

export { database };

export function getUser() {
  return firebase.auth().currentUser;
}

export function getByDate(ref, propname, date, period) {
  return new Promise(function(resolve) {
    database
      .ref(ref)
      .orderByChild(propname)
      .startAt(
        moment(date)
          .startOf(period)
          .format()
      )
      .endAt(
        moment(date)
          .endOf(period)
          .format()
      )
      .once("value")
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
    database
      .ref(ref)
      .once("value")
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

export function getAllWithProp(ref, prop, value) {
  return new Promise(function(resolve) {
    database
      .ref(ref)
      .orderByChild(prop)
      .equalTo(value)
      .once("value")
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

export function save(fullPath, payload) {
  console.log("before save():");
  console.log(payload);
  return new Promise(function(resolve) {
    database
      .ref(fullPath)
      .push()
      .set(payload, function(error) {
        if (error) {
          alert("Data could not be saved." + error);
        } else {
          alert("Data saved successfully.");
        }
      })
      .then(function(value) {
        resolve(value);
        console.log("after save():");
        console.log(value);
        console.log("-------------");
      });
  });
}

export function getById(fullPath) {
  return new Promise(function(resolve) {
    database
      .ref(fullPath)
      .once("value")
      .then(function(snapshot) {
        resolve(snapshot.val());
      });
  });
}

export function getMostUsed(fullPath, property, size) {
  /* 
	the method returns an array of objects of the form {value: String, text: String}
	to be sent to a Select component as the prop :options
	*/
  return new Promise(function(resolve) {
    let ref = database.ref(fullPath);

    let objects = [];
    let sorted_unique = [];
    let most_used = [];
    ref.once("value").then(function(snapshot) {
      let orders = snapshot.val();
      for (let order in orders) {
        objects.push(orders[order][property]);
      }
      sorted_unique = objects
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .sort();
      most_used = sorted_unique
        .map((e) => {
          let times_used = objects.filter((i) => {
            return e == i;
          }).length;
          return {
            client: e,
            use_count: times_used,
          };
        })
        .sort(function(a, b) {
          var x = a.use_count;
          var y = b.use_count;
          return x < y ? 1 : x > y ? -1 : 0;
        })
        .splice(0, size)
        .map((e) => {
          return e.client;
        });
      most_used.push({ value: "x", text: "" });
      resolve([...most_used, ...sorted_unique]);
    });
  });
}

export function getList(ref, collection) {
  console.log(ref);
  return new Promise(function(resolve) {
    database
      .ref(`${ref}/${collection}`)
      .once("value")
      .then(function(snapshot) {
        let options = [];
        let products = snapshot.val();

        let keys = Object.keys(products);
        for (let i = 0; i < keys.length; i++) {
          options.push(products[keys[i]]);
        }

        resolve(
          options
            .sort(function(a, b) {
              let nA = a.name.toLowerCase();
              let nB = b.name.toLowerCase();
              if (
                nA < nB //sort string ascending
              )
                return -1;
              if (nA > nB) return 1;
              return 0;
            })
            .map((e) => {
              return { value: e.name, text: e.name };
            })
        );
      });
  });
}

export function getClientsLastOrder(ref, client) {
  return new Promise(function(resolve) {
    database
      .ref(`${ref}/orders`)
      .orderByChild("client")
      .equalTo(client)
      .limitToLast(1)
      .once("value")
      .then(function(snapshot) {
        resolve(Object.values(snapshot.val())[0]);
      });
  });
}
