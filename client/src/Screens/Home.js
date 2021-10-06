import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import { getUser,logOut } from '../redux/helpers/authHelper';

const Home = () => {
    // const [user,setUser] = useState(null);
    const cookies = new Cookies();
    const history = useHistory();

    const clearCookie = () => {
        logOut()
        cookies.remove('jwt');
        history.push('/signin')
    }

    if (cookies.get('jwt') !== undefined) {
        return (<>
                 <h1>Home Page</h1>
                 <pre>{JSON.stringify(getUser(),null,2)}</pre>
                 <button onClick={clearCookie}>Logout</button>
             </>);
    } else {
        history.push('/signin')
    }
    return 0;
}

export default Home;