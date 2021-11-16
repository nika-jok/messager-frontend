import './index.css'
import { useEffect, useRef, useState, useCallback } from 'react'

interface Props {
  className?: string
  onChange?(e?: React.FormEvent<HTMLTextAreaElement>): void
  onKeyPress?(e: React.FormEvent<HTMLTextAreaElement>): void
  onKeyDown?(e: any): void
  placeholder?: string
  value?: string | number
  defaultValue?: string
  style?: any
  size?: string
  autofocus?: boolean
  textareaRef?: any
  shouldAutoFocus?: boolean
}

const Textarea = (props: Props): JSX.Element => {
  const {
    className,
    onChange,
    placeholder,
    value,
    defaultValue,
    style,
    size,
    onKeyPress,
    autofocus,
    onKeyDown,
    shouldAutoFocus,
  } = props

  const textareaRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const focusElem = () => {
    return textareaRef.current.focus()
  }

  const blurElem = () => {
    return textareaRef.current.blur()
  }

  const resizeHandler = useCallback(() => {
    if (document.body.clientWidth <= 1008) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  useEffect(() => {
    if (document.body.clientWidth <= 1008) {
      setIsMobile(true)

      if (!isMobile) {
        focusElem()
      } else {
        blurElem()
      }
    }

    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [shouldAutoFocus, isMobile])

  return (
    <textarea
      value={value}
      autoFocus={autofocus}
      className={`${className} textarea`}
      onChange={onChange}
      ref={textareaRef}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onKeyPress={onKeyPress}
      style={{
        width: '100%',
        ...style,
      }}
    />
  )
}

export default Textarea
