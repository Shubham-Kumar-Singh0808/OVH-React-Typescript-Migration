import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AddInvestmentCycle from './AddInvestmentCycle'
import { render, screen } from '../../../test/testUtils'

const history = createMemoryHistory()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <AddInvestmentCycle />
    </Router>
  </div>
)

const backButtonElement = 'addCycle-back-btn'
describe('AddCycle List Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {},
    })
  })
  test('should render IT Declaration List Page Title', () => {
    expect(screen.getByText('Add Cycle')).toBeInTheDocument()
  })
  test('should redirect to itDeclarationList page upon clicking back button', () => {
    const backButton = screen.getByTestId(backButtonElement)
    userEvent.click(backButton)
    expect(history.location.pathname).toBe('/itDeclarationList')
  })
})
