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
... (430 lines left)
