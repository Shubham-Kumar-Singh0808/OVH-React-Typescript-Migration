import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Handbook Settings', () => {
  beforeEach(() => {
    render(
      <EmployeeHandbookTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
      {
        preloadedState: {
          employeeHandbookSettings: {
            employeeHandbooks: mockEmployeeHandbookList,
            listSize: 43,
          },
        },
      },
    )
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Page Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Display Order' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Country' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
  test('should render correct number of page records', () => {
    // 21 including the heading
    expect(screen.queryAllByRole('row')).toHaveLength(44)
  })
  test('should render delete button', () => {
    expect(screen.getByTestId('handbook-edit-btn0')).toHaveClass(
      'btn btn-info btn-sm',
    )
  })
  test('should render delete button', () => {
    expect(screen.getByTestId('handbook-delete-btn0')).toHaveClass(
      'btn btn-danger btn-sm',
    )
  })
  it('should render Delete modal on clicking delete button from Actions', async () => {
    const deleteButtonElement = screen.getByTestId('handbook-delete-btn1')
    userEvent.click(deleteButtonElement)
    await waitFor(() => {
      expect(screen.getByText('Delete Handbook')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  jest.retryTimes(3)
  it('should close the modal on clicking No button from the popup', async () => {
    const deleteButtonElement = screen.getByTestId('handbook-delete-btn4')
    userEvent.click(deleteButtonElement)
    const yesButtonElement = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonElement)
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(44)
    })
  })
})
test('should render no data to display if table is empty', async () => {
  render(
    <EmployeeHandbookTable
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
    />,
  )
  await waitFor(() => {
    expect(screen.queryByText('No data to display')).toBeInTheDocument()
  })
})
