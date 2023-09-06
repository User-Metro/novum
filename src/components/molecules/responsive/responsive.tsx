import Styles         from "./responsive.module.scss";
import Box            from "@mui/material/Box";
import IconButton     from "@mui/material/IconButton";
import Chip           from "@mui/material/Chip";
import MoneyOffIcon   from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import MoreVertIcon   from "@mui/icons-material/MoreVert";

export const ResponsiveDesing = ({
  listaDatos,
  ingreso,
}: {
  listaDatos: any;
  ingreso:    boolean;
}) => {
  const formatNumber = (number: number | bigint) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

  return (
    <Box className={Styles.container}>
      {listaDatos.map(
        (item: {
        name:
          | boolean
          | React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | React.Key
          | null
          | undefined;
        id: any;
        date_created:
          | string
          | number
          | boolean
          | React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
        payment_method: string;
        category:
          | string
          | number
          | boolean
          | React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
        concept:
          | string
          | number
          | boolean
          | React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
        amount: number;
        date_to_pay:
          | string
          | number
          | boolean
          | React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
        state: string;
        date_cashed:
          | string
          | number
          | boolean
          | React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
        statusCobro: boolean;
        date_created_o: any;
      },
      index: React.Key | null | undefined
      ) => (
        <Box        className = {Styles.results} key={index}>
          <Box      className = {Styles.conten}>
            <Box    className = {Styles.resultResponsive}>
              <div  className = {Styles.btnEdit}>
                <IconButton     aria-label  = "delete" size="small">
                  <MoreVertIcon fontSize    = "small" />
                </IconButton>
              </div>
              <Box  className = {Styles.columnas}>
                <li>Fecha de creación:      </li>
                <li>Persona o empresa:      </li>
                <li>Concepto:               </li>
                <li>Monto:                  </li>
                <li>Fecha tentativa de pago:</li>
                <li>
                  {
                    ingreso
                      ? 'Fecha en la que se cobró:'
                      : 'Fecha en la que se pagó:'
                  }
                </li>
                <li>Estatus:                </li>
                <li>
                  <p>{item.date_created}    </p>
                </li>
                <li>
                  <p>{item.name}            </p>
                </li>
                <li>
                  <p>{item.concept}         </p>
                </li>
                <li>
                  <p>$ {formatNumber(item.amount)}</p>
                </li>
                <li>
                  <p>{item.date_to_pay}</p>
                </li>
                <li>
                  <p>{item.date_cashed}</p>
                </li>
                <li>
                  {item.state == "Cobrado" ? (
                    <Chip
                      icon      = {<PriceCheckIcon />}
                      size      = "small"
                      label     = "Cobrado"
                      className = {Styles.chipTable}
                    />
                  ) : (
                    <Chip
                      icon      = {<MoneyOffIcon />}
                      label     = "No cobrado"
                      size      = "small"
                      className = {Styles.chipTableNo}
                    />
                  )}
                </li>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
