import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeReporteesTable from './EmployeeReporteesTable'
import {
  cleanup,
  render,
  screen,
  waitFor,
  fireEvent,
} from '../../../test/testUtils'
import { mockReporteesDetails } from '../../../test/data/employeeReporteesData'

describe('Employee Reportees Table Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeReporteesTable />, {
      preloadedState: {
        employeeReportees: {
          employeeReportees: mockReporteesDetails,
        },
      },
    })
  })
  afterEach(cleanup)

  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockReporteesDetails.length),
    ).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render employee Reportees table component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(true)
      expect(screen.getAllByRole('row')).toHaveLength(25)
    })
  })
  test('should open modal when clicking on ticket description link', () => {
    const linkElement = screen.getAllByTestId('report-test')
    fireEvent.click(linkElement[0], '')
    expect(linkElement).toBeTruthy()
  })
})
