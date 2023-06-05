import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EventTypeList from './EventTypeList'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { mockEventTypeList } from '../../../../test/data/eventTypeListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EventTypeList />
  </div>
)

describe('Event Type List Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        eventTypeList: {
          eventTypes: mockEventTypeList,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  afterEach(cleanup)
  screen.debug()
  test('should render event type list component with out crashing', () => {
    expect(screen.getByText('EventType List')).toBeInTheDocument()
  })
  screen.debug()
  test('should be able to add event type', () => {
    const inputElement = screen.getByTestId('eventType')
    expect(inputElement).toBeInTheDocument()
    userEvent.type(inputElement, 'newTest')
  })
})
