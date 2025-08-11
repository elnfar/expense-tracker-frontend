import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Button component provides a consistent, accessible button interface across the application with multiple customization options.

## Features
- Multiple visual variants (primary, secondary, success, warning, danger, ghost, link)
- Three size options (small, medium, large)
- Loading and active states
- Icon support (start and end icons)
- Full width option
- Comprehensive accessibility support with ARIA attributes
- Dark mode and reduced motion support
- Responsive design
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'ghost',
        'link',
        'light',
      ],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    active: {
      control: 'boolean',
      description:
        'Whether the button is in an active state (pressed/selected)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width of its container',
    },
    iconOnly: {
      control: 'boolean',
      description:
        'Whether the button should be rendered as icon-only (circular)',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default button with medium size and primary variant
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
  },
}

/**
 * Different visual variants
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="light">Light</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Button component in different visual variants for various contexts and actions.',
      },
    },
  },
}

/**
 * Different size variants
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button component in different sizes: small, medium, and large.',
      },
    },
  },
}

/**
 * Different states
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button>Normal</Button>
      <Button active>Active</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Button component in different states: normal, active, disabled, and loading.',
      },
    },
  },
}

/**
 * Icon-only buttons (circular)
 */
export const IconOnly: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, minWidth: '100px' }}>Primary & Light:</h4>
        <Button
          iconOnly
          variant="primary"
          size="small"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          }
          ariaLabel="Add item"
        />
        <Button
          iconOnly
          variant="primary"
          size="medium"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          }
          ariaLabel="Next"
        />
        <Button
          iconOnly
          variant="primary"
          size="large"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          }
          ariaLabel="Close"
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, minWidth: '100px' }}>Light variant:</h4>
        <Button
          iconOnly
          variant="light"
          size="small"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          }
          ariaLabel="Add item"
        />
        <Button
          iconOnly
          variant="light"
          size="medium"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          }
          ariaLabel="Next"
        />
        <Button
          iconOnly
          variant="light"
          size="large"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          }
          ariaLabel="Close"
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, minWidth: '100px' }}>States:</h4>
        <Button
          iconOnly
          variant="primary"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          }
          ariaLabel="Add item"
        />
        <Button
          iconOnly
          variant="primary"
          active
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          }
          ariaLabel="Add item (active)"
        />
        <Button
          iconOnly
          variant="primary"
          disabled
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          }
          ariaLabel="Add item (disabled)"
        />
        <Button
          iconOnly
          variant="primary"
          loading
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          }
          ariaLabel="Add item (loading)"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only buttons rendered as circles, perfect for actions like add, close, next, etc. Available in both primary and light variants.',
      },
    },
  },
}

/**
 * Buttons with icons
 */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          }
        >
          Add Item
        </Button>
        <Button
          variant="danger"
          startIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          }
        >
          Delete
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button
          variant="secondary"
          endIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          }
        >
          Next
        </Button>
        <Button
          variant="ghost"
          endIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" />
            </svg>
          }
        >
          Open External
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Button component with start and end icons to provide visual context.',
      },
    },
  },
}

/**
 * Full width button
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Button fullWidth variant="primary">
        Full Width Button
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button component that takes the full width of its container.',
      },
    },
  },
}

/**
 * Loading states for different variants
 */
export const LoadingStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button loading variant="primary">
        Processing...
      </Button>
      <Button loading variant="secondary">
        Saving...
      </Button>
      <Button loading variant="success">
        Uploading...
      </Button>
      <Button loading variant="danger">
        Deleting...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button component in loading state with different variants.',
      },
    },
  },
}

/**
 * Form buttons demonstration
 */
export const FormButtons: Story = {
  render: () => (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
        padding: '1rem',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
      }}
      onSubmit={e => {
        e.preventDefault()
        alert('Form submitted!')
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0' }}>Contact Form</h3>

      <input
        type="text"
        placeholder="Your name"
        style={{
          padding: '0.75rem',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
        }}
      />

      <textarea
        placeholder="Your message"
        rows={4}
        style={{
          padding: '0.75rem',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          resize: 'vertical',
        }}
      />

      <div
        style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}
      >
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of button usage in a form context with different types.',
      },
    },
  },
}

/**
 * Accessibility demonstration
 */
export const AccessibilityDemo: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState(false)
    const [pressed, setPressed] = React.useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Button with Custom ARIA Label</h3>
          <Button
            ariaLabel="Close dialog window"
            variant="secondary"
            size="small"
          >
            ×
          </Button>
          <p
            style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}
          >
            Uses aria-label for screen reader context when button text
            isn&apos;t descriptive
          </p>
        </div>

        <div>
          <h3>Toggle Button (aria-pressed)</h3>
          <Button
            variant={pressed ? 'primary' : 'secondary'}
            ariaPressed={pressed}
            onClick={() => setPressed(!pressed)}
          >
            {pressed ? 'Enabled' : 'Disabled'} Feature
          </Button>
          <p
            style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}
          >
            Current state: {pressed ? 'pressed' : 'not pressed'}
          </p>
        </div>

        <div>
          <h3>Expandable Control (aria-expanded)</h3>
          <Button
            variant="ghost"
            ariaExpanded={expanded}
            ariaControls="expandable-content"
            onClick={() => setExpanded(!expanded)}
            endIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            }
          >
            {expanded ? 'Hide' : 'Show'} Details
          </Button>
          {expanded && (
            <div
              id="expandable-content"
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              This content is controlled by the button above.
            </div>
          )}
        </div>

        <div>
          <h3>Menu Button (aria-haspopup)</h3>
          <Button
            variant="secondary"
            ariaHaspopup="menu"
            endIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            }
          >
            Options
          </Button>
          <p
            style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}
          >
            Indicates this button opens a menu
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Examples showing proper accessibility implementation with ARIA attributes.',
      },
    },
  },
}

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const handleIncrement = async () => {
      setLoading(true)
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCount(count + 1)
      setLoading(false)
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Counter: {count}</h3>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Button
            variant="danger"
            onClick={() => setCount(0)}
            disabled={count === 0}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            onClick={() => setCount(count - 1)}
            disabled={count === 0}
          >
            Decrement
          </Button>
          <Button variant="primary" onClick={handleIncrement} loading={loading}>
            {loading ? 'Adding...' : 'Increment'}
          </Button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example demonstrating button states and user interactions.',
      },
    },
  },
}
