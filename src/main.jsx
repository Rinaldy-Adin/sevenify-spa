import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes/routes';
import './index.css';
import {Toaster} from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Routes />
        <Toaster />
    </React.StrictMode>
);
