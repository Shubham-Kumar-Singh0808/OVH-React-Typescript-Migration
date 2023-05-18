import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import WarrantyDateStatus from './WarrantyDateStatus'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'

const mockSetSelect = jest.fn()
const mockSetTogglePage = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <WarrantyDateStatus
      selectDate={'Custom'}
      setSelectDate={mockSetSelect}
      pageSize={0}
      currentPage={0}
      fromDate={undefined}
      setFromDate={jest.fn()}
      toDate={undefined}
      setToDate={jest.fn()}
    />
  </div>
)
describe('Assets Warranty List List Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender)
  })
  screen.debug()
  const date = '29 Oct, 2019'
  test('should able to select values for options for respective select element', async () => {
    const select = screen.getByTestId('form-select1')
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
    expect(datePickers[0]).toHaveValue('29 Oct, 2019')
    expect(datePickers[1]).toHaveValue('10 Jan, 2022')
    const viewBtnElement = screen.getByRole('button', { name: 'View' })
    userEvent.click(viewBtnElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('clear-btn'))
    // userEvent.selectOptions(selectStatus, ['All'])
    // userEvent.selectOptions(select, [''])
    // userEvent.selectOptions(selectWarrantyStatus, [''])
    expect(datePickers[0]).toHaveValue('29 Oct, 2019')
    expect(datePickers[1]).toHaveValue('10 Jan, 2022')
  })
  //   test('should render Assets Waarranty List search filter options component with out crashing', () => {
  //     const searchInput = screen.getByTestId('search-input')
  //     userEvent.type(searchInput, 'vinesh')
  //     expect(searchInput).toHaveValue('vinesh')
  //     expect(searchInput).toBeInTheDocument()
  //   })
  test('should be able to click View button element', () => {
    const addBtn = screen.getByRole('button', { name: 'View' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
})
