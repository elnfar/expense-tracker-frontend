import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Loader component provides a consistent loading indicator across the application with multiple customization options.

## Features
- Multiple size variants (small, medium, large, xlarge)
- Color variants (primary, secondary, success, warning, danger)
- Animation speed control (slow, normal, fast)
- Overlay mode for full-screen loading
- Accessible with proper ARIA attributes
- Loading text support
- Dark mode and reduced motion support
- Responsive design
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size variant of the loader',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color variant of the loader',
    },
    text: {
      control: 'text',
      description: 'Loading text to display below the spinner',
    },
    overlay: {
      control: 'boolean',
      description: 'Whether to show as an overlay covering the entire screen',
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the loader in its container',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Speed of the animation',
    },
    visible: {
      control: 'boolean',
      description: 'Whether the loader is currently visible',
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
 * Default loader with medium size and primary color
 */
export const Default: Story = {
  args: {
    size: 'medium',
    variant: 'primary',
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
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Loader size="small" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Small
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader size="medium" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Medium
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader size="large" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Large
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader size="xlarge" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          XLarge
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Loader component in different sizes: small, medium, large, and xlarge.',
      },
    },
  },
}

/**
 * Different color variants
 */
export const ColorVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Loader variant="primary" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Primary
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader variant="secondary" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Secondary
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader variant="success" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Success
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader variant="warning" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Warning
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader variant="danger" />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Danger
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Loader component in different color variants for various contexts.',
      },
    },
  },
}

/**
 * Loader with text
 */
export const WithText: Story = {
  args: {
    text: 'Loading your data...',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader component with descriptive text to provide context to users.',
      },
    },
  },
}

/**
 * Different animation speeds
 */
export const AnimationSpeeds: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Loader speed="slow" text="Slow" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader speed="normal" text="Normal" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loader speed="fast" text="Fast" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Loader component with different animation speeds for various use cases.',
      },
    },
  },
}

/**
 * Overlay loader (use with caution in Storybook)
 */
export const OverlayMode: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '300px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
        Content behind overlay
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <Loader text="Processing..." size="large" centered={false} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Loader component in overlay mode, typically used for full-screen loading states.',
      },
    },
  },
}

/**
 * Loading states for different contexts
 */
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div
        style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>Data Loading</h3>
        <Loader
          size="small"
          variant="primary"
          text="Fetching data..."
          centered={false}
        />
      </div>

      <div
        style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>Form Submission</h3>
        <Loader
          size="medium"
          variant="success"
          text="Saving changes..."
          centered={false}
        />
      </div>

      <div
        style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0' }}>File Upload</h3>
        <Loader
          size="large"
          variant="warning"
          text="Uploading file..."
          speed="slow"
          centered={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples of loader component used in different application contexts.',
      },
    },
  },
}

/**
 * Accessibility demonstration
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Standard Loader</h3>
        <Loader ariaLabel="Loading content" text="Please wait..." />
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
          Uses aria-label=&quot;Loading content&quot; and
          aria-live=&quot;polite&quot;
        </p>
      </div>

      <div>
        <h3>Custom Accessibility Label</h3>
        <Loader
          ariaLabel="Processing your payment, please do not close this page"
          text="Processing payment..."
          variant="warning"
        />
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
          Custom aria-label provides specific context for screen readers
        </p>
      </div>
    </div>
  ),
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
 * Conditional visibility
 */
export const ConditionalVisibility: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(true)

    return (
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setLoading(!loading)}
          style={{
            padding: '0.5rem 1rem',
            marginBottom: '2rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Hide Loader' : 'Show Loader'}
        </button>

        <div
          style={{
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader
            visible={loading}
            text={loading ? 'Loading...' : ''}
            size="large"
          />
          {!loading && (
            <p style={{ color: '#28a745', fontWeight: 'bold' }}>
              ✅ Content loaded successfully!
            </p>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating conditional visibility of the loader component.',
      },
    },
  },
}
