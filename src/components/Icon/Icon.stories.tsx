import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { iconRegistry } from '../../assets/icons/registry'
import React from 'react'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable Icon component for rendering SVG icons. Supports various sizes, colors, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: Object.keys(iconRegistry),
      description: 'The name of the icon to render',
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 1 },
      description: 'The size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'The color of the icon (CSS color value)',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the icon',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default icon with basic styling
 */
export const Default: Story = {
  args: {
    iconName: 'plus',
  },
}

/**
 * Icon with custom size and color
 */
export const CustomSizeAndColor: Story = {
  args: {
    iconName: 'search',
    size: 32,
    color: '#3629B7',
  },
}

/**
 * Icon with accessibility label
 */
export const WithAccessibilityLabel: Story = {
  args: {
    iconName: 'close',
    size: 24,
    'aria-label': 'Close dialog',
  },
}

/**
 * Different icon sizes
 */
export const Sizes: Story = {
  args: { iconName: 'star' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="star" size={16} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>16px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="star" size={24} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>24px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="star" size={32} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>32px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="star" size={48} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>48px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="star" size={64} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>64px</div>
      </div>
    </div>
  ),
}

/**
 * Different colors
 */
export const Colors: Story = {
  args: { iconName: 'heart' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="heart" size={32} color="#ef4444" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Red</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="heart" size={32} color="#3629B7" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Primary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="heart" size={32} color="#10b981" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Green</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="heart" size={32} color="#f59e0b" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Orange</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon iconName="heart" size={32} color="#6b7280" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Gray</div>
      </div>
    </div>
  ),
}

/**
 * All available icons
 */
export const AllIcons: Story = {
  args: { iconName: 'plus' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '1.5rem',
        padding: '1rem',
      }}
    >
      {Object.keys(iconRegistry).map(iconName => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
          }}
        >
          <Icon iconName={iconName as keyof typeof iconRegistry} size={32} />
          <span
            style={{
              fontSize: '0.75rem',
              marginTop: '0.5rem',
              textAlign: 'center',
            }}
          >
            {iconName}
          </span>
        </div>
      ))}
    </div>
  ),
}

/**
 * Icons in different contexts
 */
export const InContext: Story = {
  args: { iconName: 'plus' },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '1rem',
      }}
    >
      {/* In buttons */}
      <div>
        <h3
          style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }}
        >
          In Buttons
        </h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              background: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <Icon iconName="plus" size={16} />
            Add Item
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              background: '#ef4444',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <Icon iconName="delete" size={16} color="white" />
            Delete
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              border: '1px solid #3629B7',
              borderRadius: '8px',
              background: '#3629B7',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <Icon iconName="save" size={16} color="white" />
            Save
          </button>
        </div>
      </div>

      {/* In navigation */}
      <div>
        <h3
          style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }}
        >
          In Navigation
        </h3>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            <Icon iconName="home" size={20} />
            Home
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            <Icon iconName="user" size={20} />
            Profile
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            <Icon iconName="settings" size={20} />
            Settings
          </a>
        </nav>
      </div>

      {/* In form inputs */}
      <div>
        <h3
          style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }}
        >
          In Form Inputs
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '300px',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <Icon iconName="search" size={16} color="#6b7280" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.875rem',
              }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <Icon iconName="email" size={16} color="#6b7280" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.875rem',
              }}
            />
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <div>
        <h3
          style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }}
        >
          Status Indicators
        </h3>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon iconName="check" size={16} color="#10b981" />
            <span style={{ color: '#10b981' }}>
              Success: Operation completed
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon iconName="warning" size={16} color="#f59e0b" />
            <span style={{ color: '#f59e0b' }}>
              Warning: Please review your input
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon iconName="close" size={16} color="#ef4444" />
            <span style={{ color: '#ef4444' }}>
              Error: Something went wrong
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon iconName="info" size={16} color="#3b82f6" />
            <span style={{ color: '#3b82f6' }}>
              Info: Additional information available
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive icons (clickable)
 */
export const Interactive: Story = {
  args: { iconName: 'heart' },
  render: () => {
    const [liked, setLiked] = React.useState(false)
    const [starred, setStarred] = React.useState(false)

    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setLiked(!liked)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '4px',
            }}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            <Icon
              iconName="heart"
              size={32}
              color={liked ? '#ef4444' : '#d1d5db'}
            />
          </button>
          <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
            {liked ? 'Liked' : 'Like'}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setStarred(!starred)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '4px',
            }}
            aria-label={starred ? 'Unstar' : 'Star'}
          >
            <Icon
              iconName="star"
              size={32}
              color={starred ? '#f59e0b' : '#d1d5db'}
            />
          </button>
          <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
            {starred ? 'Starred' : 'Star'}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Loading and animation example
 */
export const WithAnimation: Story = {
  args: { iconName: 'settings' },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ animation: 'spin 2s linear infinite' }}>
          <Icon iconName="settings" size={32} color="#3629B7" />
        </div>
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Rotating</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        >
          <Icon iconName="heart" size={32} color="#ef4444" />
        </div>
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Pulsing</div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  ),
}
