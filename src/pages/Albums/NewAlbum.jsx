import { useState, useEffect } from 'react';
import placeholderImg from '../../assets/placeholder.jpg';
import { useForm } from 'react-hook-form';
import ConfirmationModal from '../../components/ConfirmationModal';
import Pagination from '../../components/Pagination';
import NewAlbumMyMusic from '../../components/NewAlbumMyMusic';

const dummyNewAlbumMyMusic = [];
const dummyNewAlbumAddedMusic = [];

for (let idx = 0; idx < 100; idx++) {
    dummyNewAlbumMyMusic.push({
        music_name: `Music ${idx + 1}`,
        music_id: idx + 1,
        is_premium: true,
        cover: placeholderImg,
        isAdded: idx < 5,
    });
}

for (let idx = 0; idx < 5; idx++) {
    dummyNewAlbumAddedMusic.push({
        music_name: `Music ${idx + 1}`,
        music_id: idx + 1,
        is_premium: true,
        cover: placeholderImg,
        isAdded: true,
    });
}

export default function NewAlbum() {
    const [coverImg, setCoverImg] = useState(placeholderImg);
    const [onModalConfirm, setOnModalConfirm] = useState(null);
    const [myMusic, setMyMusic] = useState([]);
    const [addedMusic, setAddedMusic] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setMyMusic(
            dummyNewAlbumMyMusic.slice(currentPage * 5, (currentPage + 1) * 5)
        );
    }, [currentPage]);

    useEffect(() => {
        setAddedMusic(dummyNewAlbumAddedMusic);
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const submit = () => {
            console.log(data);
        };

        setOnModalConfirm({
            title: 'Confirm Add',
            message: 'Are you sure you want to add this album',
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
            setCoverImg(placeholderImg);
            clearErrors('album_cover');
        }
    };

    const handleToggleAdded = (musicId) => {
        if (dummyNewAlbumMyMusic[musicId - 1].isAdded) {
            dummyNewAlbumMyMusic[musicId - 1].isAdded = false;
            setAddedMusic([...addedMusic].filter(({music_id}) => musicId != music_id));
        } else {
            dummyNewAlbumMyMusic[musicId - 1].isAdded = true;
            setAddedMusic([...addedMusic, dummyNewAlbumMyMusic[musicId - 1]]);
        }
        setCurrentPage(currentPage);
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
            <h1 className='text-4xl font-medium'>Add New Album</h1>
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
                            {...register('album_cover', {
                                onChange: handleChangeCover,
                            })}
                        />
                        <label className='label pb-0'>
                            <span className='label-text-alt'>
                                {errors.album_cover?.message}
                            </span>
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
                            {...register('album_name', {
                                required: 'Title is required',
                                maxLength: {
                                    value: 255,
                                    message: 'Title is too long',
                                },
                            })}
                        />
                        <label className='label pb-0'>
                            <span className='label-text-alt'>
                                {errors.album_name?.message}
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
                                    { music_name, music_id, isAdded, cover },
                                    idx
                                ) => (
                                    <NewAlbumMyMusic
                                        key={idx}
                                        musicName={music_name}
                                        musicId={music_id}
                                        isAdded={isAdded}
                                        cover={cover}
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
                        itemCount={95}
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
                            ({ music_name, music_id, isAdded, cover }, idx) => (
                                <NewAlbumMyMusic
                                    key={idx}
                                    musicName={music_name}
                                    musicId={music_id}
                                    isAdded={isAdded}
                                    cover={cover}
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
