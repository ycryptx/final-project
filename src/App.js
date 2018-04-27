import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import SearchForm from './SearchForm';
import Report from './Report';
import About from './About';
// import About from './About';


class App extends Component {
  constructor() {
    super();
    this.state = {
      onPage : ''
    }
  }
  render() {
    return (
      <HashRouter>
        <div className="App">
            <a href='/'><img src={logo} className="App-logo" alt="logo" /></a>
            <h1 className="App-title">toxxx me ;)</h1>
              <ul>
                <li><NavLink to='/'>home</NavLink></li>
                <li><NavLink to='/about'>about</NavLink></li>
                <li><NavLink to='/report'>report</NavLink></li>
              </ul>
              <Route exact path="/" component={SearchForm}/>
              <Route path="/about" component={About}/>
              <Route path="/report" component={Report}/>
          <div className="App-intro">
            <div className = "content">

            </div>
          </div>
        </div>
      </HashRouter>

    );
  }
}

export default App;
