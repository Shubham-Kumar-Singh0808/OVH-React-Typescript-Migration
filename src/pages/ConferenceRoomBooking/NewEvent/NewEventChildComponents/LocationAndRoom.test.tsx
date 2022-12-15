import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import LocationAndRoom from './LocationAndRoom'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockMeetingLocations,
  mockRoomsOfLocation,
} from '../../../../test/data/bookingListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LocationAndRoom
      eventLocations={[]}
      onHandleLocation={jest.fn()}
      onHandleRoom={jest.fn()}
      locationRooms={[]}
      locationValue={1}
      roomValue={0}
    />
  </div>
)

describe('LocationAndRoom Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        bookingList: {
          isLoading: ApiLoadingState.succeeded,
          meetingLocation: mockMeetingLocations,
          roomsOfLocation: mockRoomsOfLocation,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const location = screen.getByTestId('locationSelect')
    userEvent.selectOptions(location, [''])
    expect(location).toHaveValue('')

    const room = screen.getByTestId('roomSelect')
    userEvent.selectOptions(room, [''])
    expect(room).toHaveValue('')
  })
})
