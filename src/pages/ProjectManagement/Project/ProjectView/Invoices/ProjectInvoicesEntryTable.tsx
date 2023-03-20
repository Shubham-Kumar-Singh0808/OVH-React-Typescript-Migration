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
  CCol,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { InvoicesOfMilestone } from '../../../../../types/ProjectManagement/Project/ProjectView/Invoices/invoicesTypes'

const ProjectInvoicesEntryTable = (): JSX.Element => {
  const [isInvoiceNumberModalVisible, setIsInvoiceNumberModalVisible] =
    useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState<InvoicesOfMilestone>()
  const [isModalsVisible, setIsModalsVisible] = useState(false)

  const InvoicesOfMilestones = useTypedSelector(
    reduxServices.projectInvoices.selectors.invoicesOfMilestoneList,
  )

  const invoiceSummary = useTypedSelector(
    reduxServices.projectInvoices.selectors.invoiceSummary,
  )
  const dispatch = useAppDispatch()
  const handleModal = (data: InvoicesOfMilestone) => {
    setIsInvoiceNumberModalVisible(true)
    setInvoiceNumber(data)
    dispatch(reduxServices.projectInvoices.getInvoiceSummary(data.invoiceId))
  }

  const handleMileStoneModal = (data: InvoicesOfMilestone) => {
    setIsModalsVisible(true)
    setInvoiceNumber(data)
  }
  const milestoneNameModel = (
    <>
      <h4 className="mb-4">Milestone Details</h4>
      <CTable className="milestone-model-table">
        <CTableBody>
          <CTableRow>
            <CTableDataCell>Project:</CTableDataCell>
            <CTableDataCell>{invoiceNumber?.projectName}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Client:</CTableDataCell>
            <CTableDataCell>{invoiceNumber?.clientName}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Milestone:</CTableDataCell>
            <CTableDataCell>{invoiceNumber?.milestoneName}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Percentage:</CTableDataCell>
            <CTableDataCell>
              {invoiceNumber?.milestonePercentage}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Planned End Date:</CTableDataCell>
            <CTableDataCell>
              {invoiceNumber?.milestonePlannedEndDate || 'N/A'}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Actual End Date:</CTableDataCell>
            <CTableDataCell>
              {invoiceNumber?.milestoneActualEndDate || 'N/A'}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Comments:</CTableDataCell>
            <CTableDataCell>
              {invoiceNumber?.milestoneComments || 'N/A'}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )

  const invoiceModel = (
    <>
      <h4 className="model-header-text mb-3">Invoice Details</h4>
      <div className="form-group">
        <CRow className="employeeAllocation-form">
          <CCol sm={4} className="pe-0">
            <CFormLabel className="text-info mt-2 col">
              Serial Number:
            </CFormLabel>
            <span className="col-sm-6">{invoiceSummary?.number}</span>
            &nbsp;
          </CCol>
          <CCol sm={4} className="p-0">
            <CFormLabel className="text-info mt-2 col">
              Invoice Number:
            </CFormLabel>
            <span className="col-sm-6">{invoiceSummary?.invoiceNumber}</span>
            &nbsp;
          </CCol>
          <CCol sm={4} className="p-0">
            <CFormLabel className="text-info mt-2 col">Milestone :</CFormLabel>
            <span className="col-sm-6">{invoiceSummary?.mileStoneName}</span>
            &nbsp;
          </CCol>
          <CCol sm={4} className="pe-0">
            <CFormLabel className="text-info mt-2 col">
              Invoice Percentage:
            </CFormLabel>
            <span className="col-sm-6">
              {invoiceSummary?.milestonePercentage}
            </span>
            &nbsp;
          </CCol>
          <CCol sm={4} className="p-0">
            <CFormLabel className="text-info mt-2 col">Status:</CFormLabel>
            <span className="col-sm-6">{invoiceSummary?.invoiceStatus}</span>
            &nbsp;
          </CCol>
        </CRow>
        <CTable striped responsive align="middle" className="text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Sent Date</CTableHeaderCell>
              <CTableHeaderCell>Sent Amount</CTableHeaderCell>
              <CTableHeaderCell>Discount</CTableHeaderCell>
              <CTableHeaderCell>Tax</CTableHeaderCell>
              <CTableHeaderCell className="ng-binding">
                Total Sent Amount (AUD)
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>
                {invoiceSummary?.invoiceAmountSentDate}
              </CTableDataCell>
              <CTableDataCell>
                $
                {Number(invoiceSummary?.amountAfterDiscount)?.toLocaleString(
                  'en-IN',
                )}
              </CTableDataCell>
              <CTableDataCell>{invoiceSummary?.writeoffAmount}</CTableDataCell>
              <CTableDataCell>{invoiceSummary?.discount}</CTableDataCell>
              <CTableDataCell>
                ${Number(invoiceSummary?.totalAmount)?.toLocaleString('en-IN')}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </>
  )
  return (
    <>
      <CTable
        responsive
        striped
        className="mb-0 text-start profile-tab-table-size"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
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
          {InvoicesOfMilestones?.map((item, index) => {
            const crName = item.crName !== null ? '' : 'N/A'
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    data-testid="invoice-test"
                    onClick={() => handleModal(item)}
                  >
                    {item.invoicNumber}
                  </CLink>
                </CTableDataCell>
                <CTableDataCell scope="row">{item.number}</CTableDataCell>
                <CTableDataCell scope="row">
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    data-testid="milestone-name"
                    onClick={() => handleMileStoneModal(item)}
                  >
                    {item.milestoneName}
                  </CLink>
                </CTableDataCell>
                <CTableDataCell scope="row">{crName}</CTableDataCell>
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
                <CTableDataCell scope="row">${item.totalAmount}</CTableDataCell>
                <CTableDataCell scope="row">
                  <CTooltip content="Edit">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 mt-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-pencil-square-o"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="View">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 mt-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-eye text-white fa-fw"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Timeline">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 mt-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-bar-chart  fa-fw"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Discussion">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 mt-1 btn-ovh-employee-list"
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
        visible={isInvoiceNumberModalVisible}
        setVisible={setIsInvoiceNumberModalVisible}
      >
        {invoiceModel}
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
        {milestoneNameModel}
      </OModal>
    </>
  )
}

export default ProjectInvoicesEntryTable
