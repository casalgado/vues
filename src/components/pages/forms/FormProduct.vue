<template>
  <b-form id="form" @submit="submit" @reset="reset" v-if="show">
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.price" :type="'text'" :label="'precio'" />
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>
<script>
import InputBasic from "../../inputs/InputBasic";
import { save } from "@/firebase";
// import { database } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "FormClient",
  components: { InputBasic },
  data() {
    return {
      form: {
        name: "",
        price: ""
      },
      show: true
    };
  },
  computed: {
    ...mapState(["ref"])
  },
  methods: {
    submit(evt) {
      if (evt) {
        evt.preventDefault();
      }
      save(`${this.ref}/products`, this.form).then(() => {
        this.reset();
      });
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.name = "";
      this.price = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  created() {}
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