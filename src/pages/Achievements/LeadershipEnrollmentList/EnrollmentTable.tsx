import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import { useTypedSelector } from '../../../stateStore'
import { EnrollmentFormProps } from '../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'

const EnrollmentTable = (props: EnrollmentFormProps) => {
  const { setShowLeadershipDetails } = props
  const listData = useTypedSelector(
    (state) => state.leadershipEnrollmentList.leadershipList,
  )

  const actionButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowLeadershipDetails(true)
  }

  return (
    <CTable
      role="table"
      className="mt-2 mb-2"
      responsive
      striped
      align="middle"
    >
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Employee Id</CTableHeaderCell>
          <CTableHeaderCell>Employee Name</CTableHeaderCell>
          <CTableHeaderCell>Designation</CTableHeaderCell>
          <CTableHeaderCell>Applied Date</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {listData.map((item, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{item.employeeId}</CTableDataCell>
            <CTableDataCell>{item.employeeName}</CTableDataCell>
            <CTableDataCell>{item.designation}</CTableDataCell>
            <CTableDataCell>{item.createdDate}</CTableDataCell>
            <CTableDataCell>{item.status}</CTableDataCell>
            <CTableDataCell>
              <div className="button-events">
                <CButton
                  color="info"
                  className="danger btn-ovh me-1"
                  size="sm"
                  onClick={actionButtonHandler}
                  data-testid={`edit-btn-${index}`}
                  title="Edit"
                >
                  <i className="fa fa-eye text-white" aria-hidden="true"></i>
                </CButton>
              </div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default EnrollmentTable
