import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AssetTransactionalListFilter from './AssetTransactionalListFilter'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'

const mockSetSelect = jest.fn()
const mockSetTogglePage = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AssetTransactionalListFilter
      selectDatePicker={'Custom'}
      setSelectDatePicker={mockSetSelect}
      pageSize={0}
      currentPage={0}
      fromDatePicker={undefined}
      setFromDatePicker={jest.fn()}
      toDatePicker={undefined}
      setToDatePicker={jest.fn()}
      searchInputField={''}
      searchByEmployeeName={false}
      setSearchByEmployeeName={jest.fn()}
      setSearchInputField={jest.fn()}
      setCurrentPage={jest.fn()}
      setIsTableView={function (value: React.SetStateAction<boolean>): void {
        throw new Error('Function not implemented.')
      }}
    />
  </div>
)
describe('Asset Transaction List Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender)
  })
  screen.debug()
  const date = '03/05/1988'
  test('should able to select values for options for respective select element', async () => {
    const select = screen.getByTestId('form-select-date')
    userEvent.selectOptions(select, ['Custom'])
    expect(select).toHaveValue('Custom')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: date },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: date },
      }),
    )
    expect(datePickers[0]).toHaveValue(date)
    expect(datePickers[1]).toHaveValue('03/05/1988')
    const viewBtnElement = screen.getByRole('button', { name: 'View' })
    userEvent.click(viewBtnElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('clear-btn'))
    expect(datePickers[0]).toHaveValue(date)
    expect(datePickers[1]).toHaveValue(date)
  })
  test('should be able to click View button element', () => {
    const addBtn = screen.getByRole('button', { name: 'View' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
  test('should render Asset filter', () => {
    const activeStatus = screen.findByTestId('form-select-2')
    expect(activeStatus).toBeTruthy()
  })
  test('should render inactive status filter', () => {
    const inactiveStatus = screen.findByTestId('form-select-3')
    expect(inactiveStatus).toBeTruthy()
  })
  test('should render category filter', () => {
    const categoryFilter = screen.findByTestId('form-select-4')
    expect(categoryFilter).toBeTruthy()
  })

  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchBtn = screen.getByTestId('ch-searchByEmployeeName')
    fireEvent.click(searchBtn)
  })
})
