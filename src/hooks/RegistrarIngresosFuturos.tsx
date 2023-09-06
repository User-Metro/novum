import React, { useState } from "react";
import { Default } from "../components/organims/ingresos/Default";
import { Ingresos } from "../pages/registroIngreso";

export const RegistrarIngresosFuturos = ({
  cambioRegistroBan,
}: {
  cambioRegistroBan: any;
}) => {
  const [status, setStatus] = useState(true);

  const cambioTable = () => {
    setStatus(true);
  };

  const Cambio = (props: { ban: any; }) => {
    if (props.ban) {
      return <Ingresos />;
    } else {
      return <Default cambioRegistroBan={cambioRegistroBan} cambioTable={cambioTable} />;
    }
  };

  return <Cambio ban={status} />;
};
