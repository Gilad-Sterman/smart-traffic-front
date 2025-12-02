export function Button({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false, 
    onClick, 
    type = 'button',
    className = '',
    ...props 
}) {
    const baseClass = 'btn'
    const variantClass = `btn-${variant}`
    const sizeClass = `btn-${size}`
    const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
