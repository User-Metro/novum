import Styles                   from "./ingresos.module.scss";
import Box                      from "@mui/material/Box";
import CircularProgress         from "@mui/material/CircularProgress";
import { useState }             from "react";
import fn                       from "../../utility";
import fng                      from "../../components/atoms/ingresos/funciones";
import dayjs, { Dayjs } from 'dayjs';
import * as XLSX                from 'xlsx';
import { TableCustom }          from "../../components/molecules/table/tableCustom";
import { ModalBank }            from '../../components/organims/modalRegister'
import { NavBar }               from '../../components/organims/navBar';
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

return (
  <Box>
    <Box className = {Styles.nav}>
      <NavBar 
        cantidadV             = {cantidadV} 
        cargarDatosIngresos   = {cargarDatosIngresos}
        setStMetodo           = {setStMetodo}
        setStEstado           = {setStEstado}
        setListaDatos         = {setListaDatos}
        buscarPorSelect       = {buscarPorSelect}
        stMetodo              = {stMetodo}
        stEstado              = {stEstado}
        handleOnExcel         = {handleOnExcel}
        ingreso               = {true}
      />

      <Box className = {Styles.btnCreate}>
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
    </Box>

    <TableCustom
      arrays              = {listaDatos}
      setInitialValues    = {setInitialValues}
      ingreso             = {true}
      cargarDatosIngresos = {cargarDatosIngresos}
      setListaDatos       = {setListaDatos}
      confirm2Loading     = {confirm2Loading}
      setConfirm2Loading  = {setConfirm2Loading}
      cargarDatosEgresos  = {()=>{}}
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

