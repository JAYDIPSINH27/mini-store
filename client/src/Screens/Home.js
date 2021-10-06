import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import { getUser,logOut } from '../redux/helpers/authHelpers';
import {addToCart,updateCart,getCart,removeFromCart,clearCart} from '../redux/helpers/cartHelpers'

const Home = () => {
    // const [user,setUser] = useState(null);
    const cookies = new Cookies();
    const history = useHistory();

    const clearCookie = () => {
        logOut()
        console.log(getCart())
        cookies.remove('jwt');
        history.push('/signin')
    }

    if (cookies.get('jwt') !== undefined) {
        return (<>
                 <h1>Home Page</h1>
                 <pre>{JSON.stringify(getUser(),null,2)}</pre>
                 <button onClick={clearCookie}>Logout</button>
                 <button onClick={() => addToCart({id : 1,name : 'Hello',price:4},5)}>Add</button>
                 <button onClick={() => removeFromCart(1)}>Remove</button>
                 <button onClick={() => updateCart(1,10)}>Update</button>
                 <button onClick={() => clearCart()}>Clear</button>
             </>);
    } else {
        history.push('/signin')
    }
    return 0;
}

export default Home;