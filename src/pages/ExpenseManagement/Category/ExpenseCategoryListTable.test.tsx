import React from 'react'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'
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
          pageSize: 10,
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
    expect(screen.getByText('test adding exactly enter')).toBeInTheDocument()
    expect(screen.getByText('test adding exactly')).toBeInTheDocument()
    expect(screen.getByText('kytsaoduyosdafbdsfb')).toBeInTheDocument()
  })

  test('should render the "Expense Category List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('Should be able to see table titles', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-categoryDelete3')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })

  test('should be able to click delete button element with No', () => {
    const deleteElement = screen.getByTestId('btn-categoryDelete4')
    expect(deleteElement).toBeInTheDocument()
    userEvent.click(deleteElement)
    const modalCancelBtn = screen.getByRole('button', { name: 'No' })
    userEvent.click(modalCancelBtn)
    expect(modalCancelBtn).toBeInTheDocument()
  })
  // eslint-disable-next-line require-await
  test('should render edit and cancel categories from the Category', async () => {
    const editInputElement = screen.getByTestId('btn-categoryEdit1')
    expect(editInputElement).toBeEnabled()
    userEvent.click(editInputElement)

    const category = screen.getByTestId('categoryName1')
    userEvent.type(category, 'test adding exactly btn')

    const cancelBtnElement = screen.getByTestId('cancel-btn1')
    expect(cancelBtnElement).toBeEnabled()
    userEvent.click(cancelBtnElement)
  })

  test('should validate input data after edit button click', async () => {
    const editButtonElement = screen.getByTestId(`btn-categoryEdit1`)
    await fireEvent.click(editButtonElement)
    await waitFor(async () => {
      userEvent.type(screen.getByTestId(`categoryName1`), 'testing2')
      const saveButtonElement = screen.getByTestId(`save-btn1`)
      await fireEvent.click(saveButtonElement)

      expect(screen.getByTestId(`categoryName1`)).toHaveValue(
        'test adding exactly btn2testing2testing2testing2',
      )
    })
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
    expect(screen.queryAllByRole('row')).toHaveLength(11)
  })

  test('render number of records', () => {
    const totRec = screen.getByTestId('records')
    expect(totRec).toBeInTheDocument()
  })

  test('should render with Expense Category records', () => {
    expect(
      screen.getByText('Total Records: ' + mockExpenseCategory.length),
    ).toBeInTheDocument()
  })
})

describe('Expense Category without data', () => {
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
