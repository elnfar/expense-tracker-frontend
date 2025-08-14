/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InputLabel } from './InputLabel'

describe('InputLabel Component', () => {
  it('renders with default props', () => {
    render(<InputLabel>Test Label</InputLabel>)

    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('SPAN') // The text is wrapped in a span
    expect(label.parentElement?.tagName).toBe('LABEL')
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(
      <InputLabel size="small">Small Label</InputLabel>
    )
    let label = screen.getByText('Small Label').parentElement
    expect(label).toHaveClass('inputLabel--small')

    rerender(<InputLabel size="medium">Medium Label</InputLabel>)
    label = screen.getByText('Medium Label').parentElement
    expect(label).toHaveClass('inputLabel--medium')

    rerender(<InputLabel size="large">Large Label</InputLabel>)
    label = screen.getByText('Large Label').parentElement
    expect(label).toHaveClass('inputLabel--large')
  })

  it('applies htmlFor attribute correctly', () => {
    render(<InputLabel htmlFor="test-input">Test Label</InputLabel>)

    const label = screen.getByText('Test Label').parentElement
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('shows required indicator when required is true', () => {
    render(<InputLabel required>Required Label</InputLabel>)

    const requiredIndicator = screen.getByLabelText('required')
    expect(requiredIndicator).toBeInTheDocument()
    expect(requiredIndicator).toHaveTextContent('*')
    expect(requiredIndicator).toHaveClass('requiredIndicator')
  })

  it('does not show required indicator when required is false', () => {
    render(<InputLabel>Optional Label</InputLabel>)

    const requiredIndicator = screen.queryByLabelText('required')
    expect(requiredIndicator).not.toBeInTheDocument()
  })

  it('applies disabled state correctly', () => {
    render(<InputLabel disabled>Disabled Label</InputLabel>)

    const label = screen.getByText('Disabled Label').parentElement
    expect(label).toHaveClass('inputLabel--disabled')
  })

  it('applies custom className', () => {
    const customClass = 'custom-label-class'
    render(<InputLabel className={customClass}>Custom Label</InputLabel>)

    const label = screen.getByText('Custom Label').parentElement
    expect(label).toHaveClass(customClass)
  })

  it('applies custom styles', () => {
    const customStyle = { color: 'red', fontSize: '20px' }
    render(<InputLabel style={customStyle}>Styled Label</InputLabel>)

    const label = screen.getByText('Styled Label').parentElement
    expect(label).toHaveStyle('color: rgb(255, 0, 0)')
    expect(label).toHaveStyle('font-size: 20px')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<InputLabel ref={ref}>Ref Label</InputLabel>)

    expect(ref).toHaveBeenCalled()
  })

  it('applies test id when provided', () => {
    const testId = 'label-test-id'
    render(<InputLabel testId={testId}>Test Label</InputLabel>)

    const label = screen.getByTestId(testId)
    expect(label).toBeInTheDocument()
  })

  it('applies ARIA attributes correctly', () => {
    render(
      <InputLabel
        ariaLabel="Custom aria label"
        ariaDescribedBy="description-id"
      >
        ARIA Label
      </InputLabel>
    )

    const label = screen.getByText('ARIA Label').parentElement
    expect(label).toHaveAttribute('aria-label', 'Custom aria label')
    expect(label).toHaveAttribute('aria-describedby', 'description-id')
  })

  it('passes through additional props', () => {
    render(<InputLabel data-custom="test-value">Custom Props</InputLabel>)

    const label = screen.getByText('Custom Props').parentElement
    expect(label).toHaveAttribute('data-custom', 'test-value')
  })

  it('renders without children', () => {
    render(<InputLabel testId="empty-label" />)

    const label = screen.getByTestId('empty-label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('')
  })

  it('applies all classes correctly for complex configuration', () => {
    render(
      <InputLabel size="large" required disabled className="custom-class">
        Complex Label
      </InputLabel>
    )

    const label = screen.getByText('Complex Label').parentElement
    expect(label).toHaveClass('inputLabel')
    expect(label).toHaveClass('inputLabel--large')
    expect(label).toHaveClass('inputLabel--required')
    expect(label).toHaveClass('inputLabel--disabled')
    expect(label).toHaveClass('custom-class')
  })

  it('has proper semantic structure', () => {
    render(
      <InputLabel htmlFor="input-id" required>
        Label Text
      </InputLabel>
    )

    const labelElement = screen.getByText('Label Text').parentElement
    const labelText = screen.getByText('Label Text')
    const requiredIndicator = screen.getByLabelText('required')

    // Check that label element is present
    expect(labelElement).toBeInTheDocument()
    expect(labelElement?.tagName).toBe('LABEL')

    // Check that label text has proper class
    expect(labelText).toHaveClass('labelText')

    // Check that required indicator has proper attributes
    expect(requiredIndicator).toHaveClass('requiredIndicator')
    expect(requiredIndicator).toHaveAttribute('aria-label', 'required')
  })

  it('maintains accessibility when both required and disabled', () => {
    render(
      <InputLabel htmlFor="test-input" required disabled>
        Required Disabled Label
      </InputLabel>
    )

    const label = screen.getByText('Required Disabled Label').parentElement
    const requiredIndicator = screen.getByLabelText('required')

    expect(label).toHaveClass('inputLabel--required')
    expect(label).toHaveClass('inputLabel--disabled')
    expect(requiredIndicator).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('properly associates with form controls', () => {
    const { container } = render(
      <div>
        <InputLabel htmlFor="associated-input">Associated Label</InputLabel>
        <input id="associated-input" type="text" />
      </div>
    )

    const label = screen.getByText('Associated Label').parentElement
    const input = container.querySelector('#associated-input')

    expect(label).toHaveAttribute('for', 'associated-input')
    expect(input).toHaveAttribute('id', 'associated-input')
  })

  it('renders different content types correctly', () => {
    const { rerender } = render(
      <InputLabel>
        <span>Complex content</span>
      </InputLabel>
    )

    expect(screen.getByText('Complex content')).toBeInTheDocument()

    rerender(
      <InputLabel>
        Label with <strong>bold</strong> text
      </InputLabel>
    )

    expect(screen.getByText(/Label with/)).toBeInTheDocument()
    expect(screen.getByText('bold')).toBeInTheDocument()
    expect(screen.getByText(/text/)).toBeInTheDocument()
  })

  it('handles click events correctly', () => {
    const handleClick = vi.fn()
    render(<InputLabel onClick={handleClick}>Clickable Label</InputLabel>)

    const label = screen.getByText('Clickable Label').parentElement
    label?.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has correct default classes', () => {
    render(<InputLabel>Default Label</InputLabel>)

    const label = screen.getByText('Default Label').parentElement
    expect(label).toHaveClass('inputLabel')
    expect(label).toHaveClass('inputLabel--medium') // default size
    expect(label).not.toHaveClass('inputLabel--required')
    expect(label).not.toHaveClass('inputLabel--disabled')
  })
})
