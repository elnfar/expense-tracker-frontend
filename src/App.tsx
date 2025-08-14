import { useEffect } from 'react'
import { Logo } from './components/Logo'
import { ErrorBanner } from './components/ErrorBanner'
import { DateRangeFilter } from './components/DateRangeFilter'
import { ExpenseTable } from './components/ExpenseTable'
import { FloatingActionButton } from './components/FloatingActionButton'
import { AddExpenseModal } from './components/AddExpenseModal'
import { useExpenses } from './hooks/useExpenses'
import { useDateFilter } from './hooks/useDateFilter'
import { useModal } from './hooks/useModal'
import type { ExpenseFormData } from './types/expense'
import './App.css'

function App() {
  const {
    expenseState,
    loadExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses()
  const { dateRange, setStartDate, setEndDate, getFilterForTable } =
    useDateFilter(loadExpenses)
  const {
    isModalOpen,
    editingExpense,
    openModal,
    openEditModal,
    closeModal,
    isEditing,
  } = useModal()

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  // Event handlers
  const handleExpenseSubmit = async (formData: ExpenseFormData) => {
    try {
      if (isEditing && editingExpense) {
        await updateExpense(editingExpense.id, formData)
      } else {
        await createExpense(formData)
      }
      closeModal()
    } catch (error) {
      // Error handling is done in the hooks
      console.error('Failed to save expense:', error)
    }
  }

  const handleRetry = () => {
    loadExpenses()
  }

  return (
    <div className="app">
      <header className="app-header">
        <Logo size="xlarge" iconOnly />
      </header>

      <main className="app-main">
        <div className="main-content">
          {expenseState.error && (
            <ErrorBanner error={expenseState.error} onRetry={handleRetry} />
          )}

          <DateRangeFilter
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <ExpenseTable
            expenses={expenseState.expenses}
            onEditExpense={openEditModal}
            onDeleteExpense={deleteExpense}
            dateRange={getFilterForTable()}
          />
        </div>

        <FloatingActionButton
          onClick={openModal}
          disabled={expenseState.isLoading}
        />
      </main>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleExpenseSubmit}
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
