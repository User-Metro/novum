import Styles                   from "./ingresos.module.scss";
import Box                      from "@mui/material/Box";
import Paper                    from "@mui/material/Paper";
import CircularProgress         from "@mui/material/CircularProgress";
import { useState }             from "react";
import fn                       from "../../utility";
import fng                      from "../../components/molecules/ingresos/funciones";
import { message }              from "antd";
import dayjs                    from "dayjs";
import type { DatePickerProps } from "antd";
import { TableCustom }          from "../../components/molecules/ingresos/tableCustom";
import { ModalBank }            from '../../components/organims/modal-bank'
//import { IngresoResponsive } from './IngresoResponsive.tsx';

let data: any;
const user_id = localStorage.getItem("user_id");

export const Ingresos = () => {
  const [open,            setOpen]              = useState(false);
  const [confirmLoading,  setConfirmLoading]    = useState(false);
  const [confirm2Loading, setConfirm2Loading]   = useState(false);
  const [messageApi,      contextHolder]        = message.useMessage();
  const [cargandoVisible, setCargandoVisible]   = useState(true);
  const [listaDatos,      setListaDatos]        = useState([]);
  const [cantidadV,       setCantidadV]         = useState<number>(0);
  const [modal2Open,      setModal2Open]        = useState(false);
  const [idIngresoStatus, setIdIngresoStatus]   = useState("0");
  const [cobrado,         setCobrado]           = useState(false);

  async function cargarDatosIngresos(
    buscar?:                    boolean,
    setListaDatos?:             any,
    ejecutarSetInitialValues?:  boolean,
    setInitialValuesTabla?:     any,
    setOpen?:                   any,
    setConfirmLoading?:         any
  ) {
    let scriptURL = localStorage.getItem("site") + "/listIngresosFuturos";
    let dataUrl;
        dataUrl   = { user_id };
    let busqueda  = "";
    let metodo_id = fn.obtenerValor("#stTipoB");
    let estado_id = fn.obtenerValor("#stEstadoB");

    if (
      metodo_id !== undefined &&
      estado_id !== undefined &&
      buscar === false
    ) {
      metodo_id = fn.obtenerValor("#stTipoB");
      estado_id = fn.obtenerValor("#stEstadoB");

      scriptURL = localStorage.getItem("site") + "/listIngresosFuturosFiltro";
      dataUrl   = { user_id, metodo_id, estado_id };
    }

    if (buscar) {
      scriptURL = localStorage.getItem("site") + "/listIngresosFuturosB";
      busqueda  = fn.obtenerValor("#txtSearch");
      dataUrl   = { user_id, busqueda };
    }

    //console.log("Data:");
    //console.log(dataUrl);
    await fetch(scriptURL, {
      method: "POST",
      body:   JSON.stringify(dataUrl),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(function (info) {
        data = fng.obtenerList(info);
        console.log(data);

        if (buscar) {
          setListaDatos(data);
        }

        if (
          metodo_id !== undefined &&
          estado_id !== undefined &&
          buscar === false
        ) {
          setListaDatos(data);
        }

        if (ejecutarSetInitialValues) {
          setInitialValuesTabla({
            hdId:         "",
            txtNombre:    "",
            txtConcepto:  "",
            stTipo:       "0",
            stCategoria:  "",
            txtMonto:     "",
            txtFechaTentativaCobro: dayjs()
          });
          setTimeout(() => {
            setListaDatos(data);
            setOpen(false);
            setConfirmLoading(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.error("Error!", error.message);
      });
  }

  if (user_id !== "" && user_id !== null) {
    cargarDatosIngresos();
  }

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setInitialValues({
      hdId:                   fn.obtenerValor("#hdId"),
      txtNombre:              fn.obtenerValor("#txtNombre"),
      txtConcepto:            fn.obtenerValor("#txtConcepto"),
      stTipo:                 fn.obtenerValor("#stTipo"),
      stCategoria:            fn.obtenerValor("#stCategoria"),
      txtMonto:               fn.obtenerValor("#txtMonto"),
      txtFechaTentativaCobro: dayjs(dateString),
    });
  };

  let idSI = setInterval(() => {
    if (!data) console.log("Vacio");
    else {
      console.log         ("amskjak");
      console.log         (data);
      console.log         ("Ja " + data.length);
      setCantidadV        (data.length);
      setListaDatos       (data);
      setCargandoVisible  (false);
      clearInterval       (idSI);
    }
  }, 1000);

  const showModal = () => {
    setOpen(true);
  };

  const showModalC = (id: any, tipo: number) => {
    tipo === 1 ? setCobrado(false) : setCobrado(true);
    setModal2Open(true);

    setTimeout(() => {
      setIdIngresoStatus(id);
    }, 500);
  };

  const buscarPorSelect = () => {
    cargarDatosIngresos(false,setListaDatos);
  }

  return (
    <Box>
      <Box    className = {Styles.nav}>
        <Box  className = {Styles.counter}>
          <p>Cuentas</p>
          <div id="NumCuenta" className={Styles.chip}>
            {cantidadV}
          </div>
        </Box>

        <Box  className = {Styles.itemSearch}>
          <Paper
            sx={{
              display:    "flex",
              alignItems: "center",
            }}
          >
          <label htmlFor="stTipoB" className={Styles.LblFilter}>Método</label>
          <select
            name        = "stTipoB"
            id          = "stTipoB"
            className   = {`${Styles.ModalSelect} ${Styles.ModalSelectBrVerde}`}
            onChange    = {buscarPorSelect}
          >
            <option value="0">Todos         </option>
            <option value="1">Efectivo      </option>
            <option value="2">Transferencia </option>
          </select>

          <label htmlFor="stEstadoB" className={Styles.LblFilter}>Estado</label>
          <select
            name      = "stEstadoB"
            id        = "stEstadoB"
            className = {`${Styles.ModalSelect} ${Styles.ModalSelectBrVerde}`}
            onChange  = {buscarPorSelect}
          >
            <option value="0">Todos       </option>
            <option value="1">Cobrados    </option>
            <option value="2">No cobrados </option>
          </select>

          </Paper>
        </Box>

        <ModalBank
          namePerson          = {true}
          txtCantidad         = {false}
          inputsIngresoEgreso = {true}
          txtConcept          = {true}
          fechaPago           = {true}
          text                = {'Ingreso futuro'}
          cargarDatos         = {cargarDatosIngresos}
        />
      </Box>

      <TableCustom
        arrays            = {listaDatos}
        showModal         = {showModal}
        setInitialValues  = {setInitialValues}
        showModalC        = {showModalC}
      />

      <Box
        className = {cargandoVisible ? "u-textCenter" : "u-textCenter u-ocultar"}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
};

{
  /*
      <Box>
        {listaDatos.map((data) => (
          <IngresoResponsive
            key={data.id}
            date_created={data.date_created}
            payment_method={data.payment_method}
            category={data.category}
            name={data.name}
            concept={data.concept}
            amount={data.amount}
            date_to_pay={data.date_to_pay}
            state={data.state}
            date_cashed={data.date_cashed}
          />
        ))}
        </Box>

         <TableCustom
        arrays={listaDatos}
        showModal={showModal}
        setInitialValues={setInitialValues}
        setModal2Open={setModal2Open}
      />
*/
}

function setInitialValues(arg0: {
  hdId: string;
  txtNombre: string;
  txtConcepto: string;
  stTipo: string;
  stCategoria: string;
  txtMonto: string;
  txtFechaTentativaCobro: dayjs.Dayjs;
}) {
  throw new Error("Function not implemented.");
}
