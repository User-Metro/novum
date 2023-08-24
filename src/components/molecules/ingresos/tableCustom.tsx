import * as React from "react";
import Styles from "../../../pages/registroIngreso/ingresos.module.scss";

import { RowsCustom } from "./rowsCustom";

import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export const TableCustom = ({
  arrays,
  showModal,
  setInitialValues,
  showModalC
}: {
  arrays: any;
  showModal: Function,
  setInitialValues: Function,
  showModalC: Function
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Paper
        sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}
        className={Styles.divTable}
      >
        <input type="hidden" name="hdIdIngresoFuturo" id="hdIdIngresoFuturo" />
        <TableContainer sx={{ maxHeight: 440 }} className={Styles.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Fecha de creación</TableCell>
                <TableCell align="left">Método de pago</TableCell>
                <TableCell align="left">Categoria</TableCell>
                <TableCell align="left">
                  Nombre de la persona o empresa
                </TableCell>
                <TableCell align="left">Concepto</TableCell>
                <TableCell align="left">Monto</TableCell>
                <TableCell align="left">Fecha de pago tentativa</TableCell>
                <TableCell align="left">Estado</TableCell>
                <TableCell align="left">Fecha en la que se cobró</TableCell>
                <TableCell align="left"><span className="u-visibilityHiddn">Opciones</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <RowsCustom
                pullData={arrays}
                page={page}
                rowsPerPage={rowsPerPage}
                showModal={showModal}
                setInitialValues={setInitialValues}
                setModal2Open={showModalC}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={arrays.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
