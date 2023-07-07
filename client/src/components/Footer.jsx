import React from 'react'
import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top-list">
          <img
            className="phone-icon"
            src="https://renorun.ca/assets/footer/chat.svg?c=3407e56c9059e666561884cf7e181579"
            alt=""
          />
          <div className="footer-top-list-text">Chat With Us1</div>
        </div>
      </div>
      <div className="footer-main"></div>
      <div className="footer-bottom">
        <p>© 2022 Construction Market</p>
      </div>
    </footer>
  )
}

export default Footer
