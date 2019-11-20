import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  showMenu = () => {
    let x = document.getElementById('user-links');
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  renderLogoutLink() {
    return (
      <div>
        <nav id="user-links">
          <span className="show-username">
            {this.context.user.name}
          </span>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
        <a href="javascript:void(0);">
            <FontAwesomeIcon 
              icon={faBars} size="2x" 
              className="bars"
              onClick={this.showMenu}>
            </FontAwesomeIcon></a>
      </div>  
    )
  }

  renderLoginLink() {
    return (
      <div>
        <nav id="user-links">
          <Link to='/login'>Login</Link>
          {' '}
          <Link to='/register'>Sign up</Link>
        </nav>
        <a href="javascript:void(0);"><FontAwesomeIcon 
          icon={faBars} size="2x" className="bars"
          onClick={this.showMenu}>
          </FontAwesomeIcon></a>
      </div>
    )
  }

  render() {
    return (
      <header className='app-header'>
        <h1>
          <Link to='/' className='title'>
            Ricorda
          </Link>
          <span className='title-postfix'>Spaced repetition</span>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
