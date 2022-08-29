import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketDetails from './TicketDetails'
import { render, screen } from '../../../test/testUtils'

const mockSetToggle = jest.fn()

describe('Ticket Report Component Testing', () => {
  test('should render Ticket Report component with out crashing', () => {
    render(<TicketDetails setToggle={mockSetToggle} />)
    expect(screen.getByText('Ticket Details')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('toggle-back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
