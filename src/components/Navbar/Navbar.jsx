import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo_light from '../../assets/logo_light.svg'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleNavbar = () => setIsOpen(!isOpen)

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo_light} alt="logo" className="logo" />
      </Link>

      {/* Desktop Nav */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ai-governance/rules">AI & Digital Governance</Link></li>
        <li><Link to="/cybersecurity/rules">Cybersecurity & Hybrid Warfare</Link></li>
        <li><Link to="/digital-democracy/rules">Digital Democracy</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {/* Burger Icon */}
      <div className="burger-icon">
        <button onClick={toggleNavbar}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
      </div>

      {/* Full-Screen Mobile Menu */}
     {isOpen && (
  <div className="mobile-menu">
    <button className="close-button" onClick={toggleNavbar}>
      <X size={28} />
    </button>
          <li onClick={toggleNavbar}><Link to="/">Home</Link></li>
          <li onClick={toggleNavbar}><Link to="/ai-governance/rules">AI & Digital Governance</Link></li>
          <li onClick={toggleNavbar}><Link to="/cybersecurity/rules">Cybersecurity & Hybrid Warfare</Link></li>
          <li onClick={toggleNavbar}><Link to="/digital-democracy/rules">Digital Democracy</Link></li>
          <li onClick={toggleNavbar}><Link to="/about">About</Link></li>
        </div>
      )}
    </div>
  )
}

export default Navbar