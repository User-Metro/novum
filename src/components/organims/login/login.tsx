import React from "react";
import style from "./login.module.scss";
import { Input, message } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export const Login = () => {
  const obtenerValor = (input: any) => {
    let valorInput: HTMLInputElement = document.querySelector(input);
    return valorInput?.value;
  };
  const [cargandoVisible, setCargandoVisible] = React.useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("El email es incorrecto")
          .required("El email es requerido"),

        password: Yup.string().required("La contraseña es requerida"),
      })}
      onSubmit={(values, actions) => {
        const scriptURL = "https://admin.bioesensi-crm.com/loguear";
        const email = obtenerValor("#email");
        const password = obtenerValor("#password");
        const data = { email, password };
        setCargandoVisible(true);

        fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then(function (data) {
            setCargandoVisible(false);

            if (data.usuario_id > 0) {
              let user_id = data.usuario_id;
              const scriptURL = localStorage.getItem('site')+"/obtenerIniciales";
              let dataUrl = {user_id};

              fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(dataUrl),
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then((resp) => resp.json())
              .then(function(data) {
                message.success('Logueado!');
                localStorage.setItem('user_id', JSON.stringify(user_id));
                localStorage.setItem('iniciales', data.iniciales);
                window.location.href ='/Home';
              })
              .catch(error => {
                alert(error.message);
                console.error('Error!', error.message);
              });
            } else message.error("Los datos de acceso son incorrectos");
          })
          .catch((error) => {
            alert(error.message);
            console.error("Error!", error.message);
          });
      }}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
        return (
          <>
            <Form
              className={`${style.LoginForm}`}
              name="contact"
              method="post"
              onSubmit={handleSubmit}
            >
              <Input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="email"
              />

              <Input
                placeholder="Contraseña"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email}
              <br />
              {errors.password}

              <div className="u-textLeft">
                <Link
                  to="/Recovery-pass"
                  className={`${style.LoginTextOlvido} u-inline-block`}
                >
                  ¿Olvido su contraseña?
                </Link>

                {/*<img
                  className={
                    cargandoVisible ? "Cargando Mt mostrar" : "Cargando Mt"
                  }
                  src='img/loading.gif'
                  alt="Cargando..."
                />*/}
                <input
                  className={`${style.LoginBtnIniciarSesion} u-floatRight u-redondeado u-efecto`}
                  type="submit"
                  value="Iniciar sesión"
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
