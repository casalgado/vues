<template>
  <div id="selection-cont">
    <b-button id="fast-select" variant="info" @click="toggleShow">+</b-button>
    <div id="selection" v-if="show">
      <div class="flavor button">original</div>
      <div class="flavor button">integral</div>
      <div class="flavor button">queso</div>
      <div class="flavor button">zaatar</div>
      <div class="flavor button">uva</div>
      <div class="flavor button">girasol</div>
      <div class="flavor button">semillas</div>
      <div class="flavor button">ajonjoli</div>
      <div class="flavor button">pimienta</div>
      <div class="flour button">blanca</div>
      <div class="flour button">integral</div>
      <div class="size button">P</div>
      <div class="size button">M</div>
      <div class="size button">G</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastSelect.vue",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    makeSelection: function () {
      this.$emit("fast-select", this.chooseProduct("0101"));
    },
    toggleShow: function () {
      this.show = !this.show;
    },
    chooseProduct(code) {
      const productList = {
        "0101": "original grande",
        "0102": "pan de masa madre mediano",
        "0103": "pan de masa madre pequeño",
        "0201": "pan integral sin avena grande",
        "0202": "pan integral sin avena mediano",
        "0203": "pan integral sin avena pequeno",
        "0301": "pan de queso costeño grande",
        "0302": "pan de queso costeño medio",
        "0303": "pan de queso costeño pequeño",
        "0401": "pan de zaatar",
        "0402": "pan de zaatar mediano",
        "0403": "pan de zaatar pequeño",
        "0501": "pan de uva grande",
        "0502": "pan de uva mediano",
        "0503": "pan de uva pequeño",
        "0601": "pan de banano y semillas de girasol",
        "0602": "pan de banano y semillas de girasol mediano",
        "0603": "pan de banano y semillas de girasol pequeño",
        "0701": "pan de semillas grande",
        "0702": "pan 5 semillas mediano",
        "0703": "pan de semillas pequeño",
        "0801": "pan de ajonjoli grande",
        "0802": "pan de ajonjoli mediano",
        "0803": "pan de ajonjoli pequeño",
        "0901": "pan de chocolate grande",
        "0902": "pan de chocolate mediano",
        "0903": "pan de chocolate pequeño",
        "0211": "pan integral",
        "0212": "pan integral mediano",
        "0213": "pan integral pequeño",
        "0311": "pan integral de queso grande",
        "0312": "pan integral de queso mediano",
        "0313": "pan integral de queso pequeño",
        "0411": "pan integral de zaatar grande",
        "0412": "pan integral de zaatar mediano",
        "0413": "pan integral de zaatar pequeño",
        "0511": "pan integral de uva grande",
        "0512": "pan integral de uva mediano",
        "0513": "pan integral de uva pequeño",
        "0611": "pan integral de semillas y banano grande",
        "0612": "pan integral de semillas y banano mediano",
        "0613": "pan integral de semillas y banano pequeño",
        "0711": "pan integral de semillas",
        "0712": "pan integral de semillas mediano",
        "0713": "pan integral de semillas pequeño",
        "0811": "pan integral de ajonjoli grande",
        "0812": "pan integral de ajonjoli mediano",
        "0813": "pan integral de ajonjoli pequeño",
        "0911": "pan integral de chocolate grande",
        "0912": "pan integral de chocolate mediano",
        "0913": "pan integral de chocolate pequeño",
      };
      return productList[code];
    },
  },
};
</script>

<style scoped>
#fast-select {
  height: 30px;
  width: 30px;
  padding: 0px;
}

#selection-cont {
  position: relative;
}

#selection {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 300px;
  position: absolute;
  right: 10px;
  background-color: var(--color-primary);
  gap: 4px;
  border-radius: 5px;
  z-index: 99;
}

.flavor,
.size {
  grid-column: span 2;
}

.flour {
  grid-column: span 3;
}

.button {
  border: 1px solid var(--color-neutral);
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>