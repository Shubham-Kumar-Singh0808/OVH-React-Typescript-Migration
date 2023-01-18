import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
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
})
