import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const ResignationListTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.resignationList.selectors.isLoading,
  )
  const dispatch = useAppDispatch()
  const getAllResignationList = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListDetails,
  )
  const listSize = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListSize,
  )

  useEffect(() => {
    dispatch(
      reduxServices.resignationList.getResignationList({
        dateSelection: '',
        empStatus: '',
        endIndex: pageSize * currentPage,
        from: '',
        multiplesearch: '',
        startIndex: pageSize * (currentPage - 1),
        status: 'ALL',
        to: '',
      }),
    )
  }, [dispatch, pageSize, currentPage])
  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  return (
    <>
      <>
        <CTable striped className="mt-3">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Resignation Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Relieving Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Primary Reason</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Resignation Status
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {isLoading !== ApiLoadingState.loading ? (
              getAllResignationList &&
              getAllResignationList?.map((ticket, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                    <CTableDataCell>{ticket.employeeId}</CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/employeeProfile/${ticket.employeeId}`}
                        className="employee-name"
                      >
                        {ticket.employeeName}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>{ticket.managerName}</CTableDataCell>
                    <CTableDataCell>{ticket.resignationDate}</CTableDataCell>
                    <CTableDataCell>{ticket.relievingDate}</CTableDataCell>
                    <CTableDataCell>{ticket.primaryReasonName}</CTableDataCell>
                    <CTableDataCell>{ticket.status}</CTableDataCell>
                    <CTableDataCell>{ticket.empStatus}</CTableDataCell>
                    <CTableDataCell data-testid="action-cell">
                      <div className="sh-btn-group">
                        <CButton
                          color="info"
                          className="btn-ovh me-2"
                          data-testid="history-btn"
                        >
                          <i
                            className="fa fa-bar-chart text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                        <CButton
                          color="info"
                          size="sm"
                          className="btn-ovh-employee-list"
                        >
                          <i className="fa fa-clock-o  text-white"></i>
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </CTableBody>
        </CTable>
        {getAllResignationList?.length ? (
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {listSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {listSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {listSize > 20 && (
              <CCol
                xs={5}
                className="gap-1 d-grid d-md-flex justify-content-md-end"
              >
                <OPagination
                  currentPage={currentPage}
                  pageSetter={setCurrentPage}
                  paginationRange={paginationRange}
                />
              </CCol>
            )}
          </CRow>
        ) : (
          <CCol>
            <CRow className="mt-4 ms-3">
              <h5>No Records Found... </h5>
            </CRow>
          </CCol>
        )}
      </>
    </>
  )
}
export default ResignationListTable
