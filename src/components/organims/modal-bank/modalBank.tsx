import * as React from "react";
import Styles from "./modalBank.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import { Modal, message, Input, DatePicker } from "antd";
import { useState } from "react";
import type { DatePickerProps } from "antd";
import * as Yup from "yup";
import fn from "../../../utility";
import fnc from "../../molecules/banco/funciones";
import fng from "../../molecules/ingresos/funciones";

let data: any[];
const user_id = localStorage.getItem("user_id");

export const ModalBank = ({
  namePerson,
  fechaPago,
  txtConcept,
  txtCantidad,
  inputsIngresoEgreso,
  text,
}: {
  namePerson: boolean;
  fechaPago: boolean;
  txtConcept: boolean;
  txtCantidad: boolean;
  inputsIngresoEgreso: boolean;
  text: string;
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [listaDatos, setListaDatos] = useState([]);
  const [cantidadV, setCantidadV] = useState("0");
  const [cargandoVisible, setCargandoVisible] = useState(true);
  const [initialValues, setInitialValues] = useState({
    hdId: "",
    txtNombre: "",
    stTipo: "",
    txtCantidadActual: "",
    txtConcepto: "",
    stCategoria: "",
    txtMonto: "",
    txtFechaTentativaCobro: "",
  });
  const [cargandoModal, setcargandoModal] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setInitialValues({
      hdId: "",
      txtNombre: "",
      stTipo: "0",
      txtCantidadActual: "",
      txtConcepto: "",
      stCategoria: "",
      txtMonto: "",
      txtFechaTentativaCobro: "",
    });
    setTimeout(() => {
      setOpen(false);
      setcargandoModal(false);
    }, 400);
  };

  const abrirModal = () => {
    setcargandoModal(true);
    showModal();
  };

  const validarSubmit = () => {
    fn.ejecutarClick("#txtAceptar");
  };

  const cargaDatosEdicion = () => {
      setTimeout(()=>{
      if (fn.obtenerValor("#hdId")) {
        const id_cb = fn.obtenerValor("#hdId");
        const cuenta = fn.obtenerValorHtml("#spName" + id_cb);
        const cantidad = fn.obtenerValorHtml("#spCantidadO" + id_cb);
        const id_tipo = fn.obtenerValorHtml("#spTipoO" + id_cb);
        setInitialValues({
          hdId: id_cb,
          txtNombre: cuenta,
          stTipo: id_tipo,
          txtCantidadActual: cantidad,
          txtConcepto: "",
          stCategoria: "",
          txtMonto: "",
          txtFechaTentativaCobro: "",
        });
      }
      setTimeout(()=>{
        setcargandoModal(false);
      },300);
    },800);
  };

  async function cargarDatosCajaBanco(
    ejecutarSetCargando = true,
    buscar = false
  ) {
    let scriptURL = localStorage.getItem("site") + "/listCajasBancos";
    let dataUrl = { user_id };
    let busqueda = "";

    if (buscar) {
      let scriptURL = localStorage.getItem("site") + "/listCajasBancos";
      busqueda = fn.obtenerValor("#txtSearch");
      dataUrl = { user_id /*busqueda*/ };
    }

    await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(dataUrl),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(function (info) {
        fnc.mostrarData(info);
        if (ejecutarSetCargando) setCargandoVisible(false);
      })
      .catch((error) => {
        console.log(error.message);
        console.error("Error!", error.message);
      });
  }

  if (user_id !== "" && user_id !== null) {
    cargarDatosCajaBanco();
  }



  /*##############################*/

  /*const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  setInitialValues({
    hdId: fn.obtenerValor("#hdId")
    txtNombre: fn.obtenerValor("#txtNombre"),
    txtConcepto: fn.obtenerValor("#txtConcepto"),
    stTipo: fn.obtenerValor("#stTipo"),
    stCategoria: fn.obtenerValor("#stCategoria"),
    txtMonto: fn.obtenerValor("#txtMonto"),
    txtFechaTentativaCobro: dayjs(dateString),
  });
};*/

  return (
    <Box>
      <Box className={Styles.itemButton}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          classes={{
            root: Styles.btnCreateAccount,
          }}
          onClick={showModal}
        >
          {text}
        </Button>
      </Box>

      <Modal
        title=""
        open={open}
        onOk={validarSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
        afterOpenChange={cargaDatosEdicion}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={
            inputsIngresoEgreso
              ? Yup.object().shape({
                  txtNombre: Yup.string()
                    .min(
                      2,
                      namePerson
                        ? "El nombre de la persona o empresa es demasiado corto"
                        : "El nombre de la cuenta es demasiado corto"
                    )
                    .required(
                      namePerson
                        ? "* Nombre de la persona o empresa"
                        : "* Nombre de la cuenta"
                    ),
                  stTipo: Yup.number()
                    .min(1, "Efectivo o banco")
                    .required("* Efectivo o banco"),
                  txtConcepto: Yup.string()
                    .min(3, "El concepto es demasiado corto")
                    .required("* Concepto"),
                  stCategoria: Yup.number()
                    .min(1, "Categoria")
                    .required("* Categoria"),
                  txtMonto: Yup.number()
                    .min(1, "Al menos un digito")
                    .required("* Monto"),
                  txtFechaTentativaPago: Yup.date().required(
                    fechaPago
                      ? "* Fecha tentativa de pago"
                      : "* Fecha tentativa de cobro"
                  ),
                })
              : Yup.object().shape({
                  txtNombre: Yup.string()
                    .min(
                      2,
                      namePerson
                        ? "El nombre de la persona o empresa es demasiado corto"
                        : "El nombre de la cuenta es demasiado corto"
                    )
                    .required(
                      namePerson
                        ? "* Nombre de la persona o empresa"
                        : "* Nombre de la cuenta"
                    ),
                  stTipo: Yup.number()
                    .min(1, "Efectivo o banco")
                    .required("* Efectivo o banco"),
                  txtCantidadActual: Yup.number()
                    .min(1, "Al menos un digito")
                    .required("* Cantidad actual"),
                })
          }
          onSubmit={(values, actions) => {
            let scriptURL = "https://admin.bioesensi-crm.com/altaCajaBanco";

            if (values.hdId)
              scriptURL = "https://admin.bioesensi-crm.com/editarCajaBanco";

            const txtNombre = values.txtNombre;
            const stTipo = values.stTipo;
            const txtCantidadActual = values.txtCantidadActual;
            const caja_banco_id = values.hdId;

            const txtConcepto = values.txtConcepto;

            const stCategoria = values.stCategoria;
            const txtMonto = values.txtMonto;
            const txtFechaTentativaCobro = values.txtFechaTentativaCobro;
            const ingresos_futuros_id = values.hdId;

            const dataU = {
              txtNombre,
              stTipo,
              txtCantidadActual,
              caja_banco_id,

              txtConcepto,

              stCategoria,
              txtMonto,
              user_id,
              txtFechaTentativaCobro,
              ingresos_futuros_id,
            };

            setConfirmLoading(true);

            fetch(scriptURL, {
              method: "POST",
              body: JSON.stringify(dataU),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((resp) => resp.json())
              .then(function (dataR) {
                messageApi.open({
                  type: "success",
                  content: "Los datos fueron guardados con éxito",
                });

                setInitialValues({
                  hdId: "",
                  txtNombre: "",
                  stTipo: "0",
                  txtCantidadActual: "",
                  txtConcepto: "",
                  stCategoria: "",
                  txtMonto: "",
                  txtFechaTentativaCobro: "",
                });

                setTimeout(() => {
                  setOpen(false);
                  setConfirmLoading(false);
                  cargarDatosCajaBanco(false);
                }, 1200);
              })
              .catch((error) => {
                console.log(error.message);
                console.error("Error!", error.message);
              });
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, errors, values }) => {
            return (
              <Form
                className={Styles.ModalForm}
                name="form-contacto"
                id="form-contacto"
                method="post"
                onSubmit={handleSubmit}
              >
                {contextHolder}

                <Box
                  className={
                    cargandoModal ? "u-textCenter" : "u-textCenter u-ocultar"
                  }
                >
                  <CircularProgress />
                </Box>

                <div
                  className={
                    cargandoModal ? "u-textCenter u-ocultar" : "u-textCenter"
                  }
                >
                  {/* ##### Campos permanentes ##### */}

                  <Input
                    id="hdId"
                    name="hdId"
                    type="hidden"
                    value={values.hdId}
                  />

                  <Input
                    placeholder={
                      namePerson
                        ? "Nombre de la persona o empresa"
                        : "Nombre de la cuenta"
                    }
                    type="text"
                    id="txtNombre"
                    name="txtNombre"
                    value={values.txtNombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoCapitalize="off"
                  />

                  {txtConcept ? (
                    <Input
                      placeholder="Concepto"
                      type="text"
                      id="txtConcepto"
                      name="txtConcepto"
                      value={values.txtConcepto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoCapitalize="off"
                    />
                  ) : null}

                  <select
                    name="stTipo"
                    className={Styles.ModalSelect}
                    id="stTipo"
                    value={values.stTipo}
                    onChange={handleChange}
                  >
                    <option value="0">Efectivo o banco</option>
                    <option value="1">Efectivo</option>
                    <option value="2">Banco</option>
                  </select>

                  {txtCantidad ? (
                    <Input
                      className={Styles.ModalCantidad}
                      placeholder="Cantidad actual"
                      type="text"
                      id="txtCantidadActual"
                      name="txtCantidadActual"
                      value={values.txtCantidadActual}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  ) : null}

                  {/* ##### Campos añadibles ##### */}

                  {inputsIngresoEgreso ? (
                    <>
                      <select
                        name="stCategoria"
                        id="stCategoria"
                        className={`${Styles.ModalSelect} u-sinMargen`}
                        value={values.stCategoria}
                        onChange={handleChange}
                      >
                        <option value="0">Categoria</option>
                        <option value="1">Cliente</option>
                        <option value="2">Otros</option>
                      </select>

                      <Input
                        className={`${Styles.ModalCantidad} ${Styles.ModalCantidadMr}`}
                        placeholder="Monto"
                        type="text"
                        id="txtMonto"
                        name="txtMonto"
                        value={values.txtMonto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <DatePicker
                        // format={dateFormatList}
                        className={Styles.ModalCantidad}
                        id="txtFechaTentativaCobro"
                        name="txtFechaTentativaCobro"
                        placeholder={
                          fechaPago
                            ? "Fecha tentativa de pago"
                            : "Fecha tentativa de cobro"
                        }
                        //value={values.txtFechaTentativaCobro}
                        //onChange={onChange}
                        onBlur={handleBlur}
                      />
                    </>
                  ) : null}

                  {/*el div muestra el texto de validacion*/}
                  <div>
                    <p>
                      <strong>
                        {errors.txtNombre ||
                        errors.stTipo ||
                        errors.txtCantidadActual ||
                        errors.txtConcepto ||
                        errors.stCategoria ||
                        errors.txtMonto ||
                        errors.txtFechaTentativaCobro
                          ? `Errores:`
                          : null}
                      </strong>
                    </p>
                    {errors.txtNombre ? <p>{errors.txtNombre}</p> : null}
                    {errors.stTipo ? <p>{errors.stTipo}</p> : null}
                    {errors.txtCantidadActual ? (
                      <p>{errors.txtCantidadActual}</p>
                    ) : null}
                    {errors.txtConcepto ? <p>{errors.txtConcepto}</p> : null}
                    {errors.stCategoria ? <p>{errors.stCategoria}</p> : null}
                    {errors.txtMonto ? <p>{errors.txtMonto}</p> : null}
                    {errors.txtFechaTentativaCobro ? (
                      <p>{errors.txtFechaTentativaCobro}</p>
                    ) : null}
                  </div>
                </div>

                <div className="u-textLeft" style={{ display: "none" }}>
                  <input id="txtAceptar" type="submit" value="Aceptar" />
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </Box>
  );
};
