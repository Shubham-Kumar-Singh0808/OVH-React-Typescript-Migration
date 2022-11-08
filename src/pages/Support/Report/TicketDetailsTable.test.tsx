import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketDetailsTable from './TicketDetailsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockTicketDetailsData } from '../../../test/data/ticketReportsData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockTicketDetailsData[i].employeeName),
    ).toBeInTheDocument()
  }
}

const mockBackButton = jest.fn()
const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketDetailsTable backButtonHandler={mockBackButton} />,
  </div>
)

describe('Ticket Details Table Component Testing', () => {
  test('should render Ticket Details table component without crashing', async () => {
    render(toRender, {
      preloadedState: {
        ticketReport: {
          ticketsDetailsList: mockTicketDetailsData,
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

describe('Employee Ticket Details', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        ticketReport: {
          ticketsDetailsList: mockTicketDetailsData,
        },
      },
    })
  })
  test('should open modal when clicking on ticket subject link', async () => {
    const linkElement = screen.getByTestId('subject-comments2')
    userEvent.click(linkElement)
    const empComment = screen.getAllByText('Hi')
    await waitFor(() => {
      expect(empComment[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })
  test('should open modal when clicking on ticket description link', async () => {
    const linkElement = screen.getByTestId('dsc-comments1')
    userEvent.click(linkElement)
    const mgrComment = screen.getAllByText('HI')
    await waitFor(() => {
      expect(mgrComment[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })
})
