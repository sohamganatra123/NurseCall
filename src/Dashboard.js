import React, { Component } from 'react'
import firebase from 'firebase'
import './Dashboard.css'

class Dashboard extends Component {

  constructor(props) {
    super()
    this.state = {
      time: "",
      callCount: 0,
      callList: {}
    }
    const dbRef = firebase.database().ref();
    this.usersRef = dbRef.child('users').orderByChild('attendStatus').equalTo(false);
    this.startTime = this.startTime.bind(this)
  }

  componentDidMount() {
    this.intervalId = setInterval(this.startTime, 1000);
    this.usersRef.on('value',(snapshot)=>{
      let callList = snapshot.val()
      console.log(snapshot.val())
      let callCount = Object.keys(callList).length
      this.setState({callList, callCount})
    })
  }

  componentWillUnmount() {
    this.usersRef.off(this.userRefListener);
    clearInterval(this.intervalId);
  }

  checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.setState({time: h + ":" + m + ":" + s})
  }

  getHtmlCallList(){
    let htmlCallList = []
    let callList = this.state.callList
    for(let key in callList){
      let cardClassName = "animated flash list-card"
      if(callList[key].role==="nurse"){
        cardClassName += " nursecard"
      } else {
        cardClassName += " wardcard"
      }
      let htmlCallDetails = 
        <tr key={key} className={cardClassName}>
          <td>{callList[key].name}</td>
          <td>{callList[key].room}</td>
          <td>
            {callList[key].role==="nurse"?<img src="https://image.flaticon.com/icons/svg/3011/3011278.svg" alt="Nurse" style={{width: '42px'}}/>:''}
          </td>
        </tr>
        htmlCallList.push(htmlCallDetails)
    }
    return htmlCallList
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 count">{this.state.time}</div>
          <div className="col-6 count">Pending Calls {this.state.callCount}</div>
        </div>
        <div className="container">
          <table className="table">
            <thead>

            </thead>
            <tbody>
              {this.getHtmlCallList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard
