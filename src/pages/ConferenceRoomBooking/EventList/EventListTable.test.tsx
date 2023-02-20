import React from 'react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import EventListTable from './EventListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEventList } from '../../../test/data/eventListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockEventList.list[i].authorName.fullName),
    ).toBeInTheDocument()
  }
}

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
        selectDate={''}
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
            events: mockEventList.list,
            isLoading: ApiLoadingState.succeeded,
            listSize: 41,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
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
      expect(screen.queryAllByRole('row')).toHaveLength(42)
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

    test('should redirect to FeedbackForms page upon clicking View button from EventsList Page', () => {
      const viewButtonEl = screen.getByTestId('viewEvent-btn1')
      userEvent.click(viewButtonEl)
      expect(history.location.pathname).toBe('/trainingFeedBackForm/14854')
    })

    it('should render Cancel Event modal popup on clicking cancel button from Actions', async () => {
      const cancelButtonEl = screen.getByTestId('cancelEvent-btn0')
      userEvent.click(cancelButtonEl)
      await waitFor(() => {
        expect(screen.getByText('Cancel Event')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      })
    })
    jest.retryTimes(3)
    it('should close modal popup after clicking Yes option from the modal', async () => {
      const cancelButtonElement = screen.getByTestId('cancelEvent-btn1')
      userEvent.click(cancelButtonElement)
      const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
      userEvent.click(yesButtonEle)
      await waitFor(() => {
        expect(yesButtonEle).not.toBeInTheDocument()
      })
    })

    test('should render correct number of 40 page records', async () => {
      expectPageSizeToBeRendered(20)
      await waitFor(() => {
        userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
        expect(mockSetPageSize).toHaveBeenCalledTimes(1)
        expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
      })
    })
  })
})
