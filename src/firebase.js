import { initializeApp } from "firebase";
import firebase from "firebase";
import moment from "moment";
import store from "./store";
// @refactor
// where should the momentjs code go?

moment.locale("es", {
  week: {
    dow: 0,
    doy: moment.localeData("es").firstDayOfYear(),
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

const ref = database.ref(store.state.ref);

export function getUser() {
  return firebase.auth().currentUser;
}

export function getByDateRange(path, propname, date, period) {
  return new Promise((resolve) => {
    console.time("getByDateRange");
    ref
      .child(path)
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
      .on("value", (snap) => {
        let objects = [];
        snap.forEach((csnap) => {
          let key = csnap.key;
          let data = csnap.val();
          data.id = key;
          objects.push(data);
        });
        console.timeEnd("getByDateRange");
        resolve(objects);
      });
  });
}

export function getAll(path) {
  return new Promise((resolve) => {
    console.time("getAll");
    ref.child(path).on("value", (snap) => {
      let objects = [];
      snap.forEach((csnap) => {
        let key = csnap.key;
        let data = csnap.val();
        data.id = key;
        objects.push(data);
      });
      console.timeEnd("getAll");
      resolve(objects);
    });
  });
}

export function getOneWhere(path, prop, value) {
  return new Promise((resolve) => {
    console.time("getAllWhere");
    ref
      .child(path)
      .orderByChild(prop)
      .equalTo(value)
      .limitToFirst(1)
      .on("value", (snap) => {
        let objects = [];
        snap.forEach((csnap) => {
          let key = csnap.key;
          let data = csnap.val();
          data.id = key;
          objects.push(data);
        });
        console.timeEnd("getAllWhere");
        resolve(objects);
      });
  });
}

export function getAllWhere(path, prop, value) {
  return new Promise((resolve) => {
    console.time("getAllWhere");
    ref
      .child(path)
      .orderByChild(prop)
      .equalTo(value)
      .on("value", (snap) => {
        let objects = [];
        snap.forEach((csnap) => {
          let key = csnap.key;
          let data = csnap.val();
          data.id = key;
          objects.push(data);
        });
        console.timeEnd("getAllWhere");
        resolve(objects);
      });
  });
}

export function getById(path, id) {
  return new Promise(function(resolve) {
    console.time("getById");
    ref
      .child(path)
      .child(id)
      .on("value", function(snapshot) {
        console.timeEnd("getById");
        resolve(snapshot.val());
      });
  });
}
export function getMostUsedClients(size) {
  return new Promise(function(resolve) {
    console.time("getMostUsedClients");
    ref
      .child("optionsForMenus")
      .child("clients")
      .on("value", function(snap) {
        let objects = [];
        let sorted_unique = [];
        let most_used = [];
        snap.forEach((csnap) => {
          let data = csnap.val();
          objects.push(data.name);
        });
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
        console.timeEnd("getMostUsedClients");
        resolve([...most_used, ...sorted_unique]);
      });
  });
}

export function getMostUsed(path, property, size) {
  /* 
	the method returns an array of objects of the form {value: String, text: String}
	to be sent to a Select component as the prop :options
	*/
  return new Promise(function(resolve) {
    console.time("getMostUsed 1");
    console.time("getMostUsed 2");
    console.time("getMostUsed 3");
    let objects = [];
    let sorted_unique = [];
    let most_used = [];
    ref.child(path).once("value", function(snap) {
      console.timeEnd("getMostUsed 1");
      snap.forEach((csnap) => {
        let data = csnap.val();
        objects.push(data[property]);
      });
      console.timeEnd("getMostUsed 2");
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
      console.timeEnd("getMostUsed 3");
      resolve([...most_used, ...sorted_unique]);
    });
  });
}

export function getAsOptionsForSelect(path) {
  return new Promise(function(resolve) {
    console.time("getAsOptionsForSelect");
    ref.child(path).once("value", function(snap) {
      let options = [];
      let objects = [];
      snap.forEach((csnap) => {
        objects.push(csnap.val());
      });
      options = objects
        .map((e) => {
          return { value: e.name, text: e.name };
        })
        .sort(function(a, b) {
          let nA = a.text.toLowerCase();
          let nB = b.text.toLowerCase();
          if (
            nA < nB //ascending
          )
            return -1;
          if (nA > nB) return 1;
          return 0;
        });
      console.timeEnd("getAsOptionsForSelect");
      resolve(options);
    });
  });
}

export function getClientsLastOrder(client) {
  return new Promise(function(resolve) {
    console.time("getClientsLastOrder");
    ref
      .child(`orders`)
      .orderByChild("client")
      .equalTo(client)
      .limitToLast(1)
      .once("value", function(snapshot) {
        console.timeEnd("getClientsLastOrder");
        resolve(Object.values(snapshot.val())[0]);
      });
  });
}

export function save(path, payload) {
  console.time("save");
  return new Promise((resolve) => {
    var id = ref.child(path).push(payload, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        alert("Data saved successfully.");
      }
    }).key;
    console.log(id);
    console.timeEnd("save");
    resolve(id);
  });
}

export function update(path, payload) {
  console.time("update");
  return new Promise(() => {
    ref.child(path).update(payload, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        alert("Data saved successfully.");
      }
    });
  }).then(() => {
    console.timeEnd("update");
  });
}

export function updateSingleProp(path, oid, property, newValue, component) {
  ref
    .child(path)
    .child(oid)
    .update({ [property]: newValue }, function(error) {
      if (error) {
        alert(error);
      } else {
        component.$alert("success");
      }
    });
}
