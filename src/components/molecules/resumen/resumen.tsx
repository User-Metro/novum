import React            from "react";
import { LayoutAdmin }  from "../../../hooks/Layout";
import { Default }      from "../default";
import { Reporte }      from './reporte';

export const Resumen = ({ cambioRegistroBan }: { cambioRegistroBan: any }) => {
  return (
    // <LayoutAdmin className="u-textCenter" itemMenu='1'>
    <Reporte cambioRegistroBan={cambioRegistroBan} />
    // </LayoutAdmin>
  );
};