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
import { useTypedSelector } from '../../../../stateStore'
import { EnrollmentFormProps } from '../../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'

const EnrollmentTable = (props: EnrollmentFormProps): JSX.Element => {
  const { setShowLeadershipDetails, setCurrentIndex } = props
  const listData = useTypedSelector(
    (state) => state.leadershipEnrollmentList.leadershipList,
  )

  const actionButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault()
    setCurrentIndex(index)
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
        {listData?.map((item, index) => (
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
                  className="btn-ovh me-1 btn-ovh-employee-list"
                  size="sm"
                  onClick={(e) => {
                    actionButtonHandler(e, index)
                  }}
                  data-testid={`action-btn-${index}`}
                  title="View"
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
