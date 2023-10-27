import { useState } from 'react';
import placeholderImg from '../../assets/placeholder.jpg';
import { useForm } from 'react-hook-form';

export default function NewMusic() {
    const [coverImg, setCoverImg] = useState(placeholderImg);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
            setCoverImg(placeholderImg);
            clearErrors('music_cover');
        }
    };

    const handleChangeAudio = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith('audio/')) {
            e.target.value = '';
            setError('music_file', {
                type: 'filetype',
                message: 'File not an audio file',
            });
        }
    }

    return (
        <div className='flex flex-col px-4 py-6 gap-6'>
            <h1 className='text-4xl font-medium'>Add New Music</h1>
            <form className='flex gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6 w-[200px] lg:w-[325px]'>
                    <img
                        src={coverImg}
                        alt='Music Cover'
                        className='w-full aspect-square rounded-[32px]'
                    />
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>Music Cover File</span>
                        </label>
                        <input
                            type='file'
                            className='file-input file-input-bordered file-input-primary w-full max-w-xs'
                            accept='image/*'
                            {...register('music_cover', {
                                onChange: handleChangeCover,
                            })}
                        />
                        <label className='label pb-0'>
                            <span className='label-text-alt'>
                                {errors.music_cover?.message}
                            </span>
                        </label>
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
                                {...register('music_name', {
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
                                {...register('music_genre', {
                                    required: 'Genre is required',
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
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Description</span>
                            </label>
                            <textarea
                                className='textarea textarea-bordered h-16'
                                placeholder='Enter your description'
                                {...register('music_description')}
                            />
                        </div>

                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Music Audio File</span>
                            </label>
                            <input
                                type='file'
                                className='file-input file-input-bordered file-input-primary w-full max-w-xs'
                                accept='audio/*'
                                {...register('music_file', {
                                    onChange: handleChangeAudio,
                                })}
                            />
                            <label className='label pb-0'>
                                <span className='label-text-alt'>
                                    {errors.music_file?.message}
                                </span>
                            </label>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary self-end text-xl px-4 py-2'
                    >
                        Add Music
                    </button>
                </div>
            </form>
        </div>
    );
}
