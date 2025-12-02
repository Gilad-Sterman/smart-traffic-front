import { Link, useLocation } from 'react-router-dom'

export function Header() {
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'ניתוח דוח' },
        { path: '/dashboard', label: 'דשבורד', mvp: true },
        { path: '/analytics', label: 'אנליטיקה', mvp: true },
        { path: '/settings', label: 'הגדרות', mvp: true }
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
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''} ${item.mvp ? 'mvp-only' : ''}`}
                                title={item.mvp ? 'זמין ב-MVP' : ''}
                            >
                                {item.label}
                                {item.mvp && <span className="mvp-badge">MVP</span>}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}
