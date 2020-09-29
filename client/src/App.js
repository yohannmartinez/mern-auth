import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./services/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import UsersProfile from "./components/pages/UsersProfile/UsersProfile"
import ModifyUserProfile from "./components/pages/ModifyUserProfile/ModifyUserProfile";

import Spot from "./components/pages/Spot/Spot"
import AddSpot from "./components/pages/AddSpot/AddSpot"
import AddSpotSuccess from "./components/pages/AddSpot/AddSpotSuccess/AddSpotSuccess"

import mapboxgl from 'mapbox-gl';
import "./App.css";


//initialise mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoieW9oYW5ubWFydGluZXoiLCJhIjoiY2p2Z2hhdjQwMDczczRhcDd5YXY2M2w2ZSJ9.CgNZxnfE98Hy4ps-XAQLmA';
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {

  componentDidMount() {
    window.addEventListener("pageshow", function (event) {
      var historyTraversal = event.persisted ||
        (typeof window.performance != "undefined" &&
          window.performance.navigation.type === 2);
      if (historyTraversal) {
        // Handle page restore.
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user/:id" component={UsersProfile} />
            <Route exact path="/spot/:id" component={Spot} />
            <Switch>
              <PrivateRoute exact path="/addSpot" component={AddSpot} />
              <PrivateRoute exact path="/addSpotSuccess" component={AddSpotSuccess} />
              <PrivateRoute exact path="/editUser" component={ModifyUserProfile} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
