import { Link, useLocation } from 'react-router-dom';
import logoLongImg from '../assets/sevenify-long.png';
import clsx from 'clsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';
import restClient from '../utils/restClient';

export default function Navbar({ links, canLogout }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        await restClient.post('/api/logout');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className='w-full h-12 py-1 bg-[#333333]'>
            <div className='flex h-full w-full xl:w-[1280px] justify-between px-3 py-2 mx-auto'>
                <Link to='/'>
                    <img
                        src={logoLongImg}
                        alt='sevenify-logo'
                        className='h-full'
                    />
                </Link>
                <div className='flex divide-x divide-solid text-white divide-[#C1C1C1]'>
                    {links.map(({ url, text }, idx) => {
                        return (
                            <div key={idx}>
                                <Link
                                    className={clsx(
                                        'mx-3',
                                        currentPath == url && 'text-primary'
                                    )}
                                    to={url}
                                >
                                    {text}
                                </Link>
                            </div>
                        );
                    })}
                    <div>
                        {
                            canLogout ? (
                                <Link to='#' className='mx-3' onClick={logout}>
                                    Logout
                                </Link>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
