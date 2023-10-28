import placeholderImg from '../../assets/placeholder.jpg';
import { useState, useEffect } from 'react';
import MyMusicItem from '../../components/MyMusicItem';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import Pagination from '../../components/Pagination';

const dummyMyMusic = [];

for (let idx = 0; idx < 100; idx++) {
    dummyMyMusic.push({
        music_name: `Music ${idx + 1}`,
        music_id: idx + 1,
        is_premium: false,
        cover: placeholderImg,
    });
}

export default function Music() {
    const [myMusic, setMyMusic] = useState([]);
    const [onModalConfirm, setOnModalConfirm] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setMyMusic(dummyMyMusic.slice(currentPage * 5, (currentPage + 1) * 5));
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleTogglePremium = (musicId) => {
        const toggleMusic = () => {
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

        setOnModalConfirm({
            title: 'Confirm Toggle',
            message: 'Do you want to toggle acces for this music',
            callback: toggleMusic,
        });
    };

    const handleDelete = (musicId) => {
        const deleteMusic = () => {
            setMyMusic(
                [...myMusic].filter(({ music_id }) => music_id != musicId)
            );
        };
        setOnModalConfirm({
            title: 'Confirm Delete',
            message: 'Do you want to delete this music',
            callback: deleteMusic,
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
                <h1 className='font-medium text-4xl'>My Music</h1>
                <Link to={'new'}>
                    <button className='btn btn-primary text-lg font-bold px-3 py-2'>
                        Add New Music
                    </button>
                </Link>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    {myMusic.length != 0 ? (
                        myMusic.map(
                            (
                                { music_name, music_id, is_premium, cover },
                                idx
                            ) => {
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
