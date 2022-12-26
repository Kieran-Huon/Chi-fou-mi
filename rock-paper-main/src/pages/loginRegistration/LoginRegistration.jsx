import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { errorToast, successToast } from '../../utils/toast';
import './LoginRegistration.scss';
const LoginRegistration = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const onBtnHandler = (url) => {
    api
      .post(url, data)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        sessionStorage.setItem('accessToken', res.data.data.token);
        successToast(res.data.message);
        navigate('/start');
      })
      .catch((err) => {
        console.log(err);
        errorToast(err?.response?.data.message);
      });
  };

  return (
    <div className='loginRegistrationContainer'>
      <h3>Login / Registration</h3>
      <input
        placeholder='Username'
        value={data.username}
        onChange={(e) => {
          setData({
            ...data,
            username: e.target.value,
          });
        }}
      />
      <input
        placeholder='Password'
        value={data.password}
        onChange={(e) => {
          setData({
            ...data,
            password: e.target.value,
          });
        }}
      />
      <div>
        <Button
          onClick={() => {
            onBtnHandler('/login');
          }}
          variant='contained'
        >
          Login
        </Button>
        <Button
          onClick={() => {
            onBtnHandler('/registration');
          }}
          variant='contained'
        >
          Registration
        </Button>
      </div>
    </div>
  );
};

export default LoginRegistration;
