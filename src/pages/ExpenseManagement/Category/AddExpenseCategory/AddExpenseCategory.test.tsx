import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddExpenseCategory from './AddExpenseCategory'
import { render, screen } from '../../../../test/testUtils'
import { mockLocationNames } from '../../../../test/data/addLocationListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { mockExpenseCategory } from '../../../../test/data/expenseCategoryData'

describe('Add Location List without data', () => {
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
  test('should render addTracker List component with out crashing', () => {
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

  test('should able to Add input field', () => {
    const productNameInput = screen.getByTestId('categoryNames')
    userEvent.type(productNameInput, 'test')
    const addButton = screen.getByTestId('save-btn')
    expect(addButton).toBeEnabled()
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
    const category = screen.getByTestId('categoryNames')
    userEvent.type(category, 'testing category')
    expect(category).toHaveValue('testing category')

    const addBtnElement = screen.getByRole('button', { name: 'Add' })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)

    const clearBtnElement = screen.getByRole('button', { name: 'Clear' })
    expect(clearBtnElement).toBeEnabled()
    userEvent.click(clearBtnElement)
  })

  test('should be able to render AddExpenseCategory Component label', () => {
    expect(screen.getByTestId('categoryLabel')).toBeTruthy()
  })

  // test('should display error message, when user enters already existing category', async () => {
  //   const inputElement = screen.getByTestId('categoryNames')
  //   userEvent.type(inputElement, 'test adding exactly btn fyhrfh')
  //   await waitFor(() => {
  //     expect(screen.getByText('Category already exist')).toBeInTheDocument()
  //   })
  // })
})
