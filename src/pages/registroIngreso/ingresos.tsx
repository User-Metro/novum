import Styles                   from "./ingresos.module.scss";
import Box                      from "@mui/material/Box";
import CircularProgress         from "@mui/material/CircularProgress";
import { useState }             from "react";
import fn                       from "../../utility";
import fng                      from "../../components/atoms/ingresos/funciones";
import { message }              from "antd";
import SearchIcon               from "@mui/icons-material/Search";
import IconButton               from "@mui/material/IconButton";
import FileDownloadIcon         from '@mui/icons-material/FileDownload';
import Button                   from "@mui/material/Button";
import * as XLSX                from 'xlsx';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TableCustom }          from "../../components/molecules/table/tableCustom";
import { ModalBank }            from '../../components/organims/modal-bank'
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
          txtFechaTentativaCobro: ''
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

export const Ingresos = () => {

const [confirm2Loading, setConfirm2Loading]   = useState(false);
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
  cargarDatosIngresos (false, setListaDatos);
  setStMetodo         (parseInt(fn.obtenerValor("#stTipoB")));
  setStEstado         (parseInt(fn.obtenerValor("#stEstadoB")));
}

const handleOnExcel = () => {
  var wb  = XLSX.utils.book_new(),
  ws      = XLSX.utils.json_to_sheet(listData);

  XLSX.utils.book_append_sheet  (wb,ws,"IngresosFuturos");
  XLSX.writeFile                (wb,"IngresosFuturos.xlsx");
}

/* ######################################### */
const cobrar = () => {
  const scriptURL           = localStorage.getItem('site')+"/cambiarCobrado"; // deberia es
  const ingresos_futuros_id = idIngresoStatus;
  const dataU               = {ingresos_futuros_id};
  setConfirm2Loading(true)
  fetch(scriptURL, {
     method: 'POST',
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
      setConfirm2Loading  (false)
    },600)
  })
  .catch(error => {
    console.log   (error.message);
    console.error ('Error!', error.message);
  });
};

const revertir = () => {
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
        <OutlinedInput
          id                = "txtSearch"
          name              = "txtSearch"
          placeholder       = "Buscar"
          fullWidth 
          size              = "small"
          aria-describedby  = "outlined-weight-helper-text"
          endAdornment      = {
            <IconButton
              id            = "btnBuscar"
              type          = "button"
              aria-label    = "search"
              onClick       = {() => {
                cargarDatosIngresos(true, setListaDatos);
                setStMetodo(0);
                setStEstado(0);
              }}
            >
              <SearchIcon />
            </IconButton>
          }
          inputProps        = {{
            'aria-label': 'weight',
          }}
          onKeyUp           = {() => {
            fn.ejecutarClick("#btnBuscar");
          }}
        />
      </Box>

      <Box  className = {Styles.searchSelect}>
        <label htmlFor="stTipoB" className={Styles.LblFilter}>Método</label>
        <select
          name      = "stTipoB"
          id        = "stTipoB"
          className = {`${Styles.ModalSelect} ${Styles.ModalSelectBrVerde}`}
          onChange  = {buscarPorSelect}
          value     = {stMetodo}
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
          value     = {stEstado}
        >
          <option value="0">Todos       </option>
          <option value="1">Cobrados    </option>
          <option value="2">No cobrados </option>
        </select>
      </Box>

      <Box  className = {Styles.itemButton}>
        <Button
          variant   = "contained"
          color     = "success"
          startIcon = {<FileDownloadIcon />}
          classes   = {{
            root: Styles.btnCreateAccount,
          }}
          onClick   = {handleOnExcel}
        >
          Exportar a excel
        </Button>
      </Box>  

      <ModalBank
        namePerson          = {true}
        txtCantidad         = {false}
        inputsIngresoEgreso = {true}
        txtConcept          = {true}
        fechaPago           = {true}
        text                = {'Ingreso futuro'}
        cargarDatos         = {cargarDatosIngresos}
        edit                = {false}
        arrayData           = {null}
        rowId               = {null}
        saveDataEgreso      = {false}
      />
    </Box>

    <TableCustom
      arrays            = {listaDatos}
      setInitialValues  = {setInitialValues}
      ingreso           = {true}
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

