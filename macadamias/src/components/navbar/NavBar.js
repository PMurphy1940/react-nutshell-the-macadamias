import React from 'react';
import {  NavLink, withRouter  } from "react-router-dom";


const NavBar = () =>{


    return (
        <>
        <nav>
        <ul className="container">
          <li>
            <NavLink className="nav-link" activeClassName="selected" exact to="/events">
              Events
            </NavLink>
          </li>
          </ul>
        </nav>
        </>
    )
}

export default withRouter(NavBar);