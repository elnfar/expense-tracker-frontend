import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import React from 'react'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable input component with validation and style support. Supports various input types, sizes, error states, helper text, and icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the input',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for the input',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the value changes',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default input with basic styling
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

/**
 * Different input sizes
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <Input size="small" placeholder="Small input" />
      <Input size="medium" placeholder="Medium input (default)" />
      <Input size="large" placeholder="Large input" />
    </div>
  ),
}

/**
 * Different input types
 */
export const Types: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
    </div>
  ),
}

/**
 * Error state with helper text
 */
export const Error: Story = {
  args: {
    error: true,
    helperText: 'This field is required',
    placeholder: 'Enter required field',
  },
}

/**
 * Success state with helper text
 */
export const WithHelperText: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <Input placeholder="Valid input" helperText="This looks good!" />
      <Input
        error
        placeholder="Invalid input"
        helperText="This field is required"
      />
      <Input
        disabled
        placeholder="Disabled input"
        helperText="This field is disabled"
      />
    </div>
  ),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    helperText: 'This input is disabled',
  },
}

/**
 * Full width input
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
  decorators: [
    Story => (
      <div style={{ width: '500px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Input with icons
 */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '300px',
      }}
    >
      <Input
        startIcon={
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        }
        placeholder="Search..."
        type="search"
      />
      <Input
        endIcon={
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        }
        placeholder="Enter text..."
        helperText="Click the X to clear"
      />
      <Input
        startIcon={
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        }
        endIcon={
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        }
        placeholder="Category"
        helperText="Select a category"
      />
    </div>
  ),
}

/**
 * Form validation examples
 */
export const FormValidation: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minWidth: '350px',
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>
        Form Validation Examples
      </h3>

      <div>
        <Input
          type="text"
          placeholder="Enter your name"
          helperText="Full name is required"
        />
      </div>

      <div>
        <Input
          type="email"
          placeholder="Enter your email"
          error
          helperText="Please enter a valid email address"
        />
      </div>

      <div>
        <Input
          type="password"
          placeholder="Enter password"
          helperText="Must be at least 8 characters"
        />
      </div>

      <div>
        <Input
          type="password"
          placeholder="Confirm password"
          error
          helperText="Passwords do not match"
        />
      </div>

      <div>
        <Input
          type="tel"
          placeholder="Phone number"
          startIcon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                clipRule="evenodd"
              />
            </svg>
          }
          helperText="Include country code"
        />
      </div>
    </div>
  ),
}

/**
 * Interactive form example
 */
export const InteractiveForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const [errors, setErrors] = React.useState<Record<string, string>>({})

    const handleChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData(prev => ({ ...prev, [field]: value }))

        // Simple validation
        const newErrors = { ...errors }

        if (field === 'name' && value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else if (field === 'name') {
          delete newErrors.name
        }

        if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Please enter a valid email'
        } else if (field === 'email') {
          delete newErrors.email
        }

        if (field === 'password' && value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters'
        } else if (field === 'password') {
          delete newErrors.password
        }

        if (field === 'confirmPassword' && value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match'
        } else if (field === 'confirmPassword') {
          delete newErrors.confirmPassword
        }

        setErrors(newErrors)
      }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          minWidth: '350px',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>
          Interactive Form
        </h3>

        <Input
          type="text"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange('name')}
          error={!!errors.name}
          helperText={errors.name || 'Enter your full name'}
        />

        <Input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email || 'We&apos;ll never share your email'}
          startIcon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          helperText={errors.password || 'Must be at least 6 characters'}
          startIcon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
          }
        />

        <Input
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword || 'Re-enter your password'}
          startIcon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
          }
        />

        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
          }}
        >
          <h4
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '0.875rem',
              color: '#374151',
            }}
          >
            Form Data:
          </h4>
          <pre style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    )
  },
}

/**
 * Different states showcase
 */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        padding: '1rem',
      }}
    >
      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            color: '#374151',
          }}
        >
          Normal States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input placeholder="Default" />
          <Input placeholder="With value" defaultValue="Sample text" />
          <Input placeholder="With helper" helperText="Helper text" />
        </div>
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            color: '#374151',
          }}
        >
          Error States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input placeholder="Error" error />
          <Input
            placeholder="Error with text"
            error
            helperText="Error message"
          />
          <Input
            placeholder="Error with value"
            error
            defaultValue="Invalid value"
            helperText="This is invalid"
          />
        </div>
      </div>

      <div>
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            color: '#374151',
          }}
        >
          Disabled States
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input placeholder="Disabled" disabled />
          <Input
            placeholder="Disabled with value"
            disabled
            defaultValue="Cannot edit"
          />
          <Input
            placeholder="Disabled with helper"
            disabled
            helperText="This is disabled"
          />
        </div>
      </div>
    </div>
  ),
}
