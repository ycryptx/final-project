import React, { Component } from 'react';
import './Nav.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import SearchForm from './SearchForm';
import Report from './Report';
import About from './About';


class Nav extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <span className="menu_toggle">
            <i className="menu_open fa fa-bars fa-lg"></i>
            <i className="menu_close fa fa-times fa-lg"></i>
          </span>
            <ul className="menu_items">
                  <li><NavLink to='/'>home</NavLink><i className="icon fa fa-signal fa-2x"></i></li>
                  <li><NavLink to='/about'>about</NavLink><i className="icon fa fa-coffee fa-2x"></i></li>
                  <li><NavLink to='/report'>report</NavLink><i className="icon fa fa-heart fa-2x"></i></li>
            </ul>
            <Route exact path="/" component={SearchForm}/>
            <Route path="/about" component={About}/>
            <Route path="/report" component={Report}/>
            <main className="content">
              <div className="content_inner">
              </div>
            </main>
          </div>
      </HashRouter>
    );
  }
}

export default Nav;
