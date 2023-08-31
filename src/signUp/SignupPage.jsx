import React, { useContext, useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { LOGIN_URL, ME_URL, SIGNUP_URL } from '../infra/Urls';
import axios from 'axios';
import { SetUserContext, UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });

  const navigate = useNavigate()
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext)

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData);
    // TODO: Handle form submission and API requests here
     try {
      
      const response = await axios.post(SIGNUP_URL, {
      first_name: formData.firstName, 
      password: formData.password, 
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      is_staff: false
    })     
     const logIn = await axios.post(LOGIN_URL, {username: formData.email, password: formData.password})
      console.log(response)
      localStorage.setItem('token', logIn.data.access)

      const token = localStorage.getItem('token')
      const meResponse = await axios.get(ME_URL, {headers: {Authorization: `Bearer ${token}`}})
      console.log(meResponse)
      // copy of the respons from API
      setUser({
          user: {...meResponse.data}
      })

      navigate('/')
    console.log(response)
    } catch (e) {
      console.error(e)
      

    }

    // localStorage.setItem('token', response.data.access)
  };

  return (
    <GoogleOAuthProvider clientId='655087516681-m5jn8236hknlrh69cvqglh92tvb5hq09.apps.googleusercontent.com'>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Sign Up
        </Button>
      </form>
      <GoogleLogin 
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
    </Container>
    </GoogleOAuthProvider>
  );
};

export default SignupPage;
