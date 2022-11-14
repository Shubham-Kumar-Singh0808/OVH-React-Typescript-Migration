import '@testing-library/jest-dom'
import React from 'react'
import TicketConfiguration from './TicketConfiguration'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketConfiguration />
  </div>
)

describe('Ticket Configuration Component Testing', () => {
  test('should render Sub-Category List component without crashing', () => {
    render(toRender, {
      preloadedState: {},
    })
    expect(screen.getByText('Sub-Category List')).toBeInTheDocument()
  })
})
