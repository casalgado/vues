<template>
  <Form :formConstructor="this.formConstructor" :odata="this.odata" />
</template>
<script>
import Form from "../../form/Form";
// import { save } from "../../../firebase";
import { database } from "@/firebase";
import { mapState } from "vuex";
export default {
  name: "FormOrder",
  components: { Form },
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
            property: "client",
            label: "clientes",
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
          priority: "unitPrice"
        },
        basic: [
          { property: "date", label: "produccion", type: "date" },
          { property: "delivered", label: "entrega", type: "date" },
          { property: "paid", label: "", type: "date", hidden: true }
        ]
      }
    };
  },
  computed: {
    ...mapState(["ref", "activeForm", "dynamicFields"]),
    odata() {
      return {
        params: this.$route.params,
        path: "orders"
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
    },
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
          most_used.push({ value: "", text: "" });
          return [...most_used, ...sorted_unique_strings];
        })
        .then(options => {
          this.formConstructor.select[0].options = options;
          return options;
        });
    }
  },
  created() {
    this.setClientSpotlight();
    this.$store.commit("setActiveForm", this.scaffold(this.formConstructor));
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