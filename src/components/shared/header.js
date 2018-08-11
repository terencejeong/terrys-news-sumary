import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to='/'> Home </Link>
        <Link to='/bleacher-report'>Bleacher Report</Link>
        <Link to='/nat-geo'>National Geographic</Link>
      </div>
    )
  }
}

export default Header;