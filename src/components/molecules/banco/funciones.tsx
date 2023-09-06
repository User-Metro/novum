import fn from "../../../utility";
import Styles from "../../../pages/RegisterBank/RegisterBank.module.scss";
import { ModalBank } from '../../organims/modalRegister';
let listData = "";

function agregarItem(
  id: number,
  nombre: string,
  id_tipo: number,
  tipo: string,
  cantidad: number
): string {
  const item = `
  <div class="${Styles.container}">
    <div class="${Styles.information}">
      <div class="${Styles.headInfo}">
        <div>
          <span class="${
            tipo === "Banco" ? "icon-icoBankPlus" : "icon-icoCash"
          }"></span>
          <span id="spName${id}">${nombre}</span>
        </div>
      <div>
      <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" aria-label="Edit" 
      onClick="document.querySelector('#btnAbrirModal').click(); setTimeout(()=>{document.querySelector('#hdId').value='${id}';},500);">
        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditOutlinedIcon"><path d="m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path>
        </svg>
        <span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
      </button>
      `;
      
        
      
        
      
        
    const item3 = `
      <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" aria-label="Edit">
        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreVertIcon"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
        </svg>
        <span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
      </button>
    </div>
  </div>
  <div class="${Styles.bankInfo}">
    <p>${tipo}</p>
    <p id="spTipoO${id}" class="u-ocultar">${id_tipo}</p>
    <p id="spCantidad${id}">${fn.convertirModena(cantidad)}</p>
    <p id="spCantidadO${id}" class="u-ocultar">${cantidad}</p>
    </div>
  </div>
</div>`;

  return item+item3;
}

function mostrarData(info: any) {
  listData = "";
  for (let j = 0; j < Object.keys(info["listCajasBancos"]).length; j++)
    listData += agregarItem(
      info["listCajasBancos"][j]["cajas_bancos_id"],
      info["listCajasBancos"][j]["nombre_cuenta"],
      info["listCajasBancos"][j]["tipo_pago_id"],
      info["listCajasBancos"][j]["tipos_pagos"]["tipo_pago"],
      info["listCajasBancos"][j]["cantidad_actual"]
    );

  if (listData === "")
    listData = "<p><strong>No hay resultados en la busqueda.</strong></p>";

  if (listData) {
    fn.asignarValorInnerHTML("listDatos", listData);
    fn.asignarValorInnerHTML(
      "NumCuenta",
      Object.keys(info["listCajasBancos"]).length.toString()
    );
  }
}

function obtenerData(info: any): object {
  interface IData {
    id: number,
    Nombre: string;
    id_tipo: number;
    Tipo: string;
    Cantidad: string;
    Monto: number;
  }

  let listData: IData[];
  listData = [];

  for (let j = 0; j < Object.keys(info["listCajasBancos"]).length; j++) {
    let item: { id: number; Nombre: string; id_tipo: number; Tipo: string; Cantidad: string; Monto: number; } = {
      id: info["listCajasBancos"][j]["cajas_bancos_id"],
      Nombre: info["listCajasBancos"][j]["nombre_cuenta"],
      id_tipo: info["listCajasBancos"][j]["tipo_pago_id"],
      Tipo: info["listCajasBancos"][j]["tipos_pagos"]["tipo_pago"],
      Cantidad: fn.convertirModena(
        info["listCajasBancos"][j]["cantidad_actual"]
      ),
      Monto: info["listCajasBancos"][j]["cantidad_actual"],
    };
    listData.push(item);
  }

  return listData;
}

export default { mostrarData, obtenerData };
