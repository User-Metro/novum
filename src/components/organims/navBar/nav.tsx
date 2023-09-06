import Styles                   from './nav.module.scss';
import SearchIcon               from "@mui/icons-material/Search";
import IconButton               from "@mui/material/IconButton";
import Button                   from "@mui/material/Button";
import OutlinedInput            from '@mui/material/OutlinedInput';
import Box                      from "@mui/material/Box";
import fn                       from "../../../utility";

export const NavBar = ({
  cantidadV,
  cargarDatosIngresos,
  setStMetodo,
  setStEstado,
  setListaDatos,
  buscarPorSelect,
  stMetodo,
  stEstado,
  handleOnExcel,
  ingreso,
}:{
  cantidadV:            number;
  cargarDatosIngresos:  Function;
  setStMetodo:          any;
  setStEstado:          any;
  setListaDatos:        any;
  buscarPorSelect:      any;
  stMetodo:             number;
  stEstado:             number;
  handleOnExcel:        any;
  ingreso:              boolean;
}) => {
  return(
    <Box    className = {Styles.nav}>
      <Box  className = {Styles.counter}>
        <p>Cuentas</p>
        <div id="NumCuenta" className={Styles.chip}>
          {cantidadV}
        </div>
      </Box>

      <Box  className = {Styles.itemSearch}>
        <OutlinedInput
          id                = "txtSearch"
          name              = "txtSearch"
          placeholder       = "Buscar"
          fullWidth 
          size              = "small"
          aria-describedby  = "outlined-weight-helper-text"
          endAdornment      = {
            <IconButton
              id            = "btnBuscar"
              type          = "button"
              aria-label    = "search"
              onClick       = {() => {
                cargarDatosIngresos(true, setListaDatos);
                setStMetodo(0);
                setStEstado(0);
              }}
            >
              <SearchIcon />
            </IconButton>
          }
          inputProps        = {{
            'aria-label': 'weight',
          }}
          onKeyUp           = {() => {
            fn.ejecutarClick("#btnBuscar");
          }}
        />
      </Box>

      <Box  className = {Styles.searchSelect}>
        <label htmlFor="stTipoB" className={Styles.LblFilter}>Método</label>
        <select
          name      = "stTipoB"
          id        = "stTipoB"
          className = {`${Styles.ModalSelect} ${Styles.ModalSelectBrVerde}`}
          onChange  = {buscarPorSelect}
          value     = {stMetodo}
        >
          <option value="0">Todos         </option>
          <option value="1">Efectivo      </option>
          <option value="2">Transferencia </option>
        </select>

        <label htmlFor="stEstadoB" className={Styles.LblFilter}>Estado</label>
        <select
          name      = "stEstadoB"
          id        = "stEstadoB"
          className = {`${Styles.ModalSelect} ${Styles.ModalSelectBrVerde}`}
          onChange  = {buscarPorSelect}
          value     = {stEstado}
        >
          <option value="0">Todos       </option>
          <option value="1">
            {
              ingreso
                ? 'Cobrados'
                : 'Pagados'
            }
          </option>
          <option value="2">
            {
              ingreso
                ? 'No cobrados'
                : 'No Pagados'
            } 
          </option>
        </select>
      </Box>

      <Box  className = {Styles.itemButton}>
        <Button
          variant   = "contained"
          color     = "success"
          startIcon = {<span className="icon-excel"></span>}
          classes   = {{
            root: Styles.btnCreateAccount,
          }}
          onClick   = {handleOnExcel}
        >
        </Button>
      </Box>  
    </Box>
  )
}