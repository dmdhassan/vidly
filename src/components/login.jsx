import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';


class Login extends Form {
    state = { 
        data: {
            username: '',
            password: ''
        },
        errors: {}
     }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }



    doSubmit = async () => {
        const { username, password } = this.state.data;

        try {
            await auth.login(username, password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';

        } 
        catch(ex) {
            if (ex.response && ex.response.status >= 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors })
            }
        }
    }

    loggedIn = () => {
        try {
            auth.getUser();
            return true;

        } catch(ex) {
            return false

        }
    }

    render() { 
        if (this.loggedIn()) return <Redirect to="/"/>

        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
        
    }
}
 
export default Login;