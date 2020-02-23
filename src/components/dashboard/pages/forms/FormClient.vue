<template>
  <div>
    <InputBasic v-model="form.name" :type="'text'" :label="'nombre'" />
    <InputBasic v-model="form.phone" :type="'text'" :label="'telefono'" />
    <b-card class="mt-3">
      <pre class="m-0">{{ this.form }}</pre>
    </b-card>
  </div>
</template>
<script>
import InputBasic from "../../inputs/InputBasic";
// import { save } from "../../../firebase";
// import { database } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "FormClient",
  components: { InputBasic },
  data() {
    return {
      form: {
        name: "",
        phone: "",
        address: "",
        birthday: "",
        details: "",
        comment: ""
      }
    };
  },
  computed: {
    ...mapState(["ref", "activeForm", "dynamicFields"])
  },
  methods: {},
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