import AppNavbar from '../../components/Navbar/AppNavBar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
    const navLinks = [
        {
            url: "/music",
            text: "Premium Music"
        }
    ]

    return (
        <div className='w-full min-h-screen bg-gray-300 flex flex-col items-center'>
            <AppNavbar links={navLinks} />
            <main className='flex-1 bg-white w-full xl:w-[1280px]'>
                <Outlet />
            </main>
        </div>
    );
}