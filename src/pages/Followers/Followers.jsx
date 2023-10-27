import { useState, useEffect } from 'react';
import ConfirmationModal from '../../components/ConfirmationModal';
import PendingUsersItem from '../../components/PendingUsersItem';
import MyFollowersItem from '../../components/MyFollowersItem';

const dummyPendingFollowers = [
    {
        user_name: 'User Name',
        user_id: 5,
    },
    {
        user_name: 'User Name',
        user_id: 6,
    },
    {
        user_name: 'User Name',
        user_id: 7,
    },
    {
        user_name: 'User Name',
        user_id: 8,
    },
];

const dummyMyFollowers = [
    {
        user_name: 'User Name',
        user_id: 1,
    },
    {
        user_name: 'User Name',
        user_id: 2,
    },
    {
        user_name: 'User Name',
        user_id: 3,
    },
    {
        user_name: 'User Name',
        user_id: 4,
    },
];

export default function Followers() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [myFollowers, setMyFollowers] = useState([]);
    const [onModalConfirm, setOnModalConfirm] = useState(null);

    useEffect(() => {
        setPendingUsers(dummyPendingFollowers);
        setMyFollowers(dummyMyFollowers);
    }, []);

    const handleAccept = (userId) => {
        const acceptUser = () => {
            setPendingUsers(
                [...pendingUsers].filter(({ user_id }) => user_id != userId)
            );
        };

        setOnModalConfirm({
            title: 'Confirm Accept',
            message: 'Do you want to accept this user as a follower',
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
            message: 'Do you want to reject this user from being a follower',
            callback: rejectUser,
        });
    };

    const handleRemove = (userId) => {
        const removeUser = () => {
            setMyFollowers(
                [...myFollowers].filter(({ user_id }) => user_id != userId)
            );
        };

        setOnModalConfirm({
            title: 'Confirm Remove Follower',
            message: 'Do you want to remove this follower',
            callback: removeUser,
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
            <div className='flex flex-col gap-6'>
                <div className='w-full flex justify-between'>
                    <h1 className='font-medium text-4xl'>Pending Followers</h1>
                </div>
                <div className='flex flex-col divide-y divide-gray-200'>
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
                            You currently have no follower requests
                        </h2>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='w-full flex justify-between'>
                    <h1 className='font-medium text-4xl'>My Followers</h1>
                </div>
                <div className='flex flex-col divide-y divide-gray-200'>
                    {myFollowers.length != 0 ? (
                        myFollowers.map(({ user_name, user_id }, idx) => {
                            return (
                                <MyFollowersItem
                                    key={idx}
                                    userName={user_name}
                                    userId={user_id}
                                    onRemove={handleRemove}
                                />
                            );
                        })
                    ) : (
                        <h2 className='text-3xl text-center text-gray-500 font-medium'>
                            You currently have no followers
                        </h2>
                    )}
                </div>
            </div>
        </div>
    );
}
