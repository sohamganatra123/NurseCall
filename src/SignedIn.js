import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import './SignedIn.css'


class SignedIn extends Component {

  render() {

    return (
      <div className="row" style={{ paddingTop: "4rem"}}>
      <NavBar signOut={this.signOut}/>
      <Switch>
        <Route
          path={`/dashboard`}
          render={
            routeProps => <Dashboard
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
