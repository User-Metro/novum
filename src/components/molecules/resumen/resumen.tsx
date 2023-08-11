import React from "react";

import { LayoutAdmin } from "../../../hooks/Layout";
import { Default } from "../default";

export const Resumen = ({ cambioRegistroBan }: { cambioRegistroBan: any }) => {
  return (
    // <LayoutAdmin className="u-textCenter" itemMenu='1'>
    <Default cambioRegistroBan={cambioRegistroBan} />
    // </LayoutAdmin>
  );
};