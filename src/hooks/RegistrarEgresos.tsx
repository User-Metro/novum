import React, { useState }  from "react";
import { Default }          from "../components/organims/egresos";
import { Egresos }          from "../pages/registroEgreso";

export const RegistrarEgresosFuturos = ({
  egresoActive,
  setEgresoActive,
}: {
  egresoActive:     any;
  setEgresoActive:  any;
}) => {
  const [status, setStatus] = useState(egresoActive);

  const cambioTable = () => {
    setStatus(true);
  };

  const Cambio = (props: { ban: boolean }) => {
    if (props.ban){
      return <Egresos />;
    }
    else{
      return <Default cambioTable={cambioTable} />;
    }
  };

  return <Cambio ban={status} />;
};