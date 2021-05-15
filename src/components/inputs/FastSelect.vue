<template>
  <div id="selection-cont">
    <b-button id="fast-select" variant="info" @click="toggleShow">+</b-button>
    <div id="selection" v-if="show">
      <div class="text sp6">masa madre</div>
      <div @click="setCode('xx0x')" id="hb" class="button btn sp3 mb">
        blanca
      </div>
      <div @click="setCode('xx1x')" id="hi" class="button btn sp3 mb">
        integral
      </div>

      <div @click="setCode('01xx')" id="og" class="button btn sp2">
        original
      </div>
      <div @click="setCode('02xx')" id="it" class="button btn sp2">
        integral
      </div>
      <div @click="setCode('03xx')" id="qs" class="button btn sp2">
        queso
      </div>
      <div @click="setCode('04xx')" id="zt" class="button btn sp2">
        zaatar
      </div>
      <div @click="setCode('05xx')" id="uv" class="button btn sp2">uva</div>
      <div @click="setCode('06xx')" id="gs" class="button btn sp2">
        girasol
      </div>
      <div @click="setCode('07xx')" id="sm" class="button btn sp2">
        semillas
      </div>
      <div @click="setCode('08xx')" id="aj" class="button btn sp2">
        ajonjoli
      </div>
      <div @click="setCode('09xx')" id="ch" class="button btn sp2">
        chocolate
      </div>

      <div @click="setCode('xxx3')" id="peq" class="button btn sp2 mt mb">
        P
      </div>
      <div @click="setCode('xxx2')" id="med" class="button btn sp2 mt mb">
        M
      </div>
      <div @click="setCode('xxx1')" id="gra" class="button btn sp2 mt mb">
        G
      </div>
      <div class="text sp6">tortas</div>
      <div @click="setCode('xxx2')" id="peq" class="button btn sp3">mini</div>
      <div @click="setCode('xxx1')" id="med" class="button btn sp3">norm</div>
      <div @click="setCode('990x')" id="sm" class="button btn sp2">
        banano
      </div>
      <div @click="setCode('980x')" id="aj" class="button btn sp2">
        naranja
      </div>
      <div @click="setCode('970x')" id="ch" class="button btn sp2">
        zanahoria
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastSelect.vue",
  data() {
    return {
      show: false,
      code: "xxxx",
    };
  },
  methods: {
    makeSelection: function(code) {
      this.$emit("fast-select", this.chooseProduct(code));
    },
    toggleShow: function() {
      this.show = !this.show;
    },
    setCode(input) {
      let newCode = [];
      let ready = 0;
      this.code.split("").forEach(function(e, i) {
        if (parseInt(input[i]) + 1) {
          e = input[i];
        }
        if (parseInt(e) + 1) {
          ready++;
        }
        newCode.push(e);
      });
      newCode = newCode.join("");
      this.code = newCode;
      console.log(ready);
      if (ready == 4) {
        this.makeSelection(this.code);
        this.toggleShow();
        this.code = "xxxx";
      }
      console.log(this.code);
    },
    chooseProduct(code) {
      const productList = {
        "0101": "original grande",
        "0102": "pan de masa madre mediano",
        "0103": "pan de masa madre pequeño",
        "0111": "pan integral sin avena grande",
        "0112": "pan integral sin avena mediano",
        "0113": "pan integral sin avena pequeno",
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
        "0201": "pan integral",
        "0202": "pan integral mediano",
        "0203": "pan integral pequeño",
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
        "9902": "mini torta de banano",
        "9802": "mini torta de naranja",
        "9702": "mini torta de zanahoria",
        "9901": "torta de pan con banano",
        "9801": "torta de naranja",
        "9701": "torta de zanahoria",
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
  padding: 10px;
}

.text {
  text-transform: uppercase;
  font-size: 12px;
}

.sp6 {
  grid-column: span 6;
}

.sp3 {
  grid-column: span 3;
}

.sp2 {
  grid-column: span 2;
}

.mb {
  margin-bottom: 5px;
}

.mt {
  margin-top: 5px;
}

.button {
  border: 1px solid var(--color-neutral);
  color: var(--color-neutral);
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.button:hover {
  opacity: 0.5;
}
</style>
