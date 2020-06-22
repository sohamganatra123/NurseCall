import React, { Component } from 'react'
import './Landing.css'
import SignedIn from './SignedIn'

class Landing extends Component {

  render() {
    return (
      <div>
        {true? <SignedIn/>: <div>Nurse Call</div>}
      </div>
    );
  }
}

export default Landing
