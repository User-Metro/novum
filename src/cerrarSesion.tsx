import React, { FC }                from "react";
import { DownOutlined }             from '@ant-design/icons';
import type { MenuProps }           from 'antd';
import { Dropdown, Avatar, Space }  from 'antd';
import Box                          from "@mui/material/Box";
import style                        from "./pages/home/home.module.scss";

const onClick: MenuProps['onClick'] = ({ key }) => {
  localStorage.setItem('user_id', "");
  window.location.href ='/';
};

const items: MenuProps['items'] = [
  {
    label:  <strong>Cerrar sesión</strong>,
    key:    '0',
  },
];
interface Props {
  iniciales: string | null;
}

export const CerrarSesion: FC<Props> = ({ 
  iniciales 
}) => {
  return (
    <Box>
      <Dropdown className='AvarHeader' menu={{ items, onClick }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar size={40} className={`${style.HomeUser} u-floatRight`}>
            {iniciales}
          </Avatar>
          <Space>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Box>
  );
};
