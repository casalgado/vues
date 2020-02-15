<template>
  <div id="container" class="border">
    <div id="main">
      <b-card class="mt-3">
        <pre class="m-0">{{ this.object }}</pre>
        <pre class="m-0">{{ this.activeForm }}</pre>
      </b-card>
      <b-card class="mt-3">
        <pre class="m-0">{{ this.dynamicFields }}</pre>
      </b-card>
    </div>
    <div id="sidebar">
      <b-form @submit="submit" @reset="reset" v-if="show">
        <div v-for="field in formConstructor.select" :key="field.property">
          <Select :options="field.options" :property="field.property" :label="field.label" />
        </div>
        <!-- @ add :label to <Select/> and <DProducts/> -->
        <div v-for="field in Object.values(this.dynamicFields)" :key="field.id">
          <div v-if="field.active">
            <Dynamic
              :property="'products'"
              :options="formConstructor.dynamic.options"
              :id="field.id"
              :priority="formConstructor.dynamic.priority || 'unitPrice'"
            />
          </div>
        </div>

        <div v-for="field in formConstructor.basic" :key="field.property">
          <Basic
            :label="field.label"
            :property="field.property"
            :type="field.type"
            v-if="!field.hidden"
          />
        </div>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button @click="addProductFields" variant="info">+ producto</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Select from "./inputs/Select";
import Basic from "./inputs/Basic";
import Dynamic from "./inputs/Dynamic";
// import { save } from "../../../firebase";
import { mapState } from "vuex";
import { getById } from "@/firebase";
export default {
  components: { Select, Basic, Dynamic },
  name: "RenderForm",
  props: {
    formConstructor: Object,
    products: Array,
    object: Object
  },
  data() {
    return {
      show: true
    };
  },
  computed: mapState(["dynamicFields", "activeForm"]),
  methods: {
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
      form.total = total;
      console.log(form);
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
    }
  },
  created() {
    getById(this.object.ref, this.object.params.id).then(e => {
      this.$store.commit("updateActiveForm", e);
    });
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