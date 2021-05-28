import moment from "moment";

export function save(ref, path, payload, component) {
  console.time("save");
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
    console.timeEnd("save");
    resolve(id);
  });
}

export function getAll(ref, path) {
  return new Promise((resolve) => {
    console.time("getAll");
    // console.log(ref.toString());
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

export function getOneWhere(ref, path, prop, value) {
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

export function getAllWhere(ref, path, prop, value) {
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

export function getAllOrdersWhereProduct(ref, product) {
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
            if (!objects.includes(data)) {
              objects.push(data);
            }
          }
        });
      });
      console.timeEnd("getAOWP");
      resolve(objects);
    });
  });
}

export function getById(ref, path, id) {
  return new Promise(function(resolve) {
    console.time("getById");
    // console.log(ref.toString());
    ref
      .child(path)
      .child(id)
      .on("value", function(snapshot) {
        console.timeEnd("getById");
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
        console.time("getByDateRange:");
        resolve(objects);
      });
  });
}

export function getClientListWithMostUsedFirst(ref, size) {
  return new Promise(function(resolve) {
    console.time("getClientListWithMostUsedFirst");
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
        console.timeEnd("getClientListWithMostUsedFirst");
        resolve([...most_used, ...sorted_unique]);
      });
  });
}
