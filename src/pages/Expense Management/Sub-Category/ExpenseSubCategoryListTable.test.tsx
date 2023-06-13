import React from 'react'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseSubCategoryListTable from './ExpenseSubCategoryListTable'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import {
  mockExpenseCategoryList,
  mockExpenseSubCategoryList,
} from '../../../test/data/expenseSubCategoryListData'

describe('Expense Sub-Category List Table with data', () => {
  beforeEach(() => {
    render(<ExpenseSubCategoryListTable userAccess={undefined} />, {
      preloadedState: {
        subCategory: {
          isLoading: ApiLoadingState.succeeded,
          expenseCategories: [],
          subExpenseCategories: mockExpenseCategoryList,
          currentPage: 1,
          pageSize: 20,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  // test('should render expense Sub-category list table component with data', () => {
  //   expect(screen.getByText('Ray tech category')).toBeInTheDocument()
  //   expect(screen.getByText('New Category Testing')).toBeInTheDocument()
  //   expect(screen.getByText('test adding exactly enter')).toBeInTheDocument()
  //   expect(screen.getByText('test adding exactly')).toBeInTheDocument()
  //   expect(screen.getByText('OVH Category')).toBeInTheDocument()
  //   expect(screen.getByText('Power chargers')).toBeInTheDocument()
  //   expect(screen.getByText('Meals Card')).toBeInTheDocument()
  //   expect(screen.getByText('USA Credit Card')).toBeInTheDocument()
  //   expect(screen.getByText('Donation')).toBeInTheDocument()
  //   expect(screen.getByText('Forex Reload to Employees')).toBeInTheDocument()
  // })

  test('should render the "Expense Category List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('Should be able to see table titles', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Sub-Category')).toBeInTheDocument()
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

  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(1)
  })

  test('render number of records', () => {
    const totRec = screen.getByTestId('records')
    expect(totRec).toBeInTheDocument()
  })

  test('should render with Expense Category records', () => {
    expect(
      screen.getByText('Total Records: ' + mockExpenseSubCategoryList.length),
    ).toBeInTheDocument()
  })
})

describe('Room List without data', () => {
  beforeEach(() => {
    render(<ExpenseSubCategoryListTable userAccess={undefined} />)
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Category' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Sub-Category' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })

  test('should render the "Category" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})
