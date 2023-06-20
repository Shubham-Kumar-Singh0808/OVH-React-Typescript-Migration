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

describe('Credit Card List Component Testing', () => {
  test('should render Credit Card List component without data', () => {
    render(toRender, {
      preloadedState: {},
    })
    const categoryElement = screen.getByRole('heading', {
      name: 'Credit Card List',
    })
    expect(categoryElement).toBeInTheDocument()
  })
})
