import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MyTicketsTable from './MyTicketsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeTicketList } from '../../../test/data/ticketListData'

const mockSetToggle = jest.fn()

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
    render(<MyTicketsTable setToggle={mockSetToggle} />, {
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
  test('should render ', () => {
    const cancelElement = screen.getAllByTestId('cancel-btn')
    expect(cancelElement[0]).toBeInTheDocument()
    userEvent.click(cancelElement[0])
    const confirmDeleteBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(confirmDeleteBtn)
    expect(confirmDeleteBtn)
  })
  test('should click on edit button  ', () => {
    const editElement = screen.getAllByTestId('edit-btn')
    userEvent.click(editElement[0])
    expect(editElement[0]).toBeInTheDocument()
  })
})

describe('My Tickets Table Component Testing', () => {
  test('should render MyTickets table component without crashing', async () => {
    render(<MyTicketsTable setToggle={mockSetToggle} />, {
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
