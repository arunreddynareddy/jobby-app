import {Link, withRouter} from 'react-router-dom'
import {TiHome} from 'react-icons/ti'
import {MdLocalPostOffice} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-card">
        <Link to="/" className="header-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-image"
          />
        </Link>
        <ul className="mobile-header-list-container">
          <Link to="/" className="header-link">
            <li className="mobile-icon">
              <TiHome className="header-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="header-link">
            <li className="mobile-icon">
              <MdLocalPostOffice className="header-icon" />
            </li>
          </Link>

          <button
            type="button"
            className="mobile-header-button"
            onClick={onClickLogout}
          >
            <li className="mobile-icon">
              <FiLogOut className="header-icon" />a
            </li>
          </button>
        </ul>
        <ul className="desktop-header-list-container">
          <Link to="/" className="header-link">
            <li className="header-item">Home</li>
          </Link>
          <Link to="/jobs" className="header-link">
            <li className="header-item">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="desktop-header-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
