import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CLink,
} from '@coreui/react-pro'
import React from 'react'
import sqaAuditReportApi from '../../../middleware/api/SQAAuditReport/SQAAuditReportApi'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { downloadFile } from '../../../utils/helper'

const SQAReportDetails = (): JSX.Element => {
  const SQAViewDetails = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportDetails,
  )

  const auditRescheduleStatus = SQAViewDetails.auditRescheduleStatus
    ? 'Yes'
    : 'No'
  const projectType = SQAViewDetails.projectType ? 'Development' : 'Support'
  const fileAttachment = (
    <i className="fa fa-paperclip me-1">{SQAViewDetails.pmFileName}</i>
  )

  console.log(SQAViewDetails.pmFileName)

  const handleSqaFile = async () => {
    const sqaFileDownload = await sqaAuditReportApi.downloadSQAAuditFile({
      fileName: SQAViewDetails.pmFileName,
    })

    downloadFile(sqaFileDownload, `${SQAViewDetails.pmFileName}`)
  }
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Audit Type:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.auditType}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Project Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.projectName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Project Type:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{projectType}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Project Manager:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.projectManager}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Audit Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.auditDate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Audit Start Time:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.startTime}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Audit End Time:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.endTime}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Auditors:
          </CFormLabel>
          <CCol sm={6}>
            <CTable className="checkList-table auditorsLabel">
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
        <CRow className="mt-1 mb-0">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Auditees:
          </CFormLabel>
          <CCol sm={6}>
            <CTable className="checkList-table auditorsLabel">
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
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{SQAViewDetails.auditStatus}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
            Audit Rescheduled:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{auditRescheduleStatus}</p>
          </CCol>
        </CRow>
        {SQAViewDetails.pmComments ? (
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
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
            <CFormLabel className="text-info col-form-label col-sm-2 text-end p-0 project-creation">
              NC `s Closure Report:
            </CFormLabel>
            <CCol sm={3}>
              <CLink
                className="cursor-pointer sh-hive-activity-link"
                onClick={handleSqaFile}
              >
                {fileAttachment}
              </CLink>
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
