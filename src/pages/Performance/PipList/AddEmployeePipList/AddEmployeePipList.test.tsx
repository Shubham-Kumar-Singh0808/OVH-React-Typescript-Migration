import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddEmployeePipList from './AddEmployeePipList'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { EmployeePipStatus } from '../../../../types/Performance/PipList/pipListTypes'
import { mockGetAllPipList } from '../../../../test/data/pipListData'

const mockSetTogglePage = jest.fn()
const clearButton = 'clear-btn'

describe('Employee Accounts Table Component Testing', () => {
  beforeEach(() => {
    render(
      <AddEmployeePipList
        pageSize={0}
        setToggle={mockSetTogglePage}
        searchByAdded={true}
        searchByEmployee={true}
        searchInput=""
        fromDate=""
        toDate=""
        selectDay={''}
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
  test('should render on Dates AllocateEmployee', async () => {
    const datePickers = screen.getAllByPlaceholderText('Start Date')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '30 Aug, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('30/08/2022')
    userEvent.click(screen.getByTestId(clearButton))
    expect(datePickers[0]).toHaveValue('')
  })
  test('should render on Dates AllocateEmployee', async () => {
    const datePicker = screen.getAllByPlaceholderText('End Date')
    fireEvent.click(datePicker[0])

    await waitFor(() =>
      fireEvent.change(datePicker[0], {
        target: { value: '30 Aug, 2022' },
      }),
    )
    expect(datePicker[0]).toHaveValue('30/08/2022')
    userEvent.click(screen.getByTestId(clearButton))
    expect(datePicker[0]).toHaveValue('')
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
})
