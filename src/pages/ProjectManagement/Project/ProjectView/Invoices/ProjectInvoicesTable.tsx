import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CLink,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import ProjectInvoicesEntryTable from './ProjectInvoicesEntryTable'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import OModal from '../../../../../components/ReusableComponent/OModal'
import { MilestoneList } from '../../../../../types/ProjectManagement/Project/ProjectView/Invoices/invoicesTypes'

const ProjectInvoicesTable = (): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [milestoneName, setMilestoneName] = useState<MilestoneList>()
  const [milestoneId, setMilestoneId] = useState<number>()

  const invoicesOfMilestone = useTypedSelector(
    reduxServices.projectInvoices.selectors.allMilestoneList,
  )

  const dispatch = useAppDispatch()

  const handleExpandRow = (id: number) => {
    setIsIconVisible(true)
    setMilestoneId(id)
    dispatch(reduxServices.projectInvoices.getInvoicesOfMilestone(id))
  }

  const handleModal = (data: MilestoneList) => {
    setIsModalVisible(true)
    setMilestoneName(data)
  }

  const milestoneTitle = (
    <>
      <h4 className="mb-4">Milestone Details</h4>
      <CTable className="milestone-model-table">
        <CTableBody>
          <CTableRow>
            <CTableDataCell>Project:</CTableDataCell>
            <CTableDataCell>{milestoneName?.project}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Client:</CTableDataCell>
            <CTableDataCell>{milestoneName?.client}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Milestone:</CTableDataCell>
            <CTableDataCell>{milestoneName?.title}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Percentage:</CTableDataCell>
            <CTableDataCell>
              {milestoneName?.milestonePercentage}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Effort:</CTableDataCell>
            <CTableDataCell>{milestoneName?.effort || 'N/A'}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Planned End Date:</CTableDataCell>
            <CTableDataCell>
              {milestoneName?.planedDate || 'N/A'}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Actual End Date:</CTableDataCell>
            <CTableDataCell>
              {milestoneName?.actualDate || 'N/A'}
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Comments:</CTableDataCell>
            <CTableDataCell>{milestoneName?.comments || 'N/A'}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-center align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Milestone Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Raised Invoice Percentage
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Remaining Percentage
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {invoicesOfMilestone?.length > 0 &&
            invoicesOfMilestone?.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableDataCell scope="row" className="text-center">
                      {isIconVisible && milestoneId === data.id ? (
                        <i
                          data-testid="minus-btn"
                          className="fa fa-minus-circle cursor-pointer"
                          onClick={() => setIsIconVisible(false)}
                        />
                      ) : (
                        <i
                          data-testid="plus-btn"
                          className="fa fa-plus-circle cursor-pointer"
                          onClick={() => handleExpandRow(data.id)}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid="title-model"
                        onClick={() => handleModal(data)}
                      >
                        {data.title}
                      </CLink>
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.raisedInvoicePercentage}%
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.remainingPercentage}%
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className="sh-organization-link"
                    >
                      <CButton
                        color="success"
                        className="btn-ovh me-1 btn-ovh-employee-list"
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i> Raise
                        Invoice
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                  {isIconVisible && milestoneId === data.id ? (
                    <CTableDataCell colSpan={10}>
                      <ProjectInvoicesEntryTable />
                    </CTableDataCell>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
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
        {milestoneTitle}
      </OModal>
    </>
  )
}

export default ProjectInvoicesTable
