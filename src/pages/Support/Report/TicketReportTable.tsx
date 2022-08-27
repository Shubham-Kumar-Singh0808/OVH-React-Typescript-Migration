import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CLink,
} from '@coreui/react-pro'
import React, { useMemo } from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { currentPageData } from '../../../utils/paginationUtils'

const TicketReportTable = ({
  setToggle,
  selectDate,
  toDate,
  fromDate,
  selectDepartment,
}: {
  setToggle: (value: string) => void
  selectDate: string
  toDate: string
  fromDate: string
  selectDepartment: string
}): JSX.Element => {
  const getTicketReportList = useTypedSelector(
    reduxServices.ticketReport.selectors.ticketsReport,
  )

  const pageFromState = useTypedSelector(
    reduxServices.ticketReport.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.ticketReport.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    getTicketReportList.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(getTicketReportList, currentPage, pageSize),
    [getTicketReportList, currentPage, pageSize],
  )
  const handleShowTicketDetails = (
    categoryId: number,
    trackerId: number,
    subCategoryId: number,
  ) => {
    setToggle('ticketDetails')
    dispatch(
      reduxServices.ticketReport.getTicketDetails({
        categoryId,
        dateSelection: selectDate,
        departmentId: selectDepartment,
        endIndex: 20,
        filter: 'All',
        from: fromDate as string,
        startIndex: 0,
        subCategoryId,
        ticketStatus: '',
        to: toDate as string,
        trackerId,
      }),
    )
  }

  return (
    <>
      <>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tracker</CTableHeaderCell>
              <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Sub-Category Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">No.of Tickets</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                No.of Closed Tickets
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                No.of Pending Tickets
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentPageItems.map((ticketReport, index) => {
              return (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">
                    {getItemNumber(index)}
                  </CTableHeaderCell>
                  <CTableDataCell>{ticketReport.trackerName}</CTableDataCell>
                  <CTableDataCell>{ticketReport.categoryName}</CTableDataCell>
                  <CTableDataCell>
                    {ticketReport.subCategoryName}
                  </CTableDataCell>

                  <CTableDataCell scope="row">
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      onClick={() =>
                        handleShowTicketDetails(
                          ticketReport.categoryId,
                          ticketReport.trackerId,
                          ticketReport.subCategoryId,
                        )
                      }
                    >
                      {ticketReport.noOfTickets}
                    </CLink>
                  </CTableDataCell>

                  <CTableDataCell>
                    {ticketReport.noOfClosedTickets}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      // eslint-disable-next-line sonarjs/no-identical-functions
                      onClick={() =>
                        handleShowTicketDetails(
                          ticketReport.categoryId,
                          ticketReport.trackerId,
                          ticketReport.subCategoryId,
                        )
                      }
                    >
                      {ticketReport.noOfPendingTickets}
                    </CLink>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
        <CRow>
          <CCol xs={4}>
            <strong>
              {getTicketReportList?.length
                ? `Total Records: ${getTicketReportList.length}`
                : `No Records Found...`}
            </strong>
          </CCol>
          <CCol xs={3}>
            {getTicketReportList.length > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {getTicketReportList.length > 20 && (
            <CCol
              xs={5}
              className="d-grid gap-1 d-md-flex justify-content-md-end"
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
    </>
  )
}
export default TicketReportTable
