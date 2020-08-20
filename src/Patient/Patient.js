import React, { Component } from 'react'
import firebase from 'firebase'
import './Patient.css'


class Patient extends Component {

  constructor(props) {
    super()
    this.state = {
      name: '',
      roomId: ''
    }
    const dbRef = firebase.database().ref();
    this.usersRef = dbRef.child('users');
    // this.initiateCall = this.initiateCall.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleRoomChange(event){
    this.setState({roomId: event.target.value});
  }

  initiateCall(callType){
    this.usersRef.push({
      "name": this.state.name,
      "roomId": this.state.roomId,
      "patientId": 1221,
      "startTimeST": firebase.database.ServerValue.TIMESTAMP,
      "attendStatus": false,
      "callType": callType
    });
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange}></input>
          </div>
          <div className="form-group">
            <label>Room Id</label>
            <input type="text" className="form-control" value={this.state.roomId} onChange={this.handleRoomChange}></input>
          </div>
        </form>
        <div className="card-columns m-5">
          <div className="card text-center bg-nurse" onClick={()=>this.initiateCall('nurse')}>
            <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011278.svg" alt="Call Nurse" style={{width: "5em"}}/>
            <div className="card-body">
              <div className="card-text button-text">Call Nurse</div>
            </div>
          </div>
          <div className="card text-center bg-wardboy" onClick={()=>this.initiateCall('wardboy')}>
            <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011268.svg" alt="Call Wardboy" style={{width: "5em"}}/>
            <div className="card-body ">
              <div className="card-text button-text">Call Wardboy</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Patient
