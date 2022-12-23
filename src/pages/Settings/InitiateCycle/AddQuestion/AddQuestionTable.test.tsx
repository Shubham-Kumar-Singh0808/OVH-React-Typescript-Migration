import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import AddQuestionTable from './AddQuestionTable'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockActiveCycleData,
  mockAllCycles,
  mockAllQuestions,
} from '../../../../test/data/initiateCycleData'
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
      expect(screen.getAllByRole('row')).toHaveLength(24)
    })
  })

  test('should be able to click delete button element', () => {
    const deleteBtn = screen.getByTestId('btn-delete1')
    expect(deleteBtn).toBeInTheDocument()
    userEvent.click(deleteBtn)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })

  test('should render question modal', () => {
    const question = screen.getAllByTestId('question-link')
    userEvent.click(question[0])
    expect(question[0]).toBeInTheDocument()
  })

  test('Should be able to see total of records', () => {
    expect(screen.getByText('Total Records: 23')).toBeInTheDocument()
  })
})
