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
    render(<ExpenseSubCategoryListTable />, {
      preloadedState: {
        subCategoryList: {
          isLoading: ApiLoadingState.succeeded,
          expenseCategories: mockExpenseCategoryList,
          subExpenseCategories: mockExpenseSubCategoryList,
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
  test('should render expense Sub-category list table component with data', () => {
    expect(screen.getByText('testing 12121')).toBeInTheDocument()
    expect(screen.getByText('Power chargers')).toBeInTheDocument()
    expect(screen.getByText('Employee Benefit Expenses')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Clint Expenses')).toBeInTheDocument()
    expect(screen.getByText('Fiinance Cost')).toBeInTheDocument()
    expect(screen.getByText('Meals Card')).toBeInTheDocument()
    expect(screen.getByText('USA Credit Card')).toBeInTheDocument()
    expect(screen.getByText('Donation')).toBeInTheDocument()
    expect(screen.getByText('Forex Reload to Employees')).toBeInTheDocument()
  })

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

  // eslint-disable-next-line require-await
  test('should render edit and cancel categories from the Category', async () => {
    const editInputElement = screen.getByTestId('btn-subCategoryEdit1')
    expect(editInputElement).toBeEnabled()
    userEvent.click(editInputElement)

    const category = screen.getByTestId('subCategoryId1')
    userEvent.type(category, 'test adding exactly btn')

    const cancelBtnElement = screen.getByTestId('btn-cancel1')
    expect(cancelBtnElement).toBeEnabled()
    userEvent.click(cancelBtnElement)
  })

  test('should validate input data after edit button click', async () => {
    const editButtonElement = screen.getByTestId(`btn-subCategoryEdit4`)
    await fireEvent.click(editButtonElement)
    await waitFor(async () => {
      userEvent.type(screen.getByTestId(`subCategoryId4`), 'testing2')
      const saveButtonElement = screen.getByTestId(`sh-save-btn4`)
      await fireEvent.click(saveButtonElement)

      expect(screen.getByTestId(`subCategoryId4`)).toHaveValue(
        'Meals Card2testing2testing2',
      )
    })
  })

  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-subCategoryDelete3')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })

  test('should be able to click delete button element with No', () => {
    const deleteElement = screen.getByTestId('btn-subCategoryDelete4')
    expect(deleteElement).toBeInTheDocument()
    userEvent.click(deleteElement)
    const modalCancelBtn = screen.getByRole('button', { name: 'No' })
    userEvent.click(modalCancelBtn)
    expect(modalCancelBtn).toBeInTheDocument()
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
    expect(screen.queryAllByRole('row')).toHaveLength(21)
  })

  test('render number of records', () => {
    const totRec = screen.getByTestId('subCategoryRecords')
    expect(totRec).toBeInTheDocument()
  })

  test('should render with Expense Category records', () => {
    expect(
      screen.getByText('Total Records: ' + mockExpenseSubCategoryList.length),
    ).toBeInTheDocument()
  })
})

describe('Expense SUb-Category without data', () => {
  beforeEach(() => {
    render(<ExpenseSubCategoryListTable />)
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
