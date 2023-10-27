import placeholderImg from '../../assets/placeholder.jpg';
import { useState, useEffect } from 'react';
import MyMusicItem from '../../components/MyMusicItem';
import { Link } from 'react-router-dom';

const dummyMyMusic = [
    {
        music_name: 'Music Name',
        music_id: 1,
        is_premium: false,
        cover: placeholderImg,
    },
    {
        music_name: 'Music Name',
        music_id: 2,
        is_premium: false,
        cover: placeholderImg,
    },
    {
        music_name: 'Music Name',
        music_id: 3,
        is_premium: false,
        cover: placeholderImg,
    },
    {
        music_name: 'Music Name',
        music_id: 4,
        is_premium: true,
        cover: placeholderImg,
    },
];

export default function Music() {
    const [myMusic, setMyMusic] = useState([]);

    useEffect(() => {
        setMyMusic(dummyMyMusic);
    }, []);

    const handleTogglePremium = (musicId) => {
        setMyMusic(
            [...myMusic].map((data) => {
                if (data.music_id == musicId) {
                    return {
                        ...data,
                        is_premium: !data.is_premium,
                    };
                } else {
                    return data;
                }
            })
        );
    };

    const handleDelete = (musicId) => {
        setMyMusic([...myMusic].filter(({ music_id }) => music_id != musicId));
    };

    return (
        <div className='w-full flex flex-col px-4 py-6 gap-6'>
            <div className='w-full flex justify-between'>
                <h1 className='font-medium text-4xl'>My Music</h1>
                <Link to={'new'}>
                    <button className='btn btn-primary text-lg font-bold px-3 py-2'>
                        Add New Music
                    </button>
                </Link>
            </div>
            <div className='flex flex-col gap-4'>
                {myMusic.length != 0 ? (
                    myMusic.map(
                        ({ music_name, music_id, is_premium, cover }, idx) => {
                            return (
                                <MyMusicItem
                                    key={idx}
                                    musicId={music_id}
                                    isPremium={is_premium}
                                    musicName={music_name}
                                    onPlayMusic={() => {}}
                                    onTogglePremium={handleTogglePremium}
                                    cover={cover}
                                    onDelete={handleDelete}
                                />
                            );
                        }
                    )
                ) : (
                    <h2 className='text-3xl text-center text-gray-500 font-medium'>
                        You currently have no music
                    </h2>
                )}
            </div>
        </div>
    );
}
