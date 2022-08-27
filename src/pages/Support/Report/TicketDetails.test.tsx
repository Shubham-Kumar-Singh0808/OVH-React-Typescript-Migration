import '@testing-library/jest-dom'
import React from 'react'
import TicketDetails from './TicketDetails'
import { render, screen } from '../../../test/testUtils'

const mockSetToggle = jest.fn()

describe('Ticket Report Component Testing', () => {
  test('should render Ticket Report component with out crashing', () => {
    render(<TicketDetails setToggle={mockSetToggle} />)
    expect(screen.getByText('Ticket Details')).toBeInTheDocument()
  })
})
