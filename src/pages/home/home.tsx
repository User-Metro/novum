import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Space } from "antd";
import { Layout, Button, Menu, theme } from "antd";

import style from "./home.module.scss";
import { Resumen } from '../../components/molecules/resumen';
import { RegistrarCajaOBanco } from '../../hooks/RegistrarCajaOBanco';
//import { RegistrarIngresosFuturos } from "./RegisterPay/RegistrarIngresosFuturos.tsx";
//import { RegistrarEgresosFuturos } from "./RegisterDischargeCash/RegistrarEgresosFuturos.tsx";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 250;

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Resumen", "1", <span className="icon-icoResumen"></span>),
  getItem(
    "Registrar caja o banco",
    "2",
    <span className="icon-icoRegistrarCB"></span>
  ),
  getItem(
    "Registrar ingresos futuros",
    "3",
    <span className="icon-icoIngreso"></span>
  ),
  getItem(
    "Registrar egresos futuros",
    "4",
    <span className="icon-icoEgereso"></span>
  ),
];

export const Home = (props: any) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("1");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    setPage(e.key);
  };

  const cambioRegistroBan = () => {
    setPage("2");
  };

  const Cambio = (props: any) => {
   
    if (props.pos === "1") {
      return <Resumen cambioRegistroBan={cambioRegistroBan}/>;
    } else if (props.pos === "2") {
      return <RegistrarCajaOBanco cambioRegistroBan={undefined}/>;
    } else if (props.pos === "3") {
      return <div>RegistrarIngresosFuturos</div>;
    } else if (props.pos === "4") {
      return <div>RegistrarEgresosFuturos</div>;
    }
    
    // Agrega un caso por defecto para manejar otros valores de props.pos
    return null; // O cualquier otro elemento JSX que desees renderizar por defecto
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <span className={`${style.HomeLogo} icon-logo`}>
        <span className="path1"></span>
        <span className="path2"></span>
        <span className="path3"></span>
        <span className="path4"></span>
        <span className="path5"></span>
        <span className="path6"></span>
      </span>
      <Divider />
      <Menu
        className={style.prueba}
        defaultSelectedKeys={[page]}
        selectedKeys={[page]}
        mode="inline"
        onClick={onClick}
        items={items}
      />
    </Box>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppBar className={style.mobile} component="nav">
        <Toolbar>
          <Box>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "block" } }}
            >
              <MenuIcon />
            </IconButton>
            <span className={`${style.HomeLogo} icon-logo`}>
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
              <span className="path5"></span>
              <span className="path6"></span>
            </span>
          </Box>
          <Box>
            <Avatar size={40} className={`${style.HomeUser} u-floatRight`}>
              AP
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Space size={16} wrap>
            <Avatar size={40} className={`${style.HomeUser} u-floatRight`}>
              AP
            </Avatar>
          </Space>
        </Header>
        <Content style={{ margin: "0 16px" }} className="u-textCenter">
          <Cambio pos={page} />
        </Content>
      </Layout>
    </Layout>
  );
};
