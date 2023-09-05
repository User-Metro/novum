import React, { FC }  from "react";
import Box            from "@mui/material/Box";
import Styles         from "../../../pages/RegisterBank/RegisterBank.module.scss";
import IconButton     from "@mui/material/IconButton";
import MoreVertIcon   from "@mui/icons-material/MoreVert";
import { ModalBank }  from '../../organims/modalRegister';

export const DataBank = ({
  arrays,
  setListaDatos,
  cargarDatos,
}: {
  arrays:         any;
  setListaDatos:  any;
  cargarDatos:    Function;
}) => {
  const formatNumber = (number: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

  return (
    <>
      {arrays.map(
        (
          item: {
            Nombre:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            Tipo:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            Cantidad:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
              id: any;
          },
          index: React.Key | null | undefined
        ) => (
          <Box className={Styles.container} key={index}>
            <Box className={Styles.information}>
              <Box className={Styles.headInfo}>
                <div>
                  <span
                    className={
                      item.Tipo == "Banco" ? "icon-icoBankPlus" : "icon-icoCash"
                    }
                  ></span>
                  <span>{item.Nombre}</span>
                </div>

                <div>
                  <ModalBank
                    namePerson          = {false}
                    txtCantidad         = {true}
                    inputsIngresoEgreso = {false}
                    txtConcept          = {false}
                    fechaPago           = {false}
                    text                = {''}
                    cargarDatos         = {cargarDatos}
                    edit                = {true} 
                    arrayData           = {arrays}
                    rowId               = {item.id}
                    saveDataEgreso      = {false}
                    editBank            = {true}
                    setListaDatos       = {setListaDatos}
                  />
                  <IconButton type="button" aria-label="Edit">
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </Box>
              <Box className={Styles.bankInfo}>
                <p>{item.Tipo}</p>
                <p>{item.Cantidad}</p>
              </Box>
            </Box>
          </Box>
        )
      )}
    </>
  );
};
