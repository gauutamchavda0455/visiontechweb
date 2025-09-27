import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// Try to load a logo from src/images/logo.png (or .jpg/.svg) if present
const logoMap = import.meta.glob('../images/logo.*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const logoUrl = Object.values(logoMap)[0]

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!servicesOpen) return
      const target = e.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) {
        setServicesOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [servicesOpen])

  const toggleServices = () => setServicesOpen((v) => !v)
  const toggleMobile = () => setMobileOpen((v) => !v)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header className={"site-header" + (mobileOpen ? ' menu-open' : '')}>
      <div className="brand">
        <a href="/" aria-label="Homepage">
          {logoUrl ? (
            <img className="brand-logo" src={logoUrl} alt="Logo" />
          ) : (
            'Visiontech'
          )}
        </a>
      </div>
      <button
        type="button"
        className="menu-toggle"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        aria-controls="primary-nav"
        onClick={toggleMobile}
      >
        {/* three stacked dots icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
      <nav id="primary-nav" className="nav" onClick={closeMobile}>
        <NavLink to="/">Home</NavLink>
        <div className={"menu menu-services" + (servicesOpen ? ' open' : '')} ref={menuRef}>
          <button
            type="button"
            className="menu-link"
            aria-haspopup="menu"
            aria-expanded={servicesOpen}
            aria-controls="services-dropdown"
            onClick={toggleServices}
          >
            Services
          </button>
          <div id="services-dropdown" className="dropdown" role="menu">
            <Link to="/services#sec-dpe" role="menuitem" onClick={() => setServicesOpen(false)}>Digital Product Engineering</Link>
            <Link to="/services#sec-tech" role="menuitem" onClick={() => setServicesOpen(false)}>Technology Solutions</Link>
            <Link to="/services#sec-ai" role="menuitem" onClick={() => setServicesOpen(false)}>Artificial Intelligence</Link>
            <Link to="/services#sec-dx" role="menuitem" onClick={() => setServicesOpen(false)}>Digital Transformation</Link>
            <Link to="/services#sec-support" role="menuitem" onClick={() => setServicesOpen(false)}>Support Services</Link>
          </div>
        </div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/careers">Careers</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}
