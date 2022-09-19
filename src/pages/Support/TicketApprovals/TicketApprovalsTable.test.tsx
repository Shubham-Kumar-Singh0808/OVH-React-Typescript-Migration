import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketApprovalsTable from './TicketApprovalsTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockAllTicketApprovals } from '../../../test/data/ticketApprovalsData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockAllTicketApprovals.list[i].id),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const mockSetToggle = jest.fn()
const mockSetRenderTicketApprovals = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketApprovalsTable
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
      setToggle={mockSetToggle}
      renderTicketApprovals={true}
      setRenderTicketApprovals={mockSetRenderTicketApprovals}
    />
  </div>
)

describe('Ticket Approvals Table Component Testing without data', () => {
  beforeEach(() => {
    render(toRender)
  })
  afterEach(cleanup)
  test('should render the "ticket approvals" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Ticket No' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee Name' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Subject' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Start Date' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Due Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })

  describe('Ticket Approvals Table Component Testing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          ticketApprovals: {
            ticketsForApproval: mockAllTicketApprovals,
          },
        },
      })
    })
    afterEach(cleanup)

    test('should render ticket approvals table component with data without crashing', async () => {
      expectPageSizeToBeRendered(20)
      await waitFor(() => {
        userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
        expect(mockSetPageSize).toHaveBeenCalledTimes(1)
        expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
      })
    })

    test('should render subject modal', () => {
      const subjectElement = screen.getAllByTestId('ticket-subject-link')
      userEvent.click(subjectElement[0])
      expect(subjectElement[0]).toBeInTheDocument()
    })

    test('should render description modal', () => {
      const descriptionElement = screen.getAllByTestId(
        'ticket-description-link',
      )
      userEvent.click(descriptionElement[0])
      expect(descriptionElement[0]).toBeInTheDocument()
    })

    test('should render reject modal', () => {
      const rejectBtn = screen.getAllByTestId('ticket-reject-btn')
      expect(rejectBtn[0]).toBeInTheDocument()
      userEvent.click(rejectBtn[0])
      const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
      userEvent.click(modalConfirmBtn)
      expect(modalConfirmBtn).toBeInTheDocument()
    })

    test('should render reject modal', () => {
      const ticketTimelineBtn = screen.getAllByTestId('ticketTimelineBtn')
      expect(ticketTimelineBtn[0]).toBeInTheDocument()
      userEvent.click(ticketTimelineBtn[0])
      expect(mockSetToggle).toHaveBeenCalledTimes(1)
    })
  })
})
