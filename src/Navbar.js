import React from 'react';
import {NavLink} from 'react-router-dom';

export default class Navbar extends React.Component {
    render() {
        return (
        <nav className="navbar is-danger">
            <div id="navMenuTransparentExample" className="navbar-menu">
              <div className="navbar-start">
                <NavLink  className='navbar-item' to='/app1'>
                    <h2>Expo 1</h2>
                </NavLink>
                <NavLink  className='navbar-item' to='/app2'>
                    <h2>Expo 2</h2>
                </NavLink>
              </div>
            </div>
        </nav>
        )
    }
}
