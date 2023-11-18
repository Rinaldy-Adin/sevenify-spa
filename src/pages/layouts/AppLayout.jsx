import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../utils/authContext';
import { useContext, useEffect } from 'react';

export default function AppLayout() {
    const { isAuthenticated, login, isAdmin, isPremium, joinPremium } = useContext(AuthContext);

    useEffect(() => {
        const loginOnMount = async () => {
            try {
                if (!isAuthenticated) await login();
                if (!isPremium) await joinPremium();
            } catch (error) {
                console.error('Login failed:', error);
            }
        };

        loginOnMount();
    }, [login]);

    const navLinks = [
        {
            url: '/music',
            text: 'Premium Music',
        },
        {
            url: '/albums',
            text: 'Premium Albums',
        },
        {
            url: '/followers',
            text: 'Followers',
        },
        ...(isAdmin ? [{ url: '/admin', text: 'Admin' }] : []),
    ];

    return (
        <div className='w-full min-h-screen bg-gray-300 flex flex-col items-center'>
            <Navbar links={navLinks} canLogout={true} />
            <main className='flex-1 bg-white w-full xl:w-[1280px]'>
                <Outlet />
            </main>
        </div>
    );
}
