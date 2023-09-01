import React, { useState }  from "react";
import { ModalBank }        from '../../components/organims/modalRegister';
import fng                  from '../../components/molecules/banco/funciones';
import Box                  from "@mui/material/Box";
import Styles               from "./RegisterBank.module.scss";
import fn                   from "../../utility";
import Paper                from "@mui/material/Paper";
import InputBase            from "@mui/material/InputBase";
import IconButton           from "@mui/material/IconButton";
import SearchIcon           from "@mui/icons-material/Search";
import CircularProgress     from '@mui/material/CircularProgress';

const user_id = localStorage.getItem('user_id');

export const TableRegistrarCajaOBanco = () => {
const [cargandoVisible, setCargandoVisible] = useState(true);   

async function cargarDatos (ejecutarSetCargando=true,buscar=false) {
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
    fng.mostrarData(info);
    if(ejecutarSetCargando)
      setCargandoVisible(false)
  })
  .catch(error => {
    console.log(error.message);
    console.error('Error!', error.message);
  });
}

if(user_id!==""&&user_id!==null) {
  cargarDatos();
}

const handleKeyDown = (event: { key: string; }) => {
  if (event.key === 'Enter')
    fn.ejecutarClick("#btnBuscar");
};

return (
  <Box>
    <Box    className = {Styles.nav}>
      <Box  className = {Styles.counter}>
        <p>Cuentas</p>
        <div id = "NumCuenta" className = {Styles.chip}></div>
      </Box>

      <Box  className = {Styles.itemSearch}>
        <Paper
          component = "form"
          sx={{
            display:    "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            id          = "txtSearch"
            name        = "txtSearch"
            sx={{ ml: 1, flex: 1 }}
            placeholder = "Buscar"
            inputProps  = {{ "aria-label": "search google maps" }}
            onKeyDown   = {handleKeyDown}
          />
          <IconButton
            type        = "button"
            sx          = {{ p: "10px" }}
            aria-label  = "search"
            onClick={() => {
              cargarDatos(false, true);
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
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
      />
    </Box>

    <Box
        className={cargandoVisible ? "u-textCenter" : "u-textCenter u-ocultar"}
      >
        <CircularProgress />
      </Box>

      <div 
        id    = "listDatos" 
        style = {{ paddingBottom: "50px" }}
      >  
      </div>
  </Box>
);
};