import React from 'react'
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

const ExpenseCategoryListTable = (): JSX.Element => {
  return (
    <>
      <CTable striped className="mt-3 mb-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* {/* {isLoading !== ApiLoadingState.loading ? (
            currentPageItems.map((ticketReport, index) => { */}
          {/* return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>{ticketReport.trackerName}</CTableDataCell>
                  <CTableDataCell><div className="buttons-clients">
                      {userAccess?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            color="info btn-ovh me-1"
                            className="btn-ovh-employee-list"
                            onClick={() => editButtonHandler(vendor)}
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccess?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            color="danger btn-ovh me-1"
                            className="btn-ovh-employee-list"
                            onClick={() =>
                              onDeleteBtnClick(
                                vendor.vendorId,
                                vendor.vendorName,
                              )
                            }
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </div></CTableDataCell>
                  <CTableDataCell>
                    {ticketReport.subCategoryName}
                  </CTableDataCell>
                  {ticketReport.noOfTickets > 0 ? (
                    <CTableDataCell scope="row">
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid="num-tickets"
                        onClick={() =>
                          handleTicket(
                            ticketReport.categoryId,
                            ticketReport.trackerId,
                            ticketReport.subCategoryId,
                          )
                        }
                      >
                        {ticketReport.noOfTickets}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{ticketReport.noOfTickets}</CTableDataCell>
                  )}
                  {ticketReport.noOfClosedTickets > 0 ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid="close-tickets"
                        onClick={() =>
                          handleClickTicketDetails(
                            ticketReport.categoryId,
                            ticketReport.trackerId,
                            ticketReport.subCategoryId,
                          )
                        }
                      >
                        {ticketReport.noOfClosedTickets}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>
                      {ticketReport.noOfClosedTickets}
                    </CTableDataCell>
                  )}
                  {ticketReport.noOfPendingTickets > 0 ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid="pending-tickets"
                        onClick={() =>
                          handlePendingTicket(
                            ticketReport.categoryId,
                            ticketReport.trackerId,
                            ticketReport.subCategoryId,
                          )
                        }
                      >
                        {ticketReport.noOfPendingTickets}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>
                      {ticketReport.noOfPendingTickets}
                    </CTableDataCell>
                  )}
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )} */}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ExpenseCategoryListTable
