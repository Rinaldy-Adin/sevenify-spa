import {MdEdit, MdDelete} from 'react-icons/md';
import clsx from 'clsx';

export default function MyAlbumsItem({albumName, albumId, isPremium, cover, onTogglePremium}) {
    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onTogglePremium(albumId);
    }

    return (
        <div className='w-full flex justify-between px-4 py-3 h-20'>
            <div className='flex gap-[10px] items-center'>
                <img src={cover} alt='music cover' className='h-full cursor-router aspect-square rounded-lg'/>
                <p className='text-xl'>
                    <span>{albumName}</span>
                    <span className={clsx(isPremium ? 'text-primary' : 'text-gray-400')}> - {isPremium ? 'Premium' : 'Public'}</span>
                </p>
            </div>
            <div className='flex px-3 py-1 gap-8 items-center'>
                <MdEdit size={28} className='cursor-pointer text-gray-500' />
                <MdDelete size={24} className='cursor-pointer text-gray-500' />
                <button onClick={handleToggle} className={clsx('btn w-[180px]', isPremium ? 'btn-secondary' : 'btn-primary')}>{isPremium ? 'Make Public' : 'Make Premium'}</button>
            </div>
        </div>
    )
}