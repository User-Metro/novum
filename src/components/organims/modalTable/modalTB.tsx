import Box from '@mui/material/Box';
import Scss from './modalTB.module.scss';
import Styles from "../../../pages/registroIngreso/ingresos.module.scss";
import Style  from '../../../pages/registroEgreso/egreso.module.scss';
import Chip from '@mui/material/Chip';
import { Modal, message, Input, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from 'dayjs';
import fn from "../../../utility";
import type { RangePickerProps } from 'antd/es/date-picker';

let fecha_creacion_o_m: string;

export const ModalTB = ({
  ingreso,
  cobradoPagado,
  id,
  date_created_o,
  cargarDatosIngresos,
  setListaDatos,
  confirm2Loading,
  setConfirm2Loading,
  cargarDatosEgresos,
}:{
  ingreso:              boolean;
  cobradoPagado:        boolean;
  id:                   string;
  date_created_o:       any;
  cargarDatosIngresos:  Function;
  setListaDatos:        Function;
  confirm2Loading:      any;
  setConfirm2Loading:   any;
  cargarDatosEgresos:   Function;
 
}) => {
  const [modal2Open,              setModal2Open]              = useState(false);
  const [modal3Open,              setModal3Open]              = useState(false);
  const [confirm3Loading,         setConfirm3Loading]         = useState(false);
  const [idIngresoStatus,         setIdIngresoStatus]         = useState("0");
  const [idEgresoStatus,          setIdEgresoStatus]          = useState("0");
  const [cobrado,                 setCobrado]                 = useState(false);
  const [pagado,                  setPagado]                  = useState(false);
  const [ocultarFechaRealizo,     setOcultarFechaRealizo]     = useState(true);
  const [valueFechaRealizoCobro,  setValueFechaRealizoCobro]  = useState<any>('');
  const [valueFechaRealizoPago,   setValueFechaRealizoPago]   = useState<any>('');

  const cobrar = () => {
    const scriptURL           = localStorage.getItem('site')+"/cambiarCobrado"; // deberia es
    const ingresos_futuros_id = idIngresoStatus;
    const tipoFecha           = fn.obtenerValorRadio("rdRealizoCobro");
    const fechaRealizo        = dayjs(fn.obtenerValor("#txtFechaRealizoCobro"));
    const dataU               = {ingresos_futuros_id};
    setConfirm2Loading(true)
    fetch(scriptURL, {
       method:  'POST',
       body:    JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      cargarDatosIngresos(true,setListaDatos);
      setTimeout(()=> {
        setModal2Open       (false);
        setConfirm2Loading  (false);
      },600)
    })
    .catch(error => {
      console.log   (error.message);
      console.error ('Error!', error.message);
    });
  };
  
  const revertirCobro = () => {
    const scriptURL           = localStorage.getItem('site')+"/revertirCobro"; // deberia es
    const ingresos_futuros_id = idIngresoStatus;
    const dataU               = {ingresos_futuros_id};
    setConfirm2Loading(true)
    fetch(scriptURL, {
       method:  'POST',
       body:    JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      cargarDatosIngresos(true, setListaDatos);
      setTimeout(()=> {
        setModal2Open       (false);
        setConfirm2Loading  (false)
      },600)
    })
    .catch(error => {
      console.log   (error.message);
      console.error ('Error!', error.message);
    });
  };

  const showModalC = (
    id:         string, 
    tipo:       number | undefined, 
    fecha_c_o:  string | any[] | undefined | any | Date
  ) => {
    tipo === 1
      ? setCobrado(false)
      : setCobrado(true);
    setModal2Open(true);
    setValueFechaRealizoCobro('');
    setOcultarFechaRealizo(true);
    //fecha_creacion_o_m = fecha_c_o.slice(0, 10);

    setTimeout(()=>{
      setIdIngresoStatus(id);
    },500);
  };

  /*##################################*/

  const pagar = () => {
    const scriptURL           = localStorage.getItem('site')+"/cambiarPagado"; // deberia es
    const egresos_futuros_id  = idEgresoStatus;
    const tipoFecha           = fn.obtenerValorRadio("rdRealizoCobro");
    const fechaRealizo        = dayjs(fn.obtenerValor("#txtFechaRealizoCobro"));
    const dataU = {egresos_futuros_id,tipoFecha,fechaRealizo};

    setConfirm2Loading(true)
    fetch(scriptURL, {
       method:  'POST',
       body:    JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      cargarDatosEgresos(true,setListaDatos);
      setTimeout(()=> {
        setModal2Open(false);
        setConfirm2Loading(false)
      },600)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  };

  const revertirPago = () => {
    const scriptURL           = localStorage.getItem('site')+"/revertirPago"; // deberia es
    const egresos_futuros_id  = idEgresoStatus;
    const dataU               = {egresos_futuros_id};
    setConfirm2Loading(true)
    fetch(scriptURL, {
       method:  'POST',
       body:    JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      cargarDatosEgresos(true,setListaDatos);
      setTimeout(()=> {
        setModal2Open(false);
        setConfirm2Loading(false)
      },600)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  };

  const showModalP = (
    id:         string, 
    tipo:       number | undefined, 
    fecha_c_o:  string | any[] | undefined | any | Date
  ) => {
    tipo === 1
      ? setPagado(false)
      : setPagado(true);
    setModal2Open(true);
    setValueFechaRealizoCobro('');
    setOcultarFechaRealizo(true);
    //fecha_creacion_o_m = fecha_c_o.slice(0, 10);

    setTimeout(()=>{
      setIdEgresoStatus(id);
    },500);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current && current > dayjs().endOf('day');
  };

  const onChange2: DatePickerProps['onChange'] = (date, dateString) => {
    if((Date.parse(dateString) >= Date.parse(fecha_creacion_o_m)))
      setValueFechaRealizoCobro(Date.parse(dateString));
    else
      alert("La fecha no puede ser mayor a la fecha de creación");
  };

  return(
    <Box>
      {
        ingreso
        ? cobradoPagado
            ? (
              <Chip
                icon        = {<span className="icon-icoCobrar"></span>}
                size        = "small"
                label       = "Cobrado"
                className   = {Styles.chipTable}
                onClick     = {() => {
                  showModalC( id, 2, date_created_o )
                }}
              />
            )
            : (
              <Chip
                icon      = {<span className="icon-icoCobrarDismiss"></span>}
                label     = "No cobrado"
                size      = "small"
                className = {Styles.chipTableNo}
                onClick   = {() => {
                  showModalC( id, 1, date_created_o );
                }}
              />
            )
        : cobradoPagado 
            ? (
              <Chip
                icon={<span className="icon-icoCobrar"></span>}
                size="small"
                label="Pagado"
                className={Style.chipTable}
                onClick     = {() => {
                  showModalP( id, 2, date_created_o )
                }}
              />
            )
            : (
              <Chip
                icon={<span className="icon-icoCobrarDismiss"></span>}
                label="No pagado"
                size="small"
                className={Style.chipTableNo}
                onClick     = {() => {
                  showModalP( id, 1, date_created_o )
                }}
              />
            )
      }

      <Modal
        width       = {340}
        title       = ""
        centered
        open        = {modal2Open}
        onOk        = {
          ingreso 
            ? cobrado ? revertirCobro : cobrar
            : pagado  ? revertirPago  : pagar
        }
        onCancel    = {() => setModal2Open(false)}
        okText      = {
          ingreso
            ? cobrado ? "Cambiar" : "Cobrar"
            : pagado  ? "Cambiar" : "Pagar"
        }
        cancelText  = "Cancelar"
        className   = {
          ingreso
            ? cobrado
              ? `${Styles.ModalCobrar} Cobrado u-textCenter`
              : `${Styles.ModalCobrar} u-textCenter`
            : pagado
              ? `${Styles.ModalCobrar} Cobrado u-textCenter`
              : `${Styles.ModalCobrar} u-textCenter`
        }
        confirmLoading={confirm2Loading}
      >
        <form
          className = {Styles.ModalForm}
          name      = "formEstadoCobro"
          id        = "formEstadoCobro"
          method    = "post"
        >
          <input
            type    = "hidden"
            name    = "idIngresoFuturo"
            id      = "idIngresoFuturo"
            value   = {idIngresoStatus}
          />

          <input 
            type    = "hidden" 
            name    = "idEgresoFuturo" 
            id      = "idEgresoFuturo" 
            value   = {idEgresoStatus} 
          />
          <span
            className={cobrado ? "icon-icoCobrarDismiss" : "icon-icoCobrar"}
          ></span>
          {/* <p><strong>{cobrado?"¿Este ingreso ya fue cobrado, desea cambiarlo?":"Deseas cobrar esta deuda, se creará un registro de cobro"}</strong></p>*/}
          <p>
            <strong>
              {
                ingreso
                  ? cobrado
                      ? '¿Este ingreso ya fue cobrado, desea cambiarlo?'
                      : ''
                  : pagado
                      ? '¿Este egreso ya fue pagado, desea cambiarlo?'
                      : ''
              }
            </strong>
          </p>
          {
            ingreso
              ? !cobrado
                  ? (
                    <div className="u-textLeft">
                      <p className={Styles.RadioFechaAnterior}><strong>Fecha en que se realizo el cobro:</strong></p>
                      <div>
                        <input
                          type="radio"
                          name="rdRealizoCobro"
                          id="rdRealizoCobro1"
                          value="1"
                          checked={ocultarFechaRealizo?true:false}
                          onClick={()=>{setValueFechaRealizoCobro(''); setOcultarFechaRealizo(true);}}
                        />
                        <label className={Styles.ModalLabelRealizoCobro} htmlFor="rdRealizoCobro1"><strong>Hoy</strong></label>
                      </div>
                      <div className={Styles.RadioFechaAnterior}>
                        <input
                          type="radio"
                          name="rdRealizoCobro"
                          id="rdRealizoCobro2"
                          value="2"
                          checked={ocultarFechaRealizo?false:true}
                          onClick={()=>{setOcultarFechaRealizo(false);}}
                        />
                        <label className={Styles.ModalLabelRealizoCobro} htmlFor="rdRealizoCobro2"><strong>Fecha anterior</strong></label>
                      </div>
        
                      <DatePicker
                        className={`${Styles.ModalCantidad} ${Styles.ModalRealizoCobro} ${ocultarFechaRealizo?'u-ocultar':null}`}
                        id='txtFechaRealizoCobro'
                        name='txtFechaRealizoCobro'
                        placeholder='Fecha en que se realizo'
                        value={valueFechaRealizoCobro}
                        onChange={onChange2}
                        disabledDate={disabledDate}
                      />
                    </div>
                  )
                  : null
              : !pagado
                  ? (
                    <div className="u-textLeft">
                      <p className={Styles.RadioFechaAnterior}><strong>Fecha en que se realizo el pago:</strong></p>
                      <div>
                        <input
                          type="radio"
                          name="rdRealizoCobro"
                          id="rdRealizoCobro1"
                          value="1"
                          checked={ocultarFechaRealizo?true:false}
                          onClick={()=>{setValueFechaRealizoPago(''); setOcultarFechaRealizo(true);}}
                        />
                        <label className={Styles.ModalLabelRealizoPago} htmlFor="rdRealizoCobro1"><strong>Hoy</strong></label>
                      </div>
                      <div className={Styles.RadioFechaAnterior}>
                        <input
                          type="radio"
                          name="rdRealizoCobro"
                          id="rdRealizoCobro2"
                          value="2"
                          checked={ocultarFechaRealizo?false:true}
                          onClick={()=>{setOcultarFechaRealizo(false);}}
                        />
                        <label className={Styles.ModalLabelRealizoPago} htmlFor="rdRealizoCobro2"><strong>Fecha anterior</strong></label>
                      </div>

                      <DatePicker
                        className={`${Styles.ModalCantidad} ${Styles.ModalRealizoPago} ${ocultarFechaRealizo?'u-ocultar':null}`}
                        id='txtFechaRealizoCobro'
                        name='txtFechaRealizoCobro'
                        placeholder='Fecha en que se realizo'
                        value={valueFechaRealizoPago}
                        onChange={onChange2}
                        disabledDate={disabledDate}
                      />
                    </div>
                  )
                  : null
          }
        </form>
      </Modal>

    </Box>
  )
}