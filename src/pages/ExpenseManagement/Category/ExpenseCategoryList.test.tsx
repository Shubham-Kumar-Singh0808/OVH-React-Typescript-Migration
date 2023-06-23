import '@testing-library/jest-dom'
import React from 'react'
import ExpenseCategoryList from './ExpenseCategoryList'
import { render, screen } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ExpenseCategoryList />
  </div>
)

describe('Expense Category Component Testing', () => {
  test('should render Expense Category component without data', () => {
    render(toRender, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
    const categoryElement = screen.getByRole('heading', { name: 'Category' })
    expect(categoryElement).toBeInTheDocument()
  })

  it('renders the AddExpenseCategory component', () => {
    const { getByTestId } = render(<ExpenseCategoryList />)
    const addExpenseCategoryComponent = getByTestId('categoryName')
    expect(addExpenseCategoryComponent).toBeInTheDocument()
  })

  it('renders the ExpenseCategoryListTable component', () => {
    const { getByTestId } = render(<ExpenseCategoryList />)
    const expenseCategoryListTable = getByTestId('categoryName')
    expect(expenseCategoryListTable).toBeInTheDocument()
  })
})
