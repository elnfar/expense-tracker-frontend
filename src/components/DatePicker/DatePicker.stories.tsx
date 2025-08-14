import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './DatePicker'
import React from 'react'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable DatePicker component using native HTML5 date input with custom styling. Supports validation, different sizes, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The selected date value (ISO date string: YYYY-MM-DD)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the date changes',
    },
    error: {
      control: 'boolean',
      description: 'Whether the date picker is in an error state',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the date picker',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the date picker should take the full width of its container',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size variant of the date picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    min: {
      control: 'text',
      description: 'Minimum selectable date (ISO date string: YYYY-MM-DD)',
    },
    max: {
      control: 'text',
      description: 'Maximum selectable date (ISO date string: YYYY-MM-DD)',
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithValue: Story = {
  args: {
    value: '2024-01-15',
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Select a date',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Small
        </label>
        <DatePicker size="small" value="2024-01-15" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Medium (Default)
        </label>
        <DatePicker size="medium" value="2024-01-15" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Large
        </label>
        <DatePicker size="large" value="2024-01-15" />
      </div>
    </div>
  ),
}

export const WithError: Story = {
  args: {
    value: '2024-01-15',
    error: true,
    helperText: 'This date is not available',
  },
}

export const WithHelperText: Story = {
  args: {
    value: '2024-01-15',
    helperText: 'Select your preferred date',
  },
}

export const Disabled: Story = {
  args: {
    value: '2024-01-15',
    disabled: true,
    helperText: 'Date selection is currently disabled',
  },
}

export const FullWidth: Story = {
  args: {
    value: '2024-01-15',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
}

export const WithConstraints: Story = {
  args: {
    value: '2024-06-15',
    min: '2024-01-01',
    max: '2024-12-31',
    helperText: 'Select a date in 2024',
  },
}

export const FormValidation: Story = {
  render: () => {
    const [date, setDate] = React.useState('')
    const [error, setError] = React.useState(false)

    const handleDateChange = (newDate: string) => {
      setDate(newDate)
      // Simple validation: check if date is in the future
      const selectedDate = new Date(newDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      setError(selectedDate < today)
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Select a future date
          </label>
          <DatePicker
            value={date}
            onChange={handleDateChange}
            error={error}
            helperText={
              error
                ? 'Please select a date in the future'
                : 'Date must be today or later'
            }
          />
        </div>
      </div>
    )
  },
}

export const InteractiveForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      startDate: '',
      endDate: '',
    })

    const handleStartDateChange = (date: string) => {
      setFormData(prev => ({ ...prev, startDate: date }))
    }

    const handleEndDateChange = (date: string) => {
      setFormData(prev => ({ ...prev, endDate: date }))
    }

    const isEndDateError =
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate

    return (
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: '300px',
        }}
      >
        <div>
          <label
            htmlFor="start-date"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Start Date
          </label>
          <DatePicker
            id="start-date"
            value={formData.startDate}
            onChange={handleStartDateChange}
            fullWidth
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            End Date
          </label>
          <DatePicker
            id="end-date"
            value={formData.endDate}
            onChange={handleEndDateChange}
            min={formData.startDate || undefined}
            error={!!isEndDateError}
            helperText={
              isEndDateError
                ? 'End date must be after start date'
                : 'Select an end date'
            }
            fullWidth
          />
        </div>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '0.875rem',
          }}
        >
          <strong>Selected Range:</strong>
          <br />
          Start: {formData.startDate || 'Not selected'}
          <br />
          End: {formData.endDate || 'Not selected'}
        </div>
      </form>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        padding: '1rem',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>Normal</h3>
        <DatePicker value="2024-01-15" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>With Helper Text</h3>
        <DatePicker
          value="2024-01-15"
          helperText="Select your preferred date"
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>Error State</h3>
        <DatePicker
          value="2024-01-15"
          error
          helperText="This date is not available"
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>Disabled</h3>
        <DatePicker
          value="2024-01-15"
          disabled
          helperText="Date selection disabled"
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>Small Size</h3>
        <DatePicker value="2024-01-15" size="small" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>Large Size</h3>
        <DatePicker value="2024-01-15" size="large" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>With Constraints</h3>
        <DatePicker
          value="2024-06-15"
          min="2024-01-01"
          max="2024-12-31"
          helperText="Only 2024 dates allowed"
        />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>Empty</h3>
        <DatePicker placeholder="Select date" />
      </div>
    </div>
  ),
}
