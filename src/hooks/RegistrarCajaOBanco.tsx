import React, { useState } from "react";
import { Default } from "../components/molecules/def-bank";
import { TableRegistrarCajaOBanco } from '../pages/RegisterBank';

export const RegistrarCajaOBanco = ({
  cambioRegistroBan,
}: {
  cambioRegistroBan: any;
}) => {
  const [status, setStatus] = useState(true);

  const cambioTable = () => {
    setStatus(true);
  };

  const Cambio = (props: { ban: any }) => {
    if (props.ban) {
      return <TableRegistrarCajaOBanco/>;
    } else {
      return (
        <Default
          cambioRegistroBan={cambioRegistroBan}
          cambioTable={cambioTable}
        />
      );
    }
  };

  return <Cambio ban={status} />;
};
