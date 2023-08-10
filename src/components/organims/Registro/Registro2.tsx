import React from 'react';
import { Input } from 'antd';
import { Formik, Form } from "formik";
import style from './Registro.module.scss';
import 'react-intl-tel-input-18/dist/main.css';
import * as Yup from "yup";

export const Registro2 = () => {
    return (
      <Formik
      initialValues={{
        empresa: '',
        dedicaTuEmpresa: '',
        numeroEmpreados: '',
      }}
      validationSchema={Yup.object().shape({
        empresa: Yup.string()
          .min(2, "El nombre de la empresa es demasiado corto")
          .required("* Empresa"),
        dedicaTuEmpresa:  Yup.string()
        .min(2, "El texto es demasiado corto")
        .required("* ¿A que se dedica tu empresa?"),
        numeroEmpreados:  Yup.number()
        .min(1, "Al menos un digito")
        .required("* Número de empleados"),
        // Apellido: Yup.string()
        // .min(2, "Tu apellido es demasiado corto")
        // .required("* Apellido"),
        // Puesto: Yup.string()
        // .min(2, "Tu puesto es demasiado corto")
        // .required("* Puesto"),
        // Email: Yup.string()
        //   .email("El email es incorrecto")
        //   .required("* Email"),
        // Celular: Yup.string()
        // .min(7, "Tu celular es demasiado corto")
        // .required("* Celular"),
      })}
        onSubmit={(values, actions) => {
          const hdEmpresa       = document.getElementById('hdEmpresa')          as HTMLInputElement;
          const hdDedica        = document.getElementById('hdDedica')           as HTMLInputElement;
          const hdNumEmpleados  = document.getElementById('hdNumEmpleados')     as HTMLInputElement;

          const empresaInput    = document.getElementById('txtEmpresa')         as HTMLInputElement;
          const dedicaInput     = document.getElementById('txtDedicaTuEmpresa') as HTMLInputElement;
          const empleadosInput  = document.getElementById('txtnumeroEmpreados') as HTMLInputElement;
          const bntNext         = document.querySelector("#BtnSiguiente")       as HTMLInputElement;

          hdEmpresa.value       = empresaInput.value;
          hdDedica.value        = dedicaInput.value;
          hdNumEmpleados.value  = empleadosInput.value;
          bntNext.click();
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
                      placeholder="Nombre de la empresa"
                      type="text"
                      name="empresa"
                      id="txtEmpresa"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="¿A que se dedica tu empresa?"
                      type="text"
                      name="dedicaTuEmpresa"
                      id="txtDedicaTuEmpresa"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="Número de empleados"
                      type="text"
                      name="numeroEmpreados"
                      id="txtnumeroEmpreados"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div>
                      <p><strong>{(errors.empresa)?`Errores:`:null}</strong></p>
                      {errors.empresa}<br />
                      {errors.dedicaTuEmpresa}<br />
                      {errors.numeroEmpreados}
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