import MyMusicItem from '../../components/MyMusicItem';
import placeholderImg from '../../assets/placeholder.jpg';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useState } from 'react';
import Pagination from '../../components/Pagination';

export default function Components() {
    const items = [];
    for (let idx = 0; idx < 100; idx++) {
        items.push(idx + 1);
    }
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className='w-full flex flex-col gap-10 items-start px-4 py-6 mb-10'>
            <h2 className='text-2xl mb-10'>
                Use{' '}
                <a
                    href='https://daisyui.com/components/'
                    className='text-blue-400 underline'
                >
                    Daisy UI
                </a>
            </h2>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-semibold'>Buttons</h1>
                <button className='btn btn-primary'>Sample button</button>
                <button className='btn btn-secondary'>Sample button</button>
            </div>

            <div className='flex flex-col gap-3 w-[300px]'>
                <h1 className='text-3xl font-semibold'>Text Field</h1>
                <div className='form-control w-full'>
                    <label className='label'>
                        <span className='label-text'>What is your name?</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Type here'
                        className='input input-bordered w-full'
                    />
                </div>

                <div className='form-control w-full'>
                    <label className='label'>
                        <span className='label-text'>What is your name?</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Type here'
                        className='input input-bordered w-full'
                    />
                    <label className='label'>
                        <span className='label-text-alt'>With Error Text</span>
                    </label>
                </div>

                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text'>Your bio</span>
                    </label>
                    <textarea
                        className='textarea textarea-bordered h-24'
                        placeholder='Bio'
                    ></textarea>
                    <label className='label'>
                        <span className='label-text-alt'>Error message</span>
                    </label>
                </div>
            </div>

            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold'>List Items</h1>

                <MyMusicItem
                    musicId={1}
                    isPremium={true}
                    musicName={'Music Name'}
                    onPlayMusic={() => {}}
                    onTogglePremium={() => {}}
                    cover={placeholderImg}
                />
                <MyMusicItem
                    musicId={2}
                    isPremium={false}
                    musicName={'Music Name'}
                    onPlayMusic={() => {}}
                    onTogglePremium={() => {}}
                    cover={placeholderImg}
                />
            </div>

            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold'>Input</h1>

                <div className='form-control w-full'>
                    <input
                        type='file'
                        className='file-input file-input-bordered file-input-primary w-full max-w-xs'
                        accept='image/*'
                    />
                    <label className='label pb-0'>
                        <span className='label-text-alt'>Error message</span>
                    </label>
                </div>

                <div className='form-control'>
                    <label className='label cursor-pointer'>
                        <span className='label-text'>Remember me</span>
                        <input
                            type='checkbox'
                            className='checkbox checkbox-primary'
                        />
                    </label>
                </div>
            </div>

            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold'>Modals</h1>

                <div>
                    <button
                        className='btn btn-primary'
                        onClick={() =>
                            document.getElementById('my_modal').showModal()
                        }
                    >
                        Open Confirmation Modal
                    </button>
                    <ConfirmationModal
                        modalId='my_modal'
                        title='Confirm action'
                        message='Are you sure you want to do'
                        onConfirm={() => {
                            console.log('confirmed');
                        }}
                        onCancel={() => {
                            console.log('canceled');
                        }}
                    />
                </div>
            </div>

            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold'>Pagination</h1>

                <div className='flex flex-col gap-6'>
                    <div>
                        {items
                            .slice(currentPage * 5, (currentPage + 1) * 5)
                            .map((item, idx) => (
                                <div key={idx}>
                                    <h3>Item #{item}</h3>
                                </div>
                            ))}
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
        </div>
    );
}
