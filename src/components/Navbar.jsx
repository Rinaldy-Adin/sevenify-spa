import { Link, useLocation } from 'react-router-dom';
import logoLongImg from '../assets/sevenify-long.png';
import clsx from 'clsx';

export default function Navbar({ links }) {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='w-full h-12 py-1 bg-[#333333]'>
            <div className='flex h-full w-full xl:w-[1280px] justify-between px-3 py-2 mx-auto'>
                <Link to="/"><img src={logoLongImg} alt='sevenify-logo' className='h-full' /></Link>
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
                </div>
            </div>
        </div>
    );
}
