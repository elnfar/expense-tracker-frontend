/**
 * Type definitions for the expense tracker application
 */

export interface Expense {
  id: string
  name: string
  amount: number
  currency: string
  category: ExpenseCategory
  date: string // ISO date string (YYYY-MM-DD)
  createdAt: string
  updatedAt: string
}

// UI State Types
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface ExpenseListState extends LoadingState {
  expenses: Expense[]
}

export interface ApiError {
  message: string
  status?: number
}

export interface ExpenseCategory {
  id: string
  name: string
  icon: string
  color: string
}

export interface DateRange {
  startDate: string
  endDate: string
}

export interface ExpenseFormData {
  name: string
  amount: string
  currency: string
  category: string
  date: string
}

// Predefined categories matching the design
export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: 'groceries', name: 'Groceries', icon: 'groceries', color: '#6366f1' },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: 'restaurant',
    color: '#8b5cf6',
  },
  { id: 'transport', name: 'Transport', icon: 'transport', color: '#06b6d4' },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'camera',
    color: '#10b981',
  },
  { id: 'health', name: 'Health', icon: 'health', color: '#f59e0b' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping', color: '#ef4444' },
  { id: 'utility', name: 'Utility', icon: 'water-drop', color: '#3b82f6' },
  { id: 'travel', name: 'Travel', icon: 'travel', color: '#f97316' },
  { id: 'building', name: 'Building', icon: 'building', color: '#64748b' },
  { id: 'money', name: 'Money', icon: 'money', color: '#22c55e' },
  { id: 'document', name: 'Document', icon: 'document', color: '#a855f7' },
  { id: 'payment', name: 'Payment', icon: 'payment', color: '#ec4899' },
]

// Helper function to find category by name (for backend compatibility)
export function findCategoryByName(name: string): ExpenseCategory | undefined {
  return EXPENSE_CATEGORIES.find(
    cat => cat.name.toLowerCase() === name.toLowerCase()
  )
}

// Helper function to find category by id
export function findCategoryById(id: string): ExpenseCategory | undefined {
  return EXPENSE_CATEGORIES.find(cat => cat.id === id)
}
