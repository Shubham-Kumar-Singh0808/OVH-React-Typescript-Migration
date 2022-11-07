import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import HiveActivityReport from './HiveActivityReport'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { mockSearchHiveTime } from '../../../test/data/hiveActivityEmployeeManagerReportData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <HiveActivityReport />
  </div>
)

describe('Hive Activity Report Component Testing', () => {
  test('should render hive activity report component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Hive Activity Report')).toBeInTheDocument()
  })

  test('click to export button should available upon clicking on all radio button ', async () => {
    render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'Pramodh kolla',
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
describe('Hive Activity Report Testing', () => {
  test('should enable view button upon selection of date', async () => {
    render(toRender, {
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
    expect(screen.getByRole('button', { name: 'View' })).toBeEnabled()
  })
  test('search input testing', async () => {
    render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'venkata',
            employeeId: 1978,
            userName: 'venkata kolla',
            role: 'admin',
          },
          hiveActivityReport: {
            managerHiveActivityReport: mockSearchHiveTime,
          },
        },
      },
    })
    const allRadioButton = screen.getByLabelText('All') as HTMLInputElement
    fireEvent.click(allRadioButton)
    const searchButton = screen.getByTestId('search-employee-btn')
    userEvent.type(screen.getByPlaceholderText('Search Employee'), 'sunny')
    userEvent.click(searchButton)
    await waitFor(() => {
      expect(searchButton).toBeEnabled()
    })
  })
})
