import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeHandbookTable
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
      editHandbookButtonHandler={jest.fn()}
    />
    ,
  </div>
)

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockEmployeeHandbookList[i].title),
    ).toBeInTheDocument()
  }
}
describe('Employee Handbook Settings', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        employeeHandbookSettings: {
          employeeHandbooks: mockEmployeeHandbookList,
          listSize: 43,
        },
      },
    })
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
    // 45 including the heading
    expect(screen.queryAllByRole('row')).toHaveLength(45)
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
  test('should render Personal info tab component with out crashing', async () => {
    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      //   const pageSizeSelect = screen.getByRole('option', {
      //     name: '40',
      //   }) as HTMLOptionElement
      //   expect(pageSizeSelect.selected).toBe(true)

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
  it('should render Delete modal on clicking delete button from Actions', () => {
    const deleteButtonElement = screen.getByTestId('handbook-delete-btn1')
    userEvent.click(deleteButtonElement)
    expect(screen.getByText('Delete Handbook')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
  })
  it('should close the modal on clicking No button from the popup', async () => {
    const deleteButtonElement = screen.getByTestId('handbook-delete-btn4')
    userEvent.click(deleteButtonElement)
    const yesButtonElement = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonElement)
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(45)
    })
  })
})
