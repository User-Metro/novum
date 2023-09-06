import React from 'react';
import { Input } from 'antd';
import { Formik, Form } from "formik";
import style from './Registro.module.scss';
import IntlTelInput from 'react-intl-tel-input-18';
import 'react-intl-tel-input-18/dist/main.css';
import * as Yup from "yup";


export const Registro1 = () => {
    return (
      <Formik
        initialValues={{
          Nombre: '',
          Apellido: '',
          Puesto: '',
          Email:'',
        }}
        validationSchema={Yup.object().shape({
          Nombre: Yup.string()
            .min(2, "Tu nombre es demasiado corto")
            .required("* Nombre"),
          Apellido: Yup.string()
          .min(2, "Tu apellido es demasiado corto")
          .required("* Apellido"),
          Puesto: Yup.string()
          .min(2, "Tu puesto es demasiado corto")
          .required("* Puesto"),
          Email: Yup.string()
            .email("El email es incorrecto")
            .required("* Email"),
        })}
        onSubmit={(values, actions) => {
          //$("#BtnSiguiente").click();
          const hdNombre    = document.getElementById("hdNombre")           as HTMLInputElement;
          const hdApellido  = document.getElementById("hdApellido")         as HTMLInputElement;
          const hdPuesto    = document.getElementById("hdPuesto")           as HTMLInputElement;
          const hdEmail     = document.getElementById("hdEmail")            as HTMLInputElement;
          const hdCelular   = document.getElementById("hdCelular")          as HTMLInputElement;
          const select      = document.querySelector(".selected-dial-code") as HTMLSelectElement;

          const nombreInput   = document.getElementById("txtNombre")    as HTMLInputElement;
          const apellidoInput = document.getElementById("txtApellido")  as HTMLInputElement;
          const puestoInput   = document.getElementById("txtPuesto")    as HTMLInputElement;
          const emailInput    = document.getElementById("txtEmail")     as HTMLInputElement;
          const celularInput  = document.getElementById("txtCelular")   as HTMLInputElement;
          const btnNext       = document.querySelector("#BtnSiguiente") as HTMLInputElement;

          hdNombre.value    = nombreInput.value;
          hdApellido.value  = apellidoInput.value;
          hdPuesto.value    = puestoInput.value;
          hdEmail.value     = emailInput.value;
          hdCelular.value   = select.innerHTML + " " + celularInput.value;
          btnNext.click();
          
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <>
                {
                   <Form className={`${style.RegistroForm}`} name="contact" method="post" onSubmit={handleSubmit}>
                    <Input
                      className={`${style.RegistroInputCol}`}
                      placeholder="Nombre"
                      type="text"
                      id="txtNombre"
                      name="Nombre"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoCapitalize="off"
                    />

                    <Input
                      className={`${style.RegistroInputCol} u-sinMargen`}
                      placeholder="Apellido"
                      type="text"
                      name="Apellido"
                      id="txtApellido"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="Puesto"
                      type="text"
                      name="Puesto"
                      id="txtPuesto"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="Email"
                      type="email"
                      name="Email"
                      id="txtEmail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="email"
                    />

                    <IntlTelInput
                      fieldId='txtCelular'
                      fieldName="Celular"
                      containerClassName="intl-tel-input"
                      placeholder='Celular'
                      defaultCountry={'mx'}
                      separateDialCode={true}
                    />

                    <div>
                      <p><strong>{(errors.Nombre)?`Errores:`:null}</strong></p>
                      {errors.Nombre}<br />
                      {errors.Apellido}<br />
                      {errors.Puesto}<br />
                      {errors.Email}
                    </div>

                    <div className='u-textLeft'>
                      <input className={`${style.RegistroBtnSiguiente} u-floatRight u-redondeado u-efecto`} type="submit" value="Siguiente" />
                    </div>

                  </Form>
                }
            </>
          );
        }}
      </Formik>
    )
}