import { useState, useEffect } from 'react';
import placeholderImg from '../../assets/placeholder.jpg';
import { useForm } from 'react-hook-form';
import ConfirmationModal from '../../components/ConfirmationModal';
import Pagination from '../../components/Pagination';
import NewAlbumMyMusic from '../../components/NewAlbumMyMusic';
import restClient from '../../utils/restClient';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../../utils/config';

export default function EditAlbum() {
    const [coverImg, setCoverImg] = useState(placeholderImg);
    const [onModalConfirm, setOnModalConfirm] = useState(null);
    const [myMusic, setMyMusic] = useState([]);
    const [addedMusic, setAddedMusic] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    
    const navigate = useNavigate();
    const { pathname, search } = useLocation();

    const refreshItemList = async () => {
        try {
            const isPremium = search.split('=').pop();
            const resp = await restClient.get(`/api/music?page=${currentPage + 1}&premium=${isPremium}`);
            const data = resp.data.body;

            const addedMusicIds = addedMusic.map((music) => music.id);
            setMyMusic(data.music.map((item) => ({...item, isAdded: addedMusicIds.includes(item.id)})));
            setPageCount(data.page_count);
        } catch (error) {
            toast.error('Error reaching the server');
        }
    };

    useEffect(() => {
        refreshItemList();
    }, [currentPage, addedMusic]);

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const id = pathname.split('/').pop();
                const isPremium = search.split('=').pop();

                const resp = await restClient.get(`/api/album/${id}?premium=${isPremium}`);
                const albumData = resp.data.body.album;
                const addedMusicIds = albumData.music_id;

                console.log(albumData);

                setValue('title', albumData.title);

                const allMusicResp = await restClient.get(`/api/music?premium=${isPremium}`);
                const allMusicData = allMusicResp.data.body.music;
    
                setAddedMusic(allMusicData.filter(({id}) => addedMusicIds.includes(id)).map((item) => ({...item, isAdded: addedMusicIds.includes(item.id)})));

                setCoverImg(
                    isPremium == 'true'
                        ? `${config.restUrl}/static/cover/album/${id}`
                        : `${config.phpUrl}/static/covers/album/${id}`);
            } catch (error) {
                toast.error('Error reaching the server');
            }
        };

        fetchInitial();
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const submit = async () => {
            try {
                const formData = new FormData();
                
                formData.append('title', data.title);
                if (data.delete_cover)
                    formData.append('delete_cover', 'true');
                if (data.cover.length > 0)
                    formData.append('cover', data.cover[0]);

                addedMusic.forEach((music) => {
                    formData.append('music_id[]', music.id)
                });
                
                const id = pathname.split('/').pop();
                const isPremium = search.split('=').pop();
                await restClient.patch(`/api/album/${id}?premium=${isPremium}`, formData);
                toast("Successfully update album")
                navigate('/albums');
            } catch (error) {
                toast.error('Error reaching the server');
            }
        };

        setOnModalConfirm({
            title: 'Confirm Edit',
            message: 'Are you sure you want to edit this album',
            callback: submit,
        });
    };

    const handleChangeCover = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    setCoverImg(event.target.result);
                };

                reader.readAsDataURL(file);
                clearErrors('album_cover');
            } else {
                e.target.value = '';
                setCoverImg(placeholderImg);
                setError('album_cover', {
                    type: 'filetype',
                    message: 'File not an image',
                });
            }
        } else {
            const isPremium = search.split('=').pop();
            const musicId = pathname.split('/').pop();
            setCoverImg(
                isPremium == 'true'
                    ? `${config.restUrl}/static/cover/album/${musicId}`
                    : `${config.phpUrl}/static/covers/album/${musicId}`
            );
            clearErrors('music_cover');
        }
    };

    const handleToggleAdded = (musicId, currentlyAdded) => {
        if (currentlyAdded) {
            setAddedMusic([...addedMusic].filter(({id}) => musicId != id));
        } else {
            const music = myMusic.filter(({id}) => id == musicId)[0];
            music.isAdded = true;
            setAddedMusic([...addedMusic, music]);
        }
    };

    useEffect(() => {
        if (onModalConfirm != null) {
            document.getElementById('my_modal').showModal();
        }
    }, [onModalConfirm]);

    return (
        <div className='flex flex-col px-4 py-6 gap-6'>
            <ConfirmationModal
                modalId='my_modal'
                title={onModalConfirm?.title}
                message={onModalConfirm?.message}
                onConfirm={onModalConfirm?.callback}
                onCancel={() => {}}
            />
            <h1 className='text-4xl font-medium'>Edit Album</h1>
            <form className='flex gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6 w-[200px] lg:w-[325px]'>
                    <img
                        src={coverImg}
                        alt='Album Cover'
                        className='w-full aspect-square rounded-[32px]'
                    />
                    
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>Album Cover File</span>
                        </label>
                        <input
                            type='file'
                            className='file-input file-input-bordered file-input-primary w-full max-w-xs'
                            accept='image/*'
                            {...register('cover', {
                                onChange: handleChangeCover,
                            })}
                        />
                        <label className='label pb-0'>
                            <span className='label-text-alt'>
                                {errors.cover?.message}
                            </span>
                        </label>
                    </div>

                    <div className='form-control'>
                            <label className='label cursor-pointer'>
                                <span className='label-text'>Remove Cover</span>
                                <input
                                    type='checkbox'
                                    className='checkbox checkbox-primary'
                                    {...register('delete_cover')}
                                />
                            </label>
                        </div>
                </div>
                <div className='flex flex-1 flex-col justify-between px-2'>
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>Title</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter your title'
                            className='input input-bordered w-full'
                            {...register('title', {
                                required: 'Title is required',
                                maxLength: {
                                    value: 255,
                                    message: 'Title is too long',
                                },
                            })}
                        />
                        <label className='label pb-0'>
                            <span className='label-text-alt'>
                                {errors.title?.message}
                            </span>
                        </label>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary self-end text-xl px-4 py-2'
                    >
                        Add Album
                    </button>
                </div>
            </form>
            <div className='flex flex-col px-[10px] py-[10px] gap-3'>
                <h2 className='text-2xl font-medium'>Your Music</h2>
                <div className='flex flex-col gap-[10px]'>
                    <div className='flex flex-col gap-4'>
                        {myMusic.length != 0 ? (
                            myMusic.map(
                                (
                                    { title, id, isAdded },
                                    idx
                                ) => (
                                    <NewAlbumMyMusic
                                        key={idx}
                                        musicName={title}
                                        musicId={id}
                                        isAdded={isAdded}
                                        onPlayMusic={() => {}}
                                        onToggleAdded={handleToggleAdded}
                                    />
                                )
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
            <div className='flex flex-col px-[10px] py-[10px] gap-3'>
                <h2 className='text-2xl font-medium'>Added Album Music</h2>
                <div className='flex flex-col gap-4'>
                    {addedMusic.length != 0 ? (
                        addedMusic.map(
                            ({ title, id, isAdded }, idx) => (
                                <NewAlbumMyMusic
                                    key={idx}
                                    musicName={title}
                                    musicId={id}
                                    isAdded={isAdded}
                                    onPlayMusic={() => {}}
                                    onToggleAdded={handleToggleAdded}
                                />
                            )
                        )
                    ) : (
                        <h2 className='text-3xl text-center text-gray-500 font-medium'>
                            You currently have no music added
                        </h2>
                    )}
                </div>
            </div>
        </div>
    );
}
