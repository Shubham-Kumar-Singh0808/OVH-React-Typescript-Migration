import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { NomineeListTableProps } from '../../../types/Achievements/NomineeList/NomineeListTypes'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const NomineeListTable = (props: NomineeListTableProps) => {
  const { setViewNomination } = props
  const dispatch = useAppDispatch()
  const nominationList = useTypedSelector(
    (state) => state.nomineeList.nominationsList,
  )

  const showNominationDetailsButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.preventDefault()
    dispatch(reduxServices.nomineeList.getNominationDetailsThunk(id))
    setViewNomination(true)
  }

  const isLoading = useTypedSelector((state) => state.nomineeList.isLoading)

  return (
    <>
      {isLoading === ApiLoadingState.loading ? (
        <OLoadingSpinner type={LoadingType.PAGE} />
      ) : (
        <CTable
          className="mt-2 mb-2"
          role="table"
          align="middle"
          responsive
          striped
        >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nominee Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Achievement Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">From Month</CTableHeaderCell>
              <CTableHeaderCell scope="col">Added By</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {nominationList.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.employeeName}</CTableDataCell>
                <CTableDataCell>{item.fromMonth}</CTableDataCell>
                <CTableDataCell>{item.toMonth}</CTableDataCell>
                <CTableDataCell>{item.createdBy}</CTableDataCell>
                <CTableDataCell>{item.nominationStatus}</CTableDataCell>
                <CTableDataCell>
                  <div className="button-events">
                    <CButton
                      size="sm"
                      color="info"
                      data-testid={`action-btn${index}`}
                      title="View"
                      onClick={(e) => {
                        showNominationDetailsButtonHandler(e, item.id)
                      }}
                    >
                      <i className="fa fa-eye  text-white"></i>
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </>
  )
}

export default NomineeListTable
