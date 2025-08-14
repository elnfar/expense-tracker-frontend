import { useState, useCallback } from 'react'
import { type Expense } from '../types/expense'

interface UseModalReturn {
  isModalOpen: boolean
  editingExpense: Expense | null
  openModal: () => void
  openEditModal: (expense: Expense) => void
  closeModal: () => void
  isEditing: boolean
}

export const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
    setEditingExpense(null)
  }, [])

  const openEditModal = useCallback((expense: Expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setEditingExpense(null)
  }, [])

  const isEditing = editingExpense !== null

  return {
    isModalOpen,
    editingExpense,
    openModal,
    openEditModal,
    closeModal,
    isEditing,
  }
}
