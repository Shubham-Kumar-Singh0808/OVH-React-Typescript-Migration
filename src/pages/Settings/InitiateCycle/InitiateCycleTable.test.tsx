import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import InitiateCycleTable from './InitiateCycleTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockActiveCycleData,
  mockAllCycles,
  mockAllQuestions,
} from '../../../test/data/initiateCycleData'

const mockSetTogglePage = jest.fn()

describe('InitiateCycle Table with data', () => {
  beforeEach(() => {
    render(
      <InitiateCycleTable
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
        paginationRange={[]}
        cycleChecked={{
          id: 0,
          question: '',
          checkQuestion: null,
        }}
        setCycleChecked={mockSetTogglePage}
        selChkBoxesFromApi={[]}
        checkList={[]}
      />,
      {
        preloadedState: {
          initiateCycle: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            activeCycleData: mockActiveCycleData,
            allCycles: mockAllCycles?.list,
            allQuestions: mockAllQuestions,
            listSize: 23,
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

  test('Should be able to see total of records', () => {
    expect(screen.getByText('Total Records: 23')).toBeInTheDocument()
  })
})
