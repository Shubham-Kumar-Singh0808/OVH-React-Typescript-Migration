import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CTooltip,
  CLink,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'
import { InvoicesOfMilestone } from '../../../../../types/ProjectManagement/Project/ProjectView/Invoices/invoicesTypes'

const ProjectInvoicesEntryTable = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [ticketSubject, setTicketSubject] = useState<InvoicesOfMilestone>()
  const [isModalsVisible, setIsModalsVisible] = useState(false)
  const InvoicesOfMilestone = useTypedSelector(
    reduxServices.projectInvoices.selectors.invoicesOfMilestoneList,
  )

  const handleModal = (data: InvoicesOfMilestone) => {
    setIsModalVisible(true)
    setTicketSubject(data)
  }

  const handleMileStoneModal = (data: InvoicesOfMilestone) => {
    setIsModalsVisible(true)
    setTicketSubject(data)
  }
  const result2 = (
    <CTable>
      <CTableBody>
        <CRow>
          <CTableDataCell>Project:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.projectName}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Client:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.clientName}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Milestone:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.milestoneName}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Percentage:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.milestonePercentage}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Planned End Date:</CTableDataCell>
          <CTableDataCell>
            {ticketSubject?.milestonePlannedEndDate || 'N/A'}
          </CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Actual End Date:</CTableDataCell>
          <CTableDataCell>
            {ticketSubject?.milestoneActualEndDate || 'N/A'}
          </CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Comments:</CTableDataCell>
          <CTableDataCell>
            {ticketSubject?.milestoneComments || 'N/A'}
          </CTableDataCell>
        </CRow>
      </CTableBody>
    </CTable>
  )
  const result = (
    <CTable>
      <CTableBody>
        <CRow>
          <CTableDataCell>Serial Number:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.invoicNumber}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell> Invoice Number:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.number}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Milestone:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.milestoneName}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Invoice Percentage:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.milestonePercentage}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell> Status:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.invoiceStatus}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Sent Date:</CTableDataCell>
          <CTableDataCell>{ticketSubject?.raisedDate || 'N/A'}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Sent Amount</CTableDataCell>
          <CTableDataCell>&{ticketSubject?.totalAmount}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Discount:</CTableDataCell>
          <CTableDataCell>${ticketSubject?.discount}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Tax:</CTableDataCell>
          <CTableDataCell>${ticketSubject?.discountRate}</CTableDataCell>
        </CRow>
        <CRow>
          <CTableDataCell>Total Sent Amount (AUD):</CTableDataCell>
          <CTableDataCell>${ticketSubject?.totalAmount}</CTableDataCell>
        </CRow>
      </CTableBody>
    </CTable>
  )
  return (
    <>
      <CTable
        responsive
        striped
        className="mt-2 text-start profile-tab-table-size"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Serial Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Invoice Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Milestone</CTableHeaderCell>
            <CTableHeaderCell scope="col">CR</CTableHeaderCell>
            <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">SD</CTableHeaderCell>
            <CTableHeaderCell scope="col">RD</CTableHeaderCell>
            <CTableHeaderCell scope="col">IA</CTableHeaderCell>
            <CTableHeaderCell scope="col">TA</CTableHeaderCell>
            <CTableHeaderCell scope="col">PA</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {InvoicesOfMilestone?.map((item, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row"></CTableDataCell>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>

                <CTableDataCell scope="row">
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    data-testid={`emp-subject${index}`}
                    onClick={() => handleModal(item)}
                  >
                    {item.invoicNumber}
                  </CLink>
                </CTableDataCell>
                <CTableDataCell scope="row">{item.number}</CTableDataCell>

                <CTableDataCell scope="row">
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    data-testid={`emp-subject${index}`}
                    onClick={() => handleMileStoneModal(item)}
                  >
                    {item.milestoneName}
                  </CLink>
                </CTableDataCell>
                {/* <CTableDataCell scope="row">
                  {item.milestoneName}
                </CTableDataCell> */}
                <CTableDataCell scope="row">{'N/A'}</CTableDataCell>
                <CTableDataCell scope="row">
                  {item.milestonePercentage}%
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {item.invoiceStatus}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {item.invoiceAmountSentDate}
                </CTableDataCell>
                <CTableDataCell scope="row">{'N/A'}</CTableDataCell>
                <CTableDataCell scope="row">${item.subtotal}</CTableDataCell>
                <CTableDataCell scope="row">${item.totalAmount}</CTableDataCell>
                <CTableDataCell scope="row">
                  <CTooltip content="Edit">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-pencil-square-o"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="View">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-eye text-white fa-fw"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Timeline">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-bar-chart  fa-fw"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Discussion">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-comments text-white"></i>
                    </CButton>
                  </CTooltip>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        modalBodyClass="model-body-text-alinement"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        {result}
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        modalBodyClass="model-body-text-alinement"
        visible={isModalsVisible}
        setVisible={setIsModalsVisible}
      >
        {result2}
      </OModal>
    </>
  )
}

export default ProjectInvoicesEntryTable
