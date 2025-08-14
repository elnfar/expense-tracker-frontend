import React, { useState, useEffect } from 'react'
import { Icon } from '../Icon'
import { Button } from '../Button'
import { Input } from '../Input'
import { InputLabel } from '../InputLabel'
import { DatePicker } from '../DatePicker'
import { EXPENSE_CATEGORIES, type ExpenseFormData } from '../../types/expense'
import type { IconName } from '../../assets/icons/registry'
import styles from './AddExpenseModal.module.css'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ExpenseFormData) => void
  initialData?: Partial<ExpenseFormData>
  isLoading?: boolean
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    name: initialData?.name || '',
    amount: initialData?.amount || '',
    currency: initialData?.currency || 'USD',
    category: initialData?.category || '',
    date: initialData?.date
      ? initialData.date.split('T')[0]
      : new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState<Partial<ExpenseFormData>>({})

  // Update form data when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        amount: initialData.amount || '',
        currency: initialData.currency || 'USD',
        category: initialData.category || '',
        date: initialData.date
          ? initialData.date.split('T')[0]
          : new Date().toISOString().split('T')[0],
      })
      setErrors({}) // Clear any existing errors
    } else {
      // Reset form for new expense
      setFormData({
        name: '',
        amount: '',
        currency: 'USD',
        category: '',
        date: new Date().toISOString().split('T')[0],
      })
      setErrors({})
    }
  }, [initialData])

  const validateForm = (): boolean => {
    const newErrors: Partial<ExpenseFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      setFormData({
        name: '',
        amount: '',
        currency: 'USD',
        category: '',
        date: new Date().toISOString().split('T')[0],
      })
      setErrors({})
      onClose()
    }
  }

  const handleInputChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOpen : ''}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {initialData ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <Button
            variant="ghost"
            size="small"
            iconOnly
            onClick={onClose}
            aria-label="Close modal"
            startIcon={<Icon iconName="close" size={20} />}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <InputLabel htmlFor="expense-name" required>
              Name
            </InputLabel>
            <Input
              id="expense-name"
              type="text"
              placeholder="Text input"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <InputLabel htmlFor="expense-amount" required>
                Payment amount
              </InputLabel>
              <div className={styles.amountInput}>
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="1,390"
                  value={formData.amount}
                  onChange={e => handleInputChange('amount', e.target.value)}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  fullWidth
                />
                <div className={styles.currencySelector}>
                  <select
                    value={formData.currency}
                    onChange={e =>
                      handleInputChange('currency', e.target.value)
                    }
                    className={styles.currencySelect}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <InputLabel required>Select category</InputLabel>
            <div className={styles.categoryGrid}>
              {EXPENSE_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.categoryButton} ${
                    formData.category === category.id
                      ? styles.categoryButtonActive
                      : ''
                  }`}
                  onClick={() => handleInputChange('category', category.id)}
                  style={
                    {
                      '--category-color': category.color,
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.categoryButtonIcon}>
                    <Icon
                      iconName={category.icon as IconName}
                      size={24}
                      color="white"
                    />
                  </div>
                </button>
              ))}
            </div>
            {errors.category && (
              <div className={styles.errorText}>{errors.category}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <InputLabel htmlFor="expense-date" required>
              Select date
            </InputLabel>
            <DatePicker
              id="expense-date"
              value={formData.date}
              onChange={date => handleInputChange('date', date)}
              error={!!errors.date}
              helperText={errors.date}
              fullWidth
            />
          </div>
        </form>

        <div className={styles.modalActions}>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            startIcon={<Icon iconName="close" size={16} />}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            loading={isLoading}
            startIcon={<Icon iconName="plus" size={16} />}
            onClick={handleSubmit}
          >
            {initialData ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  )
}
