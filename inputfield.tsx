import React, { useEffect, useState } from 'react'
import { FaBackspace, FaSearch } from 'react-icons/fa'
import Loader from '../loader/loader.component'

const baseColors: Record<string, string> = {
  default: '#000000',
  primary: '#007bff',
  secondary: '#6c757d',
  info: '#17a2b8',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
}

const getInputColor = (option: InputField.ColorOption) => {
  if (option.endsWith('Fill')) {
    const baseOption = option.slice(0, -4) as keyof typeof baseColors
    return {
      backgroundColor: baseColors[baseOption],
      border: `1px solid ${baseColors[baseOption]}`,
    }
  } else {
    return {
      border: `1px solid ${baseColors[option]}`,
    }
  }
}

const InputField: React.FC<InputField.InputFieldProps> = ({
  name,
  style,
  label,
  value,
  inputStyle,
  placeholder,
  defaultValue,
  type = 'text',
  className,
  loaderStyle,
  labelStyle,
  color = 'default',
  onChange,
  leftAdorn,
  rightAdorn,
  leftStyle,
  rightStyle,
  inputCount,
  loading,
  disabled,
  required,
  borderless,
  max,
  min = 0,
  clear,
}: {
  name: string
  style?: React.CSSProperties
  label?: string
  value?: string
  inputStyle?: React.CSSProperties
  defaultValue?: string
  placeholder?: string
  type?: InputField.InputTye
  className?: string
  loaderStyle?: React.CSSProperties
  labelStyle?: React.CSSProperties
  color?: InputField.ColorOption
  onChange: React.FormEventHandler<HTMLInputElement>
  leftAdorn?: React.ReactNode
  rightAdorn?: React.ReactNode
  leftStyle?: React.CSSProperties
  rightStyle?: React.CSSProperties
  inputCount?: boolean
  clear?: () => void
  loading?: boolean
  disabled?: boolean
  required?: boolean
  borderless?: boolean
  max?: string | number
  min?: string | number
}) => {
  const [data, setData] = useState<string>('')
  const [inputLength, setInputLength] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
    if (onChange) onChange(e)
    setInputLength(data.length + 1)
  }
  useEffect(() => {
    const length = value?.length || 0
    setInputLength(length)

    setData(value || '')
  }, [value])

  const { border: borderValue, backgroundColor: backgroundColorValue } =
    getInputColor(color)

  return (
    <>
      <div
        className={`input-container `}
        style={{
          ...style,
          cursor: disabled || loading ? 'not-allowed' : 'auto',
        }}
      >
        {label && (
          <label className="input-label" htmlFor={name} style={labelStyle}>
            {label}
            {required && <div className="required">*</div>}
            {inputCount && (
              <div className="input-count">{inputLength + '/' + max}</div>
            )}
          </label>
        )}
        <div
          className={`input-element`}
          style={{
            border: borderless
              ? 'none'
              : color && borderValue
              ? `${borderValue}`
              : '1px solid black',
            color: `${(loading || disabled) && '#f2f2f2'} `,
          }}
        >
          {leftAdorn && (
            <div className="left-adorn adorn" style={leftStyle}>
              {leftAdorn}
            </div>
          )}
          <input
            className={`input-field ${className ? className : ' '}`}
            id={name}
            type={type}
            value={data}
            placeholder={placeholder}
            max={max}
            min={min}
            defaultValue={defaultValue}
            onChange={handleChange}
            required={required}
            disabled={loading || disabled}
            minLength={+min}
            maxLength={Number(max)}
            style={{
              border: 'none',
              backgroundColor: color
                ? backgroundColorValue
                  ? backgroundColorValue
                  : '#fff'
                : '',
              color: color && backgroundColorValue ? '#fff' : '#000',
              cursor: disabled || loading ? 'not-allowed' : 'auto',
              ...inputStyle,
            }}
          />
          {rightAdorn && (
            <div className="right-adorn adorn" style={rightStyle}>
              {rightAdorn}
            </div>
          )}
          {clear && (
            <button
              disabled={loading || disabled}
              className="clear-button"
              onClick={clear}
            >
              <FaBackspace />
            </button>
          )}
          {loading && (
            <div className="loader">
              <Loader
                size={10}
                color={loaderStyle?.color ? loaderStyle.color : 'red'}
                variant="three"
                loading={loading}
                style={loaderStyle}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default InputField

const TextArea: React.FC<InputField.TextArea> = ({
  name,
  style,
  label,
  value,
  placeholder,
  defaultValue,
  rows,
  cols,
  className,
  loaderStyle,
  labelStyle,
  color = 'default',
  onChange,
  leftAdorn,
  rightAdorn,
  leftStyle,
  rightStyle,
  inputCount,
  loading,
  disabled,
  required,
  borderless,
  maxLength,
  minLength,
  inputStyle,
  clear,
}: {
  name: string
  style?: React.CSSProperties
  label?: string
  value?: string
  rows?: number
  cols?: number
  defaultValue?: string
  placeholder?: string
  className?: string
  loaderStyle?: React.CSSProperties
  labelStyle?: React.CSSProperties
  color?: InputField.ColorOption
  onChange: React.FormEventHandler<HTMLTextAreaElement>
  leftAdorn?: React.ReactNode
  rightAdorn?: React.ReactNode
  leftStyle?: React.CSSProperties
  rightStyle?: React.CSSProperties
  inputCount?: boolean
  inputStyle?: React.CSSProperties
  clear?: () => void
  loading?: boolean
  disabled?: boolean
  required?: boolean
  borderless?: boolean
  maxLength?: number
  minLength?: number
}) => {
  const [data, setData] = useState<string>('')
  const [inputLength, setInputLength] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value)
    if (onChange) onChange(e)
    setInputLength(data.length + 1)
  }
  useEffect(() => {
    const length = value?.length || 0
    setInputLength(length)

    setData(value || '')
  }, [value])

  const { border: borderValue, backgroundColor: backgroundColorValue } =
    getInputColor(color)
  return (
    <>
      <div
        className={`input-container `}
        style={{
          ...style,
          cursor: disabled || loading ? 'not-allowed' : 'auto',
        }}
      >
        {label && (
          <label className="input-label" htmlFor={name} style={labelStyle}>
            {label}
            {required && <div className="required">*</div>}
            {inputCount && (
              <div className="input-count">{inputLength + '/' + maxLength}</div>
            )}
          </label>
        )}
        <div
          className={`input-element`}
          style={{
            border: borderless
              ? 'none'
              : color && borderValue
              ? `${borderValue}`
              : '1px solid black',
            color: `${(loading || disabled) && '#f2f2f2'} `,
          }}
        >
          {leftAdorn && (
            <div className="left-adorn adorn" style={leftStyle}>
              {leftAdorn}
            </div>
          )}
          <textarea
            className={`input-field ${className ? className : ' '}`}
            id={name}
            value={data}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            minLength={minLength}
            maxLength={maxLength}
            rows={rows}
            cols={cols}
            style={{
              border: 'none',
              backgroundColor: color
                ? backgroundColorValue
                  ? backgroundColorValue
                  : '#fff'
                : '',
              color: color && backgroundColorValue ? '#fff' : '#000',
              cursor: disabled || loading ? 'not-allowed' : 'auto',
              ...inputStyle,
            }}
          />
          {rightAdorn && (
            <div className="right-adorn adorn" style={rightStyle}>
              {rightAdorn}
            </div>
          )}
          {clear && (
            <button
              disabled={loading || disabled}
              className="clear-button"
              onClick={clear}
            >
              <FaBackspace />
            </button>
          )}
          {loading && (
            <div className="loader">
              <Loader
                size={10}
                color={loaderStyle?.color ? loaderStyle.color : 'red'}
                variant="three"
                loading={loading}
                style={loaderStyle}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const SearchField: React.FC<InputField.Search> = ({
  name = 'search',
  style,
  label,
  value = 'Search',
  placeholder = 'Search Here',
  defaultValue,
  type = 'text',
  className,
  loaderStyle,
  labelStyle,
  color = 'default',
  onChange,
  leftAdorn,
  rightAdorn,
  leftStyle,
  rightStyle,
  inputCount,
  loading,
  disabled,
  required,
  borderless,
  max,
  min = 0,
  inputStyle,
  clear,
  searchFn,
}: {
  name: string
  style?: React.CSSProperties
  label?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  type?: InputField.InputTye
  className?: string
  loaderStyle?: React.CSSProperties
  labelStyle?: React.CSSProperties
  color?: InputField.ColorOption
  onChange: React.FormEventHandler<HTMLInputElement>
  leftAdorn?: React.ReactNode
  rightAdorn?: React.ReactNode
  leftStyle?: React.CSSProperties
  rightStyle?: React.CSSProperties
  inputCount?: boolean
  clear?: () => void
  loading?: boolean
  disabled?: boolean
  required?: boolean
  borderless?: boolean
  inputStyle?: React.CSSProperties
  max?: string | number
  min?: string | number
  searchFn?: () => void
}) => {
  const [data, setData] = useState<string>('')
  const [inputLength, setInputLength] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
    if (onChange) onChange(e)
    setInputLength(data.length + 1)
  }
  useEffect(() => {
    const length = value?.length || 0
    setInputLength(length)

    setData(value || '')
  }, [value])

  const { border: borderValue, backgroundColor: backgroundColorValue } =
    getInputColor(color)
  return (
    <>
      <div
        className={`input-container `}
        style={{
          ...style,
          cursor: disabled || loading ? 'not-allowed' : 'auto',
        }}
      >
        {label && (
          <label className="input-label" htmlFor={name} style={labelStyle}>
            {label}
            {required && <div className="required">*</div>}
            {inputCount && (
              <div className="input-count">{inputLength + '/' + max}</div>
            )}
          </label>
        )}
        <div
          className={`input-element`}
          style={{
            border: borderless
              ? 'none'
              : color && borderValue
              ? `${borderValue}`
              : '1px solid black',
            color: `${(loading || disabled) && '#f2f2f2'} `,
          }}
        >
          {leftAdorn ? (
            <div
              className="left-adorn adorn"
              style={leftStyle}
              onClick={searchFn}
            >
              {leftAdorn}
            </div>
          ) : (
            <div
              className=" left-adorn adorn search-icon"
              style={leftStyle}
              onClick={searchFn}
            >
              <FaSearch />
            </div>
          )}
          <input
            className={`input-field ${className ? className : ' '}`}
            id={name}
            type={type}
            value={data}
            placeholder={placeholder}
            max={max}
            min={min}
            defaultValue={defaultValue}
            onChange={handleChange}
            required={required}
            disabled={loading || disabled}
            minLength={+min}
            maxLength={Number(max)}
            style={{
              border: 'none',
              backgroundColor: color
                ? backgroundColorValue
                  ? backgroundColorValue
                  : '#fff'
                : '',
              color: color && backgroundColorValue ? '#fff' : '#000',
              cursor: disabled || loading ? 'not-allowed' : 'auto',
              ...inputStyle,
            }}
          />
          {rightAdorn && (
            <div className="right-adorn adorn" style={rightStyle}>
              {rightAdorn}
            </div>
          )}
          {clear && (
            <button
              disabled={loading || disabled}
              className="clear-button"
              onClick={clear}
            >
              <FaBackspace />
            </button>
          )}
          {loading && (
            <div className="loader">
              <Loader
                size={10}
                color={loaderStyle?.color ? loaderStyle.color : 'red'}
                variant="three"
                loading={loading}
                style={loaderStyle}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export { TextArea, SearchField }
