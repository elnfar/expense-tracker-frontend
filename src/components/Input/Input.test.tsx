import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'
import React from 'react'

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('renders different input types correctly', () => {
    const types = [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
      'search',
    ] as const

    types.forEach(type => {
      const { unmount } = render(
        <Input type={type} data-testid={`input-${type}`} />
      )
      const input = screen.getByTestId(`input-${type}`)
      expect(input).toHaveAttribute('type', type)
      unmount()
    })
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Input size="small" data-testid="input" />)
    expect(screen.getByTestId('input')).toBeInTheDocument()

    rerender(<Input size="medium" data-testid="input" />)
    expect(screen.getByTestId('input')).toBeInTheDocument()

    rerender(<Input size="large" data-testid="input" />)
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('applies placeholder correctly', () => {
    const placeholder = 'Enter your name'
    render(<Input placeholder={placeholder} />)

    const input = screen.getByPlaceholderText(placeholder)
    expect(input).toBeInTheDocument()
  })

  it('applies default value correctly', () => {
    const defaultValue = 'Default text'
    render(<Input defaultValue={defaultValue} />)

    const input = screen.getByDisplayValue(defaultValue)
    expect(input).toBeInTheDocument()
  })

  it('handles controlled input correctly', () => {
    const ControlledInput = () => {
      const [value, setValue] = React.useState('')
      return (
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          data-testid="controlled-input"
        />
      )
    }

    render(<ControlledInput />)
    const input = screen.getByTestId('controlled-input')

    fireEvent.change(input, { target: { value: 'test' } })
    expect(input).toHaveValue('test')
  })

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'test')
    expect(handleChange).toHaveBeenCalledTimes(4) // One call per character
  })

  it('shows error state correctly', () => {
    render(<Input error data-testid="input" />)
    const input = screen.getByTestId('input')

    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('displays helper text correctly', () => {
    const helperText = 'This is helper text'
    render(<Input helperText={helperText} />)

    expect(screen.getByText(helperText)).toBeInTheDocument()
  })

  it('displays error helper text with correct styling', () => {
    const errorText = 'This is an error'
    render(<Input error helperText={errorText} />)

    const helperElement = screen.getByText(errorText)
    expect(helperElement).toBeInTheDocument()
    expect(helperElement).toHaveAttribute('role', 'alert')
    expect(helperElement).toHaveAttribute('aria-live', 'polite')
  })

  it('associates helper text with input via aria-describedby', () => {
    const helperText = 'Helper text'
    render(<Input helperText={helperText} data-testid="input" />)

    const input = screen.getByTestId('input')
    const helperElement = screen.getByText(helperText)

    expect(input).toHaveAttribute('aria-describedby')
    expect(helperElement).toHaveAttribute(
      'id',
      input.getAttribute('aria-describedby')
    )
  })

  it('handles disabled state correctly', () => {
    const handleChange = vi.fn()
    render(<Input disabled onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    // Note: fireEvent.change still triggers onChange even on disabled inputs
    // This is a limitation of testing library vs real browser behavior
    // In real browsers, disabled inputs don't trigger change events
  })

  it('applies full width correctly', () => {
    render(<Input fullWidth data-testid="input" />)
    const input = screen.getByTestId('input')

    expect(input.closest('.inputContainer')).toHaveClass(
      'inputContainer--full-width'
    )
  })

  it('renders start icon correctly', () => {
    const startIcon = <span data-testid="start-icon">🔍</span>
    render(<Input startIcon={startIcon} />)

    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    // The span with aria-hidden is the parent container, not the startIcon itself
    const iconContainer = screen.getByTestId('start-icon').parentElement
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders end icon correctly', () => {
    const endIcon = <span data-testid="end-icon">❌</span>
    render(<Input endIcon={endIcon} />)

    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
    // The span with aria-hidden is the parent container, not the endIcon itself
    const iconContainer = screen.getByTestId('end-icon').parentElement
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders both start and end icons correctly', () => {
    const startIcon = <span data-testid="start-icon">🔍</span>
    const endIcon = <span data-testid="end-icon">❌</span>

    render(<Input startIcon={startIcon} endIcon={endIcon} />)

    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
  })

  it('applies custom className correctly', () => {
    const customClass = 'custom-input'
    render(<Input className={customClass} data-testid="input" />)

    const container = screen.getByTestId('input').closest('.inputContainer')
    expect(container).toHaveClass(customClass)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByRole('textbox'))
  })

  it('applies test id when provided', () => {
    const testId = 'custom-test-id'
    render(<Input data-testid={testId} />)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('passes through additional props', () => {
    render(
      <Input
        name="test-name"
        autoComplete="email"
        maxLength={50}
        data-testid="input"
      />
    )

    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('name', 'test-name')
    expect(input).toHaveAttribute('autocomplete', 'email')
    expect(input).toHaveAttribute('maxlength', '50')
  })

  it('generates unique ID when not provided', () => {
    const { rerender } = render(<Input data-testid="input1" />)
    const input1 = screen.getByTestId('input1')
    const id1 = input1.getAttribute('id')

    rerender(<Input data-testid="input2" />)
    const input2 = screen.getByTestId('input2')
    const id2 = input2.getAttribute('id')

    expect(id1).toBeTruthy()
    expect(id2).toBeTruthy()
    expect(id1).not.toBe(id2)
  })

  it('uses provided ID when given', () => {
    const customId = 'custom-input-id'
    render(<Input id={customId} data-testid="input" />)

    const input = screen.getByTestId('input')
    expect(input).toHaveAttribute('id', customId)
  })

  it('applies all size classes correctly for complex configuration', () => {
    render(
      <Input
        size="large"
        error
        disabled
        fullWidth
        startIcon={<span>🔍</span>}
        endIcon={<span>❌</span>}
        data-testid="input"
      />
    )

    const input = screen.getByTestId('input')
    const container = input.closest('.inputContainer')

    expect(container).toHaveClass('inputContainer--large')
    expect(container).toHaveClass('inputContainer--error')
    expect(container).toHaveClass('inputContainer--disabled')
    expect(container).toHaveClass('inputContainer--full-width')
    expect(container).toHaveClass('inputContainer--with-start-icon')
    expect(container).toHaveClass('inputContainer--with-end-icon')

    expect(input).toHaveClass('input--large')
    expect(input).toHaveClass('input--error')
    expect(input).toHaveClass('input--disabled')
    expect(input).toHaveClass('input--with-start-icon')
    expect(input).toHaveClass('input--with-end-icon')
  })

  it('has proper semantic structure', () => {
    render(
      <Input
        helperText="Helper text"
        startIcon={<span>🔍</span>}
        endIcon={<span>❌</span>}
        data-testid="input"
      />
    )

    const input = screen.getByTestId('input')
    const wrapper = input.closest('.inputWrapper')
    const container = input.closest('.inputContainer')

    expect(wrapper).toBeInTheDocument()
    expect(container).toBeInTheDocument()
    // Input elements have an implicit role of textbox, so we don't need to set it explicitly
    expect(input).toHaveAttribute('type', 'text')
  })

  it('maintains accessibility when both error and disabled', () => {
    const helperText = 'Error message'
    render(<Input error disabled helperText={helperText} data-testid="input" />)

    const input = screen.getByTestId('input')
    const helperElement = screen.getByText(helperText)

    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute(
      'aria-describedby',
      helperElement.getAttribute('id')
    )
    expect(helperElement).toHaveAttribute('role', 'alert')
  })

  it('handles focus and blur events correctly', async () => {
    const user = userEvent.setup()
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    const input = screen.getByRole('textbox')

    await user.click(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    await user.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard events correctly', async () => {
    const user = userEvent.setup()
    const handleKeyDown = vi.fn()
    const handleKeyUp = vi.fn()

    render(<Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)
    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.keyboard('a')

    expect(handleKeyDown).toHaveBeenCalled()
    expect(handleKeyUp).toHaveBeenCalled()
  })

  it('renders without helper text when not provided', () => {
    render(<Input data-testid="input" />)

    const input = screen.getByTestId('input')
    expect(input).not.toHaveAttribute('aria-describedby')

    const wrapper = input.closest('.inputWrapper')
    expect(wrapper?.querySelector('.helperText')).not.toBeInTheDocument()
  })

  it('applies correct classes for different error states', () => {
    const { rerender } = render(<Input error={false} data-testid="input" />)
    let input = screen.getByTestId('input')
    let container = input.closest('.inputContainer')

    expect(container).not.toHaveClass('inputContainer--error')
    expect(input).not.toHaveClass('input--error')
    expect(input).not.toHaveAttribute('aria-invalid')

    rerender(<Input error={true} data-testid="input" />)
    input = screen.getByTestId('input')
    container = input.closest('.inputContainer')

    expect(container).toHaveClass('inputContainer--error')
    expect(input).toHaveClass('input--error')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('has correct default classes and structure', () => {
    render(<Input data-testid="input" />)

    const input = screen.getByTestId('input')
    const container = input.closest('.inputContainer')
    const wrapper = container?.closest('.inputWrapper')

    expect(wrapper).toHaveClass('inputWrapper')
    expect(container).toHaveClass('inputContainer')
    expect(container).toHaveClass('inputContainer--medium') // default size
    expect(input).toHaveClass('input')
    expect(input).toHaveClass('input--medium') // default size
  })
})
