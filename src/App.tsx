import { useState, useEffect } from 'react'
import { Logo } from './components/Logo'
import { Button } from './components/Button'
import { Icon } from './components/Icon'
import { ExpenseTable } from './components/ExpenseTable'
import { AddExpenseModal } from './components/AddExpenseModal'
import {
  EXPENSE_CATEGORIES,
  type Expense,
  type ExpenseFormData,
  type ExpenseListState,
  findCategoryByName,
  findCategoryById,
} from './types/expense'
import {
  expenseApi,
  convertBackendExpenseToFrontend,
  convertFrontendFormToBackend,
} from './services/api'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [expenseState, setExpenseState] = useState<ExpenseListState>({
    expenses: [],
    isLoading: false,
    error: null,
  })

  // Load expenses from backend on component mount
  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    setExpenseState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await expenseApi.getAllExpenses()

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
  }

  const handleAddExpense = async (formData: ExpenseFormData) => {
    const category = findCategoryById(formData.category)
    if (!category) return

    setExpenseState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Convert form data to backend format
      const backendExpenseData = convertFrontendFormToBackend({
        ...formData,
        category: category.name, // Backend expects category name, not ID
      })

      if (editingExpense) {
        // Update existing expense
        const response = await expenseApi.updateExpense(
          parseInt(editingExpense.id),
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
              expense.id === editingExpense.id
                ? updatedFrontendExpense
                : expense
            ),
            isLoading: false,
          }))

          setIsModalOpen(false)
          setEditingExpense(null)
        } else {
          throw new Error(response.error || 'Failed to update expense')
        }
      } else {
        // Create new expense
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

          setIsModalOpen(false)
        } else {
          throw new Error(response.error || 'Failed to create expense')
        }
      }
    } catch (error) {
      console.error('Failed to save expense:', error)
      setExpenseState(prev => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to save expense',
      }))
    }
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }

  const handleDeleteExpense = async (expenseId: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return
    }

    setExpenseState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await expenseApi.deleteExpense(parseInt(expenseId))

      if (response.success) {
        setExpenseState(prev => ({
          ...prev,
          expenses: prev.expenses.filter(expense => expense.id !== expenseId),
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
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingExpense(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <Logo size="xlarge" iconOnly />
      </header>

      <main className="app-main">
        <div className="main-content">
          {expenseState.error && (
            <div className="error-banner">
              <Icon iconName="warning" size={20} color="#ef4444" />
              <span>{expenseState.error}</span>
              <Button
                variant="ghost"
                size="small"
                onClick={loadExpenses}
                startIcon={<Icon iconName="refresh" size={16} />}
              >
                Retry
              </Button>
            </div>
          )}

          <ExpenseTable
            expenses={expenseState.expenses}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
            dateRange={{
              startDate: '2024-01-01',
              endDate: '2024-01-12',
            }}
          />
        </div>

        <Button
          className="fab"
          variant="primary"
          size="large"
          iconOnly
          onClick={() => setIsModalOpen(true)}
          aria-label="Add new expense"
          disabled={expenseState.isLoading}
          startIcon={<Icon iconName="plus" size={24} color="white" />}
        />
      </main>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddExpense}
        isLoading={expenseState.isLoading}
        initialData={
          editingExpense
            ? {
                name: editingExpense.name,
                amount: editingExpense.amount.toString(),
                currency: editingExpense.currency,
                category: editingExpense.category.id,
                date: editingExpense.date,
              }
            : undefined
        }
      />
    </div>
  )
}

export default App
