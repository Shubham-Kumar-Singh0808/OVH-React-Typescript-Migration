import React from 'react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import EventListTable from './EventListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEventList } from '../../../test/data/eventListData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const history = createMemoryHistory()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <EventListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />
    </Router>
  </div>
)
describe('EventList', () => {
  describe('EventsListTable Component Testing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          eventList: {
            events: mockEventList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should render the "Events List" table ', () => {
      const table = screen.getByRole('table')
      expect(table).toBeTruthy()
    })
    test('should render the correct headers', () => {
      expect(screen.getByRole('columnheader', { name: 'S.No' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Subject' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Location' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Room' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Start Date' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Event Type' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'End Date' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Booked Timings' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Author' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    })
    test('should render correct number of page records', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(21)
    })

    test('should render edit button in the Actions', () => {
      expect(screen.getByTestId('editEvent-btn0')).toHaveClass(
        'btn btn-info btn-sm btn-ovh me-1',
      )
    })
    test('should render cancel button in the Actions', () => {
      expect(screen.getByTestId('cancelEvent-btn0')).toHaveClass(
        'btn btn-ovh btn-sm',
      )
    })
    test('should render view button in the Actions', () => {
      expect(screen.getByTestId('viewEvent-btn0')).toHaveClass(
        'btn-ovh me-2 sh-eye-btn-color',
      )
    })

    // test('should redirect to Edit Holiday page upon clicking Edit button from HolidaysList Page', () => {
    //   const editButtonEl = screen.getByTestId('holiday-edit-btn1')
    //   userEvent.click(editButtonEl)
    //   expect(history.location.pathname).toBe('/editHoliday/148')
    // })
    // it('should render Delete modal popup on clicking delete button from Actions', async () => {
    //   const deleteButtonEl = screen.getByTestId('holiday-delete-btn1')
    //   userEvent.click(deleteButtonEl)
    //   await waitFor(() => {
    //     expect(screen.getByText('Delete Holiday')).toBeInTheDocument()
    //     expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
    //     expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    //   })
    // })
    // it('should close modal popup after clicking Yes option from the modal', () => {
    //   const deleteButtonElement = screen.getByTestId('holiday-delete-btn1')
    //   userEvent.click(deleteButtonElement)
    //   const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
    //   userEvent.click(yesButtonEle)
    // })
    // test('should render correct number of 40 page records', () => {
    //   userEvent.selectOptions(screen.getByRole('combobox'), ['20'])
    //   const pageSizeSelect = screen.getByRole('option', {
    //     name: '40',
    //   }) as HTMLOptionElement
    //   expect(pageSizeSelect.selected).toBe(true)

    //   // 42 including the heading
    //   expect(screen.getAllByRole('row')).toHaveLength(21)
    // })
  })
})
