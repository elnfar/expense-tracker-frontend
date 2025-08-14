import React, { forwardRef, type InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

/**
 * Props for the Input component
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

  /**
   * The size of the input
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Whether the input is in an error state
   * @default false
   */
  error?: boolean

  /**
   * Helper text to display below the input
   */
  helperText?: string

  /**
   * Whether the input should take full width
   * @default false
   */
  fullWidth?: boolean

  /**
   * Start icon to display in the input
   */
  startIcon?: React.ReactNode

  /**
   * End icon to display in the input
   */
  endIcon?: React.ReactNode

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string
}

/**
 * Input component for text input with validation and style support
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter your name" />
 *
 * // Input with error state
 * <Input error helperText="This field is required" />
 *
 * // Input with icons
 * <Input
 *   startIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size = 'medium',
      error = false,
      helperText,
      fullWidth = false,
      startIcon,
      endIcon,
      className,
      disabled,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    // Generate unique ID for accessibility if not provided
    const inputId =
      props.id || `input-${Math.random().toString(36).substr(2, 9)}`
    const helperTextId = helperText ? `${inputId}-helper` : undefined

    // Build CSS classes
    const containerClasses = [
      styles.inputContainer,
      styles[`inputContainer--${size}`],
      error && styles['inputContainer--error'],
      disabled && styles['inputContainer--disabled'],
      fullWidth && styles['inputContainer--full-width'],
      startIcon && styles['inputContainer--with-start-icon'],
      endIcon && styles['inputContainer--with-end-icon'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const inputClasses = [
      styles.input,
      styles[`input--${size}`],
      error && styles['input--error'],
      disabled && styles['input--disabled'],
      startIcon && styles['input--with-start-icon'],
      endIcon && styles['input--with-end-icon'],
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={styles.inputWrapper}>
        <div className={containerClasses}>
          {startIcon && (
            <span className={styles.startIcon} aria-hidden="true">
              {startIcon}
            </span>
          )}

          <input
            {...props}
            ref={ref}
            id={inputId}
            type={type}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={helperTextId}
            data-testid={testId}
          />

          {endIcon && (
            <span className={styles.endIcon} aria-hidden="true">
              {endIcon}
            </span>
          )}
        </div>

        {helperText && (
          <div
            id={helperTextId}
            className={`${styles.helperText} ${error ? styles['helperText--error'] : ''}`}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
