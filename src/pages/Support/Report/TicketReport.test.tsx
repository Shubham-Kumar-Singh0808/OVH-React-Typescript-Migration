import '@testing-library/jest-dom'
import React from 'react'
import TicketReport from './TicketReport'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketReport />
  </div>
)

describe('Ticket Report Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render Ticket Report component with out crashing', () => {
    expect(screen.getByText('Ticket Reports')).toBeInTheDocument()
  })
})
