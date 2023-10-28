import playButtonImg from '../assets/play-button.png';
import clsx from 'clsx';

export default function NewAlbumMyMusic({
    musicName,
    musicId,
    isAdded,
    cover,
    onPlayMusic,
    onToggleAdded,
}) {
    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleAdded(musicId);
    };

    const handlePlay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onPlayMusic(musicId);
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
                <p className='text-xl'>{musicName}</p>
            </div>
            <div className='flex px-3 py-1 gap-8 items-center'>
                <button
                    onClick={handleToggle}
                    className={clsx(
                        'btn w-[200px]',
                        isAdded ? 'btn-secondary' : 'btn-primary'
                    )}
                >
                    {isAdded ? 'Remove from Album' : 'Add to Album'}
                </button>
            </div>
        </div>
    );
}
