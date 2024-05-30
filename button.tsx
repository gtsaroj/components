import { useEffect, useState } from 'react'
import Loader from '../loader/loader.component'
const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  error: '#dc3545',
  default: '#f8f9fa',
  warning: '#ffc107',
  info: '#17a2b8',
}

const getVariantClass = (
  variant: Button.VariantType,
  color: Button.ColorType,
) => {
  switch (variant) {
    case 'text':
      return {
        backgroundColor: 'transparent',
        color: `${color === 'default' ? '#000' : colors[color]}`,

        border: 'none',
      }
    case 'contained':
      return {
        backgroundColor: colors[color],
        border: 'none',
        color: `${color === 'default' ? '#000' : '#fff'}`,
      }
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        color: `${color === 'default' ? '#000' : colors[color]}`,
        border: `1px solid ${color === 'default' ? '#000' : colors[color]}`,
      }
    default:
      return ''
  }
}

const Button = ({
  title,
  style,
  children,
  textStyle,
  color = 'default',
  variant = 'text',
  leftIcon,
  rightIcon,
  onClick,
  loading,
  disabled,
}: {
  title?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  textStyle?: React.CSSProperties
  color?: Button.ColorType
  variant?: Button.VariantType
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  loading?: boolean
  disabled?: boolean
}) => {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      className={`btn-container`}
      style={{
        ...style,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: `${colors[color]}`,
        ...getVariantClass(variant, color),
      }}
      onClick={handleOnClick}
      disabled={disabled}
    >
      <div className="btn-content-container">
        {loading ? (
          <div className="btn-loader">
            <Loader
              size={10}
              color={
                color === 'default'
                  ? '#000'
                  : variant === 'contained'
                  ? '#fff'
                  : colors[color]
              }
              variant="three"
              loading={loading}
              background={{ backgroundColor: 'transparent' }}
            />
          </div>
        ) : (
          <div className="btn-content" style={textStyle}>
            {leftIcon && <div className="left-icon">{leftIcon}</div>}
            {title && <p className="btn-text">{title}</p>}
            {children && <div className="btn-children">{children}</div>}
            {rightIcon && <div className="right-icon">{rightIcon}</div>}
          </div>
        )}
      </div>
    </button>
  )
}

const RippleButton = ({
  title,
  style,
  children,
  textStyle,
  color = 'default',
  variant = 'text',
  leftIcon,
  rightIcon,
  rippleColor = '#fff',
  onClick,
  loading,
  disabled,
}: {
  title?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  textStyle?: React.CSSProperties
  color?: Button.ColorType
  variant?: Button.VariantType
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  rippleColor?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  loading?: boolean
  disabled?: boolean
}) => {
  const [rippleArray, setRippleArray] = useState<
    { x: number; y: number; size: number }[]
  >([])

  useEffect(() => {
    if (rippleArray.length > 0) {
      const timer = setTimeout(() => {
        setRippleArray([])
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [rippleArray])

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = button.offsetWidth
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = {
      x,
      y,
      size,
    }

    setRippleArray([...rippleArray, newRipple])

    if (onClick) {
      onClick(event)
    }
  }

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    createRipple(e)
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      className={`btn-container ripple-button`}
      style={{
        ...style,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: `${colors[color]}`,
        ...getVariantClass(variant, color),
      }}
      onClick={handleOnClick}
      disabled={disabled}
    >
      <div className="btn-content-container">
        {loading ? (
          <div className="btn-loader">
            <Loader
              size={10}
              color={
                color === 'default'
                  ? '#000'
                  : variant === 'contained'
                  ? '#fff'
                  : colors[color]
              }
              variant="three"
              loading={loading}
              background={{ backgroundColor: 'transparent' }}
            />
          </div>
        ) : (
          <div className="btn-content" style={textStyle}>
            {leftIcon && <div className="left-icon">{leftIcon}</div>}
            {title && <p className="btn-text">{title}</p>}
            {children && <div className="btn-children">{children}</div>}
            {rightIcon && <div className="right-icon">{rightIcon}</div>}
          </div>
        )}

        <div className="ripple-container">
          {rippleArray.map((ripple, index) => (
            <span
              key={index}
              className="ripple"
              style={{
                backgroundColor: rippleColor,
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </div>
      </div>
    </button>
  )
}
export { Button, RippleButton }
