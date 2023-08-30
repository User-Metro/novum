import fn from "../../../utility";

function obtenerList(info: any) {
  let listData = [];
  for (let j = 0; j < Object.keys(info["listEgresosFuturos"]).length; j++) {
    const fechaCreacion = fn.convertirFecha(
      info["listEgresosFuturos"][j]["fecha_creacion"]
    );
    const fechaPago = fn.convertirFecha(
      info["listEgresosFuturos"][j]["fecha_tentativa_pago"]
    );
    const fechaEnQueSePago = fn.convertirFecha(
      info["listEgresosFuturos"][j]["fecha_pago"]
    );
    const state = fechaEnQueSePago === "Pendiente" ? "No pagado" : "Pagado";
    let validarPago;

    if (fechaEnQueSePago !== "Pendiente") {
      validarPago =
        Date.parse(info["listEgresosFuturos"][j]["fecha_pago"]) <=
        Date.parse(info["listEgresosFuturos"][j]["fecha_tentativa_pago"]);
    }

    let item = {
      id:                 info["listEgresosFuturos"][j]["egresos_futuros_id"],
      date_created:       fechaCreacion,
      id_payment_method:  info["listEgresosFuturos"][j]["tipo_pago_id"],
      payment_method:     info["listEgresosFuturos"][j]["tipos_pagos"]["tipo_pago"],
      id_category:        info["listEgresosFuturos"][j]["categoria_id"],
      category:           info["listEgresosFuturos"][j]["categorias"]["categoria"],
      name:               info["listEgresosFuturos"][j]["nombre_persona_empresa"],
      concept:            info["listEgresosFuturos"][j]["concepto"],
      amount:             info["listEgresosFuturos"][j]["monto"],
      date_to_pay:        fechaPago,
      date_to_pay_o:      fn.obtenerFecha(info["listEgresosFuturos"][j]["fecha_tentativa_pago"]),
      state:              state,
      date_cashed:        fechaEnQueSePago,
      statusCobro:        validarPago,
    };
    listData.push(item);
  }
  return listData;
}

function obtenerData(info: any): object {
  interface IData {
    Nombre: string;
    Concepto: string;
    Metodo: string;
    Categoria: string;
    Monto: string;
    Estado: string;
    FechaDeCreacion: string;
    FechaTentativaDePago: string;
    FechaEnQueSePago: string;
  }

  let listData: IData[];
  listData = [];

  for (let j = 0; j < Object.keys(info["listEgresosFuturos"]).length; j++) {
    const fechaCreacion = fn.convertirFecha(
      info["listEgresosFuturos"][j]["fecha_creacion"]
    );
    const fechaPago = fn.convertirFecha(
      info["listEgresosFuturos"][j]["fecha_tentativa_pago"]
    );
    const fechaEnQueSePago = fn.convertirFecha(
      info["listEgresosFuturos"][j]["fecha_pago"]
    );
    const state = fechaEnQueSePago === "Pendiente" ? "No pagado" : "Pagado";

    let item: {
      Nombre: string;
      Concepto: string;
      Metodo: string;
      Categoria: string;
      Monto: string;
      Estado: string;
      FechaDeCreacion: string;
      FechaTentativaDePago: string;
      FechaEnQueSePago: string;
    } = {
      Nombre: info["listEgresosFuturos"][j]["nombre_persona_empresa"],
      Concepto: info["listEgresosFuturos"][j]["concepto"],
      Metodo: info["listEgresosFuturos"][j]["tipos_pagos"]["tipo_pago"],
      Categoria: info["listEgresosFuturos"][j]["categorias"]["categoria"],
      Monto: fn.convertirModena(info["listEgresosFuturos"][j]["monto"]),
      Estado: state,
      FechaDeCreacion: fechaCreacion,
      FechaTentativaDePago: fechaPago,
      FechaEnQueSePago: fechaEnQueSePago,
    };
    listData.push(item);
  }
  return listData;
}

export default { obtenerList, obtenerData };
