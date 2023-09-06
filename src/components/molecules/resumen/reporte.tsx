import React                                    from "react";
import style                                    from "../../../pages/home/home.module.scss";
import { Space, Table, Tag, Button, Col, Row }  from "antd";
import type { ColumnsType }                     from "antd/es/table";

interface DataType {
  key:      string;
  efectivo: number;
  banco:    number;
  total:    string;
}

const columns: ColumnsType<DataType> = [
  {
    title:      "Efectivo",
    dataIndex:  "efectivo",
  },
  {
    title:      "Banco",
    dataIndex:  "banco",
  },
  {
    title:      "Total",
    dataIndex:  "total",
  },
];

const data: DataType[] = [
  {
    key:      "1",
    efectivo: 10,
    banco:    11,
    total:    "21",
  },
];

interface DataType2 {
  key:        string;
  efectivo:   string;
  className?: string;
  banco?:     number;
  colSpan?:   number;
}

const columns2: ColumnsType<DataType2> = [
  {
    title:      "",
    dataIndex:  "efectivo",
    render: (text) => <strong>{text}</strong>,
  },
  {
    title:      "",
    dataIndex:  "banco",
  },
];

const data2: DataType2[] = [
  {
    key:        "1",
    efectivo:   "Número de registros",
    banco:      11,
  },
  {
    key:        "1",
    efectivo:   "Métodos",
    className:  "u-textCenter",
    colSpan:    2,
  },
  {
    key:        "2",
    efectivo:   "Efectivo",
    banco:      11,
  },
  {
    key:        "3",
    efectivo:   "Banco",
    banco:      9,
  },
  {
    key:        "4",
    efectivo:   "Categorias",
    colSpan:    2,
  },
  {
    key:        "5",
    efectivo:   "Cliente",
    banco:      11,
  },
  {
    key:        "6",
    efectivo:   "Otros",
    banco:      9,
  },
];

export const Reporte = ({ 
  cambioRegistroBan 
}: 
{ cambioRegistroBan: any 
}) => {
  return (
    <>
      <div      className = {style.TablaResumen}>
        <Row>
          <Col  span      = {1}></Col>
          <Col  span      = {6}>
            <h2 className = {style.TitleColResumen}>
              <strong>Caja o banco</strong>
            </h2>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Col>
          <Col  span      = {1}></Col>
          <Col  span      = {7}>
            <h2 className = {style.TitleColResumen}>
              <strong>Ingresos futuros</strong>
            </h2>
            <Table columns={columns2} dataSource={data2} pagination={false} />
          </Col>
          <Col  span      = {1}></Col>
          <Col  span      = {7}>
            <h2 className = {style.TitleColResumen}>
              <strong>Egresos futuros</strong>
            </h2>
            <Table columns={columns2} dataSource={data2} pagination={false} />
          </Col>
          <Col  span      = {1}></Col>
        </Row>
      </div>
    </>
  );
};
