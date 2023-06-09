import React from 'react'
import { cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseCategoryListTable from './ExpenseCategoryListTable'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockExpenseCategory } from '../../../test/data/expenseCategoryData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

describe('Expense Category List Table with data', () => {
  beforeEach(() => {
    render(<ExpenseCategoryListTable />, {
      preloadedState: {
        categoryList: {
          getAllCategory: mockExpenseCategory,
          isLoading: ApiLoadingState.succeeded,
          currentPage: 1,
          pageSize: 20,
          error: null,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render expense category list table component with data', () => {
    expect(
      screen.getByText('test adding exactly btn fyhrfh'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('test adding exactly btn fyhrfh'),
    ).toBeInTheDocument()
    expect(screen.getByText('kytsaoduyosdafbdsfb')).toBeInTheDocument()
    expect(screen.getByText('test adding exactly')).toBeInTheDocument()
    expect(screen.getByText('tefgsgtgvb')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  test('should render the "Expense Category List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(21)
  })

  test('render number of records', () => {
    const totRec = screen.getByTestId('records')
    expect(totRec).toBeInTheDocument()
  })

  test('Should be able to see table titles', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })

  test('should render with Expense Category recordsw ', () => {
    expect(
      screen.getByText('Total Records: ' + mockExpenseCategory.length),
    ).toBeInTheDocument()
  })

  test('should be able to add category type', () => {
    const inputElement = screen.getByTestId('categoryNames1')
    expect(inputElement).toBeInTheDocument()
    userEvent.type(inputElement, 'newTest')
  })

  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-categoryDelete3')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })
})

describe('Room List without data', () => {
  beforeEach(() => {
    render(<ExpenseCategoryListTable />)
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Category' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
  })

  test('should render the "Category" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})
