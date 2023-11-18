import { MdEdit, MdDelete } from 'react-icons/md';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import config from '../utils/config';

export default function MyAlbumsItem({
    albumName,
    albumId,
    isPremium,
    onTogglePremium,
    onDelete
}) {
    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onTogglePremium(albumId, isPremium);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(albumId, isPremium);
    };

    const imgsrc = isPremium ? `${config.restUrl}/static/cover/album/${albumId}` : `${config.phpUrl}/static/covers/album/${albumId}`

    return (
        <div className='w-full flex justify-between px-4 py-3 h-20'>
            <div className='flex gap-[10px] items-center'>
                <img
                    src={imgsrc}
                    alt='album cover'
                    className='h-full cursor-router aspect-square rounded-lg'
                />
                <p className='text-xl'>
                    <span>{albumName}</span>
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
                <Link to={`/albums/${albumId}?premium=${isPremium}`}>
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
