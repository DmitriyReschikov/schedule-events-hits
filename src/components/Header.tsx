import { useContext, useEffect, useState } from "react";
import { UserAddOutlined, ScheduleOutlined, ContactsOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserDTO } from "../interfaces/DTOs/User";
import { getUser } from "../api/requests/userRequests";
import { setupTokenInterceptor } from "../api/axios/instance";
import { setInfo } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import SubMenu from "antd/es/menu/SubMenu";

const Header = () => {
    const location = useLocation()
    const [current, setCurrent] = useState<string>(location.pathname.slice(1) || 'events');
    const [user, setUser] = useState<UserDTO>()
    const dispatch: AppDispatch = useDispatch();
    const { logOut } = useContext<IAuthContext>(AuthContext)


    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            if (userData) {
                setUser(userData)
            }
        }

        setupTokenInterceptor()
        fetchUser()
    }, [])

    const roles: string[] = user?.roles || [];
    const id: string = user?.id || ''
    dispatch(setInfo({ roles, id }))


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
            <Menu.Item key='events' icon={<ScheduleOutlined />}>
                <Link to="/">Мероприятия</Link>
            </Menu.Item>

            {roles.includes('ADMIN') &&
                <Menu.Item key='companies' icon={<ContactsOutlined />}>
                    <Link to="/companies">Компании</Link>
                </Menu.Item>
            }
            {(roles.includes('ADMIN') || roles.includes('MANAGER')) &&
                <Menu.Item key='applications' icon={<UserAddOutlined />}>
                    <Link to="/applications">Заявки</Link>
                </Menu.Item>
            }
            <Menu.Item key='email' style={{ marginLeft: 'auto' }}>
                <SubMenu title={user?.email}>
                    <Menu.Item key='logout'>
                        <Typography.Text onClick={() => logOut()}>Выход</Typography.Text>
                    </Menu.Item>
                </SubMenu>
            </Menu.Item>
        </Menu>
    );
};

export default Header;