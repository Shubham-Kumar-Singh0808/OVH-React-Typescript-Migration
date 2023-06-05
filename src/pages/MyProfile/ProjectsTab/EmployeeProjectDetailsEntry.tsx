import { CTableRow, CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { localeDateFormat } from '../../../utils/dateFormatUtils'

const EmployeeProjectDetailsEntry = (): JSX.Element => {
  const projectDetails = useTypedSelector(
    reduxServices.employeeProjects.selectors.projectDetails,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeDetails = projectDetails?.filter(
    (item) => item.employeeId === Number(employeeId),
  )

  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          {employeeDetails[0]?.employeeId}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {employeeDetails[0]?.empFirstName +
            ' ' +
            employeeDetails[0]?.empLastName}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {employeeDetails[0]?.desigination}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {employeeDetails[0]?.allocation}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {localeDateFormat(employeeDetails[0]?.endDate)}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {employeeDetails[0]?.billable ? 'Yes' : 'No'}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {employeeDetails[0]?.isAllocated ? 'Allocated' : 'Not Allocated'}
        </CTableDataCell>

        {/* {!employeeDetails?.length && isLoading !== ApiLoadingState.loading && (
          <CCol className="text-start ms-4">
            <CRow>
              <h5>No Records Found... </h5>
            </CRow>
          </CCol>
        )} */}
      </CTableRow>
    </>
  )
}

export default EmployeeProjectDetailsEntry
