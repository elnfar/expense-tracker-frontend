import React from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import styles from './FloatingActionButton.module.css'

interface FloatingActionButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      className={styles.fab}
      variant="primary"
      size="large"
      iconOnly
      onClick={onClick}
      aria-label="Add new expense"
      disabled={disabled}
      startIcon={<Icon iconName="plus" size={24} color="white" />}
    />
  )
}
