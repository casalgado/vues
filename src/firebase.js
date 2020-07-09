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

const app = initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "es-alimento.firebaseapp.com",
  databaseURL: "https://es-alimento.firebaseio.com",
  projectId: "es-alimento",
  storageBucket: "es-alimento.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

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

export function getUser() {
  return firebase.auth().currentUser;
}

export function getByDateRange(path, propname, date, period) {
  return new Promise((resolve) => {
    console.log(ref.toString());
    console.time("getByDateRange:");
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
        console.time("getByDateRange:");
        resolve(objects);
      });
  });
}

export function getAll(path) {
  return new Promise((resolve) => {
    console.time("getAll");
    console.log(ref.toString());
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
    console.time("getOneWhere");
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
        console.timeEnd("getOneWhere");
        resolve(objects[0]);
      });
  });
}

export function getAllWhere(path, prop, value) {
  return new Promise((resolve) => {
    console.time("getAllWhere");
    console.log(ref.toString());
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

export function getAllOrdersWhereProduct(product) {
  return new Promise((resolve) => {
    console.time("getAOWP");
    ref.child("orders").on("value", (snap) => {
      let objects = [];
      snap.forEach((csnap) => {
        let key = csnap.key;
        let data = csnap.val();
        data.id = key;
        data.products.forEach((p) => {
          if (p.name == product) {
            objects.push(data);
          }
        });
      });
      console.timeEnd("getAOWP");
      resolve(objects);
    });
  });
}

export function getById(path, id) {
  return new Promise(function(resolve) {
    console.time("getById");
    console.log(ref.toString());
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
    console.log(ref.toString());
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
    console.log(ref.toString());
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
    console.log(ref.toString());
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
    console.log(ref.toString());
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

export function getProvidersLastExpense(provider) {
  return new Promise(function(resolve) {
    console.time("getProvidersLastExpense");
    console.log(ref.toString());
    ref
      .child(`expenses`)
      .orderByChild("provider")
      .equalTo(provider)
      .limitToLast(1)
      .once("value", function(snapshot) {
        console.timeEnd("getProvidersLastExpense");
        resolve(Object.values(snapshot.val())[0]);
      });
  });
}

export function save(path, payload, component) {
  console.time("save");
  return new Promise((resolve) => {
    console.log(ref.toString());
    payload.dateCreated = moment().format();
    var id = ref.child(path).push(payload, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        if (component) {
          component.$alert("Data saved successfully.");
        } else {
          alert("Data saved successfully.");
        }
      }
    }).key;
    console.log(id);
    console.timeEnd("save");
    resolve(id);
  });
}

export function update(path, payload, key, component) {
  console.time("update");
  return new Promise((resolve) => {
    console.log(ref.toString());
    ref.child(path).update(payload, function(error) {
      if (error) {
        alert("Data could not be saved." + error);
      } else {
        if (component) {
          component.$alert("Data saved successfully.");
        } else {
          console.log("Data saved successfully.");
        }
      }
    });
    console.timeEnd("update");
    resolve(key);
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
        component.$fire({ title: "success" });
      }
    });
}

export function remove(path, oid) {
  console.time("remove");
  return new Promise((resolve) => {
    getById(path, oid).then((snap) => {
      snap.id = oid;
      snap.path = path;
      update(`deleteHistory/${snap.id}`, snap, snap.id)
        .then(() => {
          ref
            .child(path)
            .child(oid)
            .remove();
        })
        .then(() => {
          console.timeEnd("remove");
          alert("data removed successfully");
          resolve(oid);
        });
    });
  });
}

export function renameClient(oldname, newname, component) {
  console.time("renameClient");
  let counter = 0;
  component.$fire({
    title: `wait for it`,
    showConfirmButton: false,
  });
  getAll("orders")
    .then((orders) => {
      orders.forEach((o) => {
        if (o.client == oldname) {
          ref
            .child("orders")
            .child(o.id)
            .update({ client: newname }, function(error) {
              if (error) {
                alert(error);
              }
            });
          ref
            .child("optionsForMenus")
            .child("clients")
            .child(o.id)
            .update({ name: newname }, function(error) {
              if (error) {
                alert(error);
              }
            });
          counter++;
        }
      });
    })
    .then(() => {
      console.timeEnd("renameProduct");
      component.$fire({
        title: `${counter} pedido${counter == 1 ? "" : "s"} modificado${
          counter == 1 ? "" : "s"
        }`,
      });
    });
}

export function renameProduct(oldname, newname, component) {
  console.time("renameProduct");
  let counter = 0;
  component.$fire({
    title: `wait for it`,
    showConfirmButton: false,
  });
  Promise.all([
    getAll("orders").then((orders) => {
      orders.forEach((o) => {
        o.products.forEach((p, i) => {
          if (p.name == oldname) {
            ref
              .child(`orders/${o.id}/products/${i}`)
              .update({ name: newname }, function(error) {
                if (error) {
                  alert(error);
                }
              });
            counter++;
          }
        });
      });
    }),
    getAll("clients").then((clients) => {
      clients.forEach((c) => {
        let cid = c.id;
        if (c.history) {
          let oids = Object.keys(c.history);
          oids.forEach((o) => {
            c.history[o].products.forEach((p, i) => {
              if (p.name == oldname) {
                ref
                  .child(`clients/${cid}/history/${o}/products/${i}`)
                  .update({ name: newname, test: "hello" }, function(error) {
                    if (error) {
                      alert(error);
                    }
                  });
              }
            });
          });
        }
      });
    }),
  ]).then(() => {
    console.timeEnd("renameProduct");
    component.$fire({
      title: `${counter} registro${counter == 1 ? "" : "s"} modificado${
        counter == 1 ? "" : "s"
      }`,
    });
  });
}
