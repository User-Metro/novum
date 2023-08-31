import fn from "../../../utility";

function obtenerList(info: any) {
  let listData = [];
  for (let j = 0; j < Object.keys(info["listIngresosFuturos"]).length; j++) {
    const fechaCreacion = fn.convertirFecha(
      info["listIngresosFuturos"][j]["fecha_creacion"]
    );
    const fechaCobro = fn.convertirFecha(
      info["listIngresosFuturos"][j]["fecha_tentativa_cobro"]
    );
    const fechaEnQueSeCobro = fn.convertirFecha(
      info["listIngresosFuturos"][j]["fecha_cobro"]
    );
    const state = fechaEnQueSeCobro === "Pendiente" ? "No cobrado" : "Cobrado";
    let validarCobro;

    if (fechaEnQueSeCobro !== "Pendiente") {
      validarCobro =
        Date.parse(info["listIngresosFuturos"][j]["fecha_cobro"]) <=
        Date.parse(info["listIngresosFuturos"][j]["fecha_tentativa_cobro"]);
    }

    let item = {
      id:                 info["listIngresosFuturos"][j]["ingresos_futuros_id"],
      date_created:       fechaCreacion,
      id_payment_method:  info["listIngresosFuturos"][j]["tipo_pago_id"],
      payment_method:     info["listIngresosFuturos"][j]["tipos_pagos"]["tipo_pago"],
      id_category:        info["listIngresosFuturos"][j]["categoria_id"],
      category:           info["listIngresosFuturos"][j]["categorias"]["categoria"],
      name:               info["listIngresosFuturos"][j]["nombre_persona_empresa"],
      concept:            info["listIngresosFuturos"][j]["concepto"],
      amount:             info["listIngresosFuturos"][j]["monto"],
      date_to_pay:        fechaCobro,
      date_to_pay_o:      fn.obtenerFecha(info["listIngresosFuturos"][j]["fecha_tentativa_cobro"]),
      state:              state,
      date_cashed:        fechaEnQueSeCobro,
      statusCobro:        validarCobro,
    };
    listData.push(item);
  }
  return listData;
}

function obtenerData(info:any):object {
  interface IData {
    Nombre:                 string;
    Concepto:               string;
    Metodo:                 string;
    Categoria:              string;
    Monto:                  string;
    Estado:                 string;
    FechaDeCreacion:        string;
    FechaTentativaDeCobro:  string;
    FechaEnQueSeCobro:      string;
  }

  let listData: IData[];
  listData = [];

  for(let j=0; j < (Object.keys(info['listIngresosFuturos']).length); j++) {
    const fechaCreacion             = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_creacion']);
    const fechaCobro                = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_tentativa_cobro']);
    const fechaEnQueSeCobro         = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_cobro']);
    const state = fechaEnQueSeCobro ==="Pendiente"?'No cobrado':'Cobrado';

    let item: {
      Nombre:                 string;
      Concepto:               string;
      Metodo:                 string;
      Categoria:              string;
      Monto:                  string;
      Estado:                 string;
      FechaDeCreacion:        string;
      FechaTentativaDeCobro:  string;
      FechaEnQueSeCobro:      string;
    } = {
      Nombre:                 info["listIngresosFuturos"][j]["nombre_persona_empresa"],
      Concepto:               info["listIngresosFuturos"][j]["concepto"],
      Metodo:                 info["listIngresosFuturos"][j]["tipos_pagos"]["tipo_pago"],
      Categoria:              info["listIngresosFuturos"][j]["categorias"]["categoria"],
      Monto:                  fn.convertirModena(info["listIngresosFuturos"][j]["monto"]),
      Estado:                 state,
      FechaDeCreacion:        fechaCreacion,
      FechaTentativaDeCobro:  fechaCobro,
      FechaEnQueSeCobro:      fechaEnQueSeCobro,
    };
    listData.push(item);
  }
  return listData;
}

export default { obtenerList, obtenerData };
