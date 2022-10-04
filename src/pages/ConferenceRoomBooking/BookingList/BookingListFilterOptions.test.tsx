import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import BookingListFilterOptions from './BookingListFilterOptions'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockMeetingLocations,
  mockRoomsOfLocation,
} from '../../../test/data/bookingListData'

const setLocation = jest.fn()
const setRoom = jest.fn()
const setMeetingStatus = jest.fn()
const setSelectDate = jest.fn()
const setDate = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <BookingListFilterOptions
      location={''}
      setLocation={setLocation}
      room={''}
      setRoom={setRoom}
      meetingStatus={''}
      setMeetingStatus={setMeetingStatus}
      selectDateOptions={'Custom'}
      setSelectDateOptions={setSelectDate}
      selectDate={''}
      setSelectDate={setDate}
    />
  </div>
)

describe('Booking List Filter Options Component Testing with data', () => {
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
  test('should able to select values for options for respective select element', async () => {
    const location = screen.getByTestId('location-select')
    userEvent.selectOptions(location, ['1'])
    expect(location).toHaveValue('')

    const room = screen.getByTestId('room-select')
    userEvent.selectOptions(room, ['Pantry'])
    expect(room).toHaveValue('')

    const meetingStatus = screen.getByTestId('meetingStatus-select')
    userEvent.selectOptions(meetingStatus, ['New'])
    expect(meetingStatus).toHaveValue('New')

    const dateOption = screen.getByTestId('date-option')
    userEvent.selectOptions(dateOption, ['Custom'])
    expect(dateOption).toHaveValue('Custom')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    expect(datePickers[0]).toHaveValue('')
  })
})
