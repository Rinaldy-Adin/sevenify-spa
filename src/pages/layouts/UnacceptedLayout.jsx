import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function UnacceptedLayout() {
    return (
        <div className='w-full min-h-screen bg-gray-300 flex flex-col items-center'>
            <Navbar links={[]} />
            <main className='flex-1 bg-white w-full xl:w-[1280px]'>
                <Outlet />
            </main>
        </div>
    );
}