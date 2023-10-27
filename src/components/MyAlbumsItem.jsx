import { MdEdit, MdDelete } from 'react-icons/md';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function MyAlbumsItem({
    albumName,
    albumId,
    isPremium,
    cover,
    onTogglePremium,
    onDelete
}) {
    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onTogglePremium(albumId);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(albumId);
    };

    return (
        <div className='w-full flex justify-between px-4 py-3 h-20'>
            <div className='flex gap-[10px] items-center'>
                <img
                    src={cover}
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
                <Link to={`/album/${albumId}`}>
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
