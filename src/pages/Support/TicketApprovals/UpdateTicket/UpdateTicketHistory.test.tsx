import '@testing-library/jest-dom'
import React from 'react'
import UpdateTicketHistory from './UpdateTicketHistory'
import { render, screen } from '../../../../test/testUtils'

describe('Ticket History Component Testing', () => {
  test('should render Update Ticket History component with out crashing', () => {
    render(<UpdateTicketHistory />)
    expect(screen.getByText('History')).toBeInTheDocument()
  })
})
