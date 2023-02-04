import React, { Component } from 'react';
import auth from './services/authService';
import { Redirect, Route, Switch } from 'react-router-dom';
import Customers from './components/customers';
import NavBar from './components/navBar';
import Movies from './components/movies';
import MoviesForm from './components/moviesForm';
import Rentals from './components/rentals';
import Login from './components/login';
import Logout from './components/common/logout';
import NotFound from './components/notFound';
import Register from './components/register';
import ProtectedRoute from './components/common/protectedRoute';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {

  state = {

  }

  componentDidMount() {
    try {
      const user = auth.getUser();
      this.setState({ user });
    } catch (ex) {
      this.setState({ user: null })
    }
  }

  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <ToastContainer />
        
        <NavBar user={user} />
        <div>
          <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/logout' component={Logout}/>
            <ProtectedRoute 
              path='/movies/:id'
              component={MoviesForm}
            />
            <Route 
              path='/movies' 
              render={() => <Movies {...this.props} user={user} />}
            />
            <Route path='/customers' component={Customers}/>
            <Route path='/rentals' component={Rentals}/>
            <Route path='/not-found' component={NotFound}/>
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
