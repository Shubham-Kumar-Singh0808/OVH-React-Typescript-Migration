import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddQuestionTable from './AddQuestionTable'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockAllQuestions } from '../../../../test/data/initiateCycleData'
import { render, screen, waitFor } from '../../../../test/testUtils'

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
})
