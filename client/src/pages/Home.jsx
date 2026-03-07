import React, { useEffect } from 'react';
import { Layout, Input, Button, Avatar, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { getCurrentUser } from '../calls/authCalls.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';

const { Header, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUserData = async () => {
    const userData = await getCurrentUser();
    dispatch(setUserData(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>

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
          <Text style={{ color: "black" }}>{userData?.name}</Text>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Space>

      </Header>

      {/* PAGE CONTENT */}
      <Content style={{ padding: "30px" }}>
        <h2>Welcome {userData?.name}</h2>
      </Content>

    </Layout>
  );
}

export default Home;