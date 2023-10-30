import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import backgroundImage from '../../assets/background.jpg';
import logoSquareImg from "../../assets/sevenify-square.png";

const loginStyle = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  overflow: 'hidden', // Menambahkan ini untuk menghilangkan scrolling
};

const bodyStyle = {
  overflow: 'hidden', // Menghilangkan scrolling pada body
};

const formStyle = {
  background: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  borderRadius: '5px',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
};

const labelStyle = {
  display: 'block',
  margin: '10px 0',
  fontWeight: 'bold',
  textAlign: 'left',
};

const textStyle = {
  fontWeight: 'bold',
  textAlign: 'left',
  cursor: 'pointer',
};

const buttonStyle = {
  backgroundColor: 'hsl(38, 100%, 50%)',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '50px',
};

const logoContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const logoImageStyle = {
  marginBottom: '10px',
  width: '100px',
};

function Login() {
  // Set body style to prevent scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible'; // Kembalikan scrolling ketika komponen tidak lagi dirender
    };
  }, []);

  return (
    <div style={{ ...loginStyle, backgroundImage: `url(${backgroundImage})` }}>
      <form style={formStyle}>
        <div style={logoContainerStyle}>
          <Link to="/"><img src={logoSquareImg} alt='sevenify-logo' style={logoImageStyle} /></Link>
        </div>
        <label style={labelStyle}>Username</label>
        <input type="text" name="username" placeholder="Enter your username" />
        <label style={labelStyle}>Password</label>
        <input type="password" name="password" placeholder="Enter your password" />
        <button type="submit" style={buttonStyle}>Log In</button>
        <p>Don't have an account? <a href="/register"><label style={textStyle}>Register</label></a></p>
      </form>
    </div>
  );
}

export default Login;
