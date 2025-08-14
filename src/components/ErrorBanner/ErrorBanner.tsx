import React from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import styles from './ErrorBanner.module.css'

interface ErrorBannerProps {
  error: string
  onRetry: () => void
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onRetry }) => {
  return (
    <div className={styles.errorBanner}>
      <Icon iconName="warning" size={20} color="#ef4444" />
      <span>{error}</span>
      <Button
        variant="ghost"
        size="small"
        onClick={onRetry}
        startIcon={<Icon iconName="refresh" size={16} />}
      >
        Retry
      </Button>
    </div>
  )
}
