<template>
  <div id="container" class="border">
    <div id="main">
      <b-card class="mt-3">
        <pre class="m-0">{{ this.activeForm }}</pre>
      </b-card>
      <b-card class="mt-3">
        <pre class="m-0">{{ this.dynamicFields }}</pre>
      </b-card>
    </div>
    <div id="sidebar">
      <b-form @submit="submit" @reset="reset" v-if="show">
        <Select :options="clients" :property="'client'" />
        <!-- @ add :label to <Select/> and <DProducts/> -->
        <div v-for="field in Object.values(this.dynamicFields)" :key="field.id">
          <div v-if="field.active">
            <DynamicProducts
              :property="'products'"
              :options="products"
              :id="field.id"
              :priority="'unitPrice'"
            />
          </div>
        </div>

        <Basic :label="'producir'" :property="'date'" :type="'date'" />
        <Basic :label="'entregar'" :property="'delivered'" :type="'date'" />

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button @click="addProductFields" variant="info">+ producto</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Select from "./inputs/Select";
import Basic from "./inputs/Basic";
import DynamicProducts from "./inputs/DynamicProducts";
// import { save } from "../../../firebase";
import { orders } from "../../../firebase";
import { mapState } from "vuex";
export default {
  components: { Select, Basic, DynamicProducts },
  name: "RenderForm",
  data() {
    return {
      form: {
        client: "",
        date: "",
        delivered: "",
        paid: "",
        products: []
      },
      show: true,
      clients: [],
      products: [
        { value: "", text: "producto" },
        { value: "p", text: "pounhon" },
        { value: "a", text: "a" },
        { value: "b", text: "b" },
        { value: "c", text: "c" },
        { value: "d", text: "d" }
      ]
    };
  },
  computed: mapState(["dynamicFields", "activeForm"]),
  methods: {
    addInput(evt) {
      this.form = Object.assign(this.form, evt);
    },
    addProductFields() {
      this.$store.commit("addField");
    },
    submit(evt) {
      evt.preventDefault();
      let form = { ...this.activeForm };
      let products = Object.values(this.dynamicFields).filter(
        e => e.active == true
      );
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        if (products[i].active) {
          delete products[i].id;
          delete products[i].active;
          total += products[i].total;
          form.products.push(products[i]);
        }
      }
      this.form.total = total;
      console.log(this.form);
      // save("orders", this.form).then(() => {
      //   this.reset();
      // });
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      // Reset our form values
      this.form.client = "";
      this.form.unitPrice = 0;
      this.form.quantity = 0;
      this.form.total = 0;
      this.form.date = "";
      this.form.delivered = "";
      this.form.products = [];
      this.dynamicFields = [{ id: 0, active: true }];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    toggleCreate() {
      this.create = !this.create;
    },
    setClients() {
      /* 
      this can be a method called getPropertyWithSpotlight(ref, property, target_property, spotlight_size)
      ref = database.ref
      property = String (property of objects in database to choose from)
      local_property = String (data property of local component)
      spotlight_size = Integer

      in this case, 
      ref = orders,
      property = client,
      spotlight_size = 10

      the method should return an array of objects of the form {value: String, text: String}
      to be sent to a Select component as the prop :options
      */
      let spotlight_size = 15;
      let property = "client";
      let local_property = "clients";
      let ref = orders;

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
          most_used.push({ value: "", text: "" });
          most_used.unshift({ value: "", text: "cliente" });
          return [...most_used, ...sorted_unique_strings];
        })
        .then(options => (this[local_property] = options));
    },
    setActiveForm: function() {
      this.$store.commit("setActiveForm", this.form);
    }
  },
  created() {
    this.setClients();
    this.setActiveForm();
    console.log(this.form);
  },
  watch: {
    dynamicFields() {
      console.log("watching");
    }
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