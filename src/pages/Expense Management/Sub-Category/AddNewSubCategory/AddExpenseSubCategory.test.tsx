import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import AddExpenseCategory from '../../../Expense Management/Sub-Category/AddNewSubCategory/AddExpenseSubCategory'
import {
  mockExpenseCategoryList,
  mockExpenseSubCategoryList,
} from '../../../../test/data/expenseSubCategoryListData'

describe('Add Expense Sub Category List without data', () => {
  beforeEach(() => {
    render(<AddExpenseCategory />, {
      preloadedState: {
        subCategoryList: {
          isLoading: ApiLoadingState.succeeded,
          expenseCategories: [],
          subExpenseCategories: [],
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
  test('should render Add Expense Sub Category List component with out crashing', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
    expect(screen.getByText('Sub-Category:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('save-btn')).toBeDisabled()
    expect(screen.getByTestId('clear-btn')).toBeEnabled()
  })

  // eslint-disable-next-line require-await
  test('should render clear inputs', async () => {
    userEvent.click(screen.getByRole('button', { name: 'Clear' }))
    const clearInputName = screen.getByPlaceholderText('Sub Category Name')
    expect(clearInputName).toHaveValue('')
  })

  test('should enabled add button when input is not empty', () => {
    expect(screen.getByTestId('clear-btn')).not.toBeDisabled()
    expect(screen.getByTestId('save-btn')).toBeDisabled()
  })
})

describe('Add Expense Sub Category List with data', () => {
  beforeEach(() => {
    render(<AddExpenseCategory />, {
      preloadedState: {
        subCategoryList: {
          expenseCategories: mockExpenseCategoryList,
          subExpenseCategories: mockExpenseSubCategoryList,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should be able to render Add Expense Sub Category List  Title', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
    expect(screen.getByText('Sub-Category:')).toBeInTheDocument()
  })

  test('clear button functionality', () => {
    const SubCategoryInput = screen.getByTestId('subCategoryName')
    userEvent.type(SubCategoryInput, 'testing category')
    expect(SubCategoryInput).toHaveValue('testing category')

    const clearBtnElement = screen.getByRole('button', { name: 'Clear' })
    expect(clearBtnElement).toBeEnabled()
    userEvent.click(clearBtnElement)
  })

  test('should able to select values for options for respective select element', () => {
    const categoryNameElement = screen.getByTestId('categoryName')
    userEvent.selectOptions(categoryNameElement, ['Ray tech category'])
    expect(categoryNameElement).toHaveValue('74')

    const category = screen.getByTestId('subCategoryName')
    userEvent.type(category, 'testings category')
    expect(category).toHaveValue('testings category')

    const addBtnElement = screen.getByRole('button', { name: 'Add' })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })

  test('should be able to render Add Expense Sub Category Component label', () => {
    expect(screen.getByTestId('categoryLabel')).toBeTruthy()
  })

  test('showing error on entering existing Sub-Category which is already exists', () => {
    const categoryNameElement = screen.getByTestId('categoryName')
    userEvent.selectOptions(categoryNameElement, ['testting 12121'])
    expect(categoryNameElement).toHaveValue('25')
    const inputOrder = screen.getByTestId('subCategoryName')
    userEvent.type(inputOrder, 'Power chargers')
    expect(inputOrder).toHaveValue('Power chargers')
    expect(screen.getByText('Sub Category already exist')).toBeInTheDocument()
  })
})
