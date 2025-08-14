import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Icon } from './Icon'
import { iconRegistry } from '../../assets/icons/registry'
import React from 'react'

describe('Icon Component', () => {
  it('renders with default props', () => {
    render(<Icon iconName="plus" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders different icon types correctly', () => {
    const iconNames = ['plus', 'minus', 'search', 'edit', 'delete'] as const

    iconNames.forEach(iconName => {
      const { unmount } = render(
        <Icon iconName={iconName} data-testid={`icon-${iconName}`} />
      )
      const icon = screen.getByTestId(`icon-${iconName}`)
      expect(icon).toBeInTheDocument()
      unmount()
    })
  })

  it('applies custom size correctly', () => {
    render(<Icon iconName="star" size={32} data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveStyle({ width: '32px', height: '32px' })
  })

  it('applies custom color correctly', () => {
    render(<Icon iconName="heart" color="#ef4444" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveStyle({ color: '#ef4444' })
  })

  it('uses currentColor as default color', () => {
    render(<Icon iconName="home" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    // The browser normalizes currentColor to lowercase
    expect(icon.style.color.toLowerCase()).toBe('currentcolor')
  })

  it('uses 24px as default size', () => {
    render(<Icon iconName="user" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveStyle({ width: '24px', height: '24px' })
  })

  it('applies aria-label when provided', () => {
    render(
      <Icon iconName="close" aria-label="Close dialog" data-testid="icon" />
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveAttribute('aria-label', 'Close dialog')
    expect(icon).toHaveAttribute('role', 'img')
    expect(icon).not.toHaveAttribute('aria-hidden')
  })

  it('is decorative when no aria-label provided', () => {
    render(<Icon iconName="star" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).not.toHaveAttribute('aria-label')
    expect(icon).not.toHaveAttribute('role')
  })

  it('applies custom className correctly', () => {
    const customClass = 'custom-icon'
    render(<Icon iconName="menu" className={customClass} data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveClass(customClass)
    expect(icon).toHaveClass('icon') // base class should still be there
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<SVGSVGElement>()
    render(<Icon iconName="settings" ref={ref} />)

    expect(ref.current).toBeInstanceOf(SVGSVGElement)
  })

  it('applies test id when provided', () => {
    const testId = 'custom-test-id'
    render(<Icon iconName="info" data-testid={testId} />)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('passes through additional SVG props', () => {
    render(
      <Icon
        iconName="warning"
        onClick={() => {}}
        onMouseOver={() => {}}
        data-testid="icon"
      />
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveAttribute('data-testid', 'icon')
  })

  it('applies custom style correctly', () => {
    const customStyle = { opacity: 0.5, transform: 'rotate(45deg)' }
    render(<Icon iconName="arrow-up" style={customStyle} data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveStyle(customStyle)
  })

  it('combines custom styles with size and color', () => {
    const customStyle = { opacity: 0.8 }
    render(
      <Icon
        iconName="lock"
        size={20}
        color="#3629B7"
        style={customStyle}
        data-testid="icon"
      />
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveStyle({
      width: '20px',
      height: '20px',
      color: '#3629B7',
      opacity: '0.8',
    })
  })

  it('warns and returns null for unknown icon names', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { container } = render(
      // @ts-expect-error - Testing invalid icon name
      <Icon iconName="unknown-icon" data-testid="icon" />
    )

    expect(container.firstChild).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Icon "unknown-icon" not found in icon registry'
    )

    consoleSpy.mockRestore()
  })

  it('has proper semantic structure', () => {
    render(<Icon iconName="email" aria-label="Email" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon.tagName).toBe('svg')
    expect(icon).toHaveAttribute('viewBox')
    expect(icon).toHaveAttribute('fill')
  })

  it('handles all available icon names', () => {
    Object.keys(iconRegistry).forEach(iconName => {
      const { unmount } = render(
        <Icon
          iconName={iconName as keyof typeof iconRegistry}
          data-testid={`icon-${iconName}`}
        />
      )
      const icon = screen.getByTestId(`icon-${iconName}`)
      expect(icon).toBeInTheDocument()
      unmount()
    })
  })

  it('applies correct classes for different configurations', () => {
    render(
      <Icon
        iconName="star"
        size={48}
        color="#f59e0b"
        className="custom-star"
        data-testid="icon"
      />
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveClass('icon')
    expect(icon).toHaveClass('custom-star')
    expect(icon).toHaveStyle({
      width: '48px',
      height: '48px',
      color: '#f59e0b',
    })
  })

  it('maintains accessibility for interactive use', () => {
    render(
      <Icon
        iconName="heart"
        aria-label="Like this post"
        onClick={() => {}}
        data-testid="icon"
      />
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveAttribute('aria-label', 'Like this post')
    expect(icon).toHaveAttribute('role', 'img')
    expect(icon).not.toHaveAttribute('aria-hidden')
  })

  it('handles edge cases for size prop', () => {
    // Very small size
    const { rerender } = render(
      <Icon iconName="plus" size={1} data-testid="icon" />
    )
    let icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle({ width: '1px', height: '1px' })

    // Very large size
    rerender(<Icon iconName="plus" size={200} data-testid="icon" />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle({ width: '200px', height: '200px' })

    // Zero size
    rerender(<Icon iconName="plus" size={0} data-testid="icon" />)
    icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle({ width: '0px', height: '0px' })
  })

  it('handles different color formats', () => {
    const colorTests = [
      { input: '#ff0000', expected: 'rgb(255, 0, 0)' },
      { input: 'rgb(255,0,0)', expected: 'rgb(255, 0, 0)' },
      { input: 'red', expected: 'red' },
      { input: 'currentColor', expected: 'currentcolor' },
      { input: 'transparent', expected: 'transparent' },
    ]

    colorTests.forEach(({ input, expected }, index) => {
      const { unmount } = render(
        <Icon iconName="heart" color={input} data-testid={`icon-${index}`} />
      )
      const icon = screen.getByTestId(`icon-${index}`)
      // Check the style attribute, accounting for browser normalization
      expect(icon.style.color.toLowerCase()).toBe(expected.toLowerCase())
      unmount()
    })
  })

  it('preserves SVG viewBox and fill attributes', () => {
    render(<Icon iconName="search" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
    expect(icon).toHaveAttribute('fill', 'currentColor')
  })

  it('does not break with undefined or null props', () => {
    render(
      <Icon
        iconName="check"
        size={undefined}
        color={undefined}
        data-testid="icon"
      />
    )
    const icon = screen.getByTestId('icon')

    expect(icon).toBeInTheDocument()
    // Should fall back to defaults
    expect(icon).toHaveStyle({ width: '24px', height: '24px' })
  })

  it('has correct default classes and structure', () => {
    render(<Icon iconName="menu" data-testid="icon" />)
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveClass('icon')
    expect(icon.tagName).toBe('svg')
    expect(icon).toHaveAttribute('viewBox')
  })
})
