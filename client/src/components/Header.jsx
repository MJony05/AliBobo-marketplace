import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/xixi.png'
import './header.css'
function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-logo">
            <Link to="/">
              <div>
                <img className="header-logo" src={logo} alt="" width="300px" />
              </div>
            </Link>
          </div>
          <div className="search-bar">
            <form action="" className="search-input">
              <input
                type="text"
                name="nimadir"
                placeholder="Mahsulot qidirish"
              />
              <button
                type="submit"
                role="presentation"
                className="search-input__button"
              >
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.875 12.4554L17.875 16.4602C18.0536 16.6589 18.0448 16.9631 17.855 17.1511L17.155 17.8519C17.0611 17.9467 16.9333 18 16.8 18C16.6667 18 16.5389 17.9467 16.445 17.8519L12.445 13.8471C12.3344 13.7362 12.234 13.6156 12.145 13.4867L11.395 12.4855C10.1541 13.4776 8.61304 14.0178 7.025 14.0173C3.75261 14.0287 0.909021 11.7686 0.177728 8.5751C-0.553566 5.38161 1.0226 2.10699 3.9731 0.689914C6.92359 -0.727158 10.461 0.0915127 12.491 2.66125C14.521 5.23099 14.5019 8.86596 12.445 11.4142L13.445 12.105C13.6012 12.2051 13.7454 12.3226 13.875 12.4554ZM2.025 7.00887C2.025 9.77362 4.26357 12.0149 7.025 12.0149C8.35108 12.0149 9.62285 11.4875 10.5605 10.5487C11.4982 9.60985 12.025 8.33655 12.025 7.00887C12.025 4.24411 9.78642 2.00284 7.025 2.00284C4.26357 2.00284 2.025 4.24411 2.025 7.00887Z"
                    fill="#20374F"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
          <Link to="cart" className="cart-box link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="slightly transparent"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 6.5C9 4.88779 10.2402 3.5 12 3.5C13.7598 3.5 15 4.88779 15 6.5V7.5H9V6.5ZM7.5 9V11.5H9V9H15V11.5H16.5V9H18.5V19.75C18.5 20.1642 18.1642 20.5 17.75 20.5H6.25C5.83579 20.5 5.5 20.1642 5.5 19.75V9H7.5ZM7.5 7.5V6.5C7.5 4.11221 9.35984 2 12 2C14.6402 2 16.5 4.11221 16.5 6.5V7.5H19.25H20V8.25V19.75C20 20.9926 18.9926 22 17.75 22H6.25C5.00736 22 4 20.9926 4 19.75V8.25V7.5H4.75H7.5Z"
                fill="#141415"
              ></path>
            </svg>

            <span className="cart-text" style={{ textDecoration: 'none' }}>
              Savat
            </span>
          </Link>
        </div>
      </div>
      <nav className="navbar">
        <div className="container">
          <Link className="navbar_link" to="/">
            Bosh Sahifa
          </Link>
          <Link className="navbar_link" to="/categories">
            Kategoriyalar
          </Link>
          <Link className="navbar_link" to="/about">
            Biz haqimizda
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
