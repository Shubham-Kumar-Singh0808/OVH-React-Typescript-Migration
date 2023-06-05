import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MyTicketsTable from './MyTicketsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockEmployeeTicketList } from '../../../test/data/ticketListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <MyTicketsTable
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
      userEditAccess={true}
    />
    ,
  </div>
)

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockEmployeeTicketList.list[i].id),
    ).toBeInTheDocument()
  }
}

describe('MyTickets component with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        tickets: {
          ticketList: mockEmployeeTicketList,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
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
  jest.retryTimes(3)
  test('should open modal when clicking on description link', async () => {
    const linkElement = screen.getByTestId('mgr-comments0')
    userEvent.click(linkElement)
    const ticketDescription = screen.getAllByText('subject')
    await waitFor(() => {
      expect(ticketDescription[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })

  test('should click on edit button  ', () => {
    const editElement = screen.getAllByTestId('edit-btn')
    userEvent.click(editElement[0])
  })
})

describe('My Tickets Table Component Testing', () => {
  test('should render MyTickets table component without crashing', async () => {
    render(toRender, {
      preloadedState: {
        tickets: {
          ticketList: mockEmployeeTicketList,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
