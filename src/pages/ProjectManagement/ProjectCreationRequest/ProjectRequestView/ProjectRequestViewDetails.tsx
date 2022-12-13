import {
  CCol,
  CForm,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ProjectRequestViewDetails = (): JSX.Element => {
  const projectViewDetails = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.getProjectRequests,
  )
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.status}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Client Organization:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.client}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Customer Contact:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.projectContactPerson}</p>
          </CCol>
        </CRow>

        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Name:
          </CFormLabel>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Customer Email:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {projectViewDetails.billingContactPersonEmail || 'N/A'}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Billing Contact Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {projectViewDetails.billingContactPerson || 'N/A'}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Billing Contact Email:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {projectViewDetails.billingContactPersonEmail || 'N/A'}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Project Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.projectName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Requested by:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.managerName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Pricing Model:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.type}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Project type:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.model}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Project Manager:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.managerName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Platform:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.platform}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Domain:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.domain}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.startdate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            End Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.enddate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Technology:
          </CFormLabel>
          <CCol sm={3}>
            <div
              dangerouslySetInnerHTML={{
                __html: projectViewDetails.technology,
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Required Resources:
          </CFormLabel>
          <CCol sm={3}>
            <div
              dangerouslySetInnerHTML={{
                __html: projectViewDetails.requiredResources || 'N/A',
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Description:
          </CFormLabel>
          <CCol sm={10}>
            <div
              dangerouslySetInnerHTML={{
                __html: projectViewDetails.description,
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Checklist::
          </CFormLabel>
          <CCol sm={10}>
            <CTable responsive align="middle" className="checkList-table">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Checkpoint</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    PM Review(Yes/No/N/A)
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Remarks/Details
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projectViewDetails?.chelist?.map((item, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                      <CTableDataCell scope="row">{item.name}</CTableDataCell>
                      <CTableDataCell scope="row">
                        {item.answer || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {item.comments || 'N/A'}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Milestone:
          </CFormLabel>
          <CCol sm={10}>
            <CTable striped responsive align="middle">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">From Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Effort(Hrs)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Billable</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projectViewDetails?.projectRequestMilestoneDTO?.map(
                  (item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                        <CTableDataCell scope="row">
                          {item.title}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {item.fromDate}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {item.toDate}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {item.effort}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {item.billable}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {item.milestonePercentage}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {item.comments}
                        </CTableDataCell>
                      </CTableRow>
                    )
                  },
                )}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default ProjectRequestViewDetails
