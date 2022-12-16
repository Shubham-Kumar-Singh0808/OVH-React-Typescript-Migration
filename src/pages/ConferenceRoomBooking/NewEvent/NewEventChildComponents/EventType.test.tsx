import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EventType from './EventType'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { mockEventTypeList } from '../../../../test/data/eventTypeListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EventType
      eventTypeList={[]}
      eventTypeValue={0}
      onHandleEventType={jest.fn()}
    />
  </div>
)

describe('Event Type List Component Testing', () => {
  render(toRender, {
    preloadedState: {
      eventTypeList: {
        eventTypes: mockEventTypeList,
        isLoading: ApiLoadingState.succeeded,
      },
    },
  })

  afterEach(cleanup)
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const eventType = screen.getByTestId('eventTypeSelect-test')
    userEvent.selectOptions(eventType, [''])
    expect(eventType).toHaveValue('')
  })
})
