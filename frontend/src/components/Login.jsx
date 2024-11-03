import 'bootstrap/dist/css/bootstrap.min.css';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import image1 from '../resources/1.jpg';
import image2 from '../resources/2.jpg';
import image3 from '../resources/3.jpg';
const images = [image1,image2,image3];
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [imageIndex, setImageIndex] = useState(0);
   

      // Rotate images every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
    const handleSubmit = (event) => {
        event.preventDefault();
         setError('');

    if (!email) return setError('Email is required');
    if (!validateEmail(email)) return setError('Please type email correctly');
 if (!password) return setError('Password is required');

        axios.post( 'http://localhost:5001/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/dashboard');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => setError('An error occurred. Please try again.'));
    }


    return (
        <Box display="flex" height="100vh">
          {/* Image Rotator */}
          <Box flex={5} style={{
            backgroundImage: `url(${images[imageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
    
          {/* Login Form */}
          <Box flex={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={3}>
            <Typography variant="h4" gutterBottom>Log In</Typography>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              error={!!error && (error.includes('Email') || error.includes('type email correctly'))}
              helperText={error && (error.includes('Email') || error.includes('type email correctly')) ? error : ''}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              error={!!error && error.includes('Password')}
              helperText={error && error.includes('Password') ? error : ''}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Log In
            </Button>
            {error && !error.includes('Email') && !error.includes('Password') && (
              <Typography color="error" mt={2}>{error}</Typography>
            )}
          </Box>
        </Box>
      );
    };
    
    export default Login;