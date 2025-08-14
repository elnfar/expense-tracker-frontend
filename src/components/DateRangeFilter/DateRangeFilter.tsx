import React from 'react'
import { DatePicker } from '../DatePicker'
import styles from './DateRangeFilter.module.css'

interface DateRangeFilterProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className={styles.dateFilterContainer}>
      <div className={styles.dateRangeFilters}>
        <div className={styles.datePickerGroup}>
          <label htmlFor="start-date">From:</label>
          <DatePicker
            id="start-date"
            value={startDate}
            onChange={onStartDateChange}
            placeholder="Start date"
            max={endDate || undefined}
          />
        </div>
        <div className={styles.datePickerGroup}>
          <label htmlFor="end-date">To:</label>
          <DatePicker
            id="end-date"
            value={endDate}
            onChange={onEndDateChange}
            placeholder="End date"
            min={startDate || undefined}
          />
        </div>
      </div>
    </div>
  )
}
