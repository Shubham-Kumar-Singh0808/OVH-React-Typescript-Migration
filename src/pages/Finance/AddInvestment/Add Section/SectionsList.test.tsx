import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SectionsList from './SectionsList'
import { render, screen } from '../../../../test/testUtils'

const history = createMemoryHistory()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <SectionsList />
    </Router>
  </div>
)
describe('IT Declaration List Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {},
    })
  })
  test('should render IT Declaration List Page Title', () => {
    expect(screen.getByText("Section's")).toBeInTheDocument()
  })
  test('should redirect to addInvestment page upon clicking back button', () => {
    const backButton = screen.getByTestId('back-btn')
    userEvent.click(backButton)
    expect(history.location.pathname).toBe('/addInvestment')
  })
})
