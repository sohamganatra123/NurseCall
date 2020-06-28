import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import Patient from './Patient'
import './SignedIn.css'


class SignedIn extends Component {

  render() {

    return (
      <div className="row" style={{ paddingTop: "4rem"}}>
      {/* <NavBar/> */}
      <Switch>
        <Redirect exact from={`/`} to={`/dashboard`} />
        <Route
          path={`/dashboard`}
          render={
            routeProps => <Dashboard
            protocol={window.location.protocol}
            realm={window.location.origin.split('//')[1]}
            {...routeProps} />
          }
        />
        <Route
          path={`/patient`}
          render={
            routeProps => <Patient
            protocol={window.location.protocol}
            realm={window.location.origin.split('//')[1]}
            {...routeProps} />
          }
        />
      </Switch>
      </div>
    );
  }
}

export default SignedIn
