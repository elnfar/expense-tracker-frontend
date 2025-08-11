import { forwardRef, type ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

/**
 * Button component for user interactions across the application
 *
 * @component
 * @example
 * // Basic usage
 * <Button onClick={handleClick}>Click me</Button>
 *
 * @example
 * // Primary button with different size
 * <Button variant="primary" size="large" onClick={handleSubmit}>
 *   Submit Form
 * </Button>
 *
 * @example
 * // Disabled state
 * <Button disabled onClick={handleClick}>
 *   Disabled Button
 * </Button>
 *
 * @example
 * // Loading state
 * <Button loading onClick={handleClick}>
 *   Processing...
 * </Button>
 *
 * @example
 * // Different variants
 * <Button variant="secondary" size="small">
 *   Cancel
 * </Button>
 * <Button variant="danger" onClick={handleDelete}>
 *   Delete
 * </Button>
 */

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Visual style variant of the button
   * @default "primary"
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'ghost'
    | 'link'
    | 'light'

  /**
   * Size variant of the button
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean

  /**
   * Whether the button is in an active state (pressed/selected)
   * @default false
   */
  active?: boolean

  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean

  /**
   * Whether the button should be rendered as icon-only (circular)
   * @default false
   */
  iconOnly?: boolean

  /**
   * Icon to display before the button text
   */
  startIcon?: React.ReactNode

  /**
   * Icon to display after the button text
   */
  endIcon?: React.ReactNode

  /**
   * Button content
   */
  children?: React.ReactNode

  /**
   * HTML button type
   * @default "button"
   */
  type?: 'button' | 'submit' | 'reset'

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
   * Accessible label for screen readers (when button content is not descriptive)
   */
  ariaLabel?: string

  /**
   * Describes the element (or group of elements) that the button controls
   */
  ariaControls?: string

  /**
   * Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed
   */
  ariaExpanded?: boolean

  /**
   * Indicates that the element has a popup context menu or sub-level menu
   */
  ariaHaspopup?:
    | boolean
    | 'false'
    | 'true'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog'

  /**
   * Indicates the current "pressed" state of toggle buttons
   */
  ariaPressed?: boolean
}

/**
 * Accessible Button component with multiple variants and states
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      active = false,
      fullWidth = false,
      iconOnly = false,
      startIcon,
      endIcon,
      children,
      type = 'button',
      className = '',
      style,
      testId,
      ariaLabel,
      ariaControls,
      ariaExpanded,
      ariaHaspopup,
      ariaPressed,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const buttonClasses = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      loading && styles['button--loading'],
      active && styles['button--active'],
      fullWidth && styles['button--full-width'],
      iconOnly && styles['button--icon-only'],
      isDisabled && styles['button--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        style={style}
        disabled={isDisabled}
        onClick={handleClick}
        data-testid={testId}
        aria-label={ariaLabel}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
        aria-pressed={ariaPressed}
        aria-busy={loading ? 'true' : undefined}
        {...props}
      >
        {loading && (
          <span className={styles.buttonSpinner} aria-hidden="true">
            <span className={styles.spinnerDot}></span>
            <span className={styles.spinnerDot}></span>
            <span className={styles.spinnerDot}></span>
          </span>
        )}

        {!loading && iconOnly && (startIcon || endIcon) && (
          <span className={styles.buttonIcon} aria-hidden="true">
            {startIcon || endIcon}
          </span>
        )}

        {!loading && !iconOnly && startIcon && (
          <span className={styles.buttonIcon} aria-hidden="true">
            {startIcon}
          </span>
        )}

        {!iconOnly && children && (
          <span className={styles.buttonText}>{children}</span>
        )}

        {!loading && !iconOnly && endIcon && (
          <span className={styles.buttonIcon} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
