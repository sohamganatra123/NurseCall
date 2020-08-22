import React, { Component } from 'react'
import firebase from 'firebase'
import utils from '../utilities'
import './Patient.css'


class PatientCall extends Component {

  constructor(props) {
    super(props)
    const dbRef = firebase.database().ref();
    this.callRef = dbRef.child('calls');
    this.cancelCall = this.cancelCall.bind(this);
    this.state = {
      callType: ''
    }
    this.fbCallId = this.props.fbCallId;
  }

  componentDidMount(){
    this.callRef.child(this.fbCallId).once('value').then((snap)=>{
      this.callDetails = snap.val();
      this.setState({callType: this.callDetails.callType})
    })
  }

  cancelCall(){
    this.callRef.child(this.fbCallId).child('attendStatus').set(true).then(()=>{
      utils.deleteCookie('fbid');
      this.props.onCancel();
    })
  }

  render() {

    return (
    <div className="m-5">
        {this.state.callType==='nurse'?<div className="card text-center bg-nurse">
            <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011278.svg" alt="Nurse" style={{width: "5em"}}/>
            <div className="card-body">
              <div className="card-text button-text">Nurse on the way</div>
            </div>   
        </div>: <div className="card text-center bg-wardboy">
          <img className="card-img-top pt-3" src="https://image.flaticon.com/icons/svg/3011/3011268.svg" alt="Call Wardboy" style={{width: "5em"}}/>
          <div className="card-body">
            <div className="card-text button-text">Wardboy on the way</div>
          </div>
        </div>}

        <div className="card mt-4 cursor-pointer" onClick={this.cancelCall}>
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
