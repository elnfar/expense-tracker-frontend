/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Logo } from './Logo'

describe('Logo Component', () => {
  it('renders with default props', () => {
    render(<Logo />)

    const logoImage = screen.getByRole('img', { name: /expense tracker logo/i })
    const logoText = screen.getByText('Expense Tracker')

    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', '/logo.webp')
    expect(logoText).toBeInTheDocument()
  })

  it('renders with custom alt text', () => {
    const customAlt = 'Custom Logo Alt Text'
    render(<Logo alt={customAlt} />)

    const logoImage = screen.getByRole('img', { name: customAlt })
    expect(logoImage).toBeInTheDocument()
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Logo size="small" />)
    let container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('logo--small')

    rerender(<Logo size="large" />)
    container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('logo--large')

    rerender(<Logo size="xlarge" />)
    container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('logo--xlarge')
  })

  it('renders as button when as="button"', () => {
    const handleClick = vi.fn()
    render(<Logo as="button" onClick={handleClick} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders as link when as="a"', () => {
    const href = 'https://example.com'
    render(<Logo as="a" href={href} />)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', href)
  })

  it('handles click events when as="button"', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Logo as="button" onClick={handleClick} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard navigation when as="button"', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Logo as="button" onClick={handleClick} />)

    const button = screen.getByRole('button')
    button.focus()

    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)

    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('handles keyboard navigation when as="div" with onClick', () => {
    const handleClick = vi.fn()
    render(<Logo onClick={handleClick} />)

    const logoDiv = screen.getByRole('button')
    expect(logoDiv).toHaveAttribute('tabIndex', '0')

    fireEvent.keyDown(logoDiv, { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(logoDiv, { key: ' ' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('renders inline variant correctly', () => {
    render(<Logo inline />)

    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('logo--inline')
  })

  it('renders icon-only variant correctly', () => {
    render(<Logo iconOnly />)

    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass('logo--icon-only')

    // Text should not be visible but image should be
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.queryByText('Expense Tracker')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-logo-class'
    render(<Logo className={customClass} />)

    const container = screen.getByRole('img').parentElement
    expect(container).toHaveClass(customClass)
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Logo ref={ref} />)

    expect(ref).toHaveBeenCalled()
  })

  it('has proper accessibility attributes for icon-only button', () => {
    const customAlt = 'Custom Logo'
    render(<Logo as="button" iconOnly alt={customAlt} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', customAlt)
  })

  it('has proper accessibility attributes for icon-only link', () => {
    const customAlt = 'Custom Logo'
    render(<Logo as="a" href="#" iconOnly alt={customAlt} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('aria-label', customAlt)
  })

  it('sets loading and decoding attributes on image', () => {
    render(<Logo />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
  })

  it('does not add aria-label when not icon-only', () => {
    render(<Logo as="button" />)

    const button = screen.getByRole('button')
    expect(button).not.toHaveAttribute('aria-label')
  })

  it('applies custom style prop', () => {
    const customStyle = { backgroundColor: 'red', padding: '10px' }
    render(<Logo style={customStyle} />)

    const container = screen.getByRole('img').parentElement
    expect(container).toHaveStyle('background-color: rgb(255, 0, 0)')
    expect(container).toHaveStyle('padding: 10px')
  })
})
