import {
  CButton,
  CCol,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useMemo } from 'react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { HolidaysListProps } from '../../../../types/Dashboard/Holidays/upcomingHolidaysTypes'
import { currentPageData } from '../../../../utils/paginationUtils'
import { useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const HolidaysListTable = ({
  selectedCountry,
}: HolidaysListProps): JSX.Element => {
  const holidaysInfo = useTypedSelector(
    reduxServices.holidays.selectors.upcomingHolidays,
  )
  const isLoading = useTypedSelector(reduxServices.holidays.selectors.isLoading)
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(holidaysInfo.length, 20)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const currentPageItems = useMemo(
    () => currentPageData(holidaysInfo, currentPage, pageSize),
    [holidaysInfo, currentPage, pageSize],
  )

  const getAllHolidays = selectedCountry ? (
    <CTableBody>
      {currentPageItems?.map((holiday, index) => (
        <CTableRow key={index} className="text-start">
          <CTableDataCell>{holiday.date}</CTableDataCell>
          <CTableDataCell>{holiday.week}</CTableDataCell>
          <CTableDataCell>{holiday.name}</CTableDataCell>
          <CTableDataCell>{holiday.country}</CTableDataCell>
          <CTableDataCell>
            <CButton
              color="info"
              className="btn-ovh me-2"
              data-testid={`holiday-edit-btn${index}`}
            >
              <i className="fa fa-edit" aria-hidden="true"></i>
            </CButton>
            <CButton
              color="danger"
              size="sm"
              data-testid={`holiday-delete-btn${index}`}
            >
              <CIcon className="text-white" icon={cilTrash} />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  ) : (
    <></>
  )
  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CTable striped responsive align="middle">
            <CTableHead>
              <CTableRow className="text-start">
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Week</CTableHeaderCell>
                <CTableHeaderCell scope="col">Occasion</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {getAllHolidays}
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Number of Holidays:{holidaysInfo.length}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {holidaysInfo.length > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {holidaysInfo.length > 20 && (
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
      ) : (
        <CCol>
          <CRow>
            <CSpinner data-testid="designation-list-loader" />
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default HolidaysListTable
