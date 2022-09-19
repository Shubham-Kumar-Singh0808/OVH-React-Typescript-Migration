import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CTableDataCell,
  CCol,
  CRow,
  CLink,
  CBadge,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const BookingListTable = (): JSX.Element => {
  const [isAgendaModalVisible, setIsAgendaModalVisible] =
    useState<boolean>(false)
  const [modalAgenda, setModalAgenda] = useState<string>('')
  const BookingsForSelection = useTypedSelector(
    reduxServices.bookingList.selectors.bookingsForSelection,
  )
  const isLoading = useTypedSelector(
    reduxServices.bookingList.selectors.isLoading,
  )

  const pageFromState = useTypedSelector(
    reduxServices.bookingList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.bookingList.selectors.pageSizeFromState,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    BookingsForSelection.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleAgendaModal = (value: string) => {
    setIsAgendaModalVisible(true)
    setModalAgenda(value)
  }

  const roomBookingStatusLabelColor = (bookingStatus: string): JSX.Element => {
    if (bookingStatus === 'New') {
      return (
        <CBadge className="rounded-pill label-default">{bookingStatus}</CBadge>
      )
    } else if (bookingStatus === 'Cancelled') {
      return (
        <CBadge className="rounded-pill label-warning">{bookingStatus}</CBadge>
      )
    } else if (bookingStatus === 'In Progress') {
      return (
        <CBadge className="rounded-pill label-success">{bookingStatus}</CBadge>
      )
    } else if (bookingStatus === 'Completed') {
      return (
        <CBadge className="rounded-pill label-danger">{bookingStatus}</CBadge>
      )
    }
    return <></>
  }

  return (
    <>
      <CTable responsive striped className="text-start mt-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Agenda</CTableHeaderCell>
            <CTableHeaderCell scope="col">Booked Timings</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Room</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Author</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            BookingsForSelection &&
            BookingsForSelection.map((bookingItem, index) => {
              const agendaLimit =
                bookingItem.agenda && bookingItem.agenda.length > 30
                  ? `${bookingItem.agenda.substring(0, 30)}...`
                  : bookingItem.agenda
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {bookingItem.agenda ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="ticket-description-link"
                        onClick={() => handleAgendaModal(bookingItem.agenda)}
                      >
                        {parse(agendaLimit as string)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.startTime} to {bookingItem.endTime}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.fromDate}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.roomName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {roomBookingStatusLabelColor(bookingItem.meetingStatus)}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.authorName.firstName +
                      '' +
                      bookingItem.authorName.lastName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.isAuthorisedUser ? (
                      <>
                        <CButton color="info" className="btn-ovh me-2">
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </CButton>

                        <CButton
                          color="btn btn-warning"
                          className="btn-ovh me-2"
                        >
                          <i
                            className="fa fa-times text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </>
                    ) : (
                      ''
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {BookingsForSelection.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {BookingsForSelection.length}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {BookingsForSelection.length > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {BookingsForSelection.length > 20 && (
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
          <CRow className="mt-3 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isAgendaModalVisible}
        setVisible={setIsAgendaModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <p>
          <div
            dangerouslySetInnerHTML={{
              __html: modalAgenda,
            }}
          />
        </p>
      </OModal>
    </>
  )
}

export default BookingListTable
