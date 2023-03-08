import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const SQAReportDetails = (): JSX.Element => {
  const SQAViewDetails = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportDetails,
  )

  const auditRescheduleStatus = SQAViewDetails.auditRescheduleStatus
    ? 'Yes'
    : 'No'
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Audit Type:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.auditType}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Project Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.projectName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Project Type:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.projectType}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Project Manager:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.projectManager}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Audit Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.auditDate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Audit Start Time:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.startTime}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Audit End Time:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.endTime}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Auditors:
          </CFormLabel>
          <CCol sm={6}>
            <CTable className="checkList-table">
              {SQAViewDetails.auditors?.map((item, index) => {
                return (
                  <CTableBody key={index}>
                    <CTableRow>
                      <CTableDataCell className="p-0">
                        {index + 1}
                      </CTableDataCell>
                      <CTableDataCell className="p-0">
                        {item.fullName}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                )
              })}
            </CTable>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Auditees:
          </CFormLabel>
          <CCol sm={6}>
            <CTable className="checkList-table">
              {SQAViewDetails.auditees?.map((auditees, index) => {
                return (
                  <CTableBody key={index}>
                    <CTableRow>
                      <CTableDataCell className="p-0">
                        {index + 1}
                      </CTableDataCell>
                      <CTableDataCell className="p-0">
                        {auditees.fullName}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                )
              })}
            </CTable>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.auditStatus}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
            Audit Rescheduled:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{auditRescheduleStatus}</p>
          </CCol>
        </CRow>
        {SQAViewDetails.pmComments ? (
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              Audit Rescheduled:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{SQAViewDetails.pmComments}</p>
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
        {SQAViewDetails.pmFileName ? (
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-1 project-creation">
              NC `s Closure Report:
            </CFormLabel>
            <CCol sm={3}>
              <p className="mb-0">{SQAViewDetails.pmFileName}</p>
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
      </CForm>
    </>
  )
}

export default SQAReportDetails
