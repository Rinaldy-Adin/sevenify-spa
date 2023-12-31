import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/authContext';
import backgroundImage from '../../assets/background-join.jpeg';
import restClient from '../../utils/restClient';
import { useNavigate } from 'react-router-dom';

export default function RequestJoin() {
    const [isJoined] = useState(true);
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const handleLogout = async () => {
        await restClient.post('/api/logout');
        setIsAuthenticated(false);
        navigate('/login');
    };

    useEffect(() => {
        if (isJoined) {
            // Render the "Your request is being reviewed" section
            document.querySelector('.request-being-reviewed').style.display =
                'block';
            document.querySelector('.join-sevenify').style.display = 'none';
            document.querySelector('.sevenifyplus-info').style.display =
                'block';
        } else {
            // Render the "Join Sevenify+" section
            document.querySelector('.request-being-reviewed').style.display =
                'none';
            document.querySelector('.join-sevenify').style.display = 'block';
            document.querySelector('.sevenifyplus-info').style.display =
                'block';
        }
    }, [isJoined]);

    return (
        <div className='frame-join flex flex-col items-center gap-2.5 w-full bg-white'>
            <div
                className='request-being-reviewed flex flex-col justify-between items-start gap-2.5 self-stretch py-11 px-16 h-[400px]'
                style={backgroundStyle}
            >
                <div className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[normal]']">
                    Hold on tight, your Sevenify+ request is being reviewed.
                </div>
            </div>

            <div
                className='join-sevenify flex flex-col justify-between items-start gap-2.5 self-stretch py-11 px-16 h-[400px]'
                style={backgroundStyle}
            >
                <div className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[normal]']">
                    Share music with us, join Sevenify+
                </div>
            </div>

            <div className='sevenifyplus-info flex flex-col items-start gap-2.5 self-stretch py-6 px-4'>
                <div className='flex flex-col items-start gap-2.5 self-stretch p-2.5 p-2'>
                    <div className="Jakarta Sans self-stretch text-black font-['Plus text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-[normal]']">
                        Why join Sevenify+?
                    </div>
                    <div className="Jakarta Sans self-stretch text-black font-['Plus text-1rem sm:text-1rem md:text-xl lg:text-xl xl:text-xl leading-[normal]']">
                        Sevenify+ is a premium subscription service that offers
                        a wide range of exclusive features designed to enhance
                        your experience. With a Sevenify+ subscription, you gain
                        access to premium music content, unlocking a world of
                        high-quality tracks and personalized playlists that
                        cater to your unique musical preferences. Our commitment
                        to delivering exceptional music experiences ensures that
                        you can enjoy your favorite songs with superior audio
                        quality. But Sevenify+ doesnt stop there; it also
                        provides other exclusive benefits that make your
                        subscription worthwhile, ensuring you have access to a
                        holistic package of entertainment and convenience. Join
                        Sevenify+ today and elevate your music enjoyment to new
                        heights.
                    </div>
                </div>
                <div className='flex flex-col items-start gap-4 self-stretch p-2.5 p-2'>
                    <div className="Jakarta Sans self-stretch text-black font-['Plus text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl  font-bold leading-[normal]']">
                        Log in with a different account
                    </div>
                    <button
                        className='btn btn-primary text-lg md:text-[1rem] lg:text- font-bold px-3 py-2 md:px-3 md:py-2 lg:px-3 lg:py-2'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
