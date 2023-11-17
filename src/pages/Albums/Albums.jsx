import { useState, useEffect } from 'react';
import MyAlbumsItem from '../../components/MyAlbumsItem';
import ConfirmationModal from '../../components/ConfirmationModal';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import restClient from '../../utils/restClient';
import toast from 'react-hot-toast';

export default function Albums() {
    const [myAlbums, setMyAlbums] = useState([]);
    const [onModalConfirm, setOnModalConfirm] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const refreshItemList = async () => {
        try {
            const resp = await restClient.get(`/api/album?page=${currentPage + 1}`);
            const data = resp.data.body;
            setMyAlbums(data.album);
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

    const handleTogglePremium = (albumId, isPremium) => {
        const toggleAlbum = async () => {
            try {
                const formData = new FormData();
                formData.append('is_premium', !isPremium);
                await restClient.patch(`/api/album/${albumId}?premium=${isPremium}`, formData);
                refreshItemList();
                toast('Succesfully updated music');
            } catch (error) {
                toast.error('Error reaching the server');
            }
        };

        setOnModalConfirm({
            title: 'Confirm Toggle',
            message: 'Do you want to toggle access for this album',
            callback: toggleAlbum,
        });
    };

    const handleDelete = (albumId, isPremium) => {
        const deleteAlbum = async () => {
            try {
                await restClient.delete(`/api/album/${albumId}?premium=${isPremium}`);
                refreshItemList();
                toast('Succesfully deleted music');
            } catch (error) {
                toast.error('Error reaching the server');
            }
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
                                { title, id, is_premium },
                                idx
                            ) => {
                                return (
                                    <MyAlbumsItem
                                        key={idx}
                                        albumId={id}
                                        isPremium={is_premium}
                                        albumName={title}
                                        onTogglePremium={handleTogglePremium}
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
                    itemCount={pageCount * 5}
                    pageSize={5}
                    currentPage={currentPage + 1}
                />
            </div>
        </div>
    );
}
