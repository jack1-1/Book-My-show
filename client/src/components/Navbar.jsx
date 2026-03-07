import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Avatar, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { getCurrentUser } from '../calls/authCalls.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import { Link } from 'react-router-dom';
const { Header, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

function Navbar() {
  const [movies,setMovies]=useState(null);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

 useEffect(() => {
  (async () => {
    const user = await getCurrentUser();
    dispatch(setUserData(user|| null));
  })()
  }, []);

   const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Layout >

      {/* NAVBAR */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgb(235, 78, 98)",
          padding: "0 24px"
        }}
      >

        {/* Left */}
        <Text style={{ color: "black", fontSize: 18, fontWeight: 600 }}>
          MyApp
        </Text>

        {/* Center Search */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            allowClear
            style={{
              width: 420,
              borderRadius: 20
            }}
          />
        </div>

        {/* Right */}
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Link to='/admin' style={{ color: "black" }}>{userData?.name}</Link>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Space>

      </Header>
    </Layout>
  );
}

export default Navbar;