import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ProjectMembersSelectionForEvent from './ProjectMembersSelectionForEvent'
import { render, screen } from '../../../../test/testUtils'
import { mockProjectMembers } from '../../../../test/data/bookingListData'

describe('EditAttendees Component', () => {
  describe('Should be able to reset EditAttendees Component value', () => {
    beforeEach(() => {
      render(
        <ProjectMembersSelectionForEvent
          editEvent={{
            agenda: '',
            authorName: {
              designation: '',
              emailId: '',
              firstName: '',
              fullName: '',
              id: 0,
              lastName: '',
              profilePicPath: '',
            },
            availability: [],
            conferenceType: '',
            description: 'test',
            endTime: '',
            eventLocation: 'Raybiztech-1',
            eventTypeId: 1021,
            fromDate: '',
            locationId: 0,
            projectName: 'ovh',
            roomId: 1,
            startTime: '',
            toDate: undefined,
            trainerName: undefined,
          }}
          projectMembers={mockProjectMembers}
          attendeeResponse={[]}
          setAttendeesResponse={jest.fn()}
          selectProjectMember={jest.fn()}
          isErrorShow={false}
          setIsAttendeeErrorShow={jest.fn()}
          checkIsAttendeeExists={jest.fn()}
          setIsErrorShow={jest.fn()}
          deleteAttendeeId={1}
        />,
      )
    })
    test('should click on edit button  ', () => {
      const editElement = screen.getAllByTestId('event-project-member')
      userEvent.click(editElement[0])
      expect(editElement[0]).toBeInTheDocument()
    })
    test('should render with data ', () => {
      expect(screen.getByText('Jyothika Devi')).toBeInTheDocument()
    })
    test('should click on delete button  ', () => {
      const delbtnElement = screen.getAllByTestId('delete-btn')
      userEvent.click(delbtnElement[0])
      expect(delbtnElement[0]).toBeInTheDocument()
    })
  })
})
