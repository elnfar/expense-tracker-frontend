import { useState, useCallback } from 'react'

interface DateRange {
  startDate: string
  endDate: string
}

interface UseDateFilterReturn {
  dateRange: DateRange
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
  clearDateFilter: () => void
  hasActiveFilter: boolean
  getFilterForTable: () => DateRange | null
}

export const useDateFilter = (
  onFilterChange?: (startDate: string, endDate: string) => void
): UseDateFilterReturn => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '',
    endDate: '',
  })

  const setStartDate = useCallback(
    (date: string) => {
      const newDateRange = { ...dateRange, startDate: date }
      setDateRange(newDateRange)

      // Auto-filter when both dates are selected or when start date is cleared
      if (date && newDateRange.endDate) {
        onFilterChange?.(date, newDateRange.endDate)
      } else if (!date) {
        onFilterChange?.('', '') // Clear filter if start date is cleared
      }
    },
    [dateRange, onFilterChange]
  )

  const setEndDate = useCallback(
    (date: string) => {
      const newDateRange = { ...dateRange, endDate: date }
      setDateRange(newDateRange)

      // Auto-filter when both dates are selected
      if (newDateRange.startDate && date) {
        onFilterChange?.(newDateRange.startDate, date)
      }
    },
    [dateRange, onFilterChange]
  )

  const clearDateFilter = useCallback(() => {
    setDateRange({ startDate: '', endDate: '' })
    onFilterChange?.('', '') // Clear filter
  }, [onFilterChange])

  const hasActiveFilter = dateRange.startDate !== '' || dateRange.endDate !== ''

  const getFilterForTable = useCallback((): DateRange | null => {
    return dateRange.startDate && dateRange.endDate ? dateRange : null
  }, [dateRange])

  return {
    dateRange,
    setStartDate,
    setEndDate,
    clearDateFilter,
    hasActiveFilter,
    getFilterForTable,
  }
}
