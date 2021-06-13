<template>
  <b-form v-if="show" id="form" @submit="submit" @reset="reset">
    <h5 id="form-title">{{ oid ? "Editar Membresia" : "Crear Membresia" }}</h5>
    <InputSelect
      v-model="form.clientName"
      :options="this.options.client"
      :label="'cliente'"
      :allow-text="false"
    />
    <div>
      <div v-for="(value, name) in form.plan" :key="name">
        <b-button variant="info" @click="addProduct(name)">+ producto</b-button>
        <div v-for="field in value" :key="field.id">
          <transition name="fade">
            <InputDynamic
              v-if="field.active"
              :id="field.id"
              :property="'products'"
              :options="options.product"
              :priority="'unitPrice'"
              :populate="field"
              @remove-field="removeField"
              @update-field="updateField"
            />
          </transition>
        </div>
      </div>
    </div>

    <b-card id="toolbox">
      <p v-if="$v.form.client.$error"><kbd>Debe incluir cliente</kbd></p>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-card>
  </b-form>
</template>
<script>
import InputDynamic from "../../inputs/InputDynamic";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  save,
  getClientListWithMostUsedFirst,
  getById,
  update,
  getAsOptionsForSelect,
} from "@/firebase";
import { mapState } from "vuex";
import InputSelect from "../../inputs/InputSelect";
export default {
  name: "CreateProduct",
  components: { InputSelect, InputDynamic },
  mixins: [validationMixin],
  props: {
    oid: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      form: {
        clientName: "",
        plan: {
          w1: [
            {
              id: 0,
              active: true,
              name: "",
              unitPrice: 0,
              quantity: 1,
              total: 0,
            },
          ],
          w2: [
            {
              id: 0,
              active: true,
              name: "",
              unitPrice: 0,
              quantity: 1,
              total: 0,
            },
          ],
          w3: [
            {
              id: 0,
              active: true,
              name: "",
              unitPrice: 0,
              quantity: 1,
              total: 0,
            },
          ],
          w4: [
            {
              id: 0,
              active: true,
              name: "",
              unitPrice: 0,
              quantity: 1,
              total: 0,
            },
          ],
        },
      },
      options: {
        client: [],
        product: [],
      },
      show: true,
      path: "memberships",
    };
  },
  validations: {
    form: {
      client: {
        required,
      },
    },
  },
  computed: {
    ...mapState(["ref"]),
  },
  beforeCreate() {
    Promise.all([
      getClientListWithMostUsedFirst(20).then((options) => {
        options.unshift({ value: "", text: "cliente" });
        this.options.client = options;
      }),
      getAsOptionsForSelect("products").then((options) => {
        options = this.reorder(options);
        options.unshift({ value: "", text: "producto" });
        this.options.product = options;
      }),
    ]).then(() => {
      if (this.oid !== "") {
        getById(this.path, this.oid).then((object) => {
          this.form.client = object.client;
          this.form.price = object.price.toString();
          this.form.recipe = object.recipe.toString();
          this.form.category = object.category;
        });
      }
    });
  },
  methods: {
    addProduct(name) {
      console.log(name);
    },
    removeField() {},
    updateField() {},
    submit(evt) {
      evt.preventDefault();
      let alertmsg = "¿continuar?";
      if (this.oldname !== this.form.name) {
        alertmsg = "¿continuar y renombrar producto?";
      }
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        this.submitStatus = "ERROR";
      } else {
        this.$fire({
          title: alertmsg,
          showCancelButton: true,
        }).then((alertStatus) => {
          if (alertStatus.dismiss) {
            console.log("dismiss");
          } else {
            this.form.name = this.form.name.toLowerCase().trim();
            if (this.oid === "") {
              save(this.path, this.form, this).then(() => {
                this.$router.push({ name: "ShowProducts" });
              });
            } else {
              update(`${this.path}/${this.oid}`, this.form).then(() => {
                this.$router.push({ name: "ShowProducts" });
              });
            }
          }
        });
      }
    },
    reset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.name = "";
      this.price = "";
      this.recipe = "";
      this.category = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    reorder(products) {
      let strings = products.map((e) => {
        return e.text;
      });
      let sorted = [
        "domicilio",
        "descuento referente 30%",
        "descuento referido 25%",
        "iva 19%",
        "",
        "original grande",
        "pan de masa madre mediano",
        "pan de masa madre pequeño",
        "original 25% dcto",
        "original mediano 25% dcto",
        "original pequeño 25% dcto",
        "original 30% dcto",
        "original mediano 30% dcto",
        "original pequeño 30% dcto",
        "",
        "pan de queso costeño grande",
        "pan de queso costeño medio",
        "pan de queso costeño pequeño",
        "queso costeño 25% dcto",
        "queso mediano 25% dcto",
        "queso pequeño 25% dcto",
        "queso costeño 30% dcto",
        "queso mediano 30% dcto",
        "queso pequeño 30% dcto",
        "",
        "pan integral",
        "pan integral mediano",
        "pan integral pequeño",
        "integral y avena 25% dcto",
        "integral y avena mediano 25% dcto",
        "integral y avena pequeño 25% dcto",
        "integral y avena 30% dcto",
        "integral y avena mediano 30% dcto",
        "integral y avena pequeño 30% dcto",
        "",
        "pan de zaatar",
        "pan de zaatar mediano",
        "pan de zaatar pequeño",
        "zaatar 25% dcto",
        "zaatar mediano 25% dcto",
        "zaatar pequeño 25% dcto",
        "zaatar 30% dcto",
        "zaatar mediano 30% dcto",
        "zaatar pequeño 30% dcto",
        "",
        "pan de uva grande",
        "pan de uva mediano",
        "pan de uva pequeño",
        "uva fermentada 25% dcto",
        "uva mediano 25% dcto",
        "uva pequeño 25% dcto",
        "uva fermentada 30% dcto",
        "uva mediano 30% dcto",
        "uva pequeño 30% dcto",
        "",
        "pan de banano y semillas de girasol",
        "pan de banano y semillas de girasol mediano",
        "pan de banano y semillas de girasol pequeño",
        "",
        "girasol y banano mediano 25% dcto",
        "girasol y banano pequeño 25% dcto",
        "",
        "girasol y banano mediano 30% dcto",
        "girasol y banano pequeño 30% dcto",
        "",
        "pan de semillas grande",
        "pan 5 semillas mediano",
        "pan de semillas pequeño",
        "5 semillas 25% dcto",
        "5 semillas mediano 25% dcto",
        "5 semillas pequeño 25% dcto",
        "5 semillas 30% dcto",
        "5 semillas mediano 30% dcto",
        "5 semillas pequeño 30% dcto",
        "",
        "pan de ajonjoli grande",
        "pan de ajonjoli mediano",
        "pan de ajonjoli pequeño",
        "ajonjolí 25% dcto",
        "ajonjolí mediano 25% dcto",
        "ajonjolí pequeño 25% dcto",
        "ajonjolí 30% dcto",
        "ajonjolí mediano 30% dcto",
        "ajonjolí pequeño 30% dcto",
        "",
        "pan de chocolate grande",
        "pan de chocolate mediano",
        "pan de chocolate pequeño",
        "",
        "chocolate mediano 25% dcto",
        "chocolate pequeño 25% dcto",
        "",
        "chocolate mediano 30% dcto",
        "chocolate pequeño 30% dcto",
        "",
        "pan integral sin avena grande",
        "pan integral sin avena mediano",
        "pan integral sin avena pequeno",
        "integral original 25% dcto",
        "integral original mediano 25% dcto",
        "integral original pequeño 25% dcto",
        "integral original 30% dcto",
        "integral original mediano 30% dcto",
        "integral original pequeño 30% dcto",
        "",
        "pan integral de queso grande",
        "pan integral de queso mediano",
        "pan integral de queso pequeño",
        "integral queso costeño 25% dcto",
        "integral queso mediano 25% dcto",
        "integral queso pequeño 25% dcto",
        "integral queso costeño 30% dcto",
        "integral queso mediano 30% dcto",
        "integral queso pequeño 30% dcto",
        "",
        "pan integral de zaatar grande",
        "pan integral de zaatar mediano",
        "pan integral de zaatar pequeño",
        "integral zaatar 25% dcto",
        "integral zaatar mediano 25% dcto",
        "integral zaatar pequeño 25% dcto",
        "integral zaatar 30% dcto",
        "integral zaatar mediano 30% dcto",
        "integral zaatar pequeño 30% dcto",
        "",
        "pan integral de uva grande",
        "pan integral de uva mediano",
        "pan integral de uva pequeño",
        "integral uva fermentada 25% dcto",
        "integral uva mediano 25% dcto",
        "integral uva pequeño 25% dcto",
        "integral uva fermentada 30% dcto",
        "integral uva mediano 30% dcto",
        "integral uva pequeño 30% dcto",
        "",
        "pan integral de semillas y banano grande",
        "pan integral de semillas y banano mediano",
        "pan integral de semillas y banano pequeño",
        "integral semillas de girasol 25% dcto",
        "integral girasol y banano mediano 25% dcto",
        "integral girasol y banano pequeño 25% dcto",
        "integral semillas de girasol 30% dcto",
        "integral girasol y banano mediano 30% dcto",
        "integral girasol y banano pequeño 30% dcto",
        "",
        "pan integral de semillas",
        "pan integral de semillas mediano",
        "pan integral de semillas pequeño",
        "integral 5 semillas 25% dcto",
        "integral 5 semillas mediano 25% dcto",
        "integral 5 semillas pequeño 25% dcto",
        "integral 5 semillas 30% dcto",
        "integral 5 semillas mediano 30% dcto",
        "integral 5 semillas pequeño 30% dcto",
        "",
        "pan integral de ajonjoli grande",
        "pan integral de ajonjoli mediano",
        "pan integral de ajonjoli pequeño",
        "integral ajonjolí 25% dcto",
        "integral ajonjolí mediano 25% dcto",
        "integral ajonjolí pequeño 25% dcto",
        "integral ajonjolí 30% dcto",
        "integral ajonjolí mediano 30% dcto",
        "integral ajonjolí pequeño 30% dcto",
        "",
        "pan integral de chocolate grande",
        "pan integral de chocolate mediano",
        "pan integral de chocolate pequeño",
        "",
        "integral chocolate mediano 25% dcto",
        "integral chocolate pequeño 25% dcto",
        "",
        "integral chocolate mediano 30% dcto",
        "integral chocolate pequeño 30% dcto",
      ];
      let tortas = strings.filter((e) => {
        return e.includes("torta");
      });
      let potros = [
        "pan de bono paquete",
        "pan de hamburguesa",
        "pan de hamburguesa integral",
      ];
      let remove = [
        "brownie de coco",
        "brownie de mantequilla de mani",
        "domicilio reembolsable",
        "excedente",
        "fermento de pimenton",
        "galleta de jengibre",
        "harina",
        "helado de cafe",
        "helado de maracuya",
        "helado de nispero",
        "helado de yogurt",
        "integral de queso mediano",
        "pan de bono",
        "pan de bono paquete",
        "pan de cafe pequeño",
        "pan de hamburguesa",
        "pan de hamburguesa integral",
        "pan de semillas grande ",
        "pan de semillas mediano ",
        "pan de semillas y banano mediano",
        "pan de uva integral pequeño",
        "pan integral de queso mediano",
        "pan integral de zaatar mediano",
        "pan integral pequeño",
        "pan integral sin avena pequeno",
        "pan mini masa madre",
        "pan queso costeño pequeño",
        "pan sin avena grande",
      ];
      strings = strings
        .filter((e) => {
          return !sorted.includes(e);
        })
        .filter((e) => {
          return !tortas.includes(e);
        })
        .filter((e) => {
          return !remove.includes(e);
        });
      sorted = [...sorted, ...potros, "", ...tortas, "", ...strings];
      products = sorted.map((e) => {
        return { text: e, value: e };
      });

      return products;
    },
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
</style>
