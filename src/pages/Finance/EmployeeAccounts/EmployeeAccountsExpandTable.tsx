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
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeAccountsExpandTable = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.clients.selectors.isLoadingProjectDetails,
  )

  const financeData = useTypedSelector(
    reduxServices.employeeAccount.selectors.financeInfo,
  )

  return (
    <>
      <CTable
        responsive
        striped
        className="mt-2 text-start profile-tab-table-size"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Bank Name</CTableHeaderCell>
            <CTableHeaderCell>Account Number</CTableHeaderCell>
            <CTableHeaderCell>IFSC Code</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading !== ApiLoadingState.loading ? (
            financeData &&
            financeData?.map((data, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {data.bankDetails.map((item, index) => {
                      return (
                        <>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell key={index}>
                            {item.bankName}
                          </CTableDataCell>
                          <CTableDataCell>
                            {item.bankAccountNumber}
                          </CTableDataCell>
                          <CTableDataCell>{item.ifscCode}</CTableDataCell>
                        </>
                      )
                    })}
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
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
