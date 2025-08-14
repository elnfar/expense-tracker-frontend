import { forwardRef } from 'react'
import styles from './Logo.module.css'

/**
 * Logo component for the Expense Tracker application
 *
 * @component
 * @example
 * // Basic usage
 * <Logo />
 *
 * @example
 * // With custom size
 * <Logo size="large" />
 *
 * @example
 * // As a clickable link
 * <Logo as="button" onClick={handleClick} />
 */

export interface LogoProps {
  /**
   * Size variant of the logo
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge'

  /**
   * HTML element or React component to render as
   * @default "div"
   */
  as?: 'div' | 'button' | 'a'

  /**
   * Alternative text for the logo image
   * @default "Expense Tracker Logo"
   */
  alt?: string

  /**
   * Additional CSS class names
   */
  className?: string

  /**
   * Inline styles
   */
  style?: React.CSSProperties

  /**
   * Click handler (only applies when as="button" or as="a")
   */
  onClick?: () => void

  /**
   * Href attribute (only applies when as="a")
   */
  href?: string

  /**
   * Target attribute for links (only applies when as="a")
   */
  target?: string

  /**
   * Whether the logo should be displayed inline
   * @default false
   */
  inline?: boolean

  /**
   * Whether to show only the icon without text
   * @default false
   */
  iconOnly?: boolean
}

/**
 * Logo component with accessibility features and responsive design
 */
export const Logo = forwardRef<
  HTMLDivElement | HTMLButtonElement | HTMLAnchorElement,
  LogoProps
>(
  (
    {
      size = 'medium',
      as: Component = 'div',
      alt = 'Expense Tracker Logo',
      className = '',
      style,
      onClick,
      href,
      target,
      inline = false,
      iconOnly = false,
      ...props
    },
    ref
  ) => {
    const logoClasses = [
      styles.logo,
      styles[`logo--${size}`],
      inline && styles['logo--inline'],
      iconOnly && styles['logo--icon-only'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const logoImage = (
      <img
        src="/logo.webp"
        alt={alt}
        className={styles.logoImage}
        loading="lazy"
        decoding="async"
      />
    )

    const logoText = !iconOnly && (
      <span className={styles.logoText} aria-hidden="true">
        Expense Tracker
      </span>
    )

    const content = (
      <>
        {logoImage}
        {logoText}
      </>
    )

    // Handle different component types
    if (Component === 'button') {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={logoClasses}
          style={style}
          onClick={onClick}
          type="button"
          aria-label={iconOnly ? alt : undefined}
          {...props}
        >
          {content}
        </button>
      )
    }

    if (Component === 'a') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={logoClasses}
          style={style}
          href={href}
          target={target}
          onClick={onClick}
          aria-label={iconOnly ? alt : undefined}
          {...props}
        >
          {content}
        </a>
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={logoClasses}
        style={style}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
        aria-label={iconOnly ? alt : undefined}
        {...props}
      >
        {content}
      </div>
    )
  }
)

Logo.displayName = 'Logo'
