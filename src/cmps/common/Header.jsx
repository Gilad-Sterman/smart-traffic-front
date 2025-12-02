import { Link, useLocation } from 'react-router-dom'

export function Header() {
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/analytics', label: 'Analytics' },
        { path: '/settings', label: 'Settings' }
    ]

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <h2>Smart Traffic</h2>
                    </Link>
                    
                    <nav className="nav">
                        {navItems.map(item => (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}
