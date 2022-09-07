import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketHistoryDetails from './TicketHistoryDetails'
import { render, screen } from '../../../../test/testUtils'

const mockBackButtonHandler = jest.fn()

describe('Ticket History Component Testing', () => {
  test('should render Ticket History component with out crashing', () => {
    render(<TicketHistoryDetails backButtonHandler={mockBackButtonHandler} />)
    expect(screen.getByText('Ticket History Details')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('toggle-back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(backButtonElement).toHaveValue('')
    expect(mockBackButtonHandler).toHaveBeenCalledTimes(1)
  })
})
