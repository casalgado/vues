import moment from "moment";

export function getAll(ref, path) {
  return new Promise((resolve) => {
    // console.log(ref.toString());
    ref.child(path).on("value", (snap) => {
      let objects = [];
      snap.forEach((csnap) => {
        let key = csnap.key;
        let data = csnap.val();
        data.id = key;
        objects.push(data);
      });
      resolve(objects);
    });
  });
}

export function getOneWhere(ref, path, prop, value) {
  return new Promise((resolve) => {
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
        resolve(objects[0]);
      });
  });
}

export function getAllWhere(ref, path, prop, value) {
  return new Promise((resolve) => {
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
        resolve(objects);
      });
  });
}

export function getAllOrdersWhereProduct(ref, product) {
  return new Promise((resolve) => {
    // console.time("getAOWP");
    ref.child("orders").on("value", (snap) => {
      let objects = [];
      snap.forEach((csnap) => {
        let key = csnap.key;
        let data = csnap.val();
        data.id = key;
        data.products.forEach((p) => {
          if (p.name == product) {
            if (!objects.includes(data)) {
              objects.push(data);
            }
          }
        });
      });
      // console.timeEnd("getAOWP");
      resolve(objects);
    });
  });
}

export function getById(ref, path, id) {
  return new Promise(function(resolve) {
    // console.time("getById");
    // console.log(ref.toString());
    ref
      .child(path)
      .child(id)
      .on("value", function(snapshot) {
        // console.timeEnd("getById");
        resolve(snapshot.val());
      });
  });
}

export function getByDateRange(ref, path, propname, date, period) {
  return new Promise((resolve) => {
    // console.log(ref.toString());
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
        // console.time("getByDateRange:");
        resolve(objects);
      });
  });
}

export function getClientListWithMostUsedFirst(ref, size) {
  return new Promise(function(resolve) {
    // console.time("getClientListWithMostUsedFirst");
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
          .map((e) => {
            return e.trim();
          })
          .sort(function(a, b) {
            return a.localeCompare(b);
          });

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
        // console.timeEnd("getClientListWithMostUsedFirst");
        resolve([...most_used, ...sorted_unique]);
      });
  });
}

export function getProviderListWithMostUsedFirst(ref, size) {
  /* 
	the method returns an array of objects of the form {value: String, text: String}
	to be sent to a Select component as the prop :options
	*/
  return new Promise(function(resolve) {
    // console.time("getProviderListWithMostUsedFirst");
    let objects = [];
    let sorted_unique = [];
    let most_used = [];
    ref.child("expenses").once("value", function(snap) {
      snap.forEach((csnap) => {
        let data = csnap.val();
        objects.push(data["provider"]);
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
            provider: e,
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
          return e.provider;
        });
      most_used.push({ value: "x", text: "" });
      // console.timeEnd("getProviderListWithMostUsedFirst");
      resolve([...most_used, ...sorted_unique]);
    });
  });
}

export function getClientsLastOrder(ref, client) {
  return new Promise(function(resolve) {
    // console.time("getClientsLastOrder");
    ref
      .child(`orders`)
      .orderByChild("client")
      .equalTo(client)
      .limitToLast(1)
      .once("value", function(snapshot) {
        // console.timeEnd("getClientsLastOrder");
        resolve(Object.values(snapshot.val())[0]);
      });
  });
}

export function getProvidersLastExpense(ref, provider) {
  return new Promise(function(resolve) {
    // console.time("getProvidersLastExpense");
    ref
      .child(`expenses`)
      .orderByChild("provider")
      .equalTo(provider)
      .limitToLast(1)
      .once("value", function(snapshot) {
        // console.timeEnd("getProvidersLastExpense");
        resolve(Object.values(snapshot.val())[0]);
      });
  });
}

export function save(ref, path, payload, component) {
  // console.time("save");
  return new Promise((resolve) => {
    // console.log(ref.toString());
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
    // console.log(id);
    // console.timeEnd("save");
    resolve(id);
  });
}

export function update(ref, path, payload, key, component) {
  // console.time("update");
  return new Promise((resolve) => {
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
    // console.timeEnd("update");
    resolve(key);
  });
}

export function remove(ref, path, oid) {
  // console.time("remove");
  return new Promise((resolve) => {
    getById(ref, path, oid).then((snap) => {
      snap.id = oid;
      snap.path = path;
      update(ref, `deleteHistory/${snap.id}`, snap, snap.id)
        .then(() => {
          ref
            .child(path)
            .child(oid)
            .remove();
        })
        .then(() => {
          // console.timeEnd("remove");
          alert("data removed successfully");
          resolve(oid);
        });
    });
  });
}

export function renameClient(ref, oldname, newname, component) {
  let counter = 0;
  if (component) {
    component.$fire({
      title: `wait for it`,
      showConfirmButton: false,
    });
  }
  ref
    .child("orders")
    .once("value")
    .then((snap) => {
      let orders = snap.val();
      let orderKeys = Object.keys(orders);
      orderKeys.forEach((k) => {
        let o = orders[k];
        if (o.client == oldname) {
          ref
            .child("orders")
            .child(k)
            .update({ client: newname }, function(error) {
              if (error) {
                alert(error);
              }
            });
          ref
            .child("optionsForMenus")
            .child("clients")
            .child(k)
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
      if (component) {
        component.$fire({
          title: `${counter} pedido${counter == 1 ? "" : "s"} modificado${
            counter == 1 ? "" : "s"
          }`,
        });
      }
    });
}

export function renameProduct(ref, oldname, newname, component) {
  // console.time("renameProduct");
  let counter = 0;
  if (component) {
    component.$fire({
      title: `wait for it`,
      showConfirmButton: false,
    });
  }
  Promise.all([
    ref
      .child("orders")
      .once("value")
      .then((snap) => {
        let orders = snap.val();
        let orderKeys = Object.keys(orders);
        orderKeys.forEach((k) => {
          let o = orders[k];
          o.products.forEach((p, i) => {
            if (p.name == oldname) {
              ref
                .child(`orders/${k}/products/${i}`)
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
    ref
      .child("clients")
      .once("value")
      .then((snap) => {
        let clients = snap.val();
        let Ckeys = Object.keys(clients);
        Ckeys.forEach((k) => {
          let c = clients[k];
          let cid = k;
          if (c.history) {
            let oids = Object.keys(c.history);
            oids.forEach((o) => {
              if (c.history[o].products) {
                c.history[o].products.forEach((p, i) => {
                  if (p.name == oldname) {
                    ref
                      .child(`clients/${cid}/history/${o}/products/${i}`)
                      .update({ name: newname }, function(error) {
                        if (error) {
                          alert(error);
                        }
                      });
                  }
                });
              }
            });
          }
        });
      }),
  ]).then(() => {
    // console.timeEnd("renameProduct");
    if (component) {
      component.$fire({
        title: `${counter} registro${counter == 1 ? "" : "s"} modificado${
          counter == 1 ? "" : "s"
        }`,
      });
    }
  });
}
