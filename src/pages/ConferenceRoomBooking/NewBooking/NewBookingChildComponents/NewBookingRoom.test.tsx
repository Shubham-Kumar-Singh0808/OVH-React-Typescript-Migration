import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import NewBookingRoom from './NewBookingRoom'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockRoomsOfLocation } from '../../../../test/data/bookingListData'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NewBookingRoom onHandleRoom={jest.fn()} roomValue={0} />
  </div>
)
describe('NewBookingRoom Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        bookingList: {
          isLoading: ApiLoadingState.succeeded,
          roomsOfLocation: mockRoomsOfLocation,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const room = screen.getByTestId('roomSelect')
    userEvent.selectOptions(room, ['Pantry'])
    expect(room).toHaveValue('')
  })
})
