import React, { useState }  from "react";
import { ModalBank }        from '../../components/organims/modalRegister';
import { DataBank }         from '../../components/molecules/banco/datasBank';
import fng                  from '../../components/molecules/banco/funciones';
import Box                  from "@mui/material/Box";
import Styles               from "./RegisterBank.module.scss";
import fn                   from "../../utility";
import IconButton           from "@mui/material/IconButton";
import SearchIcon           from "@mui/icons-material/Search";
import CircularProgress     from '@mui/material/CircularProgress';
import Button               from "@mui/material/Button";
import FileDownloadIcon     from '@mui/icons-material/FileDownload';
import OutlinedInput        from '@mui/material/OutlinedInput';
import * as XLSX            from 'xlsx';

interface IData {
  Nombre: string;
  Tipo: string;
  Cantidad: string;
}

let listData: IData[];
let data: any;
const user_id = localStorage.getItem('user_id');

async function cargarDatos (
  buscar?:                    boolean,
  setListaDatos?:             any,
  ejecutarSetInitialValues?:  boolean,
  setInitialValuesCaja?:      any,
  setOpen?:                   any,
  setConfirmLoading?:         any,
) {
  let scriptURL = localStorage.getItem('site')+"/listCajasBancos";
  let dataUrl;
      dataUrl   = {user_id};
  let busqueda  = "";

  if(buscar) {
    scriptURL = localStorage.getItem('site')+"/listCajasBancosB";
    busqueda  = fn.obtenerValor('#txtSearch');
    dataUrl   = {user_id, busqueda};
  }

  await fetch(scriptURL, {
    method: 'POST',
    body:   JSON.stringify(dataUrl),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then((resp) => resp.json())
  .then(function(info) {

    console.log("New");
    data = fng.obtenerData(info);
    listData = [];
    listData = Object.assign(fng.obtenerData(info));
    console.log(data);
    if (buscar) {
      setListaDatos(data);
    }
   
    setInitialValuesCaja({
      hdId:               "",
      txtNombre:          "",
      stTipo:             "0",
      txtCantidadActual:  "",
    });
    setTimeout(() => {
      setListaDatos(data);
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
    
  })
  .catch(error => {
    console.log(error.message);
    console.error('Error!', error.message);
  });
}

if(user_id!==""&&user_id!==null) {
  cargarDatos();
}

export const TableRegistrarCajaOBanco = () => {
const [cargandoVisible, setCargandoVisible] = useState(true);   
const [cantidadV,       setCantidadV]       = useState<number>(0);
const [listaDatos,      setListaDatos]      = useState([]);

let idSI = setInterval(() => {
  if (!data) console.log("Vacio");
  else {
    setCantidadV        (data.length);
    setListaDatos       (data);
    setCargandoVisible  (false);
    clearInterval       (idSI);
  }
}, 1000);

const handleOnExcel = () => {
  var wb  = XLSX.utils.book_new(),
  ws      = XLSX.utils.json_to_sheet(listData);

  XLSX.utils.book_append_sheet(wb,ws,"CajaoBanco");
  XLSX.writeFile              (wb,"CajayBanco.xlsx");
}

return (
  <Box>
    <Box    className = {Styles.nav}>
      <Box  className = {Styles.counter}>
        <p>Cuentas</p>
        <div id = "NumCuenta" className = {Styles.chip}>
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
                cargarDatos(true, setListaDatos);
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

      <Box className={Styles.itemButton}>
        <Button
          variant     = "contained"
          color       = "success"
          startIcon   = {<FileDownloadIcon />}
          classes     = {{
            root: Styles.btnCreateAccount,
          }}
          onClick={handleOnExcel}
        >
          Exportar a excel
        </Button>
      </Box>

      <ModalBank
        namePerson          = {false}
        txtCantidad         = {true}
        inputsIngresoEgreso = {false}
        txtConcept          = {false}
        fechaPago           = {false}
        text                = {'Crear nueva cuenta'}
        cargarDatos         = {cargarDatos}
        edit                = {false} 
        arrayData           = {null}
        rowId               = {null}
        saveDataEgreso      = {false}
        editBank            = {false}
        setListaDatos       = {setListaDatos}
      />
    </Box>

    <DataBank 
      arrays        = {listaDatos} 
      setListaDatos = {setListaDatos} 
      cargarDatos   = {cargarDatos}
    />

    <Box
      className = {cargandoVisible ? "u-textCenter" : "u-textCenter u-ocultar"}
    >
      <CircularProgress />
    </Box>
  </Box>
);
};
