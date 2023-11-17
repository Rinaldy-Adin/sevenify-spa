import { useContext, useEffect } from 'react';
import restClient from '../../utils/restClient'
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../utils/authContext'

function Logout() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect((async () => {
        await restClient.post('/api/logout')
        setIsAuthenticated(true);
        navigate('/music');
    })(), [])

    return (
        <></>
    );
}

export default Logout;
