import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EmployeeRemovePIP from './EmployeeRemovePIP'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import { mockGetPipList } from '../../../../test/data/pipListData'

const mockSetToggle = jest.fn()
describe('should render Employee Pip Time line Component without data', () => {
  beforeEach(() => {
    render(<EmployeeRemovePIP setToggle={mockSetToggle} />, {
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
    expect(screen.getByText('Remove from PIP')).toBeInTheDocument()
  })
  test('should render Employee Pip List component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled()
  })

  test('should render Employee ExtendPIP component with out crashing', () => {
    const backButtonElement = screen.getByTestId('removeBack-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should select rating', () => {
    const selectRating = screen.getByTestId('form-select1')
    userEvent.selectOptions(selectRating, ['5'])
    expect(selectRating).toHaveValue('5')
  })
  test('should render with RemoveEmployeeName ', () => {
    const subject = screen.getByTestId('RemoveEmployeeName')
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
  test('should render with extendDate ', () => {
    const subject = screen.getByTestId('extendDate')
    userEvent.type(subject, '')
    expect(subject).toHaveValue('')
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
  test('should be able to click Add button element', () => {
    const addBtn = screen.getByRole('button', { name: 'Remove' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
})
