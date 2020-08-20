import React, { Component } from 'react'
import firebase from 'firebase'
import './Patient.css'


class PatientCall extends Component {

  constructor(props) {
    super()
    this.state = {

    }
    const dbRef = firebase.database().ref();
    this.usersRef = dbRef.child('users');
    // this.initiateCall = this.initiateCall.bind(this);
  }

  render() {
    return (
    <div className="m-5">
        <div className="card text-center bg-nurse">
            <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011278.svg" alt="Nurse" style={{width: "5em"}}/>
            <div className="card-body">
              <div className="card-text button-text">Nurse on the way</div>
            </div>   
        </div>
        <div className="card pt-5">
            <div className="card-body text-center">
                <div className="card-text stretched-link button-text" >
                <i className="fa fa-remove"></i>
                Cancel</div>
            </div>
        </div>
    </div>    
    );
  }
}

export default PatientCall
