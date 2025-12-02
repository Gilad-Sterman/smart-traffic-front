export function LoadingSpinner({ size = 'medium', className = '' }) {
    const sizeClass = `spinner-${size}`
    
    return (
        <div className={`loading-spinner ${sizeClass} ${className}`}>
            <div className="spinner"></div>
        </div>
    )
}
