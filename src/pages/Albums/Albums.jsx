import placeholderImg from '../../assets/placeholder.jpg';
import { useState, useEffect } from 'react';
import MyAlbumsItem from '../../components/MyAlbumsItem';

const dummyMyAlbums = [
    {
        album_name: 'Album Name',
        album_id: 1,
        is_premium: false,
        cover: placeholderImg,
    },
    {
        album_name: 'Album Name',
        album_id: 2,
        is_premium: false,
        cover: placeholderImg,
    },
    {
        album_name: 'Album Name',
        album_id: 3,
        is_premium: false,
        cover: placeholderImg,
    },
    {
        album_name: 'Album Name',
        album_id: 4,
        is_premium: true,
        cover: placeholderImg,
    },
];

export default function Albums() {
    const [myAlbums, setMyAlbums] = useState([]);

    useEffect(() => {
        setMyAlbums(dummyMyAlbums);
    }, []);

    const handleTogglePremium = (albumId) => {
        setMyAlbums(
            [...myAlbums].map((data) => {
                if (data.album_id == albumId) {
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

    const handleDelete = (albumId) => {
        setMyAlbums(
            [...myAlbums].filter(({ album_id }) => album_id != albumId)
        );
    };

    return (
        <div className='w-full flex flex-col px-4 py-6 gap-6'>
            <div className='w-full flex justify-between'>
                <h1 className='font-medium text-4xl'>My Albums</h1>
                <div></div>
            </div>
            <div className='flex flex-col gap-4'>
                {myAlbums.length != 0 ? (
                    myAlbums.map(
                        ({ album_name, album_id, is_premium, cover }, idx) => {
                            return (
                                <MyAlbumsItem
                                    key={idx}
                                    albumId={album_id}
                                    isPremium={is_premium}
                                    albumName={album_name}
                                    onTogglePremium={handleTogglePremium}
                                    cover={cover}
                                    onDelete={handleDelete}
                                />
                            );
                        }
                    )
                ) : (
                    <h2 className='text-3xl text-center text-gray-500 font-medium'>
                        You currently have no albums
                    </h2>
                )}
            </div>
        </div>
    );
}
