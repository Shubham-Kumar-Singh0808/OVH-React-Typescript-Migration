import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import SelectedAttendees from './SelectedAttendees'
import {
  Availability,
  ProjectMembers,
} from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const ProjectMembersSelection = ({
  projectMembers,
}: {
  projectMembers: ProjectMembers[]
}): JSX.Element => {
  const [attendeesList, setAttendeesList] = useState<Availability[]>([])

  return (
    <>
      <CRow className="mt-4">
        <CCol sm={{ span: 3, offset: 1 }}>
          <CTable responsive striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Project People</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projectMembers &&
                projectMembers?.map((currMember, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{currMember.fullName}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info btn-ovh me-1"
                          className="btn-ovh-employee-list"
                        >
                          <i
                            className="fa fa-arrow-right text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
        </CCol>

        <CCol sm={2} className="meeting-bulk-add">
          <CButton color="info btn-ovh me-1" className="btn-ovh">
            <i className="fa fa-arrow-right text-white" aria-hidden="true"></i>
          </CButton>
          <CButton color="danger btn-ovh me-1" className="btn-ovh">
            <i className="fa fa-trash-o text-white" aria-hidden="true"></i>
          </CButton>
        </CCol>
        <SelectedAttendees attendeesList={attendeesList} />
      </CRow>
    </>
  )
}

export default ProjectMembersSelection
