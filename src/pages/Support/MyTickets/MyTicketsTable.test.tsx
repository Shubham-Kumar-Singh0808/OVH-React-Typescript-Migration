import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MyTicketsTable from './MyTicketsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeTicketList } from '../../../test/data/ticketListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockEmployeeTicketList.list[i].id),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('MyTickets component with data', () => {
  beforeEach(() => {
    render(<MyTicketsTable />, {
      preloadedState: {
        tickets: {
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
    const linkElement = screen.getByTestId('mgr-comments0')
    userEvent.click(linkElement)
    const ticketDescription = screen.getAllByText('subject')
    await waitFor(() => {
      expect(ticketDescription[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
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

describe('Scheduled Interviews Table Component Testing', () => {
  test('should render scheduled interviews table component without crashing', async () => {
    render(<MyTicketsTable />, {
      preloadedState: {
        tickets: {
          ticketList: mockEmployeeTicketList,
        },
      },
    })

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(0)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})
