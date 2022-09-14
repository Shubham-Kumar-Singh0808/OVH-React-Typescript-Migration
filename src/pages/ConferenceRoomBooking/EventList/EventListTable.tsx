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
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'

const EventListTable = (): JSX.Element => {
  return (
    <>
      <CTable className="mt-4" striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
            <CTableHeaderCell>Location</CTableHeaderCell>
            <CTableHeaderCell>Room</CTableHeaderCell>
            <CTableHeaderCell>Event Type</CTableHeaderCell>
            <CTableHeaderCell>Start Date</CTableHeaderCell>
            <CTableHeaderCell>End Date</CTableHeaderCell>
            <CTableHeaderCell>Booked Timings</CTableHeaderCell>
            <CTableHeaderCell>Author</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* {birthdaysList.map((employeeBirthday, index) => {
                return ( */}
          <CTableRow>
            <CTableDataCell>1</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
            <CTableDataCell>xx</CTableDataCell>
          </CTableRow>
          {/* )
              })} */}
        </CTableBody>
      </CTable>
      {/* <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Number of Birthdays: {birthdayListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {birthdayListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={
                    handleBirthdayListPageSizeSelectChange
                  }
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {birthdayListSize > 20 && (
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
          </CRow> */}
    </>
    //   ) : (
    //     <></>
    //   )}
  )
}

export default EventListTable
