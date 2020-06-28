import React, { Component } from 'react'
import firebase from 'firebase'
import './Patient.css'


class Patient extends Component {

  constructor(props) {
    super()
    this.state = {

    }
    const dbRef = firebase.database().ref();
    // this.usersRef = dbRef.child('users').child('id');
    this.usersRef = dbRef.child('users').orderByChild('attendStatus').equalTo(false);
    // this.initiateCall = this.initiateCall.bind(this);
  }

  componentDidMount() {
    this.usersRef.on('value',(snapshot)=>{
      let callList = snapshot.val()
      console.log(snapshot.val())
      let callCount = Object.keys(callList).length
      this.setState({callList, callCount})
    })
  }

  componentWillUnmount() {
    this.usersRef.off(this.userRefListener);
  }

  initiateCall(callType){
    console.log(callType)
  }

  render() {
    return (
      <div className="card-columns m-5">
        <div className="card text-center" style={{backgroundColor:"#EFFFCC"}}>
          <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011278.svg" alt="Call Nurse" style={{width: "5em"}}/>
          <div className="card-body">
            <div className="card-text patcard" onClick={()=>this.initiateCall('nurse')}>Call Nurse</div>
          </div>
        </div>
        <div className="card text-center" style={{backgroundColor:"#CAF8EE"}}>
          <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011268.svg" alt="Call Wardboy" style={{width: "5em"}}/>
          <div className="card-body ">
            <div className="card-text patcard" onClick={()=>this.initiateCall('wardboy')}>Call Wardboy</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Patient
