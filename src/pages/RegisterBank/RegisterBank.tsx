import React, { useState } from "react";
import { ModalBank } from '../../components/organims/modal-bank';
import fng from '../../components/molecules/banco/funciones';
import Box from "@mui/material/Box";
import Styles from "./RegisterBank.module.scss";
import fn from "../../utility";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const user_id = localStorage.getItem('user_id');

export const TableRegistrarCajaOBanco = () => {
const [cargandoVisible, setCargandoVisible] = useState(true);   

async function cargarDatos (ejecutarSetCargando=true,buscar=false) {
  let scriptURL = 'https://admin.bioesensi-crm.com/listCajasBancos';
  let dataUrl = {user_id};
  let busqueda = "";

  if(buscar) {
    scriptURL = 'https://admin.bioesensi-crm.com/listCajasBancosB';
    busqueda = fn.obtenerValor('#txtSearch');
    dataUrl = {user_id, /*busqueda*/};
  }

  await fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(dataUrl),
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

cargarDatos();

return (
  <Box>
    <Box className={Styles.nav}>
      <Box className={Styles.counter}>
        <p>Cuentas</p>
        <div id="NumCuenta" className={Styles.chip}></div>
      </Box>

      <Box className={Styles.itemSearch}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            id="txtSearch"
            name="txtSearch"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => { cargarDatos (false, true); }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <ModalBank
        namePerson={false}
        txtCantidad={true}
        inputsIngresoEgreso={false}
        txtConcept={false}
        fechaPago={false}
      />      
    </Box>

    <div>
        <img className={cargandoVisible? "Cargando Mt mostrarI-b Sf" : "Cargando Mt Sf"}  src="img/loading.gif" alt="" />
    </div>

    <div id="listDatos" style={{ paddingBottom: "50px" }}></div>
  </Box>
);
};