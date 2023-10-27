import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from '../pages/layouts/AppLayout'
import Music from '../pages/Music/Music';
import Login from '../pages/Login/Login';
import LoginLayout from '../pages/layouts/LoginLayout';
import UnacceptedLayout from '../pages/layouts/UnacceptedLayout';
import RequestJoin from '../pages/Join/RequestJoin';
import Components from '../pages/Components/Components';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/music' />
            },
            {
                path: '/music',
                element: <Music />
            },
            {
                path: '/components',
                element: <Components />
            }
        ]
    },
    {
        path: '/',
        element: <LoginLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    {
        path: '/',
        element: <UnacceptedLayout />,
        children: [
            {
                path: '/join',
                element: <RequestJoin />
            }
        ]
    }
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;