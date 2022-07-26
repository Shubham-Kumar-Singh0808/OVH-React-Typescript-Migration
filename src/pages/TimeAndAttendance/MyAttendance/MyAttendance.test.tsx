import '@testing-library/jest-dom'
import React from 'react'
import moment from 'moment'
import userEvent from '@testing-library/user-event'
import MyAttendance from './MyAttendance'
import { render, screen } from '../../../test/testUtils'

describe('My Attendance Component Testing', () => {
  test('should render Time In Office Report Parent component without crashing', () => {
    render(<MyAttendance />)

    expect(screen.getByText('Employee Attendance')).toBeInTheDocument()

    const currentMonth = moment().format('MMMM YYYY')
    const prevMonth = moment().subtract(1, 'months').format('MMMM YYYY')
    const nextMonth = moment().add(1, 'months').format('MMMM YYYY')

    expect(screen.getByText('Employee Attendance')).toBeInTheDocument()
    expect(screen.getByText(currentMonth)).toBeInTheDocument()

    const todayButton = screen.getByTestId('today-button')
    const prevButton = screen.getByTestId('prev-button')
    const nextButton = screen.getByTestId('next-button')

    userEvent.click(prevButton)
    expect(screen.getByText(prevMonth)).toBeInTheDocument()

    userEvent.click(todayButton)
    expect(screen.getByText(currentMonth)).toBeInTheDocument()

    userEvent.click(nextButton)
    expect(screen.getByText(nextMonth)).toBeInTheDocument()
  })
})
