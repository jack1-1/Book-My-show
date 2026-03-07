import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../calls/authCalls';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Login() {
  //
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const onSubmit = async (values) => {
    try {
      const userData = await login(values);
      if (userData.success) {
        message.success(userData.message);
        // Dispatch action to update user data in Redux store
        dispatch(setUserData(userData.user)); // like we store signin response in redux store and persist userdata
        navigate('/home');
        // redux
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
    <>
      <header className='App-header'>
        <main className='main-area mw-500 text-center px-3'>
          <section className='left-section'>
            <h2 className='text-center'>Login to BookMyShow</h2>
          </section>
          <section className='right-section'>
            <Form
              layout='vertical' onFinish={onSubmit}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required' }]}
                className='d-block'
              >
                <Input
                  id='email'
                  type='text'
                  placeholder='enter your email' />
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor='password'
                name="password"
                className='d-block'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter your password' />
              </Form.Item>

              <Form.Item className='d-block'>
                <Button
                  type='primary'
                  block
                  htmlType='submit'
                  style={{ fontSize: "1rem", fontWeight: "600" }}>
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>

  );
}
export default Login;