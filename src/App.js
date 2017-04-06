import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import RTM from 'satori-sdk-js';

const endpoint = "wss://open-data.api.satori.com";
const appKey = "8a0Dc4D096eC9560FF3DDb0A46849ECb";
const channel = "transportation";

class App extends Component {
  componentWillMount() {
    const rtm = new RTM(endpoint, appKey);
    rtm.on("enter-connected", function() {
      console.log("Connected to RTM!");
    });

    const subscription = rtm.subscribe(channel, RTM.SubscriptionMode.SIMPLE, {
      filter: "select * from transportation where header.`user-data`='trimet'"
    });
    subscription.on('rtm/subscription/data', function (pdu) {
      pdu.body.messages.forEach(function (msg) {
        console.log(msg);
      });
    });

    rtm.start();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Frontend Coding Exercise</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
