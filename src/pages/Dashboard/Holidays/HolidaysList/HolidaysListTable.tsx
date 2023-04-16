import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HolidaysListProps } from '../../../../types/Dashboard/Holidays/upcomingHolidaysTypes'
import { currentPageData } from '../../../../utils/paginationUtils'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OToast from '../../../../components/ReusableComponent/OToast'
import OModal from '../../../../components/ReusableComponent/OModal'

const HolidaysListTable = ({
  selectedCountry,
}: HolidaysListProps): JSX.Element => {
  const [holidayId, setHolidayId] = useState(0)
  const [toDeleteHoliday, setToDeleteHoliday] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const dispatch = useAppDispatch()

  const holidaysInfo = useTypedSelector(
    reduxServices.holidays.selectors.upcomingHolidays,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToHolidays = userAccessToFeatures?.find(
    (feature) => feature.name === 'Holiday',
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

  const handleShowHolidayDeleteModal = (id: number, holidayName: string) => {
    setHolidayId(id)

    setToDeleteHoliday(holidayName)
    setIsDeleteModalVisible(true)
  }

  const toastElement = (
    <OToast toastColor="success" toastMessage="Holiday deleted successfully" />
  )

  const handleConfirmDeleteHoliday = async () => {
    setIsDeleteModalVisible(false)

    const deleteHolidayResultAction = await dispatch(
      reduxServices.holidays.deleteHoliday(holidayId),
    )
    if (
      reduxServices.holidays.deleteHoliday.fulfilled.match(
        deleteHolidayResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      dispatch(
        reduxServices.holidays.getAllUpcomingHolidaysList(selectedCountry),
      )
    }
  }

  const getAllHolidays = selectedCountry ? (
    <CTableBody>
      {currentPageItems?.map((holiday, index) => (
        <CTableRow key={index} className="text-start">
          <CTableDataCell>{holiday.date}</CTableDataCell>
          <CTableDataCell>{holiday.week}</CTableDataCell>
          <CTableDataCell>{holiday.name}</CTableDataCell>
          <CTableDataCell>{holiday.country}</CTableDataCell>
          <CTableDataCell>
            {userAccessToHolidays?.updateaccess && (
              <Link to={`/editHoliday/${holiday.id}`}>
                <CTooltip content="Edit">
                  <CButton
                    color="info"
                    className="btn-ovh btn-ovh-employee-list me-1"
                    data-testid={`holiday-edit-btn${index}`}
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </CButton>
                </CTooltip>
              </Link>
            )}
            {userAccessToHolidays?.deleteaccess && (
              <CTooltip content="Delete">
                <CButton
                  className="btn-ovh btn-ovh-employee-list"
                  color="danger"
                  size="sm"
                  data-testid={`holiday-delete-btn${index}`}
                  onClick={() =>
                    handleShowHolidayDeleteModal(holiday.id, holiday.name)
                  }
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </CButton>
              </CTooltip>
            )}
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  ) : (
    <></>
  )
  const actionHeaderViewAccess =
    userAccessToHolidays?.updateaccess || userAccessToHolidays?.deleteaccess
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
                {actionHeaderViewAccess ? (
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                ) : (
                  <></>
                )}
              </CTableRow>
            </CTableHead>
            {getAllHolidays}
          </CTable>

          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Number of Holidays: {holidaysInfo.length}</strong>
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
          <OModal
            alignment="center"
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            modalTitle="Delete Holiday"
            modalBodyClass="mt-0"
            confirmButtonText="Yes"
            cancelButtonText="No"
            closeButtonClass="d-none"
            confirmButtonAction={handleConfirmDeleteHoliday}
          >
            <>
              Do you really want to delete <strong>{toDeleteHoliday}</strong>{' '}
              Holiday ?
            </>
          </OModal>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default HolidaysListTable
