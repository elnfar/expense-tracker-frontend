import { forwardRef } from 'react'
import styles from './Loader.module.css'

/**
 * Loader component for indicating loading states across the application
 *
 * @component
 * @example
 * // Basic usage
 * <Loader />
 *
 * @example
 * // With custom size and text
 * <Loader size="large" text="Loading data..." />
 *
 * @example
 * // Overlay loader covering entire screen
 * <Loader overlay text="Processing..." />
 *
 * @example
 * // Custom color variant
 * <Loader variant="secondary" size="small" />
 */

export interface LoaderProps {
  /**
   * Size variant of the loader
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge'

  /**
   * Color variant of the loader
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

  /**
   * Loading text to display below the spinner
   */
  text?: string

  /**
   * Whether to show as an overlay covering the entire screen/container
   * @default false
   */
  overlay?: boolean

  /**
   * Whether to center the loader in its container
   * @default true
   */
  centered?: boolean

  /**
   * Additional CSS class names
   */
  className?: string

  /**
   * Inline styles
   */
  style?: React.CSSProperties

  /**
   * Accessible label for screen readers
   * @default "Loading"
   */
  ariaLabel?: string

  /**
   * Test ID for testing purposes
   */
  testId?: string

  /**
   * Speed of the animation
   * @default "normal"
   */
  speed?: 'slow' | 'normal' | 'fast'

  /**
   * Whether the loader is currently visible
   * @default true
   */
  visible?: boolean
}

/**
 * Accessible Loader component with multiple variants and customization options
 */
export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      text,
      overlay = false,
      centered = true,
      className = '',
      style,
      ariaLabel = 'Loading',
      testId,
      speed = 'normal',
      visible = true,
      ...props
    },
    ref
  ) => {
    if (!visible) {
      return null
    }

    const loaderClasses = [
      styles.loader,
      styles[`loader--${size}`],
      styles[`loader--${variant}`],
      styles[`loader--${speed}`],
      overlay && styles['loader--overlay'],
      centered && styles['loader--centered'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const spinnerClasses = [
      styles.spinner,
      styles[`spinner--${size}`],
      styles[`spinner--${variant}`],
    ]
      .filter(Boolean)
      .join(' ')

    const content = (
      <>
        <div
          className={spinnerClasses}
          role="progressbar"
          aria-label={ariaLabel}
          aria-live="polite"
          aria-busy="true"
        >
          <div className={styles.spinnerInner}>
            <div className={styles.spinnerDot}></div>
            <div className={styles.spinnerDot}></div>
            <div className={styles.spinnerDot}></div>
            <div className={styles.spinnerDot}></div>
            <div className={styles.spinnerDot}></div>
            <div className={styles.spinnerDot}></div>
            <div className={styles.spinnerDot}></div>
            <div className={styles.spinnerDot}></div>
          </div>
        </div>
        {text && (
          <div className={styles.loaderText} aria-live="polite">
            {text}
          </div>
        )}
      </>
    )

    return (
      <div
        ref={ref}
        className={loaderClasses}
        style={style}
        data-testid={testId}
        {...props}
      >
        {content}
      </div>
    )
  }
)

Loader.displayName = 'Loader'
