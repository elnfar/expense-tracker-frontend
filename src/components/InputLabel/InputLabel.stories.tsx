import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputLabel } from './InputLabel'

const meta: Meta<typeof InputLabel> = {
  title: 'Components/InputLabel',
  component: InputLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The InputLabel component provides consistent, accessible labeling for form inputs across the application.

## Features
- Three size variants (small, medium, large)
- Required field indicator with asterisk
- Disabled state styling
- Proper accessibility attributes
- Dark mode and high contrast support
- Semantic HTML with label element
- Hover and focus states
- Print-friendly styling
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the label',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the label should be disabled (grayed out)',
    },
    htmlFor: {
      control: 'text',
      description: 'The ID of the form element this label is for',
    },
    children: {
      control: 'text',
      description: 'Label content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible description for screen readers',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default label with medium size
 */
export const Default: Story = {
  args: {
    children: 'Label Text',
    size: 'medium',
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
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <InputLabel size="small">Small Label</InputLabel>
        <input
          type="text"
          placeholder="Input field"
          style={{
            padding: '0.25rem 0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '0.75rem',
          }}
        />
      </div>
      <div>
        <InputLabel size="medium">Medium Label</InputLabel>
        <input
          type="text"
          placeholder="Input field"
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
        />
      </div>
      <div>
        <InputLabel size="large">Large Label</InputLabel>
        <input
          type="text"
          placeholder="Input field"
          style={{
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'InputLabel component in different sizes: small, medium, and large.',
      },
    },
  },
}

/**
 * Required field indicators
 */
export const RequiredFields: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="name" required>
          Full Name
        </InputLabel>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="email" required>
          Email Address
        </InputLabel>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="optional">Optional Field</InputLabel>
        <input
          id="optional"
          type="text"
          placeholder="This field is optional"
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Labels with required field indicators. Required fields show a red asterisk.',
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
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <InputLabel htmlFor="normal">Normal State</InputLabel>
        <input
          id="normal"
          type="text"
          placeholder="Normal input"
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '250px',
          }}
        />
      </div>
      <div>
        <InputLabel htmlFor="disabled" disabled>
          Disabled State
        </InputLabel>
        <input
          id="disabled"
          type="text"
          placeholder="Disabled input"
          disabled
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '250px',
            backgroundColor: '#f9fafb',
            color: '#9ca3af',
          }}
        />
      </div>
      <div>
        <InputLabel htmlFor="required-disabled" required disabled>
          Required but Disabled
        </InputLabel>
        <input
          id="required-disabled"
          type="text"
          placeholder="Required but disabled"
          disabled
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            width: '250px',
            backgroundColor: '#f9fafb',
            color: '#9ca3af',
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'InputLabel component in different states: normal, disabled, and required with disabled.',
      },
    },
  },
}

/**
 * Form examples matching design screenshots
 */
export const FormExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'flex-start',
        maxWidth: '400px',
      }}
    >
      {/* Search Input with Icon */}
      <div style={{ width: '100%' }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280',
              pointerEvents: 'none',
            }}
          >
            🔍
          </div>
          <input
            type="text"
            placeholder="Bank"
            style={{
              width: '100%',
              padding: '12px 40px 12px 40px',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            }}
          />
          <button
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Simple Text Inputs */}
      <div style={{ width: '100%' }}>
        <input
          type="text"
          placeholder="Text input"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
          }}
        />
      </div>

      {/* Password Field with Dropdown */}
      <div style={{ width: '100%' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            }}
          />
          <button
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
            }}
          >
            ▼
          </button>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#3629B7',
            marginTop: '8px',
            fontWeight: '500',
          }}
        >
          Caption
        </div>
      </div>

      {/* Another Password Field */}
      <div style={{ width: '100%' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            }}
          />
          <button
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
            }}
          >
            ▼
          </button>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#3629B7',
            marginTop: '8px',
            fontWeight: '500',
          }}
        >
          Caption
        </div>
      </div>

      {/* Simple Text Input */}
      <div style={{ width: '100%' }}>
        <input
          type="text"
          placeholder="Text input"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
          }}
        />
      </div>

      {/* Examples with Labels - Proper Stacking */}
      <div style={{ width: '100%', marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>
          Proper Label Stacking
        </h3>

        <div style={{ marginBottom: '1.5rem' }}>
          <InputLabel htmlFor="labeled-input1">Label</InputLabel>
          <input
            id="labeled-input1"
            type="text"
            placeholder="Text input"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            }}
          />
          <div
            style={{
              fontSize: '12px',
              color: '#3629B7',
              marginTop: '8px',
              fontWeight: '500',
            }}
          >
            Caption
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <InputLabel htmlFor="labeled-input2">Label</InputLabel>
          <div style={{ position: 'relative' }}>
            <input
              id="labeled-input2"
              type="text"
              placeholder="Text input"
              style={{
                width: '100%',
                padding: '12px 40px 12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '24px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff',
              }}
            />
            <button
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
              }}
            >
              ▼
            </button>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#3629B7',
              marginTop: '8px',
              fontWeight: '500',
            }}
          >
            Caption
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <InputLabel htmlFor="labeled-input3" required>
            Required Field
          </InputLabel>
          <input
            id="labeled-input3"
            type="email"
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#ffffff',
            }}
          />
        </div>

        {/* Currency Input Field (From Design) */}
        <div style={{ width: '100%', marginTop: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>
            Currency Input Design
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <InputLabel htmlFor="amount-input">From</InputLabel>
            <div
              style={{
                display: 'flex',
                border: '1px solid #e5e7eb',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <input
                id="amount-input"
                type="text"
                placeholder="Text input"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  borderRadius: '24px 0 0 24px',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderLeft: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  minWidth: '80px',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '14px', color: '#374151' }}>USD</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ marginLeft: '8px' }}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Another example with different currency */}
          <div style={{ marginBottom: '1.5rem' }}>
            <InputLabel htmlFor="amount-input2">From</InputLabel>
            <div
              style={{
                display: 'flex',
                border: '1px solid #e5e7eb',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <input
                id="amount-input2"
                type="text"
                placeholder="Text input"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  borderRadius: '24px 0 0 24px',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderLeft: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  minWidth: '80px',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '14px', color: '#374151' }}>USD</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ marginLeft: '8px' }}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form examples matching the design screenshots with proper styling and layout, including compound currency input.',
      },
    },
  },
}

/**
 * Accessibility demonstration
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <h3>Proper Label Association</h3>
        <div style={{ marginBottom: '1rem' }}>
          <InputLabel htmlFor="accessible-input">
            Username (properly associated)
          </InputLabel>
          <input
            id="accessible-input"
            type="text"
            placeholder="Enter username"
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              width: '250px',
            }}
          />
        </div>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Clicking the label will focus the input field
        </p>
      </div>

      <div>
        <h3>Required Field Indicators</h3>
        <div style={{ marginBottom: '1rem' }}>
          <InputLabel
            htmlFor="required-field"
            required
            ariaLabel="Email address, required field"
          >
            Email Address
          </InputLabel>
          <input
            id="required-field"
            type="email"
            placeholder="Enter email"
            required
            aria-describedby="email-help"
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              width: '250px',
            }}
          />
          <div
            id="email-help"
            style={{
              fontSize: '0.75rem',
              color: '#666',
              marginTop: '0.25rem',
            }}
          >
            We&apos;ll never share your email address
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Required fields are announced to screen readers
        </p>
      </div>

      <div>
        <h3>Custom ARIA Labels</h3>
        <div style={{ marginBottom: '1rem' }}>
          <InputLabel
            htmlFor="custom-aria"
            ariaLabel="Password field with special requirements"
          >
            Password
          </InputLabel>
          <input
            id="custom-aria"
            type="password"
            placeholder="Enter password"
            aria-describedby="password-requirements"
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              width: '250px',
            }}
          />
          <div
            id="password-requirements"
            style={{
              fontSize: '0.75rem',
              color: '#666',
              marginTop: '0.25rem',
            }}
          >
            Must be at least 8 characters with numbers and symbols
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Custom aria-label provides additional context for screen readers
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples showing proper accessibility implementation with label associations and ARIA attributes.',
      },
    },
  },
}
