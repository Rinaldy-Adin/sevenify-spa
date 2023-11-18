import { useContext, useEffect } from 'react';
import backgroundImage from '../../assets/auth-backdrop.jpg';
import logoSquareImg from '../../assets/sevenify-square.png';
import { useForm } from 'react-hook-form';
import restClient from '../../utils/restClient'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../utils/authContext'

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
    const { setIsAuthenticated, setIsAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    const onSubmit = async (data) => {
        try {
            const loginResp = await restClient.post('/api/login', data)

            setIsAuthenticated(true);
            setIsAdmin(loginResp.data.body.user.role == 'admin');
            navigate('/music');
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            toast.error("Incorrect username and password");
            reset();
        }
    };

    return (
        <div
            style={{
                ...loginStyle,
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <div style={logoContainerStyle}>
                    <img
                        src={logoSquareImg}
                        alt='sevenify-logo'
                        style={logoImageStyle}
                    />
                </div>
                <label style={labelStyle}>Username</label>
                <input
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Enter your username'
                    {...register('username', {
                        required: 'Username is required',
                    })}
                />
                <label style={labelStyle}>Password</label>
                <input
                    type='password'
                    className='input input-bordered w-full'
                    placeholder='Enter your password'
                    {...register('password', {
                        required: 'Password is required',
                    })}
                />
                <button type='submit' style={buttonStyle}>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;
