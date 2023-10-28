import placeholderImg from '../../assets/placeholder.jpg';
import { useState, useEffect } from 'react';
import MyAlbumsItem from '../../components/MyAlbumsItem';
import ConfirmationModal from '../../components/ConfirmationModal';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';

const dummyMyAlbums = [];

for (let idx = 0; idx < 100; idx++) {
    dummyMyAlbums.push({
        album_name: `Album ${idx + 1}`,
        album_id: idx + 1,
        is_premium: false,
        cover: placeholderImg,
    });
}

export default function Albums() {
    const [myAlbums, setMyAlbums] = useState([]);
    const [onModalConfirm, setOnModalConfirm] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setMyAlbums(
            dummyMyAlbums.slice(currentPage * 5, (currentPage + 1) * 5)
        );
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleTogglePremium = (albumId) => {
        const toggleAlbum = () => {
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

        setOnModalConfirm({
            title: 'Confirm Toggle',
            message: 'Do you want to toggle acces for this album',
            callback: toggleAlbum,
        });
    };

    const handleDelete = (albumId) => {
        const deleteAlbum = () => {
            setMyAlbums(
                [...myAlbums].filter(({ album_id }) => album_id != albumId)
            );
        };

        setOnModalConfirm({
            title: 'Confirm Delete',
            message: 'Do you want to delete this album',
            callback: deleteAlbum,
        });
    };

    useEffect(() => {
        if (onModalConfirm != null) {
            document.getElementById('my_modal').showModal();
        }
    }, [onModalConfirm]);

    return (
        <div className='w-full flex flex-col px-4 py-6 gap-6'>
            <ConfirmationModal
                modalId='my_modal'
                title={onModalConfirm?.title}
                message={onModalConfirm?.message}
                onConfirm={onModalConfirm?.callback}
                onCancel={() => {}}
            />
            <div className='w-full flex justify-between'>
                <h1 className='font-medium text-4xl'>My Albums</h1>
                <Link to={'new'}>
                    <button className='btn btn-primary text-lg font-bold px-3 py-2'>
                        Add New Album
                    </button>
                </Link>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    {myAlbums.length != 0 ? (
                        myAlbums.map(
                            (
                                { album_name, album_id, is_premium, cover },
                                idx
                            ) => {
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
                <Pagination
                    className='self-center'
                    handlePageClick={handlePageClick}
                    itemCount={100}
                    pageSize={5}
                    currentPage={currentPage + 1}
                />
            </div>
        </div>
    );
}
