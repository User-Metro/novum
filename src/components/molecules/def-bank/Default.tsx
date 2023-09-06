import React, { useState } from "react";
import style from "../../../pages/home/home.module.scss";
import fn from "../../../utility";
import { Button, Modal, Select, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export const Default = ({ cambioTable }: any) => {
const [open, setOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
const [messageApi, contextHolder] = message.useMessage();
const [initialValues, setInitialValues] = useState({
  txtNombre: "",
  stTipo: "",
  txtCantidadActual: "",
});

const obtenerValor = (input: any) => {
  let valorInput: HTMLInputElement = document.querySelector(input);
  return valorInput?.value;
};

const showModal = () => {
  setOpen(true);
};

const validarSubmit = () => {
  fn.ejecutarClick("#txtAceptar");
};

const validarSubit = () => {
  handleOk();
};

const handleOk = () => {
  const scriptURL = "https://admin.bioesensi-crm.com/altaCajaBanco";
  const txtNombre = obtenerValor("#txtNombre");
  const stTipo = obtenerValor("#stTipo");
  const txtCantidadActual = obtenerValor("#txtCantidadActual");
  const user_id = localStorage.getItem("user_id");
  const caja_banco_id = "";

  const data = {
    txtNombre,
    stTipo,
    txtCantidadActual,
    user_id,
    caja_banco_id,
  };
  setConfirmLoading(true);

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      messageApi.open({
        type: "success",
        content: "La nueva cuenta fue guardada con éxito",
      });
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);

        cambioTable();
      }, 3000);
    })
    .catch((error) => {
      alert(error.message);
      console.error("Error!", error.message);
    });
};

const handleCancel = () => {
  setInitialValues({ txtNombre: "", stTipo: "0", txtCantidadActual: "" });

  setTimeout(() => {
    setOpen(false);
  }, 500);
};

return (
  <>
    <div
      className={`${style.HomeBienvenida} ${style.RegistarBanco} u-inline-block`}
    >
      <span
        className={`${style.HomeIcoBienvenida} icon-icoRegistrarCB`}
      ></span>
      <p>No tienes cuentas agregadas, tu cuentas aparecerán aqui</p>

      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> Crear nueva cuenta
      </Button>
    </div>

    <Modal
      title=""
      open={open}
      onOk={validarSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          txtNombre: Yup.string()
            .min(2, "El nombre de la cuenta es demasiado corto")
            .required("* Nombre de la cuenta"),
          stTipo: Yup.number()
            .min(1, "Efectivo o banco")
            .required("* Efectivo o banco"),
          txtCantidadActual: Yup.number()
            .min(1, "Al menos un digito")
            .required("* Cantidad actual"),
        })}
        onSubmit={(values, actions) => {
          validarSubit();
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
          return (
            <>
              {
                <Form
                  className={`${style.ModalForm}`}
                  name="form-contacto"
                  id="form-contacto"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  {contextHolder}

                  <Input
                    placeholder="Nombre de la cuenta"
                    type="text"
                    id="txtNombre"
                    name="txtNombre"
                    value={values.txtNombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoCapitalize="off"
                  />

                  <select
                    name="stTipo"
                    id="stTipo"
                    className={`${style.ModalSelect}`}
                    value={values.stTipo}
                    onChange={handleChange}
                  >
                    <option value="0">Efectivo o banco</option>
                    <option value="1">Efectivo</option>
                    <option value="2">Banco</option>
                  </select>

                  <Input
                    className={`${style.ModalCantidad}`}
                    placeholder="Cantidad actual"
                    type="text"
                    id="txtCantidadActual"
                    name="txtCantidadActual"
                    value={values.txtCantidadActual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div>
                    <p>
                      <strong>{errors.txtNombre ? `Errores:` : null}</strong>
                    </p>
                    {errors.txtNombre ?? errors.txtNombre}
                    {errors.stTipo ?? errors.stTipo}
                    <br />
                    {errors.txtCantidadActual ?? errors.txtCantidadActual}
                  </div>

                  <div className="u-textLeft" style={{ display: "none" }}>
                    <input id="txtAceptar" type="submit" value="Aceptar" />
                  </div>
                </Form>
              }
            </>
          );
        }}
      </Formik>
    </Modal>
  </>
);
};
