import { NavLink } from 'react-router-dom'

// Try to load a logo from src/images/logo.png (or .jpg/.svg) if present
const logoMap = import.meta.glob('../images/logo.*', { eager: true, as: 'url' }) as Record<string, string>
const logoUrl = Object.values(logoMap)[0]

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <a href="/" aria-label="Homepage">
          {logoUrl ? (
            <img className="brand-logo" src={logoUrl} alt="Logo" />
          ) : (
            'Visiontech'
          )}
        </a>
      </div>
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <div className="menu menu-services">
          <NavLink to="/services" className="menu-link">Services</NavLink>
          <div className="dropdown" role="menu">
            <a href="/services#sec-dpe" role="menuitem">Digital Product Engineering</a>
            <a href="/services#sec-tech" role="menuitem">Technology Solutions</a>
            <a href="/services#sec-ai" role="menuitem">Artificial Intelligence</a>
            <a href="/services#sec-dx" role="menuitem">Digital Transformation</a>
            <a href="/services#sec-support" role="menuitem">Support Services</a>
          </div>
        </div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/careers">Careers</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}
