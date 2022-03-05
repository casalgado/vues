export const reorderProductsMixin = {
  methods: {
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
        "",
        "pan de queso costeño grande",
        "pan de queso costeño medio",
        "pan de queso costeño pequeño",
        "",
        "pan integral",
        "pan integral mediano",
        "pan integral pequeño",
        "",
        "pan de zaatar",
        "pan de zaatar mediano",
        "pan de zaatar pequeño",
        "",
        "pan de uva grande",
        "pan de uva mediano",
        "pan de uva pequeño",
        "",
        "pan de banano y semillas de girasol",
        "pan de banano y semillas de girasol mediano",
        "pan de banano y semillas de girasol pequeño",
        "",
        "pan de semillas grande",
        "pan 5 semillas mediano",
        "pan de semillas pequeño",
        "5 semillas 25% dcto",
        "5 semillas mediano 25% dcto",
        "5 semillas pequeño 25% dcto",
        "",
        "pan de ajonjoli grande",
        "pan de ajonjoli mediano",
        "pan de ajonjoli pequeño",
        "",
        "pan de chocolate grande",
        "pan de chocolate mediano",
        "pan de chocolate pequeño",
        "",
        "pimienta pequeño",
        "pimienta mediano",
        "pimienta grande",
        "",
        "pan zanahoria peq",
        "pan zanahoria mediano",
        "pan de zanahoria blanco grande",
        "",
        "pan integral sin avena grande",
        "pan integral sin avena mediano",
        "pan integral sin avena pequeno",
        "",
        "pan integral de queso grande",
        "pan integral de queso mediano",
        "pan integral de queso pequeño",
        "",
        "pan integral de zaatar grande",
        "pan integral de zaatar mediano",
        "pan integral de zaatar pequeño",
        "",
        "pan integral de uva grande",
        "pan integral de uva mediano",
        "pan integral de uva pequeño",
        "",
        "pan integral de semillas y banano grande",
        "pan integral de semillas y banano mediano",
        "pan integral de semillas y banano pequeño",
        "",
        "pan integral de semillas",
        "pan integral de semillas mediano",
        "pan integral de semillas pequeño",
        "",
        "pan integral de ajonjoli grande",
        "pan integral de ajonjoli mediano",
        "pan integral de ajonjoli pequeño",
        "",
        "pan integral de chocolate grande",
        "pan integral de chocolate mediano",
        "pan integral de chocolate pequeño",
        "",
        "pan pimienta integral peq",
        "pimienta mediano integral",
        "pan de pimienta integral grande",
        "",
        "pan de zanahoria integral pequeño",
        "pan de zanahoria integral mediano",
        "pan de zanahoria integral grande",
        "",
      ];
      let tortas = strings.filter((e) => {
        return e.includes("torta");
      });
      let potros = [
        "pan de bono",
        "pan de bono x 6",
        "pan de bono paquete",
        "",
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
