import Styles                   from "./egreso.module.scss";
import Box                      from "@mui/material/Box";
import CircularProgress         from "@mui/material/CircularProgress";
import { useState }             from "react";
import fn                       from "../../utility";
import fng                      from "../../components/atoms/egresos/funciones";
import { message }              from "antd";
import dayjs                    from "dayjs";
import { TableCustom }          from "../../components/molecules/table/tableCustom";
import { ModalBank }            from '../../components/organims/modalRegister'
import { NavBar }               from '../../components/organims/navBar';
import * as XLSX                from 'xlsx';
//import { IngresoResponsive } from './IngresoResponsive.tsx';

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
let data:     any;
const user_id = localStorage.getItem("user_id");

async function cargarDatosEgresos(
  buscar?:                    boolean,
  setListaDatos?:             any,
  ejecutarSetInitialValues?:  boolean,
  setInitialValuesTabla?:     any,
  setOpen?:                   any,
  setConfirmLoading?:         any
) {
  let scriptURL = localStorage.getItem("site") + "/listEgresosFuturos";
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

    scriptURL = localStorage.getItem("site") + "/listEgresosFuturosFiltro";
    dataUrl   = { user_id, metodo_id, estado_id };
  }

  if (buscar) {
    scriptURL = localStorage.getItem("site") + "/listEgresosFuturosB";
    busqueda  = fn.obtenerValor("#txtSearch");
    dataUrl   = { user_id, busqueda };
  }

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
      listData = [];
      listData = Object.assign(fng.obtenerData(info));
      //console.log(data);

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
  cargarDatosEgresos();
}

export const Egresos = () =>{

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
const [stMetodo,        setStMetodo]          = useState(0);
const [stEstado,        setStEstado]          = useState(0);

const [initialValues, setInitialValues] = useState({
  hdId:                   "",
  txtNombre:              "",
  txtConcepto:            "",
  stTipo:                 "",
  stCategoria:            "",
  txtMonto:               "",
  txtFechaTentativaCobro: ""
});

let idSI = setInterval(() => {
  if (!data) console.log("Vacio");
  else {
    //console.log         ("amskjak");
    //console.log         (data);
    //console.log         ("Ja " + data.length);
    setCantidadV        (data.length);
    setListaDatos       (data);
    setCargandoVisible  (false);
    clearInterval       (idSI);
  }
}, 1000);

const buscarPorSelect = () => {
  cargarDatosEgresos  (false, setListaDatos);
  setStMetodo         (parseInt(fn.obtenerValor("#stTipoB")));
  setStEstado         (parseInt(fn.obtenerValor("#stEstadoB")));
}

const handleOnExcel = () => {
  var wb  = XLSX.utils.book_new(),
  ws      = XLSX.utils.json_to_sheet(listData);

  XLSX.utils.book_append_sheet  (wb,ws, "EgresosFuturos");
  XLSX.writeFile                (wb,    "EgresosFuturos.xlsx");
}

return(
  <Box>
    <Box className = {Styles.nav}>
      <NavBar 
        cantidadV             = {cantidadV} 
        cargarDatosIngresos   = {cargarDatosEgresos}
        setStMetodo           = {setStMetodo}
        setStEstado           = {setStEstado}
        setListaDatos         = {setListaDatos}
        buscarPorSelect       = {buscarPorSelect}
        stMetodo              = {stMetodo}
        stEstado              = {stEstado}
        handleOnExcel         = {handleOnExcel}
        ingreso               = {false}
      />

      <Box className = {Styles.btnCreate}>
        <ModalBank
          namePerson          = {true}
          txtCantidad         = {false}
          inputsIngresoEgreso = {true}
          txtConcept          = {true}
          fechaPago           = {false}
          text                = {'Egreso futuro'}
          cargarDatos         = {cargarDatosEgresos}
          edit                = {false}
          arrayData           = {null}
          rowId               = {null}
          saveDataEgreso      = {true}
        />
      </Box>
    </Box>

    <TableCustom
      arrays               = {listaDatos}
      setInitialValues     = {setInitialValues}
      ingreso              = {false}
      cargarDatosIngresos  = {()=>{}}
      setListaDatos        = {setListaDatos}
      confirm2Loading      = {confirm2Loading}
      setConfirm2Loading   = {setConfirm2Loading}
      cargarDatosEgresos   = {cargarDatosEgresos}
    />

    <Box
      className = {cargandoVisible ? "u-textCenter" : "u-textCenter u-ocultar"}
    >
      <CircularProgress />
    </Box>
  </Box>
)

}