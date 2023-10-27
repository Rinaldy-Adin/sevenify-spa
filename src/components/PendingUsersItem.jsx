export default function PendingUsersItem({
    userName,
    userId,
    onAccept,
    onReject,
}) {
    const handleReject = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onReject(userId);
    };

    const handleAccept = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onAccept(userId);
    };

    return (
        <div className='w-full flex justify-between px-4 py-3 h-20'>
            <div className='flex gap-[10px] items-center'>
                <p className='text-xl'>{userName}</p>
            </div>
            <div className='flex px-3 py-1 gap-8 items-center'>
                <button
                    onClick={handleReject}
                    className='btn btn-secondary w-[120px]'
                >
                    Reject
                </button>

                <button
                    onClick={handleAccept}
                    className='btn btn-primary w-[120px]'
                >
                    Accept
                </button>
            </div>
        </div>
    );
}
