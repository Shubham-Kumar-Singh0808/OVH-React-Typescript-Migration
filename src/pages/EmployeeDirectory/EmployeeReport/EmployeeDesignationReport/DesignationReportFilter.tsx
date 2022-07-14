import React from 'react'
import { CRow, CCol, CFormLabel, CFormSelect, CButton } from '@coreui/react-pro'
import { useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import employeeReportDesignationAPI from '../../../../middleware/api/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportApi'
import { EmployeeDesignationOptionsProps } from '../../../../types/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportTypes'
import { downloadFile } from '../../../../utils/helper'

const DesignationReportFilter = ({
  designation,
  setDesignation,
}: EmployeeDesignationOptionsProps): JSX.Element => {
  const getDesignations = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.designations,
  )
  const selectedDesignation = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.selectedDesignation,
  )

  const handleExportEmployeeDesignationData = async () => {
    const employeeDesignationList =
      await employeeReportDesignationAPI.exportEmployeeDesignationReport({
        selectedDesignation,
      })
    downloadFile(employeeDesignationList, 'EmployeeDesignationListReport.csv')
  }

  const handleBack = () => {
    window.location.href = '/empReport'
  }

  return (
    <>
      <CRow>
        <CCol lg={6}>
          <CRow>
            <CCol sm={4} md={4} lg={4}>
              <CFormLabel className="mt-1">Designation:</CFormLabel>
            </CCol>
            <CCol sm={6} md={6} lg={6} data-testid="designationFilter">
              <CFormSelect
                aria-label="Default select example"
                data-testid="designationSelect"
                name="designation"
                id="designation"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value)
                }}
              >
                <option value="">Select Designation</option>
                {getDesignations.map((designation, index) => (
                  <option key={index} value={designation.name}>
                    {designation.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg={6} className="gap-2 d-md-flex justify-content-md-end">
          <CRow>
            <CCol data-testid="backBtn">
              <CButton
                data-testid="goToThisPage"
                color="info btn-ovh me-1"
                onClick={handleBack}
                value="back"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mt-2">
        <CCol
          lg={12}
          className="gap-2 d-md-flex justify-content-end"
          data-testid="exportBtn"
        >
          <CButton
            color="info"
            className="text-white"
            size="sm"
            onClick={handleExportEmployeeDesignationData}
          >
            <i className="fa fa-plus me-1"></i>
            Click to Export Employee List
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default DesignationReportFilter
