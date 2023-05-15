import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeePipTimeline from './EmployeePipTimeline'
import EmployeeExtendPIP from './EmployeeExtendPIP'
import EmployeeRemovePIP from './EmployeeRemovePIP'
import EmployeeUpdatePIP from './EmployeeUpdatePIP'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import { mockPipHistoryTimeline } from '../../../../test/data/pipListData'

const mockSetToggle = jest.fn()
describe('should render Employee Pip Time line Component without data', () => {
  beforeEach(() => {
    render(<EmployeePipTimeline />, {
      preloadedState: {
        pipList: {
          isLoading: ApiLoadingState.succeeded,
          error: null,
          listSize: 1,
          employeePIPTimeline: mockPipHistoryTimeline,
        },
      },
    })
  })

  test('should render Employee Pip List component with out crashing', () => {
    const backButtonElement = screen.getByTestId('toggle-back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
  describe('Employee ExtendPIP Component Testing', () => {
    test('should render Employee ExtendPIP component with out crashing', () => {
      render(<EmployeeExtendPIP setToggle={mockSetToggle} />)
      const backButtonElement = screen.getByTestId('ExtendBack-button')
      expect(backButtonElement).toBeInTheDocument()
      userEvent.click(backButtonElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(1)
    })
  })

  describe('Employee RemovePIP Component Testing', () => {
    test('should render Employee RemovePIP component with out crashing', () => {
      render(<EmployeeRemovePIP setToggle={mockSetToggle} />)
      const backButtonElement = screen.getByTestId('removeBack-button')
      expect(backButtonElement).toBeInTheDocument()
      userEvent.click(backButtonElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(1)
    })
  })

  describe('Employee UpdatePIP Component Testing', () => {
    test('should render Employee UpdatePIP  component with out crashing', () => {
      render(<EmployeeUpdatePIP setToggle={mockSetToggle} />)
      const backButtonElement = screen.getByTestId('updateBack-button')
      expect(backButtonElement).toBeInTheDocument()
      userEvent.click(backButtonElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(1)
    })
  })
})
