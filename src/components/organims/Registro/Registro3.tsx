import React from 'react';
import {Button, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Formik, Form } from "formik";
import style from './Registro.module.scss';
import * as Yup from "yup";

export const Registro3 = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [cargandoVisible, setCargandoVisible] = React.useState(false);

    const obtenerValor = (input: any) => {
      let valorInput: HTMLInputElement = document.querySelector(input);
      return valorInput?.value;
    };

    return (
      <Formik
        initialValues={{
          password: '',
          repitePasword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required("* Contraseña"),
          repitePasword:  Yup.string()
          .oneOf([Yup.ref('password')],"Las contraseñas deben ser iguales")
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .required("* Confirma contraseña"),
        })}
        onSubmit={(values, actions) => {
          let hdContrasenia = obtenerValor('#hdContrasenia');
          let txtPassword = obtenerValor('#txtPassword');
          hdContrasenia = txtPassword;
          //document.getElementById('hdContrasenia').value=document.getElementById('txtPassword').value;
          let btnTerminarRegistro = document.querySelector('#btnTerminarRegistro') as HTMLInputElement;
          btnTerminarRegistro.disabled = true;

          //document.querySelector('#btnTerminarRegistro').disabled = true;
          setCargandoVisible(true);

          const scriptURL   = 'https://admin.bioesensi-crm.com/crearUsuario';
          const scriptURLC  = 'https://admin.bioesensi-crm.com/crearCliente'
          //const form = document.forms['form-registro'];
          const hdEmail     = obtenerValor('#hdEmail');
          //hdContrasenia = document.getElementById('hdContrasenia').value;

          const hdNombre        = obtenerValor('#hdNombre');
          const hdApellido      = obtenerValor('#hdApellido');
          const hdPuesto        = obtenerValor('#hdPuesto');
          const hdCelular       = obtenerValor('#hdCelular');
          const hdEmpresa       = obtenerValor('#hdEmpresa');
          const hdDedica        = obtenerValor('#hdDedica');
          const hdNumEmpleados  = obtenerValor('#hdNumEmpleados');
          let hdUser_id=0;

          const data = {hdEmail, hdContrasenia};

          fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then((resp) => resp.json())
          .then(function(data) {

            hdUser_id = data.usuario_id;

            const dataC = {
              hdNombre,
              hdApellido,
              hdPuesto,
              hdCelular,
              hdEmpresa,
              hdDedica,
              hdNumEmpleados,
              hdUser_id,
            }

            fetch(scriptURLC, {
              method: 'POST',
              body: JSON.stringify(dataC),
              headers:{
                'Content-Type': 'application/json'
              }
            })
            .then((resp) => resp.json())
            .then(function(data) {
              localStorage.setItem('user_id', JSON.stringify(hdUser_id));

              btnTerminarRegistro.disabled = false;
              setCargandoVisible(false);
              const btnFinish = document.querySelector("#BtnTerminar") as HTMLInputElement;
              btnFinish.click();
            })
            .catch(error => {
              alert(error.message);
              console.error('Error!', error.message);
            });
          })
            .catch(error => {
              alert(error.message);
              console.error('Error!', error.message);
            });
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

                      <Space direction="vertical">
                        <Input.Password 
                          name='password'
                          id="txtPassword"
                          placeholder="Contraseña" 
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Input.Password 
                          name='repitePasword'
                          placeholder="Confirma contraseña"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Space>

                      <div>
                        <p><strong>{(errors.password)?`Errores:`:null}</strong></p>
                        {errors.password}<br />
                        {errors.repitePasword}<br /><br />
                      </div>

                      <div className='u-textLeft'>
                        <img className={cargandoVisible? "Cargando mostrar" : "Cargando"}  src="img/loading.gif" alt="" />
                        <input id="btnTerminarRegistro" className={`${style.RegistroBtnSiguiente} u-floatRight u-redondeado u-efecto`} type="submit" value="Terminar registro" />
                      </div>
                  </Form>
                }
            </>
          );
        }}
      </Formik>
    )
}