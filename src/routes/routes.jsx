import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from '../pages/layouts/AppLayout'
import Music from '../pages/Music/Music';

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
            }
        ]
    },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;