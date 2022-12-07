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
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.status}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Client Organization:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.client}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Customer Contact:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.projectContactPerson}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Customer Email:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {projectViewDetails.billingContactPersonEmail}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Billing Contact Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.billingContactPerson}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Billing Contact Email:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {projectViewDetails.billingContactPersonEmail}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Project Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.projectName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Requested by:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.managerName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Pricing Model:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.type}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Project type:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.model}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Project Manager:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.managerName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Platform:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.platform}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Domain:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.domain}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.startdate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            End Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.enddate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Technology:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.technology}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Required Resources:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.requiredResources}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Description:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectViewDetails.description}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Checklist::
          </CFormLabel>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Milestone:
          </CFormLabel>
          <CCol sm={3}>
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
