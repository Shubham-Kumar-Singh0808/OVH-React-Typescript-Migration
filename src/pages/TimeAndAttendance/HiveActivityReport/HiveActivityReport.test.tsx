import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import HiveActivityReport from './HiveActivityReport'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'

describe('Hive Activity Report Component Testing', () => {
  test('should render hive activity report component with out crashing', () => {
    render(<HiveActivityReport />)
    expect(screen.getByText('Hive Activity Report')).toBeInTheDocument()
  })

  test('click to export button should available upon clicking on all radio button ', async () => {
    render(<HiveActivityReport />, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata kolla',
            role: 'admin',
          },
        },
      },
    })
    const allRadioButton = screen.getByLabelText('All') as HTMLInputElement
    userEvent.click(allRadioButton)
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Click to Export Attendance' }),
      ).toBeInTheDocument()
    })
  })
})
describe('Hive Activity Report Component Testing', () => {
  test('should enable view button upon selection of date', async () => {
    render(<HiveActivityReport />, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata kolla',
            role: 'admin',
          },
        },
      },
    })
    const radio = screen.getByLabelText('Other') as HTMLInputElement
    fireEvent.click(radio)
    const datePicker = screen.getByPlaceholderText('mm/yyyy')
    fireEvent.click(datePicker)
    await waitFor(() =>
      fireEvent.change(datePicker, { target: { value: '29 Oct, 2020' } }),
    )
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'View' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
    })
    userEvent.click(screen.getByRole('button', { name: 'View' }))
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
