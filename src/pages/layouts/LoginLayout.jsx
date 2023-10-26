import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
    return (
        <div className='w-full min-h-screen bg-gray-300 flex flex-col items-center'>
            <Navbar links={[]} />
            <main className='flex-1 w-full'>
                <Outlet />
            </main>
        </div>
    );
}