import '@testing-library/jest-dom'
import React from 'react'
import ExpenseForm from './ExpenseForm'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ExpenseForm />
  </div>
)

describe('Expense Form Component Testing', () => {
  test('should render Expense Form component without data', () => {
    render(toRender, {
      preloadedState: {},
    })
    const expenseFormElement = screen.getByRole('heading', {
      name: 'Expense Form',
    })
    expect(expenseFormElement).toBeInTheDocument()
  })
})
