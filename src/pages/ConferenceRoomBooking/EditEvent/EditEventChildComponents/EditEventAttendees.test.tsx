import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditEventAttendees from './EditEventAttendees'
import { render, screen } from '../../../../test/testUtils'
import { mockMeetingDToList } from '../../../../test/data/bookingListData'

describe('EditAttendees Component', () => {
  describe('Should be able to reset EditAttendees Component value', () => {
    beforeEach(() => {
      render(
        <EditEventAttendees
          attendeeResponse={mockMeetingDToList}
          setAttendeesResponse={jest.fn()}
          deleteAttendeeId={0}
          setDeleteAttendeeId={jest.fn()}
        />,
      )
    })
    test('should render with data ', () => {
      expect(screen.getByText('Not Available')).toBeInTheDocument()
      expect(screen.getByText('vinesh merugu')).toBeInTheDocument()
    })
    test('should click on edit button  ', () => {
      const editElement = screen.getAllByTestId('delete-attendee-btn')
      userEvent.click(editElement[0])
      expect(editElement[0]).toBeInTheDocument()
    })
  })
})
