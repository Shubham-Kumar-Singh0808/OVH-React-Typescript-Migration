import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const InvestmentCheckListDetailsTable = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.investmentCheckList.selectors.isLoading,
  )
  const investments = useTypedSelector(
    reduxServices.investmentCheckList.selectors.investments,
  )

  return (
    <>
      <CTable responsive striped className="mt-0">
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              #
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Investment
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content">
              Max-Limit
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading !== ApiLoadingState.loading ? (
            investments &&
            investments?.map((invest, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell scope="row">
                    {invest.investmentName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {invest.maxLimit?.toLocaleString()}
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default InvestmentCheckListDetailsTable
