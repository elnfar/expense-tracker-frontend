/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).not.toBeDisabled()
  })

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('button--primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--secondary')

    rerender(<Button variant="success">Success</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--success')

    rerender(<Button variant="warning">Warning</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--warning')

    rerender(<Button variant="danger">Danger</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--danger')

    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--ghost')

    rerender(<Button variant="link">Link</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--link')

    rerender(<Button variant="light">Light</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--light')
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('button--small')

    rerender(<Button size="medium">Medium</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--medium')

    rerender(<Button size="large">Large</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('button--large')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('button--disabled')

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not trigger click when loading', () => {
    const handleClick = vi.fn()
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('button--loading')
    expect(button).toHaveAttribute('aria-busy', 'true')

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders loading spinner when loading', () => {
    render(<Button loading>Loading</Button>)

    const spinner = screen.getByRole('button').querySelector('.buttonSpinner')
    expect(spinner).toBeInTheDocument()

    const dots = screen.getByRole('button').querySelectorAll('.spinnerDot')
    expect(dots).toHaveLength(3)
  })

  it('applies active state correctly', () => {
    render(<Button active>Active</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--active')
  })

  it('applies full width correctly', () => {
    render(<Button fullWidth>Full Width</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--full-width')
  })

  it('applies icon-only correctly', () => {
    render(<Button iconOnly startIcon={<span>+</span>} ariaLabel="Add" />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('button--icon-only')
    expect(button).toHaveAttribute('aria-label', 'Add')
  })

  it('renders with start icon', () => {
    const startIcon = <span data-testid="start-icon">→</span>
    render(<Button startIcon={startIcon}>With Icon</Button>)

    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('renders with end icon', () => {
    const endIcon = <span data-testid="end-icon">←</span>
    render(<Button endIcon={endIcon}>With Icon</Button>)

    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('does not render icons when loading', () => {
    const startIcon = <span data-testid="start-icon">→</span>
    const endIcon = <span data-testid="end-icon">←</span>
    render(
      <Button loading startIcon={startIcon} endIcon={endIcon}>
        Loading
      </Button>
    )

    expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument()
  })

  it('renders icon-only button with startIcon', () => {
    const startIcon = <span data-testid="start-icon">+</span>
    render(<Button iconOnly startIcon={startIcon} ariaLabel="Add" />)

    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    // Should not render buttonText element
    expect(
      screen.getByRole('button').querySelector('.buttonText')
    ).not.toBeInTheDocument()
  })

  it('renders icon-only button with endIcon when startIcon is not provided', () => {
    const endIcon = <span data-testid="end-icon">×</span>
    render(<Button iconOnly endIcon={endIcon} ariaLabel="Close" />)

    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
    // Should not render buttonText element
    expect(
      screen.getByRole('button').querySelector('.buttonText')
    ).not.toBeInTheDocument()
  })

  it('prioritizes startIcon over endIcon in icon-only mode', () => {
    const startIcon = <span data-testid="start-icon">+</span>
    const endIcon = <span data-testid="end-icon">×</span>
    render(
      <Button
        iconOnly
        startIcon={startIcon}
        endIcon={endIcon}
        ariaLabel="Add"
      />
    )

    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument()
  })

  it('handles different button types', () => {
    const { rerender } = render(<Button type="button">Button</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')

    rerender(<Button type="submit">Submit</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')

    rerender(<Button type="reset">Reset</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'reset')
  })

  it('applies custom className', () => {
    const customClass = 'custom-button-class'
    render(<Button className={customClass}>Custom</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(customClass)
  })

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red', padding: '20px' }
    render(<Button style={customStyle}>Styled</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)')
    expect(button).toHaveStyle('padding: 20px')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Ref Button</Button>)

    expect(ref).toHaveBeenCalled()
  })

  it('applies test id when provided', () => {
    const testId = 'button-test-id'
    render(<Button testId={testId}>Test Button</Button>)

    const button = screen.getByTestId(testId)
    expect(button).toBeInTheDocument()
  })

  it('applies ARIA attributes correctly', () => {
    render(
      <Button
        ariaLabel="Custom label"
        ariaControls="controlled-element"
        ariaExpanded={true}
        ariaHaspopup="menu"
        ariaPressed={true}
      >
        ARIA Button
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Custom label')
    expect(button).toHaveAttribute('aria-controls', 'controlled-element')
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveAttribute('aria-haspopup', 'menu')
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('sets aria-busy when loading', () => {
    render(<Button loading>Loading</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('passes through additional props', () => {
    render(<Button data-custom="test-value">Custom Props</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-custom', 'test-value')
  })

  it('renders without children', () => {
    render(<Button />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('')
  })

  it('applies all classes correctly for complex configuration', () => {
    render(
      <Button
        variant="success"
        size="large"
        loading
        active
        fullWidth
        iconOnly
        className="custom-class"
      >
        Complex Button
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('button')
    expect(button).toHaveClass('button--success')
    expect(button).toHaveClass('button--large')
    expect(button).toHaveClass('button--loading')
    expect(button).toHaveClass('button--active')
    expect(button).toHaveClass('button--full-width')
    expect(button).toHaveClass('button--icon-only')
    expect(button).toHaveClass('button--disabled') // because loading = true
    expect(button).toHaveClass('custom-class')
  })

  it('prevents default behavior when disabled through loading', () => {
    const handleClick = vi.fn()
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    )

    const button = screen.getByRole('button')

    // Use fireEvent.click which will properly trigger our onClick handler
    fireEvent.click(button)

    // The handler should not be called because the button is disabled
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('has proper semantic structure with icons and text', () => {
    const startIcon = <span data-testid="start-icon">📁</span>
    const endIcon = <span data-testid="end-icon">↗</span>

    render(
      <Button startIcon={startIcon} endIcon={endIcon}>
        Open File
      </Button>
    )

    const startIconElement = screen.getByTestId('start-icon')
    const endIconElement = screen.getByTestId('end-icon')
    const textElement = screen.getByText('Open File')

    // Check that all elements are present
    expect(startIconElement).toBeInTheDocument()
    expect(textElement).toBeInTheDocument()
    expect(endIconElement).toBeInTheDocument()

    // Check that icons have aria-hidden
    expect(startIconElement.parentElement).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    expect(endIconElement.parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('handles keyboard interactions', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Keyboard Button</Button>)

    const button = screen.getByRole('button')

    // Simulate Enter key press
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    fireEvent.keyUp(button, { key: 'Enter', code: 'Enter' })

    // Simulate Space key press
    fireEvent.keyDown(button, { key: ' ', code: 'Space' })
    fireEvent.keyUp(button, { key: ' ', code: 'Space' })

    // Button should be focusable
    button.focus()
    expect(button).toHaveFocus()
  })

  it('maintains proper focus behavior when disabled', () => {
    render(<Button disabled>Disabled Button</Button>)

    const button = screen.getByRole('button')
    button.focus()

    // Disabled buttons should not receive focus
    expect(button).not.toHaveFocus()
  })

  it('displays correct content in different loading states', () => {
    const { rerender } = render(<Button>Normal State</Button>)

    expect(screen.getByText('Normal State')).toBeInTheDocument()
    const normalButton = screen.getByRole('button')
    expect(normalButton).not.toHaveAttribute('aria-busy')

    rerender(<Button loading>Loading State</Button>)

    expect(screen.getByText('Loading State')).toBeInTheDocument()
    const loadingButton = screen.getByRole('button')
    expect(loadingButton).toHaveAttribute('aria-busy', 'true')
    expect(loadingButton.querySelector('.buttonSpinner')).toBeInTheDocument()
  })
})
