import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EmployeeUpdatePIP from './EmployeeUpdatePIP'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { mockGetPipList } from '../../../../test/data/pipListData'

const mockSetToggle = jest.fn()
describe('should render Employee Pip Time line Component without data', () => {
  beforeEach(() => {
    render(<EmployeeUpdatePIP setToggle={mockSetToggle} />, {
      preloadedState: {
        pipList: {
          isLoading: ApiLoadingState.succeeded,
          error: null,
          listSize: 1,
          list: mockGetPipList,
        },
      },
    })
  })
  test('should render EmployeePip Timeline component with out crashing', () => {
    expect(screen.getByText('Update PIP')).toBeInTheDocument()
  })
  test('should render Employee Pip List component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
  })

  test('should render Employee ExtendPIP component with out crashing', () => {
    const backButtonElement = screen.getByTestId('updateBack-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should select rating', () => {
    const selectRating = screen.getByTestId('form-select1')
    userEvent.selectOptions(selectRating, ['5'])
    expect(selectRating).toHaveValue('5')
  })
  test('should render with UpdateEmployeeName ', () => {
    const subject = screen.getByTestId('UpdateEmployeeName')
    userEvent.type(subject, 'Ashish  kumar Kashyap kumar')
    expect(subject).toHaveValue('Ashish  kumar Kashyap kumar')
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
  test('should be able to click Add button element', () => {
    const addBtn = screen.getByRole('button', { name: 'Update' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
  test('should render on Dates AllocateEmployee', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '30 Aug, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '07 Sep, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('01/01/2022')
    expect(datePickers[1]).toHaveValue('11/01/2024')
  })
})
