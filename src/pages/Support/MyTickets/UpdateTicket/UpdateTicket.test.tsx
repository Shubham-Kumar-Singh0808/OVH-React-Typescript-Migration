import '@testing-library/jest-dom'
import React from 'react'
import UpdateTicket from './UpdateTicket'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <UpdateTicket />
  </div>
)

describe('Ticket List Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render update ticket component with out crashing', () => {
    expect(screen.getByText('Update Ticket')).toBeInTheDocument()
  })
})
