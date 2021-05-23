export function testMethod(ref) {
  console.log(ref);
}

export function save(ref, path, payload, component) {
  console.time("save");
  return new Promise((resolve) => {
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
    console.timeEnd("save");
    resolve(id);
  });
}
