import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import AppLayout from '../pages/layouts/AppLayout';
import Music from '../pages/Music/Music';
import Login from '../pages/Login/Login';
import LoginLayout from '../pages/layouts/LoginLayout';
import UnacceptedLayout from '../pages/layouts/UnacceptedLayout';
import RequestJoin from '../pages/Join/RequestJoin';
import Albums from '../pages/Albums/Albums';
import NewMusic from '../pages/Music/NewMusic';
import EditMusic from '../pages/Music/EditMusic';
import Followers from '../pages/Followers/Followers';
import Admin from '../pages/Admin/Admin';
import NewAlbum from '../pages/Albums/NewAlbum';
import EditAlbum from '../pages/Albums/EditAlbum';
import { AuthProvider } from '../utils/authContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthProvider>
                <AppLayout />{' '}
            </AuthProvider>
        ),
        children: [
            {
                index: true,
                element: <Navigate to='/music' />,
            },
            {
                path: '/music',
                children: [
                    {
                        index: true,
                        element: <Music />,
                    },
                    {
                        path: '/music/new',
                        element: <NewMusic />,
                    },
                    {
                        path: '/music/:musicId',
                        element: <EditMusic />,
                    },
                ],
            },
            {
                path: '/albums',
                children: [
                    {
                        index: true,
                        element: <Albums />,
                    },
                    {
                        path: '/albums/new',
                        element: <NewAlbum />,
                    },
                    {
                        path: '/albums/:albumId',
                        element: <EditAlbum />,
                    },
                ],
            },
            {
                path: '/followers',
                element: <Followers />,
            },
            {
                path: '/admin',
                element: <Admin />,
            },
        ],
    },
    {
        path: '/',
        element: (
            <AuthProvider>
                <LoginLayout />
            </AuthProvider>
        ),
        children: [
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
    {
        path: '/',
        element: (
            <AuthProvider>
                <UnacceptedLayout />
            </AuthProvider>
        ),
        children: [
            {
                path: '/join',
                element: <RequestJoin />,
            },
        ],
    },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
