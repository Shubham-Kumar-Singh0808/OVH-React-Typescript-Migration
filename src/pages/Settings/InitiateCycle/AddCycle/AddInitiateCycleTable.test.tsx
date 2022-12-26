import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import AddInitiateCycleTable from './AddInitiateCycleTable'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockAllCycles } from '../../../../test/data/initiateCycleData'
import { render, screen } from '../../../../test/testUtils'

const mockSetTogglePage = jest.fn()

describe('InitiateCycle Table with data', () => {
  beforeEach(() => {
    render(
      <AddInitiateCycleTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
      />,
      {
        preloadedState: {
          initiateCycle: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            activeCycleData: [],
            allCycles: mockAllCycles,
            allQuestions: { size: 0, list: [] },
            listSize: 31,
          },
        },
      },
    )
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

  test('should render Initiate Cycle table component with  crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })

  test('Should be able to see total of records', () => {
    expect(screen.getByText('Total Records: 31')).toBeInTheDocument()
  })
})
