import React from 'react'

function Button({
    children,
    type='button',
    disabled = false,
    bgColor="bg-blue-600",
    textColor="text-white",
    className="",
    ...props
}) {
  const computedClass = `px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`

  return (
    <button
    type={type}
    className={computedClass}
    disabled={disabled}
    {...props}
>
    {children}
</button>
  )
}

export default Button