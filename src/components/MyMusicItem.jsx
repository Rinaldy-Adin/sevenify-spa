import { MdEdit, MdDelete } from 'react-icons/md';
import playButtonImg from '../assets/play-button.png';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function MyMusicItem({
    musicName,
    musicId,
    isPremium,
    cover,
    onPlayMusic,
    onTogglePremium,
    onDelete,
}) {
    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onTogglePremium(musicId);
    };

    const handlePlay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onPlayMusic(musicId);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(musicId);
    };

    return (
        <div className='w-full flex justify-between px-4 py-3 h-20'>
            <div className='flex gap-[10px] items-center'>
                <img
                    src={playButtonImg}
                    onClick={handlePlay}
                    alt='play button'
                    className='cursor-pointer w-8 h-8'
                />
                <img
                    src={cover}
                    alt='music cover'
                    className='h-full cursor-router aspect-square rounded-lg'
                />
                <p className='text-xl'>
                    <span>{musicName}</span>
                    <span
                        className={clsx(
                            isPremium ? 'text-primary' : 'text-gray-400'
                        )}
                    >
                        {' '}
                        - {isPremium ? 'Premium' : 'Public'}
                    </span>
                </p>
            </div>
            <div className='flex px-3 py-1 gap-8 items-center'>
                <Link to={`/music/${musicId}`}>
                    <MdEdit
                        size={28}
                        className='cursor-pointer text-gray-500'
                    />
                </Link>
                <MdDelete
                    size={24}
                    onClick={handleDelete}
                    className='cursor-pointer text-gray-500'
                />
                <button
                    onClick={handleToggle}
                    className={clsx(
                        'btn w-[180px]',
                        isPremium ? 'btn-secondary' : 'btn-primary'
                    )}
                >
                    {isPremium ? 'Make Public' : 'Make Premium'}
                </button>
            </div>
        </div>
    );
}
