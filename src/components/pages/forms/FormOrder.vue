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
      <pre class="m-0">{{ this.form }}</pre>
    </b-card>
  </b-form>
</template>
<script>
import InputSelect from "../../inputs/InputSelect";
import InputBasic from "../../inputs/InputBasic";
import InputDynamic from "../../inputs/InputDynamic";
import { save, getClientsLastOrder, getMostUsed, getList } from "@/firebase";
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
      form.date = moment(form.date).format();
      form.delivered = moment(form.delivered).format();
      console.log(form);
      if (this.object.empty) {
        save(`${this.ref}/orders`, form).then(() => {
          this.$router.push({ path: "/" });
        });
      } else {
        console.log(`${this.ref}/orders/${this.object.id}`);
        save(`${this.ref}/orders/${this.object.id}`, form).then(() => {
          this.$router.push({ path: "/" });
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
      this.form.products = [];
      getClientsLastOrder(this.ref, val).then((e) => {
        console.log(e);
        let products = e.products;
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
      });
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
    getMostUsed(`${this.ref}/orders`, "client", 20).then((options) => {
      options.unshift({ value: "", text: "cliente" });
      this.options.client = options;
    });
    getList(this.ref, "products").then((options) => {
      options.unshift({ value: "", text: "producto" });
      this.options.product = options;
    });
    this.form.date = moment().format("YYYY-MM-DD");
    this.form.delivered = moment()
      .add(1, "day")
      .format("YYYY-MM-DD");
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
