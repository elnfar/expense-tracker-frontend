import { forwardRef, type LabelHTMLAttributes } from 'react'
import styles from './InputLabel.module.css'

/**
 * InputLabel component for labeling form inputs across the application
 *
 * @component
 * @example
 * // Basic usage
 * <InputLabel>Name</InputLabel>
 *
 * @example
 * // With htmlFor attribute for accessibility
 * <InputLabel htmlFor="name-input">Full Name</InputLabel>
 *
 * @example
 * // Required field indicator
 * <InputLabel htmlFor="email" required>Email Address</InputLabel>
 *
 * @example
 * // Different sizes
 * <InputLabel size="small">Small Label</InputLabel>
 * <InputLabel size="large">Large Label</InputLabel>
 *
 * @example
 * // With custom styling
 * <InputLabel className="custom-label" style={{ color: 'blue' }}>
 *   Custom Label
 * </InputLabel>
 */

export interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Size variant of the label
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Whether the field is required (shows asterisk)
   * @default false
   */
  required?: boolean

  /**
   * Whether the label should be disabled (grayed out)
   * @default false
   */
  disabled?: boolean

  /**
   * The ID of the form element this label is for
   */
  htmlFor?: string

  /**
   * Label content
   */
  children?: React.ReactNode

  /**
   * Additional CSS class names
   */
  className?: string

  /**
   * Inline styles
   */
  style?: React.CSSProperties

  /**
   * Test ID for testing purposes
   */
  testId?: string

  /**
   * Accessible description for screen readers
   */
  ariaLabel?: string

  /**
   * Describes the element that this label is describing
   */
  ariaDescribedBy?: string
}

/**
 * Accessible InputLabel component for form fields
 */
export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  (
    {
      size = 'medium',
      required = false,
      disabled = false,
      htmlFor,
      children,
      className = '',
      style,
      testId,
      ariaLabel,
      ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const labelClasses = [
      styles.inputLabel,
      styles[`inputLabel--${size}`],
      required && styles['inputLabel--required'],
      disabled && styles['inputLabel--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={labelClasses}
        style={style}
        data-testid={testId}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        <span className={styles.labelText}>{children}</span>

        {required && (
          <span className={styles.requiredIndicator} aria-label="required">
            *
          </span>
        )}
      </label>
    )
  }
)

InputLabel.displayName = 'InputLabel'
