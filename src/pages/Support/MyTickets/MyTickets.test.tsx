import '@testing-library/jest-dom'
import React from 'react'
import MyTickets from './MyTickets'
import { render, screen } from '../../../test/testUtils'

describe('Ticket List Component Testing', () => {
  test('should render My Tickets component with out crashing', () => {
    render(<MyTickets />)
    expect(screen.getByText('Ticket List')).toBeInTheDocument()
  })
})
