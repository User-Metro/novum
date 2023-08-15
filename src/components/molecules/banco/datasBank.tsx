import React, { FC } from "react";
import Box from "@mui/material/Box";

import Styles from "../../../pages/RegisterBank/RegisterBank.module.scss";
import IconButton from "@mui/material/IconButton";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaymentsIcon from "@mui/icons-material/Payments";

interface Props {
  nombre: string;
  tipo: string;
  cantidad: number;
}

export const DataBank: FC<Props> = ({nombre, tipo, cantidad }) => {
  const formatNumber = (number: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

  return (
    <Box className={Styles.container}>
      <Box className={Styles.information}>
        <Box className={Styles.headInfo}>
          <div>
            <span className={tipo=="Banco"?'icon-icoBankPlus':'icon-icoCash'}></span>
            <span>
              {nombre}
            </span>
          </div>

          <div>
            <IconButton type="button" aria-label="Edit">
              <EditOutlinedIcon />
            </IconButton>
            <IconButton type="button" aria-label="Edit">
              <MoreVertIcon />
            </IconButton>
          </div>
        </Box>
        <Box className={Styles.bankInfo}>
          <p>{tipo}</p>
          <p>$ {formatNumber(cantidad)}</p>
        </Box>
      </Box>
    </Box>
  );
};
