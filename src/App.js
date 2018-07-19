import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EditableButtonGroup from './EditableButtonGroup';

class App extends Component {  
  render() {
    return (
      <div className="App11">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
       React Mentions Examples
      </p>
      
      <EditableButtonGroup />          
       
      </div>
    );
  }
}

export default App;
