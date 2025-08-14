import React, { forwardRef, useId } from 'react'
import styles from './DatePicker.module.css'

/**
 * Props for the DatePicker component
 */
export interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'size'
  > {
  /**
   * The selected date value (ISO date string: YYYY-MM-DD)
   */
  value?: string

  /**
   * Callback fired when the date changes
   * @param date - The selected date in ISO format (YYYY-MM-DD) or empty string
   */
  onChange?: (date: string) => void

  /**
   * Whether the date picker is in an error state
   * @default false
   */
  error?: boolean

  /**
   * Helper text to display below the date picker
   */
  helperText?: string

  /**
   * Whether the date picker should take the full width of its container
   * @default false
   */
  fullWidth?: boolean

  /**
   * The size variant of the date picker
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Minimum selectable date (ISO date string: YYYY-MM-DD)
   */
  min?: string

  /**
   * Maximum selectable date (ISO date string: YYYY-MM-DD)
   */
  max?: string
}

/**
 * DatePicker component for selecting dates
 *
 * @example
 * ```tsx
 * // Basic date picker
 * <DatePicker />
 *
 * // Controlled date picker
 * <DatePicker value={selectedDate} onChange={setSelectedDate} />
 *
 * // With validation
 * <DatePicker
 *   value={date}
 *   onChange={handleChange}
 *   error={hasError}
 *   helperText="Please select a valid date"
 * />
 *
 * // With constraints
 * <DatePicker
 *   min="2024-01-01"
 *   max="2024-12-31"
 *   placeholder="Select date in 2024"
 * />
 * ```
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      error = false,
      helperText,
      fullWidth = false,
      size = 'medium',
      disabled = false,
      className,
      id,
      min,
      max,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const helperTextId = helperText ? `${inputId}-helper-text` : undefined

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      onChange?.(newValue)
    }

    // Build CSS classes
    const containerClasses = [
      styles.datePickerContainer,
      styles[`datePickerContainer--${size}`],
      error && styles['datePickerContainer--error'],
      disabled && styles['datePickerContainer--disabled'],
      fullWidth && styles['datePickerContainer--fullWidth'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const inputClasses = [
      styles.datePicker,
      styles[`datePicker--${size}`],
      error && styles['datePicker--error'],
      disabled && styles['datePicker--disabled'],
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={containerClasses}>
        <input
          ref={ref}
          type="date"
          id={inputId}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={helperTextId}
          min={min}
          max={max}
          {...props}
        />
        {helperText && (
          <div
            id={helperTextId}
            className={`${styles.helperText} ${
              error ? styles['helperText--error'] : ''
            }`}
          >
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
