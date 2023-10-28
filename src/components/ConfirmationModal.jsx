export default function ConfirmationModal({
    modalId,
    title,
    message,
    onConfirm,
    onCancel,
    ...props
}) {
    const handleConfirm = () => {
        onConfirm();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <dialog id={modalId} className='modal' {...props}>
            <div className='modal-box'>
                <h3 className='font-bold text-lg'>{title}</h3>
                <p className='py-4'>{message}</p>
                <div className='modal-action flex justify-center mt-3'>
                    <form method='dialog' className='flex justify-center items-center gap-10'>
                        <button
                            onClick={handleCancel}
                            className='btn btn-secondary w-[120px] py-1 text-base font-bold'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className='btn btn-primary w-[120px] py-1 text-base font-bold'
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
