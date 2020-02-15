<template>
  <RenderForm :formConstructor="this.formConstructor" :object="this.object" />
</template>
<script>
import RenderForm from "./RenderForm";
// import { save } from "../../../firebase";
import { mapState } from "vuex";
export default {
  name: "ExpensesForm",
  components: { RenderForm },
  data() {
    return {
      /* 
      The formConstructor object is sent to the RenderForm component.
      RenderForm uses it to create the inputs described in formConstructor.
      In order for the inputs to send back data, they update the state.
      activeForm and dynamicFields are the state properties updated by inputs. 
      On Submit, RenderForm combines both state properties to create an object that is saved to database.

      The schema of the saved object is determined by formConstructor. 
      formConstructor must have the following structure:

      formConstructor: {
        select: [ { }, ... ],
        dynamic: { },
        basic: [ { }, ... ]
      }

      there are 3 types of fields: select, dynamic, and basic

      select and basic are arrays of objects. 
      dynamic is an object
      these objects contain the field properties

      field properties depend on type
        basic  : property, label, type
        select : property, label, options
        dynamyc: property, label, options, priority 
        optional for all types: a { hidden: Boolean } property set to true to hide specific field
      */
      formConstructor: {
        select: [
          {
            property: "provider",
            label: "proveedor",
            options: []
          },
          {
            property: "category",
            label: "categoria",
            options: []
          }
        ],
        dynamic: {
          property: "products",
          label: "productos",
          options: [
            { value: "p", text: "pounhon" },
            { value: "a", text: "a" },
            { value: "b", text: "b" },
            { value: "c", text: "c" },
            { value: "d", text: "d" }
          ],
          priority: "total"
        },
        basic: [{ property: "date", label: "produccion", type: "date" }]
      }
    };
  },
  computed: {
    ...mapState(["activeForm", "dynamicFields"]),
    object() {
      return {
        params: this.$route.params,
        ref: "expenses"
      };
    }
  },
  methods: {
    scaffold() {
      let schema = [];
      // select
      this.formConstructor.select.forEach(e => {
        schema[e.property] = "";
      });
      // dynamic
      schema[this.formConstructor.dynamic.property] = [];
      // basic
      this.formConstructor.basic.forEach(e => {
        schema[e.property] = "";
      });
      return schema;
    }
  },
  created() {
    this.$store.commit("setActiveForm", this.scaffold(this.formConstructor));
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