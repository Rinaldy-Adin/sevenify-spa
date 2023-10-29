import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
    const navLinks = [
        {
            url: "/music",
            text: "Premium Music"
        },
        {
            url: "/albums",
            text: "Premium Albums"
        },
        {
            url: "/followers",
            text: "Followers"
        },
        {
            url: "/login",
            text: "Login"
        },
    ]

    return (
        <div className='w-full min-h-screen bg-gray-300 flex flex-col items-center'>
            <Navbar links={navLinks} />
            <main className='flex-1 bg-white w-full xl:w-[1280px]'>
                <Outlet />
            </main>
        </div>
    );
}