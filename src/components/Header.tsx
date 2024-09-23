import { useContext, useEffect, useState } from "react";
import { UserAddOutlined, ScheduleOutlined, ContactsOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce";


const Header = () => {
    const [current, setCurrent] = useState<string>('schedule');
    const [email, setEmail] = useState<string>('Loading...')

    // dean manager student 
    const role: string | null = 'dean';

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ display: 'flex' }}
        >
            <Menu.Item key='logo' disabled style={{ cursor: "default" }}>
                <Typography.Title level={4} style={{ marginTop: 7 }}>HITs.events</Typography.Title>
            </Menu.Item>
            <Menu.Item key='schedule' icon={<ScheduleOutlined />}>
                <Link to="/">Мероприятия</Link>
            </Menu.Item>

            {role == 'dean' &&
                <Menu.Item key='companies' icon={<ContactsOutlined />}>
                    <Link to="/companies">Компании</Link>
                </Menu.Item>
            }
            {(role == 'dean' || role == 'manager') &&
                <Menu.Item key='requests' icon={<UserAddOutlined />}>
                    <Link to="/requests">Заявки</Link>
                </Menu.Item>
            }
            <Menu.SubMenu key='email' title={email} style={{ marginLeft: 'auto' }}>
                <Menu.Item key='profile' disabled style={{ cursor: "default" }}>
                    <Typography.Paragraph>Имя Фамилия</Typography.Paragraph>
                </Menu.Item>
                <Menu.Item key='role' disabled style={{ cursor: "default" }}>
                    <Typography.Paragraph>Роль</Typography.Paragraph>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default Header;