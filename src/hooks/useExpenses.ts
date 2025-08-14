import { useState, useCallback } from 'react'
import {
  type Expense,
  type ExpenseFormData,
  type ExpenseListState,
  EXPENSE_CATEGORIES,
  findCategoryByName,
  findCategoryById,
} from '../types/expense'
import {
  expenseApi,
  convertBackendExpenseToFrontend,
  convertFrontendFormToBackend,
} from '../services/api'

interface UseExpensesReturn {
  expenseState: ExpenseListState
  loadExpenses: (startDate?: string, endDate?: string) => Promise<void>
  createExpense: (formData: ExpenseFormData) => Promise<void>
  updateExpense: (id: string, formData: ExpenseFormData) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
  refreshExpenses: () => Promise<void>
}

export const useExpenses = (): UseExpensesReturn => {
  const [expenseState, setExpenseState] = useState<ExpenseListState>({
    expenses: [],
    isLoading: false,
    error: null,
  })

  const loadExpenses = useCallback(
    async (startDate?: string, endDate?: string) => {
      setExpenseState(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        let response

        // If date range is provided, use search API to filter by date range
        if (startDate && endDate) {
          response = await expenseApi.searchExpenses({
            startDate,
            endDate,
          })
        } else if (startDate) {
          // If only start date is provided, filter from that date onwards
          response = await expenseApi.searchExpenses({
            startDate,
            endDate: new Date().toISOString().split('T')[0], // Today's date
          })
        } else {
          response = await expenseApi.getAllExpenses()
        }

        if (response.success && response.data) {
          // Convert backend expenses to frontend format
          const frontendExpenses: Expense[] = response.data.map(
            backendExpense => {
              const category =
                findCategoryByName(backendExpense.category) ||
                EXPENSE_CATEGORIES[0]
              return {
                ...convertBackendExpenseToFrontend(backendExpense),
                category,
              }
            }
          )

          setExpenseState({
            expenses: frontendExpenses,
            isLoading: false,
            error: null,
          })
        } else {
          throw new Error(response.error || 'Failed to load expenses')
        }
      } catch (error) {
        console.error('Failed to load expenses:', error)
        setExpenseState(prev => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : 'Failed to load expenses',
        }))
      }
    },
    []
  )

  const createExpense = useCallback(async (formData: ExpenseFormData) => {
    const category = findCategoryById(formData.category)
    if (!category) {
      throw new Error('Invalid category selected')
    }

    setExpenseState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Convert form data to backend format
      const backendExpenseData = convertFrontendFormToBackend({
        ...formData,
        category: category.name, // Backend expects category name, not ID
      })

      const response = await expenseApi.createExpense(backendExpenseData)

      if (response.success && response.data) {
        // Convert backend response to frontend format
        const newFrontendExpense: Expense = {
          ...convertBackendExpenseToFrontend(response.data),
          category,
        }

        setExpenseState(prev => ({
          ...prev,
          expenses: [newFrontendExpense, ...prev.expenses],
          isLoading: false,
        }))
      } else {
        throw new Error(response.error || 'Failed to create expense')
      }
    } catch (error) {
      console.error('Failed to create expense:', error)
      setExpenseState(prev => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to create expense',
      }))
      throw error // Re-throw so UI can handle it
    }
  }, [])

  const updateExpense = useCallback(
    async (id: string, formData: ExpenseFormData) => {
      const category = findCategoryById(formData.category)
      if (!category) {
        throw new Error('Invalid category selected')
      }

      setExpenseState(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        // Convert form data to backend format
        const backendExpenseData = convertFrontendFormToBackend({
          ...formData,
          category: category.name, // Backend expects category name, not ID
        })

        const response = await expenseApi.updateExpense(
          parseInt(id),
          backendExpenseData
        )

        if (response.success && response.data) {
          // Convert backend response to frontend format
          const updatedFrontendExpense: Expense = {
            ...convertBackendExpenseToFrontend(response.data),
            category,
          }

          setExpenseState(prev => ({
            ...prev,
            expenses: prev.expenses.map(expense =>
              expense.id === id ? updatedFrontendExpense : expense
            ),
            isLoading: false,
          }))
        } else {
          throw new Error(response.error || 'Failed to update expense')
        }
      } catch (error) {
        console.error('Failed to update expense:', error)
        setExpenseState(prev => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : 'Failed to update expense',
        }))
        throw error // Re-throw so UI can handle it
      }
    },
    []
  )

  const deleteExpense = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return
    }

    setExpenseState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await expenseApi.deleteExpense(parseInt(id))

      if (response.success) {
        setExpenseState(prev => ({
          ...prev,
          expenses: prev.expenses.filter(expense => expense.id !== id),
          isLoading: false,
        }))
      } else {
        throw new Error(response.error || 'Failed to delete expense')
      }
    } catch (error) {
      console.error('Failed to delete expense:', error)
      setExpenseState(prev => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to delete expense',
      }))
      throw error // Re-throw so UI can handle it
    }
  }, [])

  const refreshExpenses = useCallback(() => {
    return loadExpenses()
  }, [loadExpenses])

  return {
    expenseState,
    loadExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses,
  }
}
