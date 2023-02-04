import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
    let user;
    try{
        user = auth.getUser();
    } catch(ex) {
        user = null;
    }
    return ( 
        <Route 
            {...rest}
            render = {(props) => {
                console.log(props)
                if (!user) return <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>;
                return Component ? <Component {...props}/> : render(props);
            }}
        />
     );
}
 
export default ProtectedRoute;