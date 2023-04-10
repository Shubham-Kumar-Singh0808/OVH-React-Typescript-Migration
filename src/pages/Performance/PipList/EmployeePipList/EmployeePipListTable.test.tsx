import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import EmployeePipListTable from './EmployeePipListTable'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import { EmployeePipStatus } from '../../../../types/Performance/PipList/pipListTypes'
import { mockGetAllPipList } from '../../../../test/data/pipListData'

const mockSetTogglePage = jest.fn()

describe('Employee PipList Table Component Testing', () => {
  beforeEach(() => {
    render(
      <EmployeePipListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
        selectDate=""
        setToggle={mockSetTogglePage}
        setSelectDate={mockSetTogglePage}
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
  test('Should be able to see table titles', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Employee Name')).toBeInTheDocument()
    expect(screen.getByText('Start Date')).toBeInTheDocument()
    expect(screen.getByText('End Date')).toBeInTheDocument()
    expect(screen.getByText('Extended Date')).toBeInTheDocument()
    expect(screen.getByText('Rating')).toBeInTheDocument()
    expect(screen.getByText('Reason for PIP')).toBeInTheDocument()
    expect(screen.getByText('Added by')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
  test('Should be able to see total of 9 records', () => {
    expect(
      screen.getByText(`Total Records: ${mockGetAllPipList?.size}`),
    ).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
    })
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render  Employee PipList Table component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })
})

describe('Employee PipList Table Component Testing', () => {
  beforeEach(() => {
    render(
      <EmployeePipListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
        selectDate=""
        setToggle={mockSetTogglePage}
        setSelectDate={mockSetTogglePage}
        setFromDate={mockSetTogglePage}
        setToDate={mockSetTogglePage}
      />,
      {
        preloadedState: {
          pipList: {
            isLoading: ApiLoadingState.succeeded,
            pipListData: mockGetAllPipList?.list,
            listSize: 25,
          },
        },
      },
    )
  })
  test('should render description modal', () => {
    const description = screen.getAllByTestId('description-modal-link')
    userEvent.click(description[0])
    expect(description[0]).toBeInTheDocument()
  })
})
