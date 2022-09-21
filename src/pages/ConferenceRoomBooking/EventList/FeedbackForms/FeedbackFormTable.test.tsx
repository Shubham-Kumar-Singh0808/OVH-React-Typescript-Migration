import React from 'react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import FeedbackFormTable from './FeedbackFormTable'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockFeedbackFormList } from '../../../../test/data/feedbackFormListData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockFeedbackFormList.list[i].createdBy),
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
      <FeedbackFormTable
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
            feedbackFormDetails: mockFeedbackFormList.list,
            isLoading: ApiLoadingState.succeeded,
            listSize: mockFeedbackFormList.size,
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
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Feedback Form Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Created by' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Created date' }),
      ).toBeTruthy()
    })
    test('should render correct number of page records', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(42)
    })
  })
})
