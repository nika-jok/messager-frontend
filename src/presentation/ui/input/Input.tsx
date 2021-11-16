import './index.css'

interface Props {
  className?: string
  onChange?(e?: React.FormEvent<HTMLInputElement>): void
  onKeyDown?(e?: React.FormEvent<HTMLInputElement>): void
  type?: string
  placeholder?: string
  value?: string | number
  isSmallInput?: boolean
  defaultValue?: string
  style?: any
  disabled?: boolean
  autoFocus?: boolean
}

const Input = (props: Props): JSX.Element => {
  const {
    className,
    onChange,
    type,
    placeholder,
    value,
    isSmallInput,
    defaultValue,
    style,
    disabled,
    onKeyDown,
    autoFocus,
  } = props
  return (
    <input
      value={value}
      type={type}
      autoFocus={autoFocus}
      className={`input ${className}`}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onKeyDown={onKeyDown}
      disabled={disabled}
      style={{
        width: isSmallInput ? '213px' : '333px',
        ...style,
      }}
    />
  )
}

export default Input
