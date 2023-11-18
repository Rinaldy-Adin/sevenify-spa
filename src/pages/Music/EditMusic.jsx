import { useState, useEffect } from 'react';
import placeholderImg from '../../assets/placeholder.jpg';
import { useForm } from 'react-hook-form';
import ConfirmationModal from '../../components/ConfirmationModal';
import restClient from '../../utils/restClient';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../utils/config';

export default function EditMusic() {
    const [coverImg, setCoverImg] = useState(placeholderImg);
    const [onModalConfirm, setOnModalConfirm] = useState(null);
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const id = pathname.split('/').pop();
                const isPremium = search.split('=').pop();
                const resp = await restClient.get(
                    `/api/music/${id}?premium=${isPremium}`
                );
                const data = resp.data.body.music;

                setValue('title', data.title);
                setValue('genre', data.genre);

                setCoverImg(
                isPremium == 'true'
                    ? `${config.restUrl}/static/cover/music/${id}`
                    : `${config.phpUrl}/static/covers/music/${id}`
            );
            } catch (error) {
                console.log(error);
                toast.error('Error reaching the server');
            }
        };

        fetchInitial();
    }, []);

    const onSubmit = (data) => {
        const submit = async () => {
            try {
                const formData = new FormData();

                formData.append('title', data.title);
                formData.append('genre', data.genre);
                if (data.delete_cover)
                    formData.append('delete_cover', 'true');
                if (data.cover.length > 0)
                    formData.append('cover', data.cover[0]);
                
                const id = pathname.split('/').pop();
                const isPremium = search.split('=').pop();
                await restClient.patch(`/api/music/${id}?premium=${isPremium}`, formData);
                toast('Successfully added music');
                navigate('/music');
            } catch (error) {
                toast.error(error);
            }

        };
        setOnModalConfirm({
            title: 'Confirm Edit',
            message: 'Are you sure you want to edit this music',
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
                clearErrors('music_cover');
            } else {
                e.target.value = '';
                setCoverImg(placeholderImg);
                setError('music_cover', {
                    type: 'filetype',
                    message: 'File not an image',
                });
            }
        } else {
            const isPremium = search.split('=').pop();
            const musicId = pathname.split('/').pop();
            setCoverImg(
                isPremium == 'true'
                    ? `${config.restUrl}/static/cover/music/${musicId}`
                    : `${config.phpUrl}/static/covers/music/${musicId}`
            );
            clearErrors('music_cover');
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
            <h1 className='text-4xl font-medium'>Edit Music</h1>
            <form className='flex gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6 w-[200px] lg:w-[325px]'>
                    <img
                        src={coverImg}
                        alt='Music Cover'
                        className='w-full aspect-square rounded-[32px]'
                    />
                    <div className='flex flex-col gap-4'>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>
                                    Music Cover File
                                </span>
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
                                    {errors.music_cover?.message}
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
                </div>
                <div className='flex flex-1 flex-col justify-between px-2'>
                    <div className='flex flex-col gap-2'>
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
                                    {errors.music_name?.message}
                                </span>
                            </label>
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Genre</span>
                            </label>
                            <input
                                type='text'
                                placeholder='Enter your genre'
                                className='input input-bordered w-full'
                                {...register('genre', {
                                    maxLength: {
                                        value: 255,
                                        message: 'Genre is too long',
                                    },
                                })}
                            />
                            <label className='label pb-0'>
                                <span className='label-text-alt'>
                                    {errors.music_name?.message}
                                </span>
                            </label>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary self-end text-xl px-4 py-2'
                    >
                        Edit Music
                    </button>
                </div>
            </form>
        </div>
    );
}
