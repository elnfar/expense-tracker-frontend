import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DatePicker } from './DatePicker'
import React from 'react'

describe('DatePicker Component', () => {
  it('renders with default props', () => {
    render(<DatePicker data-testid="datepicker" />)
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toBeInTheDocument()
    expect(datePicker).toHaveAttribute('type', 'date')
    expect(datePicker).toHaveValue('')
  })

  it('renders with a value', () => {
    render(<DatePicker value="2024-01-15" data-testid="datepicker" />)
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toHaveValue('2024-01-15')
  })

  it('calls onChange when date is selected', () => {
    const handleChange = vi.fn()
    render(<DatePicker onChange={handleChange} data-testid="datepicker" />)
    const datePicker = screen.getByTestId('datepicker')

    fireEvent.change(datePicker, { target: { value: '2024-01-15' } })

    expect(handleChange).toHaveBeenCalledWith('2024-01-15')
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('applies different size classes correctly', () => {
    const { rerender } = render(
      <DatePicker size="small" data-testid="datepicker" />
    )
    let datePicker = screen.getByTestId('datepicker')
    expect(datePicker).toHaveClass('datePicker--small')

    rerender(<DatePicker size="medium" data-testid="datepicker" />)
    datePicker = screen.getByTestId('datepicker')
    expect(datePicker).toHaveClass('datePicker--medium')

    rerender(<DatePicker size="large" data-testid="datepicker" />)
    datePicker = screen.getByTestId('datepicker')
    expect(datePicker).toHaveClass('datePicker--large')
  })

  it('applies error state correctly', () => {
    render(<DatePicker error data-testid="datepicker" />)
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toHaveClass('datePicker--error')
    expect(datePicker).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders helper text when provided', () => {
    render(
      <DatePicker
        helperText="Select your preferred date"
        data-testid="datepicker"
      />
    )

    expect(screen.getByText('Select your preferred date')).toBeInTheDocument()
  })

  it('renders error helper text with error styling', () => {
    render(
      <DatePicker
        error
        helperText="This date is not available"
        data-testid="datepicker"
      />
    )
    const helperText = screen.getByText('This date is not available')

    expect(helperText).toBeInTheDocument()
    expect(helperText).toHaveClass('helperText--error')
  })

  it('handles disabled state correctly', () => {
    render(<DatePicker disabled data-testid="datepicker" />)
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toBeDisabled()
    expect(datePicker).toHaveClass('datePicker--disabled')
  })

  it('applies fullWidth class when specified', () => {
    render(<DatePicker fullWidth data-testid="datepicker" />)
    const container = screen.getByTestId('datepicker').parentElement

    expect(container).toHaveClass('datePickerContainer--fullWidth')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<DatePicker ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies custom className correctly', () => {
    const customClass = 'custom-datepicker'
    render(<DatePicker className={customClass} data-testid="datepicker" />)
    const container = screen.getByTestId('datepicker').parentElement

    expect(container).toHaveClass(customClass)
  })

  it('generates unique IDs when not provided', () => {
    render(
      <div>
        <DatePicker data-testid="datepicker1" />
        <DatePicker data-testid="datepicker2" />
      </div>
    )
    const datePicker1 = screen.getByTestId('datepicker1')
    const datePicker2 = screen.getByTestId('datepicker2')

    expect(datePicker1.id).toBeTruthy()
    expect(datePicker2.id).toBeTruthy()
    expect(datePicker1.id).not.toBe(datePicker2.id)
  })

  it('uses provided ID when specified', () => {
    render(<DatePicker id="custom-id" data-testid="datepicker" />)
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toHaveAttribute('id', 'custom-id')
  })

  it('associates helper text with input via aria-describedby', () => {
    render(
      <DatePicker
        id="test-datepicker"
        helperText="Select a date"
        data-testid="datepicker"
      />
    )
    const datePicker = screen.getByTestId('datepicker')
    const helperText = screen.getByText('Select a date')

    expect(datePicker).toHaveAttribute(
      'aria-describedby',
      'test-datepicker-helper-text'
    )
    expect(helperText).toHaveAttribute('id', 'test-datepicker-helper-text')
  })

  it('applies min and max constraints correctly', () => {
    render(
      <DatePicker min="2024-01-01" max="2024-12-31" data-testid="datepicker" />
    )
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toHaveAttribute('min', '2024-01-01')
    expect(datePicker).toHaveAttribute('max', '2024-12-31')
  })

  it('passes through additional HTML attributes', () => {
    render(
      <DatePicker placeholder="Select date" required data-testid="datepicker" />
    )
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toHaveAttribute('placeholder', 'Select date')
    expect(datePicker).toBeRequired()
  })

  it('has proper semantic structure', () => {
    render(<DatePicker data-testid="datepicker" />)
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker.tagName).toBe('INPUT')
    expect(datePicker).toHaveAttribute('type', 'date')
  })

  it('handles empty value correctly', () => {
    const handleChange = vi.fn()
    render(
      <DatePicker
        value="2024-01-15"
        onChange={handleChange}
        data-testid="datepicker"
      />
    )
    const datePicker = screen.getByTestId('datepicker')

    fireEvent.change(datePicker, { target: { value: '' } })

    expect(handleChange).toHaveBeenCalledWith('')
  })

  it('maintains accessibility with screen readers', () => {
    render(
      <DatePicker
        error
        helperText="Invalid date selected"
        data-testid="datepicker"
      />
    )
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toHaveAttribute('aria-invalid', 'true')
    expect(datePicker).toHaveAttribute('aria-describedby')
  })

  it('applies correct classes for different states', () => {
    const { rerender } = render(
      <DatePicker
        size="large"
        error
        disabled
        fullWidth
        className="custom-class"
        data-testid="datepicker"
      />
    )

    const datePicker = screen.getByTestId('datepicker')
    const container = datePicker.parentElement

    expect(datePicker).toHaveClass('datePicker')
    expect(datePicker).toHaveClass('datePicker--large')
    expect(datePicker).toHaveClass('datePicker--error')
    expect(datePicker).toHaveClass('datePicker--disabled')
    expect(container).toHaveClass('datePickerContainer')
    expect(container).toHaveClass('datePickerContainer--fullWidth')
    expect(container).toHaveClass('custom-class')

    // Test without optional props
    rerender(<DatePicker data-testid="datepicker" />)
    const normalDatePicker = screen.getByTestId('datepicker')
    const normalContainer = normalDatePicker.parentElement

    expect(normalDatePicker).toHaveClass('datePicker')
    expect(normalDatePicker).toHaveClass('datePicker--medium') // default size
    expect(normalContainer).toHaveClass('datePickerContainer')
  })

  it('does not break with undefined props', () => {
    render(
      <DatePicker
        value={undefined}
        onChange={undefined}
        helperText={undefined}
        data-testid="datepicker"
      />
    )
    const datePicker = screen.getByTestId('datepicker')

    expect(datePicker).toBeInTheDocument()
    expect(datePicker).toHaveValue('')
  })

  it('has correct display name', () => {
    expect(DatePicker.displayName).toBe('DatePicker')
  })
})
