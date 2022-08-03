import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import HiveReportOptions from './HiveReportOptions'
import { fireEvent, render, screen } from '../../../test/testUtils'

const mockHandleSearchHiveActivityReport = jest.fn()
describe('Hive Report Options Component Testing', () => {
  test('should render hive report options component with out crashing', () => {
    render(
      <HiveReportOptions
        startDate={new Date()}
        setStartDate={jest.fn()}
        viewButtonHandler={jest.fn()}
        filterByDate={undefined}
        handleExportHiveActivityReport={jest.fn()}
        handleSearchHiveActivityReport={jest.fn()}
      />,
    )
    expect(
      screen.getByRole('radio', { name: 'Previous Month' }),
    ).toBeInTheDocument()
  })

  test('upon clicking different radio buttons respective button should be checked', () => {
    render(
      <HiveReportOptions
        startDate={new Date()}
        setStartDate={jest.fn()}
        viewButtonHandler={jest.fn()}
        filterByDate={undefined}
        handleExportHiveActivityReport={jest.fn()}
        handleSearchHiveActivityReport={jest.fn()}
      />,
    )
    const radioOne = screen.getByLabelText('Current Month') as HTMLInputElement
    const radioTwo = screen.getByLabelText('Previous Month') as HTMLInputElement
    const radioThree = screen.getByLabelText('Other') as HTMLInputElement
    expect(radioOne).toBeChecked()
    expect(radioTwo).not.toBeChecked()
    expect(radioThree).not.toBeChecked()
    fireEvent.click(radioTwo)
    expect(radioOne).not.toBeChecked()
    expect(radioTwo).toBeChecked()
    expect(radioThree).not.toBeChecked()
    fireEvent.click(radioThree)
    expect(radioOne).not.toBeChecked()
    expect(radioTwo).not.toBeChecked()
    expect(radioThree).toBeChecked()
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
  })

  test('search input should render only if we click on all radio button', () => {
    render(
      <HiveReportOptions
        startDate={new Date()}
        setStartDate={jest.fn()}
        viewButtonHandler={jest.fn()}
        filterByDate={undefined}
        handleExportHiveActivityReport={jest.fn()}
        handleSearchHiveActivityReport={mockHandleSearchHiveActivityReport}
      />,
      {
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
      },
    )
    const allRadioButton = screen.getByLabelText('All') as HTMLInputElement
    fireEvent.click(allRadioButton)
    expect(screen.getByPlaceholderText('Search Employee')).toBeInTheDocument()
    const searchButton = screen.getByTestId('search-employee-btn')
    expect(searchButton).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Search Employee'), 'kumar')
    expect(searchButton).toBeEnabled()
    userEvent.click(searchButton)
    expect(mockHandleSearchHiveActivityReport).toHaveBeenCalledTimes(1)
  })
})
