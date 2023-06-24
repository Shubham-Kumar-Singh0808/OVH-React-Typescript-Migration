import '@testing-library/jest-dom'
import React from 'react'
import ExpenseSubCategoryList from './SubCategoryList'
import { render, screen } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ExpenseSubCategoryList />
  </div>
)

describe('Expense Category Component Testing', () => {
  test('should render Expense Category component without crashing', () => {
    render(toRender, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
    const subCategoryElement = screen.getByRole('heading', {
      name: 'Sub-Category',
    })
    expect(subCategoryElement).toBeInTheDocument()
  })

  it('renders the AddExpenseSubCategory component', () => {
    const { getByTestId } = render(<ExpenseSubCategoryList />)
    const addExpenseSubCategoryComponent = getByTestId('subCategoryName')
    expect(addExpenseSubCategoryComponent).toBeInTheDocument()
  })

  it('renders the ExpenseSubCategoryListTable component', () => {
    const { getByTestId } = render(<ExpenseSubCategoryList />)
    const expenseSubCategoryListTable = getByTestId('subCategoryName')
    expect(expenseSubCategoryListTable).toBeInTheDocument()
  })
})
