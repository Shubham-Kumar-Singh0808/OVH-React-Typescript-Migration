import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MyTickets from './MyTickets'
import { render, screen } from '../../../test/testUtils'
import { mockEmployeeTicketList } from '../../../test/data/ticketListData'

describe('Ticket List Component Testing', () => {
  test('should render My Tickets component with out crashing', () => {
    render(<MyTickets />)

    expect(screen.getByText('Ticket List')).toBeInTheDocument()
  })
})
describe('MyTickets component with data', () => {
  beforeEach(() => {
    render(<MyTickets />, {
      preloadedState: {
        myTickets: {
          ticketList: mockEmployeeTicketList,
        },
      },
    })
  })
  test('should render search input field', () => {
    const searchComponent = screen.getByTestId('searchField')
    expect(searchComponent).toBeTruthy()
    const searchInput = screen.findByTestId('searchInput')
    expect(searchInput).toBeTruthy()
  })
  test('should render export button', () => {
    const exportComponent = screen.getByTestId('export-button')
    expect(exportComponent).toBeTruthy()
  })
  test('multi search button should enable only if we enter the value', () => {
    expect(screen.getByTestId('search-btn1')).toBeEnabled()
    userEvent.type(screen.getByPlaceholderText('Multiple Search'), 'Java')
    expect(screen.getByTestId('search-btn1')).toBeEnabled()
  })
})
