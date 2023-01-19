import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EmployeeUpdatePIP from './EmployeeUpdatePIP'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
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
})
