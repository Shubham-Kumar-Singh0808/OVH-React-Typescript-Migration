import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import AddQuestionTable from './AddQuestionTable'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockAllQuestions } from '../../../../test/data/initiateCycleData'
import { render, screen } from '../../../../test/testUtils'

const mockSetTogglePage = jest.fn()

describe('InitiateCycle Table with data', () => {
  beforeEach(() => {
    render(
      <AddQuestionTable
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
            allQuestions: mockAllQuestions,
            listSize: mockAllQuestions?.size,
          },
        },
      },
    )
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Question' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
  })

  test('should render the "Initiate Cycle" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
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
})
