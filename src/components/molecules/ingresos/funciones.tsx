import fn from "../../../utility";

function obtenerList(info: any) {
  let listData = [];
  for(let j=0; j < (Object.keys(info['listIngresosFuturos']).length); j++) {
    const fechaCreacion = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_creacion']);
    const fechaCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_tentativa_cobro']);
    const fechaEnQueSeCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_cobro']);
    const state = fechaEnQueSeCobro?fechaEnQueSeCobro:'No cobrado';

    let item = {
      "id": info['listIngresosFuturos'][j]['ingresos_futuros_id'],
      "date_created": fechaCreacion,
      "id_payment_method": info['listIngresosFuturos'][j]['tipo_pago_id'],
      "payment_method": info['listIngresosFuturos'][j]['tipos_pagos']['tipo_pago'],
      "id_category": info['listIngresosFuturos'][j]['categoria_id'],
      "category": info['listIngresosFuturos'][j]['categorias']['categoria'],
      "name": info['listIngresosFuturos'][j]['nombre_persona_empresa'],
      "concept": info['listIngresosFuturos'][j]['concepto'],
      "amount": info['listIngresosFuturos'][j]['monto'],
      "date_to_pay": fechaCobro,
      "date_to_pay_o": fn.obtenerFecha(info['listIngresosFuturos'][j]['fecha_tentativa_cobro']),
      "state": state,
      "date_cashed": fechaEnQueSeCobro
    }
     listData.push(item);
  }
  return listData;
}

export default {obtenerList};