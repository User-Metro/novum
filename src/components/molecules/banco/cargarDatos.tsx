import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataBank } from './datasBank';

export interface Data {
  // Define las propiedades y tipos de tu tipo Data aquí
  id: number;
  nombre: string;
  tipo: string;
  cantidad: number;
}

export const CargaDatos = ({listDatos}: {
  listDatos: any;}) => {


  //let [datos, setDatos] = useState([]);
  const [datas, setDatas] = useState<Data[]>([]);
  //const [cargarInfo, setCargarInfo] = useState(false);
  //const [cargandoVisible, setCargandoVisible] = React.useState(true);

  return (
    <Box style={{
      paddingBottom: "50px"
    }}>
      <div>
        {
          listDatos.map((data: { id: React.Key | null | undefined; nombre: string; tipo: string; cantidad: number; }) => (
          <DataBank
            key={data.id}
            nombre={data.nombre}
            tipo={data.tipo}
            cantidad={data.cantidad}
          />
        ))
      }
      </div>

      <div>
        {datas.map((task) => (
          <DataBank
            key={task.id}
            nombre={task.nombre}
            tipo={task.tipo}
            cantidad={task.cantidad}
          />
        ))}
      </div>
    </Box>
  );
};
