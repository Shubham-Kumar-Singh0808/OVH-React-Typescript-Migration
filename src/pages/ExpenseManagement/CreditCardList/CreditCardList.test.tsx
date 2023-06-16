import React from 'react'
import CreditCardList from './CreditCardList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <CreditCardList />
  </div>
)

describe('Expense Category Component Testing', () => {
  test('should render Expense Category component without crashing', () => {
    render(toRender, {
      preloadedState: {},
    })
    const categoryElement = screen.getByRole('heading', {
      name: 'Credit Card List',
    })
    expect(categoryElement).toBeInTheDocument()
  })
})
