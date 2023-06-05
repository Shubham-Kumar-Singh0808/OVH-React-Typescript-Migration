import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeePipListOptions from './EmployeePipListOptions'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import { EmployeePipStatus } from '../../../../types/Performance/PipList/pipListTypes'
import { mockGetAllPipList } from '../../../../test/data/pipListData'

const mockSetTogglePage = jest.fn()

describe('Employee Accounts Table Component Testing', () => {
  beforeEach(() => {
    render(
      <EmployeePipListOptions
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
        selectDay=""
        setToggle={mockSetTogglePage}
        setFromDate={mockSetTogglePage}
        setToDate={mockSetTogglePage}
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
  test('should render component with out crashing', () => {
    const pipRadio = screen.getByRole('radio', {
      name: EmployeePipStatus.pip,
    }) as HTMLInputElement

    expect(pipRadio.checked).toEqual(true)
    userEvent.click(pipRadio)

    const removedFromPIP = screen.getByRole('radio', {
      name: EmployeePipStatus.RemovedFromPIP,
    }) as HTMLInputElement

    userEvent.click(removedFromPIP)

    const inactiveRadio = screen.getByRole('radio', {
      name: EmployeePipStatus.inactive,
    }) as HTMLInputElement

    userEvent.click(inactiveRadio)

    expect(pipRadio.checked).toEqual(false)
    expect(removedFromPIP.checked).toEqual(false)
    expect(inactiveRadio.checked).toEqual(true)
  })
  test('should render add PIP component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Add',
    })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
  test('should render export button', () => {
    const exportComponent = screen.getByTestId('employee-export-btn')
    expect(exportComponent).toBeTruthy()
  })
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    userEvent.click(exportBtn)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })
})
