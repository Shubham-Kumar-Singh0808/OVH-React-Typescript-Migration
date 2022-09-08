import '@testing-library/jest-dom'

import React from 'react'
import TicketApprovals from './TicketApprovals'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketApprovals />
  </div>
)

describe('Ticket Approvals Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render ticket approval component with out crashing', () => {
    expect(screen.getByText('Ticket Approvals')).toBeInTheDocument()
  })
})
