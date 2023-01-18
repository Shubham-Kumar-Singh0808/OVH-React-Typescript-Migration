import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeeExtendPIP from './EmployeeExtendPIP'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
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
})
