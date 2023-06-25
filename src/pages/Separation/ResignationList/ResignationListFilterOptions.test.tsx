import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ResignationListFilterOptions from './ResignationListFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'

const mockSetSelect = jest.fn()
const mockSetTogglePage = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ResignationListFilterOptions Select={'Custom'} setSelect={mockSetSelect} />
  </div>
)
describe('Resignation List Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender)
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const select = screen.getByTestId('form-select1')
    userEvent.selectOptions(select, ['Custom'])
    expect(select).toHaveValue('Custom')

    const selectStatus = screen.getByTestId('form-select2')
    userEvent.selectOptions(selectStatus, ['All'])
    expect(select).toHaveValue('Custom')

    const selectEmployeeStatus = screen.getByTestId('form-select3')
    userEvent.selectOptions(selectEmployeeStatus, ['Active'])
    expect(selectEmployeeStatus).toHaveValue('Active')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '10 Jan, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('10/29/2019')
    expect(datePickers[1]).toHaveValue('1/10/2022')
    const viewBtnElement = screen.getByRole('button', { name: 'View' })
    userEvent.click(viewBtnElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('clear-btn'))
    userEvent.selectOptions(selectStatus, ['All'])
    userEvent.selectOptions(select, [''])
    userEvent.selectOptions(selectEmployeeStatus, [''])
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
  })
  test('should render Resignation List search filter options component with out crashing', () => {
    const searchInput = screen.getByTestId('search-input')
    userEvent.type(searchInput, 'vinesh')
    expect(searchInput).toHaveValue('vinesh')
    expect(searchInput).toBeInTheDocument()
  })
  test('should be able to click View button element', () => {
    const addBtn = screen.getByRole('button', { name: 'View' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
})
