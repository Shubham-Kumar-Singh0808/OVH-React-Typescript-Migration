import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { EmployeePIPListTableProps } from '../../../../types/Performance/PipList/pipListTypes'

const EmployeePipListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: EmployeePIPListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const pipListData = useTypedSelector(
    reduxServices.pipList.selectors.pipListData,
  )
  const listSize = useTypedSelector(reduxServices.pipList.selectors.listSize)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Extended Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reason for PIP</CTableHeaderCell>
            <CTableHeaderCell scope="col">Added by</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pipListData?.length > 0 &&
            pipListData?.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.employeeName}</CTableDataCell>
                  <CTableDataCell>{item.startDate}</CTableDataCell>
                  <CTableDataCell>{item.endDate}</CTableDataCell>
                  <CTableDataCell>{item.extendDate || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{item.rating}</CTableDataCell>
                  <CTableDataCell>{item.remarks}</CTableDataCell>
                  <CTableDataCell>{item.createdBy}</CTableDataCell>
                  <CTableDataCell>
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
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol md={3} className="no-records">
          <strong>
            {listSize ? `Total Records: ${listSize}` : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {listSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80, 100]}
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
    </>
  )
}

export default EmployeePipListTable
