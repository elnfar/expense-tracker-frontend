import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Logo component displays the Expense Tracker application logo with various size options and interactive states.

## Features
- Multiple size variants (small, medium, large, xlarge)
- Can render as div, button, or link
- Fully accessible with proper ARIA attributes
- Responsive design with CSS modules
- Support for icon-only display
- Keyboard navigation support
- Dark mode and high contrast support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size variant of the logo',
    },
    as: {
      control: 'select',
      options: ['div', 'button', 'a'],
      description: 'HTML element to render as',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the logo image',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    inline: {
      control: 'boolean',
      description: 'Whether the logo should be displayed inline',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether to show only the icon without text',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default logo with medium size
 */
export const Default: Story = {
  args: {
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
        gap: '2rem',
        alignItems: 'flex-start',
      }}
    >
      <Logo size="small" />
      <Logo size="medium" />
      <Logo size="large" />
      <Logo size="xlarge" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Logo component in different sizes: small, medium, large, and xlarge.',
      },
    },
  },
}

/**
 * Icon-only variants
 */
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Logo size="small" iconOnly />
      <Logo size="medium" iconOnly />
      <Logo size="large" iconOnly />
      <Logo size="xlarge" iconOnly />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Logo component showing only the icon without text in different sizes.',
      },
    },
  },
}

/**
 * Interactive button variant
 */
export const AsButton: Story = {
  args: {
    as: 'button',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Logo rendered as a clickable button with hover and focus states.',
      },
    },
  },
}

/**
 * Link variant
 */
export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo rendered as a link with proper accessibility attributes.',
      },
    },
  },
}

/**
 * Inline variant
 */
export const Inline: Story = {
  render: () => (
    <p style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>
      Welcome to <Logo size="small" inline /> application for managing your
      expenses efficiently.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo component displayed inline within text content.',
      },
    },
  },
}

/**
 * Interactive states demonstration
 */
export const InteractiveStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo as="button" size="medium" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Hover me!
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo as="a" href="#" size="medium" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          I&apos;m a link!
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="medium" onClick={() => alert('Clicked!')} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Click me!
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different interactive states of the Logo component.',
      },
    },
  },
}

/**
 * Custom styling example
 */
export const CustomStyling: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
      }}
    >
      <Logo
        size="large"
        className="custom-logo"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          color: 'white',
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo component with custom styling and background.',
      },
    },
  },
}
