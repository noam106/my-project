import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import axios from "axios";
import { LOGIN_URL, ME_URL } from "../infra/Urls";
import { SetUserContext, UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { SetNotificationContext } from "../context/NotificationContext";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const setNotification = useContext(SetNotificationContext)
    const user = useContext(UserContext)
    console.log(user)

    const setUser = useContext(SetUserContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{

    
      const response = await axios.post(LOGIN_URL, {username: email, password: password})
      console.log(response)
      localStorage.setItem('token', response.data.access)

      const token = localStorage.getItem('token')
      const meResponse = await axios.get(ME_URL, {headers: {Authorization: `Bearer ${token}`}})
      console.log(meResponse)
      // copy of the respons from API
      setUser({
          user: {...meResponse.data}
      })

      navigate('/')
      setNotification({open: true, 
        msg: "You have successfully logged in", 
        severity: 'success'})
  } catch (e) {
    console.log(e)
    setNotification({open: true, msg: e.response.data.detail, severity: 'error'})
  }
  };

    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  return (
    <GoogleOAuthProvider clientId='655087516681-m5jn8236hknlrh69cvqglh92tvb5hq09.apps.googleusercontent.com'>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <GoogleLogin 
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
        </Box>
      </Box>
    </Container>
    </GoogleOAuthProvider>
  );
}