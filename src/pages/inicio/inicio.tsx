import React from "react";
import style from "../../components/organims/login/login.module.scss";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Login } from '../../components/organims/login';
import { Registro } from '../../components/organims/Registro';

localStorage.setItem('site', "http://localhost:3001");

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Iniciar sesión`,
    children: <Login />,
  },
  {
    key: "2",
    label: `Registrarse`,
    children: <Registro />,
  },
];
export const Inicio = () => {
  return (
    <div>
      <div className={`${style.Login} u-size100-p u-textCenter`}>
        <figure
          className={`${style.LoginBarra} icon-barraHome u-positionAbsolute`}
        ></figure>
        <div className={`${style.LoginCenter} u-inline-block`}>
          <h1 className={`${style.LoginLogo} u-inline-block`}>
            <span className="icon-logo">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
              <span className="path5"></span>
              <span className="path6"></span>
            </span>
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur. Nisl enim</p>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
