import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import NewBookingLocation from './NewBookingLocation'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockMeetingLocations } from '../../../../test/data/bookingListData'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NewBookingLocation onHandleLocation={jest.fn()} locationValue={1} />
  </div>
)
describe('NewBookingLocation Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        bookingList: {
          isLoading: ApiLoadingState.succeeded,
          meetingLocation: mockMeetingLocations,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const location = screen.getByTestId('location-select')
    userEvent.selectOptions(location, ['RayBizech-1'])
    expect(location).toHaveValue('1')
  })
})
