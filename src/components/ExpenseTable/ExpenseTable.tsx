import React from 'react'
import { Icon } from '../Icon'
import { Button } from '../Button'
import type { Expense } from '../../types/expense'
import type { IconName } from '../../assets/icons/registry'
import styles from './ExpenseTable.module.css'

interface ExpenseTableProps {
  expenses: Expense[]
  onEditExpense?: (expense: Expense) => void
  onDeleteExpense?: (expenseId: string) => void
  dateRange?: { startDate: string; endDate: string } | null
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onEditExpense,
  onDeleteExpense,
  dateRange,
}) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className={styles.tableContainer}>
      {dateRange && (
        <div className={styles.dateRange}>
          <Icon iconName="info" size={16} />
          <span>
            {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
          </span>
        </div>
      )}

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Name</div>
          <div className={styles.headerCell}>Category</div>
          <div className={styles.headerCell}>Date</div>
          <div className={styles.headerCell}>Total</div>
          <div className={styles.headerCell}></div>
        </div>

        <div className={styles.tableBody}>
          {expenses.length === 0 ? (
            <div className={styles.emptyState}>
              <Icon iconName="info" size={48} />
              <h3>No expenses found</h3>
              <p>Start by adding your first expense</p>
            </div>
          ) : (
            expenses.map(expense => (
              <div key={expense.id} className={styles.tableRow}>
                <div className={styles.nameCell}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    aria-label={`Select ${expense.name}`}
                  />
                  <div
                    className={styles.categoryIcon}
                    style={{ backgroundColor: expense.category.color }}
                  >
                    <Icon
                      iconName={expense.category.icon as IconName}
                      size={20}
                      color="white"
                    />
                  </div>
                  <span className={styles.expenseName}>{expense.name}</span>
                </div>

                <div className={styles.categoryCell}>
                  <span className={styles.categoryName}>
                    {expense.category.name}
                  </span>
                </div>

                <div className={styles.dateCell}>
                  {formatDate(expense.date)}
                </div>

                <div className={styles.totalCell}>
                  <span className={styles.amount}>
                    -{formatCurrency(expense.amount, expense.currency)}
                  </span>
                </div>

                <div className={styles.actionsCell}>
                  <Button
                    variant="ghost"
                    size="small"
                    iconOnly
                    onClick={() => onEditExpense?.(expense)}
                    aria-label={`Edit ${expense.name}`}
                    startIcon={<Icon iconName="edit" size={16} />}
                  />
                  <Button
                    variant="ghost"
                    size="small"
                    iconOnly
                    onClick={() => onDeleteExpense?.(expense.id)}
                    aria-label={`Delete ${expense.name}`}
                    startIcon={<Icon iconName="delete" size={16} />}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
