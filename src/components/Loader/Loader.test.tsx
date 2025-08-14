/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loader } from './Loader'

describe('Loader Component', () => {
  it('renders with default props', () => {
    render(<Loader />)

    const loader = screen.getByRole('progressbar')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveAttribute('aria-label', 'Loading')
    expect(loader).toHaveAttribute('aria-busy', 'true')
    expect(loader).toHaveAttribute('aria-live', 'polite')
  })

  it('renders with custom aria label', () => {
    const customLabel = 'Loading data from server'
    render(<Loader ariaLabel={customLabel} />)

    const loader = screen.getByRole('progressbar')
    expect(loader).toHaveAttribute('aria-label', customLabel)
  })

  it('renders different size variants correctly', () => {
    const { rerender } = render(<Loader size="small" />)
    let container = screen.getByRole('progressbar').parentElement
    expect(container).toHaveClass('loader--small')

    rerender(<Loader size="large" />)
    container = screen.getByRole('progressbar').parentElement
    expect(container).toHaveClass('loader--large')

    rerender(<Loader size="xlarge" />)
    container = screen.getByRole('progressbar').parentElement
    expect(container).toHaveClass('loader--xlarge')
  })

  it('renders different color variants correctly', () => {
    const { rerender } = render(<Loader variant="primary" />)
    let spinner = screen.getByRole('progressbar')
    expect(spinner).toHaveClass('spinner--primary')

    rerender(<Loader variant="success" />)
    spinner = screen.getByRole('progressbar')
    expect(spinner).toHaveClass('spinner--success')

    rerender(<Loader variant="danger" />)
    spinner = screen.getByRole('progressbar')
    expect(spinner).toHaveClass('spinner--danger')
  })

  it('renders loading text when provided', () => {
    const loadingText = 'Processing your request...'
    render(<Loader text={loadingText} />)

    const textElement = screen.getByText(loadingText)
    expect(textElement).toBeInTheDocument()
    expect(textElement).toHaveAttribute('aria-live', 'polite')
  })

  it('does not render text when not provided', () => {
    render(<Loader />)

    const textElement = screen.queryByText(/loading/i)
    expect(textElement).not.toBeInTheDocument()
  })

  it('renders as overlay when overlay prop is true', () => {
    render(<Loader overlay />)

    const loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveClass('loader--overlay')
  })

  it('applies centered class by default', () => {
    render(<Loader />)

    const loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveClass('loader--centered')
  })

  it('does not apply centered class when centered is false', () => {
    render(<Loader centered={false} />)

    const loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).not.toHaveClass('loader--centered')
  })

  it('applies custom className', () => {
    const customClass = 'custom-loader-class'
    render(<Loader className={customClass} />)

    const loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveClass(customClass)
  })

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red', padding: '20px' }
    render(<Loader style={customStyle} />)

    const loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveStyle('background-color: rgb(255, 0, 0)')
    expect(loaderContainer).toHaveStyle('padding: 20px')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Loader ref={ref} />)

    expect(ref).toHaveBeenCalled()
  })

  it('applies test id when provided', () => {
    const testId = 'loader-test-id'
    render(<Loader testId={testId} />)

    const loaderContainer = screen.getByTestId(testId)
    expect(loaderContainer).toBeInTheDocument()
  })

  it('renders different animation speeds correctly', () => {
    const { rerender } = render(<Loader speed="slow" />)
    let loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveClass('loader--slow')

    rerender(<Loader speed="fast" />)
    loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveClass('loader--fast')

    rerender(<Loader speed="normal" />)
    loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveClass('loader--normal')
  })

  it('does not render when visible is false', () => {
    render(<Loader visible={false} />)

    const loader = screen.queryByRole('progressbar')
    expect(loader).not.toBeInTheDocument()
  })

  it('renders when visible is true', () => {
    render(<Loader visible={true} />)

    const loader = screen.getByRole('progressbar')
    expect(loader).toBeInTheDocument()
  })

  it('renders correct number of spinner dots', () => {
    render(<Loader />)

    const spinner = screen.getByRole('progressbar')
    const dots = spinner.querySelectorAll('.spinnerDot')
    expect(dots).toHaveLength(8)
  })

  it('has proper semantic structure', () => {
    render(<Loader text="Loading..." />)

    // Check that progressbar role is present
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toBeInTheDocument()

    // Check aria attributes
    expect(progressbar).toHaveAttribute('aria-busy', 'true')
    expect(progressbar).toHaveAttribute('aria-live', 'polite')

    // Check text has aria-live
    const text = screen.getByText('Loading...')
    expect(text).toHaveAttribute('aria-live', 'polite')
  })

  it('passes through additional props', () => {
    render(<Loader data-custom="test-value" />)

    const loaderContainer = screen.getByRole('progressbar').closest('.loader')
    expect(loaderContainer).toHaveAttribute('data-custom', 'test-value')
  })

  it('applies all variant classes correctly for large success loader', () => {
    render(
      <Loader size="large" variant="success" speed="fast" overlay centered />
    )

    const loaderContainer = screen.getByRole('progressbar').closest('.loader')
    const spinner = screen.getByRole('progressbar')

    expect(loaderContainer).toHaveClass('loader--fast')
    expect(loaderContainer).toHaveClass('loader--overlay')
    expect(loaderContainer).toHaveClass('loader--centered')
    expect(spinner).toHaveClass('spinner--large')
    expect(spinner).toHaveClass('spinner--success')
  })
})
