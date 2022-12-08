import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SectionsList from './SectionsList'
import { render, screen } from '../../../../test/testUtils'

const history = createMemoryHistory()
describe('IT Declaration List Component Testing', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <SectionsList />
      </Router>,
      {
        preloadedState: {},
      },
    )
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
