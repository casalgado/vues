<template>
  <b-form v-if="show" id="form" @submit="submit" @reset="reset">
    <h5 id="form-title">{{ oid ? "Editar Membresia" : "Crear Membresia" }}</h5>
    <InputSelect
      v-model="form.clientName"
      :options="this.options.client"
      :label="'cliente'"
      :allow-text="false"
    />
    <div class="addRemoveWeekButtonContainer">
      <b-button variant="danger" class="addWeek" @click="removeWeek()"
        >Eliminar Semana
      </b-button>
      <b-button variant="info" class="addWeek" @click="addWeek()"
        >Agregar Semana
      </b-button>
    </div>
    <div>
      <div v-for="(value, name) in form.plan" :key="name">
        <div class="weekdaySelectionButtonContainer">
          <b-button
            variant="dark"
            class="updateWeekdaySelection"
            @click="updateWeekday(name, { subtract: true })"
            ><span v-html="`<`"></span>
          </b-button>
          <b-button
            variant="dark"
            class="addProductForWeek"
            @click="addProduct(name)"
            >{{ expandWeekName(name) }} - {{ expandWeekDaySelection(name) }} -
            {{ productsThisWeek(name) }}
            {{
              productsThisWeek(name) == 0
                ? "agrerar producto"
                : "producto" + (productsThisWeek(name) == 1 ? "" : "s")
            }}</b-button
          >
          <b-button
            variant="dark"
            class="updateWeekdaySelection"
            @click="updateWeekday(name, { add: true })"
            ><span v-html="`>`"></span
          ></b-button>
        </div>
        <div v-for="field in value" :key="field.id">
          <transition name="fade">
            <InputDynamic
              v-if="field.active"
              :id="field.id"
              :property="'products'"
              :options="options.product"
              :priority="'unitPrice'"
              :populate="field"
              :activeWeek="name"
              :slim="false"
              @remove-field="removeField"
              @update-field="updateField"
            />
          </transition>
        </div>
      </div>
    </div>
    <b-card id="toolbox">
      <p v-if="$v.form.clientName.$error"><kbd>Debe incluir cliente</kbd></p>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-card>
  </b-form>
</template>
<script>
import { reorderProductsMixin } from "@/mixins/reorderProductsMixin";
import InputDynamic from "../../inputs/InputDynamic";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  save,
  update,
  getClientListWithMostUsedFirst,
  getById,
  getAsOptionsForSelect,
} from "@/firebase";
import { mapState } from "vuex";
import InputSelect from "../../inputs/InputSelect";
export default {
  name: "CreateProduct",
  components: { InputSelect, InputDynamic },
  mixins: [validationMixin, reorderProductsMixin],
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
        weekdaySelection: { w1: 0, w2: 0, w3: 0, w4: 0 },
        plan: {
          w1: [],
          w2: [],
          w3: [],
          w4: [],
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
      clientName: {
        required,
      },
    },
  },
  methods: {
    addWeek() {
      let weekNum = Object.keys(this.form.plan).length + 1;
      const addedWeek = `w${weekNum}`;
      setTimeout(
        function () {
          this.form.plan = Object.assign({}, this.form.plan, {
            [addedWeek]: [],
          });
          this.form.weekdaySelection = Object.assign(
            {},
            this.form.weekdaySelection,
            {
              [addedWeek]: 0,
            }
          );
        }.bind(this)
      );
    },
    removeWeek() {
      let weekNum = Object.keys(this.form.plan).length;
      const removedWeek = `w${weekNum}`;
      delete this.form.plan[removedWeek];
      delete this.form.weekdaySelection[removedWeek];
      setTimeout(
        function () {
          this.form.plan = Object.assign({}, this.form.plan);
          this.form.weekdaySelection = Object.assign(
            {},
            this.form.weekdaySelection
          );
        }.bind(this)
      );
    },
    addProduct(name) {
      let id = this.form.plan[name].length;
      this.form.plan[name].unshift({
        id: id,
        active: false,
        name: "",
        unitPrice: 1,
        quantity: 1,
        total: 1,
        code: "",
      });
      setTimeout(
        function () {
          this.form.plan[name][0].active = true;
        }.bind(this)
      );
    },
    updateField(payload) {
      const activeWeek = payload.activeWeek;
      const products = this.form.plan[activeWeek];
      products.forEach((e) => {
        if (e.id == payload.id) {
          e.name = payload.name;
          e.unitPrice = payload.unitPrice;
          e.quantity = payload.quantity;
          e.total = payload.total;
          e.code = payload.code;
        }
      });
    },
    removeField(payload) {
      const activeWeek = payload.activeWeek;
      const products = this.form.plan[activeWeek];
      products.forEach((e) => {
        if (e.id == payload.id) {
          e.active = false;
        }
      });
    },
    expandWeekName(name) {
      const weekNumber = name[1];
      return `semana ${weekNumber}`;
    },
    expandWeekDaySelection(name) {
      const weekday = this.form.weekdaySelection[name];
      return [
        null,
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
      ][weekday];
    },
    updateWeekday(name, options = {}) {
      if (options.add) {
        this.form.weekdaySelection[name] =
          (this.form.weekdaySelection[name] + 1) % 7;
      } else if (options.subtract) {
        this.form.weekdaySelection[name] =
          (this.form.weekdaySelection[name] - 1) % 7;
      }
      this.form.weekdaySelection[name] =
        (this.form.weekdaySelection[name] + 7) % 7;
    },
    productsThisWeek(name) {
      const string = `${this.form.plan[name].filter((e) => e.active).length}`;
      if (string == "0") {
        return "";
      } else {
        return string;
      }
    },
    weeksThatNeedToSelectDay(form) {
      const weeks = Object.keys(form.plan);
      let weeksThatNeedToSelectDay = [];
      for (let i = 0; i < weeks.length; i++) {
        let week = weeks[i];
        console.log(form.weekdaySelection[week]);
        if (
          form.plan[week].filter((e) => e.active == true).length >= 1 &&
          form.weekdaySelection[week] == 0
        ) {
          weeksThatNeedToSelectDay.push(week);
        }
      }
      return weeksThatNeedToSelectDay;
    },
    submit(evt) {
      evt.preventDefault();
      let alertmsg = "¿continuar?";

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
            const form = Object.assign({}, this.form);
            let weeksThatNeedDay = this.weeksThatNeedToSelectDay(this.form);
            if (weeksThatNeedDay.length == 0) {
              for (let i = 0; i < Object.keys(this.form.plan).length; i++) {
                let week = Object.keys(this.form.plan)[i];
                if (form.plan[week] == []) {
                  form.plan[week] = [{ active: true }];
                }
                form.plan[week] = form.plan[week].filter(
                  (e) => e.active == true
                );
              }
              console.log(form);
              if (this.oid === "") {
                save(this.path, this.form, this).then(() => {
                  //this.$router.push({ name: "ShowMemberships" });
                });
              } else {
                update(`${this.path}/${this.oid}`, this.form).then(() => {
                  // this.$router.push({ name: "ShowMemberships" });
                });
              }
            } else {
              this.$fire({
                title: `debe elegir dia de entrega en semana${
                  weeksThatNeedDay.length == 1 ? "" : "s"
                } ${weeksThatNeedDay.map((e) => e[1])}`,
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
      this.clientName = "";
      this.form.plan = {};
      this.form.weekdaySelection = {};
      this.$nextTick(() => {
        this.show = true;
      });
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
};
</script>

<style scoped>
* {
  margin: 5px;
}

.addRemoveWeekButtonContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}

span {
  padding: 0px;
}

.weekdaySelectionButtonContainer {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}

.weekdaySelectionButtonContainer button {
  grid-column: span 7;
  padding: 0px 0px 3px 0px;
  font-size: 90%;
  font-weight: lighter;
}

.weekdaySelectionButtonContainer button:first-child,
.weekdaySelectionButtonContainer button:last-child {
  grid-column: span 1;
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

.addWeek {
  width: 100%;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
