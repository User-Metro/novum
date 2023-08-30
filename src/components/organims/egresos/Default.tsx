import React, { useState } from "react";
import style from "../../../pages/home/home.module.scss";
import fn from "../../../utility";
import { Button, Modal, message, Input, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Field, Formik, Form } from "formik";
import dayjs, { Dayjs } from "dayjs";
import type { DatePickerProps } from "antd";
import * as Yup from "yup";

export const Default = ({ cambioTable }: {cambioTable: any}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [initialValues, setInitialValues] = useState({
    txtNombre: "",
    txtConcepto: "",
    stTipo: "",
    stCategoria: "",
    txtMonto: "",
    txtFechaTentativaPago: Date(),
  });

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setInitialValues({
      txtNombre: fn.obtenerValor("#txtNombre"),
      txtConcepto: fn.obtenerValor("#txtConcepto"),
      stTipo: fn.obtenerValor("#stTipo"),
      stCategoria: fn.obtenerValor("#stCategoria"),
      txtMonto: fn.obtenerValor("#txtMonto"),
      txtFechaTentativaPago: dateString,
    });
  };

  const showModal = () => {
    setOpen(true);
  };

  const validarSubmit = () => {
    fn.ejecutarClick("#txtAceptar");
  };

  const handleCancel = () => {
    setInitialValues({
      txtNombre: "",
      txtConcepto: "",
      stTipo: "0",
      stCategoria: "0",
      txtMonto: "",
      txtFechaTentativaPago: "",
    });

    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  return (
    <>
      <div
        className={`${style.HomeBienvenida} ${style.RegistarBanco} u-inline-block`}
      >
        <span className={`${style.HomeIcoBienvenida} icon-icoEgereso`}></span>
        <p>No tienes egresos futuros, agregar un egreso futuro</p>

        <Button type="primary" onClick={showModal}>
          <PlusOutlined /> Egreso futuro
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
              .min(3, "El nombre de la persona o empresa es demasiado corto")
              .required("* Nombre de la persona o empresa"),
            txtConcepto: Yup.string()
              .min(3, "El concepto es demasiado corto")
              .required("* Concepto"),
            stTipo: Yup.number()
              .min(1, "Efectivo o banco")
              .required("* Efectivo o banco"),
            stCategoria: Yup.number()
              .min(1, "Categoria")
              .required("* Categoria"),
            txtMonto: Yup.number()
              .min(1, "Al menos un digito")
              .required("* Monto"),
            txtFechaTentativaPago: Yup.date().required(
              "* Fecha tentativa de pago"
            ),
          })}
          onSubmit={(values, actions) => {
            const scriptURL =
              localStorage.getItem("site") + "/altaEgresoFuturo";
            const user_id = localStorage.getItem("user_id");
            const txtNombre = values.txtNombre;
            const txtConcepto = values.txtConcepto;
            const stTipo = values.stTipo;
            const stCategoria = values.stCategoria;
            const txtMonto = values.txtMonto;
            const txtFechaTentativaPago = values.txtFechaTentativaPago;
            const data = {
              txtNombre,
              txtConcepto,
              stTipo,
              stCategoria,
              txtMonto,
              user_id,
              txtFechaTentativaPago,
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
                  content: "Los datos del egreso fue guardada con éxito",
                });
                setTimeout(() => {
                  setOpen(false);
                  setConfirmLoading(false);
                  cambioTable();

                  setTimeout(() => {
                    fn.ejecutarClick("#btnBuscar");
                  }, 500);
                }, 3000);
              })
              .catch((error) => {
                console.log(error.message);
                console.error("Error!", error.message);
              });
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

                    <Field
                      className={`${style.ModalFormText}`}
                      placeholder="Nombre de la persona o empresa"
                      type="text"
                      id="txtNombre"
                      name="txtNombre"
                    />

                    <Field
                      className={`${style.ModalFormText}`}
                      placeholder="Concepto"
                      type="text"
                      id="txtConcepto"
                      name="txtConcepto"
                    />

                    <Field
                      as="select"
                      name="stTipo"
                      id="stTipo"
                      className={`${style.ModalSelect}`}
                    >
                      <option value="0">Efectivo o banco</option>
                      <option value="1">Efectivo</option>
                      <option value="2">Banco</option>
                    </Field>

                    <Field
                      as="select"
                      name="stCategoria"
                      id="stCategoria"
                      className={`${style.ModalSelect} u-sinMargen`}
                    >
                      <option value="0">Categoria</option>
                      <option value="3">
                        Proveedores o costo de mercancía
                      </option>
                      <option value="4">Gastos fijos</option>
                      <option value="5">Nómina</option>
                      <option value="6">Deuda</option>
                      <option value="7">Impuestos</option>
                      <option value="8">Otros</option>
                    </Field>

                    <Field
                      className={`${style.ModalCantidad} ${style.ModalCantidadMr} ${style.ModalFormText}`}
                      placeholder="Monto"
                      type="text"
                      id="txtMonto"
                      name="txtMonto"
                    />

                    <DatePicker
                      // format={dateFormatList}
                      className={`${style.ModalCantidad}`}
                      id="txtFechaTentativaPago"
                      name="txtFechaTentativaPago"
                      placeholder="Fecha tentativa de pago"
                      //value={values.txtFechaTentativaPago}
                      onChange={onChange}
                      onBlur={handleBlur}
                    />

                    <div>
                      <p>
                        <strong>
                          {errors.txtNombre ||
                          errors.txtConcepto ||
                          errors.stTipo ||
                          errors.stCategoria ||
                          errors.txtMonto ||
                          errors.txtFechaTentativaPago
                            ? `Errores:`
                            : null}
                        </strong>
                      </p>
                      {errors.txtNombre ? <p>{errors.txtNombre}</p> : null}
                      {errors.txtConcepto ? <p>{errors.txtConcepto}</p> : null}
                      {errors.stTipo ? <p>{errors.stTipo}</p> : null}
                      {errors.stCategoria ? <p>{errors.stCategoria}</p> : null}
                      {errors.txtMonto ? <p>{errors.txtMonto}</p> : null}
                      {errors.txtFechaTentativaPago ? (
                        <p>{errors.txtFechaTentativaPago}</p>
                      ) : null}
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
