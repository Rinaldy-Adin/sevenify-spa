import { useState, useEffect } from 'react';
import ConfirmationModal from '../../components/ConfirmationModal';
import PendingUsersItem from '../../components/PendingUsersItem';
import Pagination from '../../components/Pagination';

const dummyPendingUsers = [];

for (let idx = 0; idx < 100; idx++) {
    dummyPendingUsers.push({
        user_name: `User ${idx + 1}`,
        user_id: idx + 1,
    });
}

export default function Admin() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [onModalConfirm, setOnModalConfirm] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setPendingUsers(
            dummyPendingUsers.slice(currentPage * 5, (currentPage + 1) * 5)
        );
    }, [currentPage]);

    const handleAccept = (userId) => {
        const acceptUser = () => {
            setPendingUsers(
                [...pendingUsers].filter(({ user_id }) => user_id != userId)
            );
        };

        setOnModalConfirm({
            title: 'Confirm Accept',
            message: 'Do you want to accept this user as a premium account',
            callback: acceptUser,
        });
    };

    const handleReject = (userId) => {
        const rejectUser = () => {
            setPendingUsers(
                [...pendingUsers].filter(({ user_id }) => user_id != userId)
            );
        };

        setOnModalConfirm({
            title: 'Confirm Reject',
            message:
                'Do you want to reject this user from being a premium account',
            callback: rejectUser,
        });
    };

    useEffect(() => {
        if (onModalConfirm != null) {
            document.getElementById('my_modal').showModal();
        }
    }, [onModalConfirm]);

    return (
        <div className='w-full flex flex-col px-4 py-6 gap-6'>
            <ConfirmationModal
                modalId='my_modal'
                title={onModalConfirm?.title}
                message={onModalConfirm?.message}
                onConfirm={onModalConfirm?.callback}
                onCancel={() => {}}
            />
            <div className='w-full flex justify-between'>
                <h1 className='font-medium text-4xl'>Pending Requests</h1>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                    {pendingUsers.length != 0 ? (
                        pendingUsers.map(({ user_name, user_id }, idx) => {
                            return (
                                <PendingUsersItem
                                    key={idx}
                                    userName={user_name}
                                    userId={user_id}
                                    onAccept={handleAccept}
                                    onReject={handleReject}
                                />
                            );
                        })
                    ) : (
                        <h2 className='text-3xl text-center text-gray-500 font-medium'>
                            There are currently no premium account requests
                        </h2>
                    )}
                </div>
                <Pagination
                    className='self-center'
                    handlePageClick={(e) => {
                        setCurrentPage(e.selected);
                    }}
                    itemCount={100}
                    pageSize={5}
                    currentPage={currentPage + 1}
                />
            </div>
        </div>
    );
}
