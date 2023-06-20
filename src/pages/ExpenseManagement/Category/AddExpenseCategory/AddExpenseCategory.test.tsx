import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddExpenseCategory from './AddExpenseCategory'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { mockExpenseCategory } from '../../../../test/data/expenseCategoryData'

describe('Add Expense Category without data', () => {
  beforeEach(() => {
    render(<AddExpenseCategory />, {
      preloadedState: {
        addNewCategory: {
          isLoading: ApiLoadingState.succeeded,
          error: null,
          addExpenseCategory: [],
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Add Expense Category List component with out data', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
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
    const clearInputName = screen.getByPlaceholderText('Category Name')
    expect(clearInputName).toHaveValue('')
  })

  test('should enabled add button when input is not empty', () => {
    expect(screen.getByTestId('clear-btn')).not.toBeDisabled()
    expect(screen.getByTestId('save-btn')).toBeDisabled()
  })
})

describe('Add Expense Category with data', () => {
  beforeEach(() => {
    render(<AddExpenseCategory />, {
      preloadedState: {
        addNewCategory: {
          addExpenseCategory: mockExpenseCategory,
        },
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
  test('should be able to render Add Expense Category List  Title', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
  })

  test('should able to select values for options for respective select element', () => {
    const category = screen.getByTestId('categoryName')
    userEvent.type(category, 'testing category')
    expect(category).toHaveValue('testing category')

    const addBtnElement = screen.getByRole('button', { name: 'Add' })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })

  test('should able to clear input field', () => {
    const categoryNameInput = screen.getByTestId('categoryName')
    userEvent.type(categoryNameInput, 'test')
    expect(categoryNameInput).toHaveValue('test')

    const clearBtnElement = screen.getByRole('button', { name: 'Clear' })
    expect(clearBtnElement).toBeEnabled()
    userEvent.click(clearBtnElement)
  })

  test('should be able to render AddExpenseCategory Component label', () => {
    expect(screen.getByTestId('categoryLabel')).toBeTruthy()
  })

  test('showing error on entering existing category which is already exists', () => {
    const inputOrder = screen.getByTestId('categoryName')
    userEvent.type(inputOrder, 'testing')
    expect(inputOrder).toHaveValue('testing')
    expect(screen.getByText('Category already exist')).toBeInTheDocument()
  })
})
