import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MyTicketsTable from './MyTicketsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeTicketList } from '../../../test/data/ticketListData'

describe('MyTickets component with data', () => {
  beforeEach(() => {
    render(<MyTicketsTable />, {
      preloadedState: {
        myTickets: {
          ticketList: mockEmployeeTicketList,
        },
      },
    })
  })
  test('should open modal when clicking on ticket List subject link', async () => {
    const linkElement = screen.getByTestId('emp-subject2')
    userEvent.click(linkElement)
    const ticketSubject = screen.getAllByText('x')
    await waitFor(() => {
      expect(ticketSubject[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })
  test('should open modal when clicking on description link', async () => {
    const linkElement = screen.getByTestId('ticket-description1')
    userEvent.click(linkElement)
    const ticketDescription = screen.getAllByText('subject.')
    await waitFor(() => {
      expect(ticketDescription[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })
})
