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
import Components from '../pages/Components/Components';
import Albums from '../pages/Albums/Albums';
import NewMusic from '../pages/Music/NewMusic';
import EditMusic from '../pages/Music/EditMusic';
import Followers from '../pages/Followers/Followers';
import Admin from '../pages/Admin/Admin';
import AdminLayout from '../pages/layouts/AdminLayout';
import NewAlbum from '../pages/Albums/NewAlbum';
import EditAlbum from '../pages/Albums/EditAlbum';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
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
                path: '/components',
                element: <Components />,
            },
        ],
    },
    {
        path: '/',
        element: <LoginLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
    {
        path: '/',
        element: <UnacceptedLayout />,
        children: [
            {
                path: '/join',
                element: <RequestJoin />,
            },
        ],
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <Admin />,
            },
        ],
    },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
