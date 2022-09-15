import '@testing-library/jest-dom'
import React from 'react'
import TicketReport from './TicketReport'
import { render, screen } from '../../../test/testUtils'

describe('Ticket Report Component Testing', () => {
  test('should render Ticket Report component with out crashing', () => {
    render(<TicketReport />)

    expect(screen.getByText('Ticket Reports')).toBeInTheDocument()
  })
})
