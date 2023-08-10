import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import { Registro1 } from "./Registro1";
import { Registro2 } from "./Registro2";
import { Registro3 } from "./Registro3";

export const Registro = () => {
  const [current, setCurrent] = useState(0);
  const [paso1, setPaso1] = useState<"wait" | "process" | "finish" | "error">(
    "process"
  );
  const [paso2, setPaso2] = useState<"wait" | "process" | "finish" | "error">(
    "wait"
  );

  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const steps = [
    {
      title: "First",
      content: <Registro1 />,
    },
    {
      title: "Second",
      content: <Registro2 />,
    },
    {
      title: "Last",
      content: <Registro3 />,
    },
  ];

  const next = () => {
    if (current === 0) setPaso1("finish");
    else if (current === 1) setPaso2("finish");

    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps
        type="navigation"
        size="small"
        current={current}
        // onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            title: "Usuario",
            subTitle: "",
            status: paso1,
            description: "",
          },
          {
            title: "Empresa",
            subTitle: "",
            status: paso2,
            description: "",
          },
          {
            title: "Seguridad",
            subTitle: "",
            status: "wait",
            description: "",
          },
        ]}
      />

      <form
        className="Modal-Form"
        name="form-registro"
        id="form-registro"
        method="post"
        action=""
      >
        <input type="hidden" name="hdNombre" id="hdNombre" />
        <input type="hidden" name="hdApellido" id="hdApellido" />
        <input type="hidden" name="hdPuesto" id="hdPuesto" />
        <input type="hidden" name="hdEmail" id="hdEmail" />
        <input type="hidden" name="hdCelular" id="hdCelular" />
        <input type="hidden" name="hdEmpresa" id="hdEmpresa" />
        <input type="hidden" name="hdDedica" id="hdDedica" />
        <input type="hidden" name="hdNumEmpleados" id="hdNumEmpleados" />
        <input type="hidden" name="hdContrasenia" id="hdContrasenia" />
      </form>

      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div className="u-floatRight">
        {current < steps.length - 1 && (
          <Button id="BtnSiguiente" type="primary" onClick={() => next()}>
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            id="BtnTerminar"
            type="primary"
            onClick={() => {
              message.success("Su registro se ha realizado con éxito!");
              setTimeout(() => {
                window.location.href = "/Home";
              }, 2000);
            }}
          >
            Terminar registro
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
