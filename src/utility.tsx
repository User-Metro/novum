const locales = "en-US";
const options = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
const formatterDolar = new Intl.NumberFormat(locales, options);

const convertirModena = (valor: number): string => {
  return formatterDolar.format(valor);
};

const obtenerValor = (input: any) => {
  let valorInput: HTMLInputElement = document.querySelector(input);
  return valorInput?.value;
};

const obtenerValorText = (select: any) => {
  let valorSelect = document.querySelector(select);
  return valorSelect.options[valorSelect.selectedIndex].text;
};

const obtenerValorHtml = (element: any) => {
  let valorHtml = document.querySelector(element);
  return valorHtml?.innerHTML;
};

const obtenerValorRadio = (input: any) => {
  let valorRadio: null | HTMLInputElement = document.querySelector(
    'input[name="' + input + '"]:checked'
  )
  return valorRadio?.value;
};

const asignarValorInput = (input: string, valor: string): void => {
  let element = document.querySelector(input) as HTMLInputElement;
  element.value = valor;
};

const asignarValorSelect = (select: string, valor: string): void => {
  let element = document.getElementById(select) as HTMLInputElement;
  element.value = valor;
};

const asignarValorInnerHTML = (campo: string, valor: string): void => {
  let element = document.getElementById(campo) as HTMLInputElement;
  element.innerHTML = valor;
};

const ejecutarClick = (campo: string): void => {
  let element = document.querySelector(campo) as HTMLInputElement;
  element.click();
};

const convertirFecha = (fecha: string): string => {
  let fechaC = "Pendiente";
  if (fecha)
    fechaC =
      fecha.substr(8, 2) + "/" + fecha.substr(5, 2) + "/" + fecha.substr(0, 4);
  return fechaC;
};

const obtenerFecha = (fecha: string): string => {
  return fecha.slice(0, 10);
};

const agregarClase = (campo: string, clase: string): void => {
  let element = document.querySelector(campo);
  element?.classList.add("u-ocultar");
};

const buscarPosicionArreglo = (arrray: Array<any>, id: number): number => {
  let pos = 0;
  for (let j = 0; j < arrray.length; j++) {
    if (arrray[j]["id"] === id) pos = j;
  }
  return pos;
};

export default {
  obtenerValor,
  obtenerValorText,
  obtenerValorRadio,
  convertirModena,
  obtenerValorHtml,
  asignarValorInput,
  asignarValorSelect,
  asignarValorInnerHTML,
  ejecutarClick,
  convertirFecha,
  agregarClase,
  buscarPosicionArreglo,
  obtenerFecha,
};
