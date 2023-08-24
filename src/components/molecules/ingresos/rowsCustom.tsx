import * as React from "react";
import Styles from "../../../pages/registroIngreso/ingresos.module.scss";
import fn from "../../../utility";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { message, Popconfirm } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Key } from "readline";

const cancel = () => {
  message.error("Click on No");
};

const formatNumber = (number: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export const RowsCustom = ({
  pullData,
  page,
  rowsPerPage,
  showModal,
  setInitialValues,
  setModal2Open,
}: {
  pullData: any;
  page: any;
  rowsPerPage: any;
  showModal: Function;
  setInitialValues: Function;
  setModal2Open: Function;
}) => {
  const cambiarStatus = (id: number) => {
    alert(id);
  };

  const editar = (id: number) => {
    showModal();
    console.log(pullData);
    const pos = fn.buscarPosicionArreglo(pullData, id);

    setTimeout(() => {
      setInitialValues({
        hdId: id,
        txtNombre: pullData[pos]["name"],
        txtConcepto: pullData[pos]["concept"],
        stTipo: pullData[pos]["id_payment_method"],
        stCategoria: pullData[pos]["id_category"],
        txtMonto: pullData[pos]["amount"],
        txtFechaTentativaCobro: dayjs(pullData[pos]["date_to_pay_o"]),
      });
    }, 100);
    /*const cuenta = fn.obtenerValorHtml("#spName"+id_cb);
    const cantidad = fn.obtenerValorHtml("#spCantidadO"+id_cb);
    const id_tipo = fn.obtenerValorHtml("#spTipoO"+id_cb);*/
  };

  const eliminar = (id: string) => {
    const scriptURL = "http://localhost:3001/eliminarIngresoFuturo"; // deberia es
    const ingresos_futuros_id = id;
    const dataU = { ingresos_futuros_id };

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(dataU),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(function (info) {
        fn.agregarClase("tr[idTr='" + id + "']", "u-ocultar");
        fn.ejecutarClick("#btnBuscar");
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error!", error.message);
      });
  };

  return (
    <>
      {pullData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(
          (data: {
            name:
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.Key
              | null
              | undefined;
            id: any;
            date_created:
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
            payment_method: string;
            category:
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
            concept:
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
            amount: number;
            date_to_pay:
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
            state: string;
            date_cashed:
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
          }) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              //idTr={data.id}
            >
              <TableCell scope="row">{data.date_created}</TableCell>
              <TableCell align="left">
                {data.payment_method === "Efectivo" ? (
                  <div className={Styles.typeAmount1}>
                    <RequestQuoteOutlinedIcon />
                    <span>Efectivo</span>
                  </div>
                ) : (
                  <div className={Styles.typeAmount2}>
                    <PaymentOutlinedIcon />
                    <span>Banco</span>
                  </div>
                )}
              </TableCell>
              <TableCell align="left">{data.category}</TableCell>
              <TableCell align="left">{data.name}</TableCell>
              <TableCell align="left">{data.concept}</TableCell>
              <TableCell align="left">${formatNumber(data.amount)}</TableCell>
              <TableCell align="left">{data.date_to_pay}</TableCell>
              <TableCell align="left">
                {data.state == "Cobrado" ? (
                  <Chip
                    icon={<PriceCheckIcon />}
                    size="small"
                    label="Cobrado"
                    className={Styles.chipTable}
                  />
                ) : (
                  <Chip
                    icon={<MoneyOffIcon />}
                    label="No cobrado"
                    size="small"
                    className={Styles.chipTableNo}
                    onClick={() => {
                      setModal2Open(true);
                    }}
                  />
                )}
              </TableCell>
              <TableCell align="left">{data.date_cashed}</TableCell>
              <TableCell className="Iconos-Tabla" align="right">
                <EditIcon
                  className="u-efecto slideRight"
                  onClick={() => {
                    editar(data.id);
                  }}
                />
                <Popconfirm
                  title="¿Desea eliminar este registro?"
                  description=""
                  onConfirm={() => {
                    eliminar(data.id);
                  }}
                  onCancel={cancel}
                  okText="Si"
                  cancelText="No"
                >
                  <DeleteIcon
                    className="icoBorrar u-efecto slideRight"
                    onClick={() => {}}
                  />
                </Popconfirm>
              </TableCell>
            </TableRow>
          )
        )}
    </>
  );
};

/*
arrays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
  page
  rowsPerPage
*/
