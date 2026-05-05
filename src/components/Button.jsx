import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-purple-500/30 transition-all font-semibold',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button
