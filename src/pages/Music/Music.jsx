import { useState, useEffect } from 'react';
import MyMusicItem from '../../components/MyMusicItem';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import Pagination from '../../components/Pagination';
import restClient from '../../utils/restClient';
import toast from 'react-hot-toast';

export default function Music() {
    const [myMusic, setMyMusic] = useState([]);
    const [onModalConfirm, setOnModalConfirm] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const refreshItemList = async () => {
        try {
            const resp = await restClient.get(`/api/music?page=${currentPage + 1}`);
            const data = resp.data.body;
            setMyMusic(data.music);
            setPageCount(data.page_count);
        } catch (error) {
            toast.error('Error reaching the server');
        }
    };

    useEffect(() => {
        refreshItemList();
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleTogglePremium = (musicId, isPremium) => {
        const toggleMusic = async () => {
            try {
                const formData = new FormData();
                formData.append('is_premium', !isPremium);
                await restClient.patch(`/api/music/${musicId}?premium=${isPremium}`, formData);
                refreshItemList();
                toast('Succesfully updated music');
            } catch (error) {
                toast.error('Error reaching the server');
            }
        };

        setOnModalConfirm({
            title: 'Confirm Toggle',
            message: 'Do you want to toggle acces for this music',
            callback: toggleMusic,
        });
    };

    const handleDelete = (musicId, isPremium) => {
        const deleteMusic = async () => {
            try {
                await restClient.delete(`/api/music/${musicId}?premium=${isPremium}`);
                refreshItemList();
                toast('Succesfully deleted music');
            } catch (error) {
                toast.error('Error reaching the server');
            }
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
                                { title, id, is_premium, coverExt },
                                idx
                            ) => {
                                return (
                                    <MyMusicItem
                                        key={idx}
                                        musicId={id}
                                        isPremium={is_premium}
                                        musicName={title}
                                        onPlayMusic={() => {}}
                                        onTogglePremium={handleTogglePremium}
                                        coverExt={coverExt}
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
                    itemCount={pageCount * 5}
                    pageSize={5}
                    currentPage={currentPage + 1}
                />
            </div>
        </div>
    );
}
