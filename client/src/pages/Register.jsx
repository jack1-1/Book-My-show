import React from "react";
import { Form, Input, Button, message } from 'antd';
import { Link } from "react-router-dom";
import { register } from "../calls/authCalls";
// import './Auth.css';

// const { Title, Text } = Typography;

function Register() {
  const onSubmit = async (values) => {
    try {
      const userData = await register(values);
      if (userData.success) {
        message.success(userData.message);
      }
      else {
        message.error(userData.message)
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }
  return (
    <header className='App-header'>
      <main className='main-area mw-500 text-center px-3'>
        <section className='left-section'>
          <h2 className='text-center'>Register to BookMyShow</h2>
        </section>

        <section className='right-section'>
          <Form layout="vertical" className="auth-form" onFinish={onSubmit}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Name is required!" }]}
            >
              <Input
                size="large"
                placeholder="Enter your full name"
                className="auth-input"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required!" },
                { type: 'email', message: "Please enter a valid email" }
              ]}
            >
              <Input
                size="large"
                type="email"
                placeholder="Enter your email"
                className="auth-input"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password is required!" },
                { min: 6, message: "Password must be at least 6 characters" }
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Create a password"
                className="auth-input"
              />
            </Form.Item>



            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                className="auth-button"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/login">Login </Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  );
}

export default Register;