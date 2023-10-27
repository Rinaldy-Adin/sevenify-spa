export default function MyFollowersItem({ userName, userId, onRemove }) {
    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove(userId);
    };

    return (
        <div className='w-full flex justify-between px-4 py-3 h-20'>
            <div className='flex gap-[10px] items-center'>
                <p className='text-xl'>{userName}</p>
            </div>
            <div className='flex px-3 py-1 gap-8 items-center'>
                <button
                    onClick={handleRemove}
                    className='btn btn-secondary w-[200px]'
                >
                    Remove Follower
                </button>
            </div>
        </div>
    );
}
