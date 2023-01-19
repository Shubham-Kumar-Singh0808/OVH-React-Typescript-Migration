import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddEmployeePipList from './AddEmployeePipList'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import { EmployeePipStatus } from '../../../../types/Performance/PipList/pipListTypes'
import { mockGetAllPipList } from '../../../../test/data/pipListData'

const mockSetTogglePage = jest.fn()

describe('Employee Accounts Table Component Testing', () => {
  beforeEach(() => {
    render(
      <AddEmployeePipList
        pageSize={0}
        selectDate=""
        setToggle={mockSetTogglePage}
        searchByAdded={true}
        searchByEmployee={true}
        searchInput=""
        fromDate=""
        toDate=""
      />,
      {
        preloadedState: {
          pipList: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            listSize: 25,
            pipListData: mockGetAllPipList,
            selectedEmployeePipStatus: EmployeePipStatus.pip,
            performanceRatings: [],
            activeEmployee: [],
          },
        },
      },
    )
  })
  test('should render Add PIP component with out crashing', () => {
    expect(screen.getByText('Add PIP')).toBeInTheDocument()
  })
  test('should render  Add PIP component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(1)
  })
  test('should render add PIP component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
})
