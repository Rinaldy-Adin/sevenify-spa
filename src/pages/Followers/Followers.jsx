import { useState, useEffect } from 'react';
import ConfirmationModal from '../../components/ConfirmationModal';
import PendingUsersItem from '../../components/PendingUsersItem';
import MyFollowersItem from '../../components/MyFollowersItem';
import Pagination from '../../components/Pagination';
import restClient from '../../utils/restClient';
import toast from 'react-hot-toast';

// const dummyPendingFollowers = [];

// const dummyMyFollowers = [];

// for (let idx = 0; idx < 100; idx++) {
//     dummyMyFollowers.push({
//         user_name: `User ${idx + 1}`,
//         user_id: idx + 1,
//     });

//     dummyPendingFollowers.push({
//         user_name: `User ${idx + 100}`,
//         user_id: idx + 100,
//     });
// }

export default function Followers() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [myFollowers, setMyFollowers] = useState([]);
    const [onModalConfirm, setOnModalConfirm] = useState(null);

    const [currentPendingPage, setCurrentPendingPage] = useState(0);
    const [pendingPageCount, setPendingPageCount] = useState(0);

    const [currentFollowersPage, setCurrentFollowersPage] = useState(0);
    const [followersPageCount, setFollowersPageCount] = useState(0);

    const refreshPendingList = async () => {
        try {
            const resp = await restClient.get(
                `/api/followers/pending?page=${currentPendingPage + 1}`
            );
            const data = resp.data.body;

            setPendingUsers(data.followers);
            setPendingPageCount(data.page_count);
        } catch (error) {
            toast.error('Error reaching the server');
        }
    };

    const refreshCurrentList = async () => {
        try {
            const resp = await restClient.get(
                `/api/followers/current?page=${currentPendingPage + 1}`
            );
            const data = resp.data.body;

            setMyFollowers(data.followers);
            setFollowersPageCount(data.page_count);
        } catch (error) {
            toast.error('Error reaching the server');
        }
    };

    useEffect(() => {
        refreshPendingList();
    }, [currentPendingPage]);

    useEffect(() => {
        refreshCurrentList();
    }, [currentFollowersPage]);

    const handleAccept = (userId) => {
        const acceptUser = async () => {
            console.log(userId);
            try {
                await restClient.post(`/api/followers/pending/${userId}`, {
                    action: 'accept',
                });
                refreshPendingList();
                refreshCurrentList();
                toast('Succesfully accepted follower');
            } catch (error) {
                toast.error('Error reaching the server');
            }
        };

        setOnModalConfirm({
            title: 'Confirm Accept',
            message: 'Do you want to accept this user as a follower',
            callback: acceptUser,
        });
    };

    const handleReject = (userId) => {
        const rejectUser = async () => {
            try {
                await restClient.post(`/api/followers/pending/${userId}`, {
                    action: 'reject',
                });
                refreshPendingList();
                refreshCurrentList();
                toast('Succesfully rejected follower');
            } catch (error) {
                toast.error('Error reaching the server');
            }
        };

        setOnModalConfirm({
            title: 'Confirm Reject',
            message: 'Do you want to reject this user from being a follower',
            callback: rejectUser,
        });
    };

    const handleRemove = (userId) => {
        const removeUser = async () => {
            try {
                await restClient.delete(`/api/followers/current/${userId}`, {
                    action: 'reject',
                });
                refreshPendingList();
                refreshCurrentList();
                toast('Succesfully removed follower');
            } catch (error) {
                toast.error('Error reaching the server');
            }
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
                <h1 className='font-medium text-4xl'>Pending Followers</h1>
                <div className='flex flex-col gap-6'>
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
                    <Pagination
                        className='self-center'
                        handlePageClick={(e) => {
                            setCurrentPendingPage(e.selected);
                        }}
                        itemCount={pendingPageCount * 5}
                        pageSize={5}
                        currentPage={currentPendingPage + 1}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='w-full flex justify-between'>
                    <h1 className='font-medium text-4xl'>My Followers</h1>
                </div>
                <div className='flex flex-col gap-6'>
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
                    <Pagination
                        className='self-center'
                        handlePageClick={(e) => {
                            setCurrentFollowersPage(e.selected);
                        }}
                        itemCount={followersPageCount * 5}
                        pageSize={5}
                        currentPage={currentFollowersPage + 1}
                    />
                </div>
            </div>
        </div>
    );
}
