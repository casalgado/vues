<template>
  <div id="selection-cont">
    <div class="button-cont">
      <b-button class="fast-select" variant="info" @click="toggleBtoC"
        >+</b-button
      >
      <b-button class="fast-select" variant="warning" @click="toggleElDiario"
        >+</b-button
      >
    </div>

    <div class="selection" v-if="showBtoC">
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
      <div @click="setCode('03xx')" id="qs" class="button btn sp2">queso</div>
      <div @click="setCode('04xx')" id="zt" class="button btn sp2">zaatar</div>
      <div @click="setCode('13xx')" id="uv" class="button btn sp2">
        aceituna
      </div>
      <div @click="setCode('06xx')" id="gs" class="button btn sp2">girasol</div>
      <div @click="setCode('07xx')" id="sm" class="button btn sp2">
        semillas
      </div>
      <div @click="setCode('08xx')" id="aj" class="button btn sp2">
        ajonjoli
      </div>
      <div @click="setCode('09xx')" id="ch" class="button btn sp2">
        chocolate
      </div>
      <div @click="setCode('10xx')" id="pim" class="button btn sp2">
        pimienta
      </div>
      <div @click="setCode('11xx')" id="og" class="button btn sp2">
        zanahoria
      </div>
      <div @click="setCode('31x1')" id="pim" class="button btn sp2">molde</div>

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
      <div @click="setCode('xxx2')" id="" class="button btn sp3">mini</div>
      <div @click="setCode('xxx1')" id="" class="button btn sp3">norm</div>
      <div @click="setCode('990x')" id="sm" class="button btn sp2">banano</div>
      <div @click="setCode('980x')" id="og" class="button btn sp2">naranja</div>
      <div @click="setCode('970x')" id="qs" class="button btn sp2">
        zanahoria
      </div>
      <div class="text sp6">pan de bonos</div>
      <div @click="setCode('2110')" id="" class="button btn sp2">x 1</div>
      <div @click="setCode('2111')" id="" class="button btn sp2">x 6</div>
      <div @click="setCode('2112')" id="" class="button btn sp2">x 12</div>
      <div class="text sp6">otros</div>
      <div @click="setCode('3113')" id="" class="button btn sp3">
        sin gluten
      </div>
      <div @click="setCode('3114')" id="" class="button btn sp3">
        panes surtidos
      </div>
    </div>
    <div class="selection" v-if="showElDiario">
      <div class="text sp6">deditos</div>
      <div @click="setCode('4311')" id="og" class="button btn sp3">
        dedito holaya
      </div>
      <div @click="setCode('4321')" id="sm" class="button btn sp3">
        dedito integral
      </div>
      <div class="text sp6">mini tortas</div>
      <div @click="setCode('4231')" id="zt" class="button btn sp3">banano</div>
      <div @click="setCode('4221')" id="zt" class="button btn sp3">naranja</div>

      <div class="text sp6">masa madre</div>
      <div @click="setCode('5101')" id="og" class="button btn sp2">
        original
      </div>
      <div @click="setCode('5102')" id="it" class="button btn sp2">
        integral
      </div>
      <div @click="setCode('5103')" id="qs" class="button btn sp2">queso</div>
      <div @click="setCode('5104')" id="sm" class="button btn sp2">
        semillas
      </div>
      <div @click="setCode('5105')" id="ch" class="button btn sp2">
        chocolate
      </div>
      <div @click="setCode('5106')" id="zt" class="button btn sp2">zaatar</div>

      <div class="text sp6">otros</div>
      <div @click="setCode('4411')" id="qs" class="button btn sp2">
        pan de bono
      </div>
      <div @click="setCode('4111')" id="qs" class="button btn sp2">
        pan cuadrado
      </div>
      <div @click="setCode('4121')" id="qs" class="button btn sp2">
        pan flautas
      </div>
      <div class="text sp6">dulce</div>
      <div @click="setCode('4511')" id="pim" class="button btn sp2">
        brownie normal
      </div>
      <div @click="setCode('4611')" id="pim" class="button btn sp2">
        galleta chocolate
      </div>
      <div @click="setCode('4711')" id="pim" class="button btn sp2">
        rollo canela
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastSelect.vue",
  data() {
    return {
      showBtoC: false,
      showElDiario: false,
      code: "xxxx",
    };
  },
  methods: {
    makeSelection: function (code) {
      this.$emit("fast-select", this.chooseProduct(code));
    },
    hideAll() {
      this.showElDiario = false;
      this.showBtoC = false;
    },
    toggleBtoC: function () {
      this.showBtoC = !this.showBtoC;
      this.showElDiario = false;
    },
    toggleElDiario: function () {
      this.showElDiario = !this.showElDiario;
      this.showBtoC = false;
    },
    setCode(input) {
      let newCode = [];
      let ready = 0;
      this.code.split("").forEach(function (e, i) {
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
        this.hideAll();
        this.code = "xxxx";
      }
      console.log(this.code);
    },
    chooseProduct(code) {
      console.log(code);
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
        1003: "pimienta pequeño",
        1002: "pimienta mediano",
        1001: "pimienta grande",
        1013: "pan pimienta integral peq",
        1012: "pimienta mediano integral",
        1011: "pan de pimienta integral grande",
        1103: "pan zanahoria peq",
        1102: "pan zanahoria mediano",
        1101: "pan de zanahoria blanco grande",
        1113: "pan de zanahoria integral pequeño",
        1112: "pan de zanahoria integral mediano",
        1111: "pan de zanahoria integral grande",

        1303: "pan pequeño aceituna",
        1302: "pan mediano aceituna",
        1301: "pan grande aceituna",

        1313: "integral pan de aceituna pequeño",
        1312: "integral pan de aceituna mediano",
        1311: "integral pan de aceituna grande",

        3101: "pan de molde",
        3111: "pan de molde integral",

        9902: "mini torta de banano",
        9802: "mini torta de naranja",
        9702: "mini torta de zanahoria",
        9901: "torta de pan con banano",
        9801: "torta de naranja",
        9701: "torta de zanahoria",

        2110: "pan de bono",
        2111: "pan de bono x 6",
        2112: "pan de bono paquete",

        3113: "pan sin gluten x 6",
        3114: "panes surtidos",

        4111: "cafe pan cuadrado",
        4121: "cafe pan flautas",
        4211: "mini torta de zanahoria",
        4221: "cafe mini torta de naranja",
        4231: "cafe mini torta de banano",
        4311: "cafe dedito holaya",
        4321: "cafe dedito integral",
        4411: "cafe pandebono",
        4511: "cafe brownie normal",
        4521: "cafe brownie vegano",
        4611: "cafe galleta de chocolate",
        4711: "cafe rollo de canela",

        5101: "original mediano 25% dcto",
        5102: "integral y avena mediano 25% dcto",
        5103: "queso mediano 25% dcto",
        5104: "5 semillas mediano 25% dcto",
        5105: "chocolate mediano 25% dcto",
        5106: "zaatar mediano 25% dcto",
      };
      return productList[code];
    },
  },
};
</script>

<style scoped>
.button-cont {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.fast-select {
  height: 30px;
  width: 30px;
  padding: 0px;
}

#selection-cont {
  position: relative;
}

.selection {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 300px;
  position: absolute;
  top: -150px;
  right: 80px;
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

#og {
  color: #e6e6e6;
  background-color: #c4761a;
}
#it {
  color: #c4761a;
  background-color: #e6e6e6;
}
#qs {
  color: #e6e6e6;
  background-color: #7f311c;
}
#zt {
  color: #e6e6e6;
  background-color: #484d29;
}
#uv {
  color: #e6e6e6;
  background-color: #463a3a;
}
#gs {
  color: #e6e6e6;
  background-color: #ba6128;
}
#sm {
  color: #e6e6e6;
  background-color: #a4976e;
}
#aj {
  color: #e6e6e6;
  background-color: #b2937e;
}
#ch {
  color: #e6e6e6;
  background-color: #270028;
}
#pim {
  color: #e6e6e6;
  background-color: #575757;
}

#peq {
  font-size: 0.6em;
  padding-top: 10px;
}

#med {
  font-size: 0.8em;
  padding-top: 8px;
}
</style>
