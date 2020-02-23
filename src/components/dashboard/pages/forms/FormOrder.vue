<template>
  <div>
    <InputSelect v-model="form.client" :options="this.options.client" :label="'cliente'" />
    <InputBasic v-model="form.date" :type="'date'" :label="'fecha'" />
    <b-card class="mt-3">
      <pre class="m-0">{{ this.form }}</pre>
    </b-card>
  </div>
</template>
<script>
import InputSelect from "../../inputs/InputSelect";
import InputBasic from "../../inputs/InputBasic";
// import { save } from "../../../firebase";
import { database } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "FormOrder",
  components: { InputSelect, InputBasic },
  data() {
    return {
      form: {
        client: "el caminante",
        date: "2020-02-15"
      },
      options: {
        client: []
      }
    };
  },
  computed: {
    ...mapState(["ref"])
  },
  methods: {
    setClientSpotlight() {
      /* 
      this can be a method called getPropertyWithSpotlight(ref, property, target_property, spotlight_size)
      ref = database.ref
      property = String (property of objects in database to choose from)
      local_property = String (data property of local component)
      spotlight_size = Integer

      this method should be imported from firebase

      in this case, 
      ref = orders,
      property = client,
      spotlight_size = 10

      the method should return an array of objects of the form {value: String, text: String}
      to be sent to a Select component as the prop :options
      */
      let spotlight_size = 15;
      let property = "client";
      // let local_property = "clients";
      let ref = database.ref(`${this.ref}/orders`);

      let objects = [];
      let sorted_unique_strings = [];
      let most_used = [];
      ref
        .once("value")
        .then(function(snapshot) {
          let orders = snapshot.val();
          for (let order in orders) {
            objects.push(orders[order][property]);
          }
          sorted_unique_strings = objects
            .filter((value, index, self) => {
              return self.indexOf(value) === index;
            })
            .sort();
          most_used = sorted_unique_strings
            .map(e => {
              let times_used = objects.filter(i => {
                return e == i;
              }).length;
              return {
                client: e,
                use_count: times_used
              };
            })
            .sort(function(a, b) {
              var x = a.use_count;
              var y = b.use_count;
              return x < y ? 1 : x > y ? -1 : 0;
            })
            .splice(0, spotlight_size)
            .map(e => {
              return e.client;
            });
          most_used.push({ value: "x", text: "" });
          most_used.unshift({ value: "", text: "cliente" });
          return [...most_used, ...sorted_unique_strings];
        })
        .then(options => {
          this.options.client = options;
          return options;
        });
    }
  },
  mounted() {
    this.setClientSpotlight();
  }
};
</script>
<style scoped>
* {
  margin: 5px;
}
.f-group {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
}

#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>