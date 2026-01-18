import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation  } from "react-router-dom";
import {  Layout, Menu, theme ,Breadcrumb} from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Wrapper.scss";
import BadgeCart from "../BadgeCart/BadgeCart"
import { clearUser } from "../../Redux/LoginSlicer";


const Wrapper = () => {
  const location = useLocation ()
  const { token } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Header, Content, Footer, Sider } = Layout;
  const isFavoritesPage = location.pathname === '/favorites';
function getItem(label, key,  url, ) {
  return {
    key,
    label: url ? <Link to={url}>{label}</Link> : label,
  };
}
const items = [
  getItem("Drinks", "2", "/"),
  getItem("Favorites", "3", "/favorites"),
];
  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/login");
    }
  }, [token, navigate, dispatch]);
  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
    dispatch(clearUser());
  };
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
       <h1 className="dbar">D-BAR</h1>
 <BadgeCart handleToggle={handleToggle} />
    </Header>
    <Content
      style={{
        padding: '0 48px',

      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {isFavoritesPage&&<Breadcrumb.Item>Favorites</Breadcrumb.Item>}
       
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 530,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,

        }}
      >
         <Outlet />
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2023 Created by Ant UED
    </Footer>
  </Layout>
  );
};
export default Wrapper;
