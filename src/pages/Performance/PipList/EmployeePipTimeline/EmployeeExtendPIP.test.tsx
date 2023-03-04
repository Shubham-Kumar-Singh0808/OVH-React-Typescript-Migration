import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EmployeeExtendPIP from './EmployeeExtendPIP'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { mockGetPipList } from '../../../../test/data/pipListData'

const mockSetToggle = jest.fn()
describe('should render Employee Pip Time line Component without data', () => {
  beforeEach(() => {
    render(<EmployeeExtendPIP setToggle={mockSetToggle} />, {
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
    expect(screen.getByText('Extend PIP')).toBeInTheDocument()
  })
  test('should render Employee Pip List component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Extend' })).toBeDisabled()
  })

  test('should render Employee ExtendPIP component with out crashing', () => {
    const backButtonElement = screen.getByTestId('ExtendBack-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should select rating', () => {
    const selectRating = screen.getByTestId('form-select1')
    userEvent.selectOptions(selectRating, ['5'])
    expect(selectRating).toHaveValue('5')
  })
  test('should render with ExtendEmployeeName ', () => {
    const subject = screen.getByTestId('ExtendEmployeeName')
    userEvent.type(subject, 'Ashish  kumar Kashyap kumar')
    expect(subject).toHaveValue('Ashish  kumar Kashyap kumar')
  })
  test('should render with startDate ', () => {
    const subject = screen.getByTestId('startDate')
    userEvent.type(subject, '01/01/2022')
    expect(subject).toHaveValue('01/01/2022')
  })
  test('should render with endDate ', () => {
    const subject = screen.getByTestId('endDate')
    userEvent.type(subject, '11/01/2024')
    expect(subject).toHaveValue('11/01/2024')
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
  test('should be able to click Add button element', () => {
    const addBtn = screen.getByRole('button', { name: 'Extend' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
  test('should render on Dates AllocateEmployee', async () => {
    const datePickers = screen.getAllByPlaceholderText('Extend Date')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '30 Aug, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('')
  })
})
