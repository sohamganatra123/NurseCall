import React, { Component } from 'react'
import firebase from 'firebase'
import PatientCall from '../Patient/PatientCall'
import './Patient.css'
import utils from '../utilities'


class Patient extends Component {

  constructor(props) {
    super()
    this.state = {
      name: '',
      roomId: '',
      patientId: '',
      fbCallId: null
    }
    const dbRef = firebase.database().ref();
    this.callRef = dbRef.child('calls');
    // this.initiateCall = this.initiateCall.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handlePatientChange = this.handlePatientChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  componentDidMount() {
    const fbCallId = utils.getCookie('fbid');
    if(fbCallId){
      this.setState({fbCallId});
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleRoomChange(event){
    this.setState({roomId: event.target.value});
  }

  handlePatientChange(event){
    this.setState({patientId: event.target.value});
  }

  handleCancel(){
    this.setState({fbCallId: ''});
  }

  initiateCall(callType){
    this.callRef.push({
      "name": this.state.name,
      "roomId": this.state.roomId,
      "patientId": this.state.patientId,
      "startTimeST": firebase.database.ServerValue.TIMESTAMP,
      "attendStatus": false,
      "callType": callType
    }).then((call) => {
      utils.setCookie('fbid', call.key, 30)
      this.setState({fbCallId: call.key})
    });
  }

  render() {
    let fbCallId = this.state.fbCallId;
    if(fbCallId){
      return <PatientCall fbCallId={fbCallId} onCancel={this.handleCancel}/>
    } else {
        return (<div className="container">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange}></input>
          </div>
          <div className="form-group">
            <label>Room Id</label>
            <input type="text" className="form-control" value={this.state.roomId} onChange={this.handleRoomChange}></input>
          </div>
          <div className="form-group">
            <label>Patient Id</label>
            <input type="text" className="form-control" value={this.state.patientId} onChange={this.handlePatientChange}></input>
          </div>
        </form>
        <div className="card-columns m-5">
          <div className="card text-center bg-nurse cursor-pointer" onClick={()=>this.initiateCall('nurse')}>
            <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011278.svg" alt="Call Nurse" style={{width: "5em"}}/>
            <div className="card-body">
              <div className="card-text button-text">Call Nurse</div>
            </div>
          </div>
          <div className="card text-center bg-wardboy cursor-pointer" onClick={()=>this.initiateCall('wardboy')}>
            <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011268.svg" alt="Call Wardboy" style={{width: "5em"}}/>
            <div className="card-body ">
              <div className="card-text button-text">Call Wardboy</div>
            </div>
          </div>
        </div>
        </div>)
    }
  }
}

export default Patient
