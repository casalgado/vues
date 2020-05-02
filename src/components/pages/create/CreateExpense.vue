<template>
  <b-form id="form" @submit="submit" @reset="reset" v-if="show">
    <b-button @click="add" variant="info">+ producto</b-button>
    <b-button type="submit" variant="primary">Submit</b-button>

    <InputSelect
      v-model="form.provider"
      :options="this.options.provider"
      :label="'proveedor'"
    />
    <InputSelect
      v-model="form.category"
      :options="this.options.category"
      :label="'categoria'"
    />
    <InputBasic v-model="form.date" :type="'date'" :label="'fecha'" />

    <div v-for="field in this.form.products" :key="field.id">
      <transition name="fade">
        <InputDynamic
          v-if="field.active"
          :property="'products'"
          :id="field.id"
          :priority="'unitPrice'"
          :populate="field"
          @remove-field="remove"
          @update-field="update"
        />
      </transition>
    </div>
    <b-card class="mt-3">
      <pre class="m-0">{{ this.form }}</pre>
    </b-card>
  </b-form>
</template>
<script>
import InputSelect from "../../inputs/InputSelect";
import InputBasic from "../../inputs/InputBasic";
import InputDynamic from "../../inputs/InputDynamic";
import { save, getList } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "CreateExpense",
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
        provider: "",
        category: "",
        date: "",
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
        provider: [],
        category: [],
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
        save(`${this.ref}/expenses`, form).then(() => {
          this.reset();
        });
      } else {
        console.log(`${this.ref}/expenses/${this.object.id}`);
        save(`${this.ref}/expenses/${this.object.id}`, form).then(() => {
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
    provider: function(val) {
      console.log(val);
      //   this.form.products = [];
      //   getClientsLastOrder(this.ref, val).then(e => {
      //     console.log(e);
      //     let products = e.products;
      //     for (let i = 0; i < products.length; i++) {
      //       this.form.products.push({
      //         id: i,
      //         active: true,
      //         name: products[i].name,
      //         unitPrice: products[i].unitPrice,
      //         quantity: products[i].quantity,
      //         total: products[i].total
      //       });
      //     }
      //   });
    },
  },
  created() {
    if (!this.object.empty) {
      this.form.provider = this.object.provider;
      this.form.date = this.object.date.split("T")[0];
      this.form.category = this.object.category;
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
    getList(this.ref, "providers").then((options) => {
      options.unshift({ value: "", text: "proveedor" });
      this.options.provider = options;
    });
    getList(this.ref, "categories").then((options) => {
      options.unshift({ value: "", text: "categoria" });
      this.options.category = options;
    });
    this.form.date = moment().format("YYYY-MM-DD");
  },
};
</script>
<style scoped>
#form {
  max-width: 500px;
}

* {
  margin: 5px;
}
.f-group {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
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
