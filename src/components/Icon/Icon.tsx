import React, { forwardRef } from 'react'
import { iconRegistry, type IconName } from '../../assets/icons/registry'
import styles from './Icon.module.css'

/**
 * Props for the Icon component
 */
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size'> {
  /**
   * The name of the icon to render
   */
  iconName: IconName

  /**
   * The size of the icon in pixels
   * @default 24
   */
  size?: number

  /**
   * The color of the icon (CSS color value)
   * @default 'currentColor'
   */
  color?: string

  /**
   * Accessible label for the icon
   * If not provided, the icon will be treated as decorative (aria-hidden="true")
   */
  'aria-label'?: string

  /**
   * Custom CSS class name
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string
}

/**
 * Icon component for rendering SVG icons
 *
 * @example
 * ```tsx
 * // Basic icon
 * <Icon iconName="plus" />
 *
 * // Custom size and color
 * <Icon iconName="search" size={20} color="#3629B7" />
 *
 * // With accessibility label
 * <Icon iconName="close" aria-label="Close dialog" />
 *
 * // Decorative icon (no label needed)
 * <Icon iconName="star" />
 * ```
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      iconName,
      size = 24,
      color = 'currentColor',
      'aria-label': ariaLabel,
      className,
      'data-testid': testId,
      style,
      ...props
    },
    ref
  ) => {
    // Get the icon component from the registry
    const IconComponent = iconRegistry[iconName]

    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found in icon registry`)
      return null
    }

    // Build CSS classes
    const iconClasses = [styles.icon, className].filter(Boolean).join(' ')

    // Determine accessibility attributes
    const accessibilityProps = ariaLabel
      ? { 'aria-label': ariaLabel, role: 'img' }
      : { 'aria-hidden': true }

    // Combine styles
    const combinedStyle = {
      width: size,
      height: size,
      color,
      ...style,
    }

    return (
      <IconComponent
        {...props}
        ref={ref}
        className={iconClasses}
        style={combinedStyle}
        data-testid={testId}
        {...accessibilityProps}
      />
    )
  }
)

Icon.displayName = 'Icon'
