import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditProjectMembers from './EditProjectMembers'
import { render, screen } from '../../../test/testUtils'
import { mockProjectMembers } from '../../../test/data/bookingListData'

describe('EditAttendees Component', () => {
  describe('Should be able to reset EditAttendees Component value', () => {
    beforeEach(() => {
      render(
        <EditProjectMembers
          editMeetingRequest={{
            id: 0,
            agenda: '',
            roomId: 0,
            roomName: '',
            locationName: '',
            fromDate: '',
            toDate: '',
            startTime: '',
            endTime: '',
            projectName: '',
            employeeIds: null,
            authorName: {
              designation: '',
              emailId: '',
              firstName: '',
              fullName: '',
              id: 0,
              lastName: '',
              profilePicPath: '',
            },
            employeeNames: [],
            isAuthorisedUser: false,
            locationId: 0,
            employeeAvailability: null,
            timeFomrat: null,
            disableEdit: null,
            meetingEditDTOList: [],
            meetingAttendeesDto: null,
            availability: [],
            meetingStatus: null,
            conferenceType: '',
            eventTypeName: null,
            eventTypeId: 0,
            eventLocation: '',
            eventId: 0,
            description: '',
            eventEditAccess: null,
            empDesignations: null,
            employeeDto: null,
            trainerName: {
              designation: '',
              emailId: '',
              firstName: '',
              fullName: '',
              id: 0,
              lastName: '',
              profilePicPath: '',
            },
            availableDates: '',
          }}
          projectMembers={mockProjectMembers}
          attendeeResponse={[]}
          setAttendeeReport={jest.fn()}
          selectEditProjectMember={jest.fn()}
          isErrorShow={false}
          setIsAttendeeErrorShow={jest.fn()}
          checkIsAttendeeExists={jest.fn()}
          setIsErrorShow={jest.fn()}
          deleteAttendeeId={undefined}
        />,
      )
    })
    test('should click on edit button  ', () => {
      const editElement = screen.getAllByTestId('project-member')
      userEvent.click(editElement[0])
      expect(editElement[0]).toBeInTheDocument()
    })
    test('should render with data ', () => {
      expect(screen.getByText('Jyothika Devi')).toBeInTheDocument()
    })
    test('should click on delete button  ', () => {
      const editElement = screen.getAllByTestId('attendeeDelete-btn')
      userEvent.click(editElement[0])
      expect(editElement[0]).toBeInTheDocument()
    })
  })
})
