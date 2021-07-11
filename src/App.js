import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends Component {


  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          console.log(snapShot.data());
          //calling the action method
          setCurrentUser({
            currentUser: snapShot.id,
            ...snapShot.data()
          });
        });
        //calling the action method
        setCurrentUser(userAuth );
      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }



  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>

    );
  }
}

const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser
  }
  
)

// converting the setCurrentUser method and pass it to App.js as a prop
// user is a variable which will be called in App methods example componentDidMount in this case
// we are not calling setCurrentUser function here. We are just getting a reference of setCurrentUser function of action(user.actions.js) and making it
// available to app.js
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//connecting action here. on triggering this action in componentDidMount() redux publishes to all reducers
//in this specific case, any reducer (in this case user-reducer.js) which has the switch with case of SET_CURRENT_USER will pick this action and set the currrent user
//and that current user is passed to Header as Header is looking for currentUser property which is present in user-reducer's state
export default connect(mapStateToProps, mapDispatchToProps)(App);
