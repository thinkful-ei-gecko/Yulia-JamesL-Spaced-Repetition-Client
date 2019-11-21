import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

class Header extends Component {
  state = {
    isOpen: false
  }
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderLogoutLink() {
    return (
      <div>
        <nav  className={this.state.isOpen ? "user-links open-links"  : "user-links"}>
          <span className="show-username">
            {this.context.user.name}
          </span>
          <div className="separator"></div>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
        <FontAwesomeIcon 
          icon={this.state.isOpen ? faTimes : faBars} size="2x" 
          className="bars"
          onClick={() => this.toggleMenu()}
          >
        </FontAwesomeIcon>
      </div>  
    )
  }

  renderLoginLink() {
    return (
      <div>
        <nav className={this.state.isOpen ? "user-links open-links"  : "user-links"}>
          <Link to='/login'>Login</Link>
          <div className="separator"></div>
          <Link to='/register'>Sign up</Link>
        </nav>
        <FontAwesomeIcon 
          icon={this.state.isOpen ? faTimes : faBars} size="2x" 
          className="bars"
          onClick={() => this.toggleMenu()}
          >
        </FontAwesomeIcon>
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
