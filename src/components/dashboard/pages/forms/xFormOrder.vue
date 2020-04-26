<template>
  <b-form id="form" @submit="submit" @reset="reset" v-if="show">
    <b-button @click="add" variant="info">+ producto</b-button>
    <b-button type="submit" variant="primary">Submit</b-button>
    <InputSelect
      v-model="form.client"
      :options="this.options.client"
      :label="'cliente'"
    />
    <InputBasic v-model="form.date" :type="'date'" :label="'producir'" />
    <InputBasic v-model="form.delivered" :type="'date'" :label="'entregar'" />

    <div v-for="field in this.form.products" :key="field.id">
      <transition name="fade">
        <InputDynamic
          v-if="field.active"
          :property="'products'"
          :options="options.product"
          :id="field.id"
          :priority="'unitPrice'"
          :populate="field"
          @remove-field="remove"
          @update-field="update"
        />
      </transition>
    </div>
    <b-card class="mt-3">
      <pre class="m-0">{{ this.object }}</pre>
    </b-card>
  </b-form>
</template>
<script>
import InputSelect from "../../inputs/InputSelect";
import InputBasic from "../../inputs/InputBasic";
import InputDynamic from "../../inputs/InputDynamic";
import { save } from "@/firebase";
import { database } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "FormOrder",
  components: { InputSelect, InputBasic, InputDynamic },
  props: {
    object: {
      type: Object,
      default: () => ({ empty: true }),
    },
  },
  data() {
    return {
      form: {
        client: "",
        date: "",
        delivered: "",
        paid: "",
        products: [
          {
            id: 0,
            active: true,
            name: "",
            unitPrice: 1,
            quantity: 1,
            total: 1,
          },
        ],
      },
      options: {
        client: [],
        product: [],
      },
      show: true,
    };
  },
  computed: {
    ...mapState(["ref"]),
    client() {
      return this.form.client;
    },
    date() {
      return this.form.date;
    },
  },
  methods: {
    add() {
      let id = this.form.products.length;
      console.log(id);
      this.form.products.push({
        id: id,
        active: true,
        name: "",
        unitPrice: 0,
        quantity: 0,
        total: 0,
      });
    },
    update(payload) {
      console.log(payload.name);
      this.form.products[payload.id].name = payload.name;
      this.form.products[payload.id].unitPrice = payload.unitPrice;
      this.form.products[payload.id].quantity = payload.quantity;
      this.form.products[payload.id].total = payload.total;
    },
    remove(payload) {
      this.form.products[payload.id].active = false;
    },
    setClientSpotlight() {
      /* 
      this method presents the most used items at the top of the list. 
      it can be a method called getPropertyWithSpotlight(ref, property, target_property, spotlight_size)
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
            .splice(0, spotlight_size)
            .map((e) => {
              return e.client;
            });
          most_used.push({ value: "x", text: "" });
          most_used.unshift({ value: "", text: "cliente" });
          return [...most_used, ...sorted_unique_strings];
        })
        .then((options) => {
          this.options.client = options;
          return options;
        });
    },
    getProductOptions() {
      database
        .ref(`${this.ref}/products`)
        .once("value")
        .then(function(snapshot) {
          let options = [];
          let products = snapshot.val();
          console.log(products);
          let keys = Object.keys(products);
          for (let i = 0; i < keys.length; i++) {
            options.push(products[keys[i]]);
          }
          return options.map((e) => {
            return { value: e.name, text: e.name, price: e.price };
          });
        })
        .then((options) => {
          options.unshift({ value: "", text: "producto" });
          this.options.product = options;
        });
    },
    submit(evt) {
      evt.preventDefault();
      let form = Object.assign({}, this.form);
      let products = this.form.products.filter((e) => e.active == true);
      console.log(products);
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        delete products[i].id;
        delete products[i].active;
        total += products[i].total;
        form.products.push(products[i]);
      }
      form.total = total;
      form.products = products;
      console.log(form);
      if (this.object.empty) {
        save(`${this.ref}/orders`, form).then(() => {
          this.reset();
        });
      } else {
        console.log(`${this.ref}/orders/${this.object.id}`);
        save(`${this.ref}/orders/${this.object.id}`, form).then(() => {
          this.reset();
        });
      }
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form = {
        client: "",
        date: "",
        delivered: "",
        paid: "",
        products: [
          {
            id: 0,
            active: true,
            name: "",
            unitPrice: 1,
            quantity: 1,
            total: 1,
          },
        ],
      };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  watch: {
    client: function(val) {
      console.log(val);
    },
    date: function(val) {
      this.form.delivered = moment(val)
        .add(1, "day")
        .format("YYYY-MM-DD");
    },
  },
  created() {
    if (!this.object.empty) {
      this.form.client = this.object.client;
      this.form.date = this.object.date.split("T")[0];
      this.form.delivered = this.object.date.split("T")[0];
      let products = this.object.products;
      this.form.products.pop();
      for (let i = 0; i < products.length; i++) {
        this.form.products.push({
          id: i,
          active: true,
          name: products[i].name,
          unitPrice: products[i].unitPrice,
          quantity: products[i].quantity,
          total: products[i].total,
        });
      }
    }
  },
  mounted() {
    this.setClientSpotlight();
    this.getProductOptions();
  },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
