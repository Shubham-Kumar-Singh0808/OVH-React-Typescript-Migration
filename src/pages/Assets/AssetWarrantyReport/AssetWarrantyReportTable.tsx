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
  CLink,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useMemo, useState } from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { TicketDetailsTableProps } from '../../../types/Support/Report/ticketReportTypes'
import { currentPageData } from '../../../utils/paginationUtils'

const AssetWarrantyReportTable = ({
  backButtonHandler,
}: TicketDetailsTableProps): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [subject, setSubject] = useState<string>('')
  const getTicketDetailsList = useTypedSelector(
    reduxServices.ticketReport.selectors.ticketsDetails,
  )
  const isLoading = useTypedSelector(
    reduxServices.ticketReport.selectors.isLoading,
  )

  const pageFromState = useTypedSelector(
    reduxServices.ticketReport.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.ticketReport.selectors.pageSizeFromState,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    getTicketDetailsList.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const currentPageItems = useMemo(
    () => currentPageData(getTicketDetailsList, currentPage, pageSize),
    [getTicketDetailsList, currentPage, pageSize],
  )

  const handleModal = (ticket: string) => {
    setIsModalVisible(true)
    setSubject(ticket)
  }
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            data-testid="toggle-back-button"
            className="btn-ovh me-1"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Ref.Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Vendor Name</CTableHeaderCell>
            <CTableHeaderCell className="commentWidth" scope="col">
              Product Specifications
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">License Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Warranty Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Warranty End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading !== ApiLoadingState.loading ? (
            currentPageItems?.map((ticketDetail, index) => {
              const subjectLimit =
                ticketDetail.subject && ticketDetail.subject.length > 30
                  ? `${ticketDetail.subject.substring(0, 30)}...`
                  : ticketDetail.subject

              const ticketDescriptionLimit =
                ticketDetail.description && ticketDetail.description.length > 32
                  ? `${ticketDetail.description.substring(0, 32)}...`
                  : ticketDetail.description

              const ticketDetailDescription =
                ticketDetail.description !== null
                  ? parse(ticketDescriptionLimit)
                  : 'N/A'
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{ticketDetail.id}</CTableDataCell>
                  <CTableDataCell>{ticketDetail.employeeName}</CTableDataCell>
                  {subjectLimit ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid={`subject-comments${index}`}
                        onClick={() => handleModal(ticketDetail.subject)}
                      >
                        {parse(subjectLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  <CTableDataCell>{ticketDetail.trackerName}</CTableDataCell>
                  {ticketDescriptionLimit ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid={`dsc-comments${index}`}
                        onClick={() => handleModal(ticketDetail.description)}
                      >
                        {ticketDetailDescription}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  <CTableDataCell>{ticketDetail.priority}</CTableDataCell>
                  <CTableDataCell>{ticketDetail.startDate}</CTableDataCell>
                  <CTableDataCell>{ticketDetail.approvedBy}</CTableDataCell>
                  <CTableDataCell>{ticketDetail.approvalStatus}</CTableDataCell>
                  <CTableDataCell>{ticketDetail.actualTime}</CTableDataCell>
                  <CTableDataCell>{ticketDetail.approvalStatus}</CTableDataCell>
                  <CTableDataCell>{ticketDetail.status}</CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          {/* <strong>
            {getTicketDetailsList?.length
              ? `Total Records: ${getTicketDetailsList.length}`
              : `No Records Found...`}
          </strong> */}
        </CCol>
        <CCol xs={3}>
          {getTicketDetailsList.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {getTicketDetailsList.length > 20 && (
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
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        modalBodyClass="model-body-text-alinement"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        {subject}
      </OModal>
    </>
  )
}

export default AssetWarrantyReportTable
