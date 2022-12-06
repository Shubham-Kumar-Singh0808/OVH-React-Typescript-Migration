import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeAccountsExpandTable = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.employeeAccount.selectors.isLoading,
  )

  const financeData = useTypedSelector(
    reduxServices.employeeAccount.selectors.financeInfo,
  )
  console.log(financeData)
  return (
    <>
      <CTable
        responsive
        striped
        className="mt-2 text-start profile-tab-table-size"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Bank Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Account Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">IFSC Code</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {financeData.map((person, index) => {
            return (
              <div key={index}>
                {person.bankDetails?.map((item, index) => {
                  return (
                    <>
                      <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                      <CTableDataCell scope="row">
                        {item.bankName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {item.bankAccountNumber}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {item.ifscCode}
                      </CTableDataCell>
                    </>
                  )
                })}
              </div>
            )
          })}
        </CTableBody>
      </CTable>
      {!financeData?.length && isLoading !== ApiLoadingState.loading && (
        <CCol className="text-start ms-4">
          <CRow>
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default EmployeeAccountsExpandTable
