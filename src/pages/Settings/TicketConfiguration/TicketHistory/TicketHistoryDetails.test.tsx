import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketHistoryDetails from './TicketHistoryDetails'
import { render, screen } from '../../../../test/testUtils'

describe('Ticket History Component Testing', () => {
  test('should render Ticket History component without crashing', () => {
    render(<TicketHistoryDetails />)
    expect(screen.getByText('Ticket History Details')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('toggle-back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(backButtonElement).toHaveValue('')
  })
})
