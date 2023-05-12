import React from 'react'
import { CRow, CFormLabel, CCol, CButton, CTooltip } from '@coreui/react-pro'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ViewJobInfo = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const JobOpeningById = useTypedSelector(
    reduxServices.jobVacancies.selectors.JobOpeningById,
  )
  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Job Info"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CTooltip content="Edit">
              <CButton
                className="btn-ovh-employee-list me-1"
                color="info"
                type="button"
                data-testid="edit-button"
                onClick={() => setToggle('editViewJobOpening')}
              >
                <i className="fa fa-edit text-white" aria-hidden="true">
                  &nbsp; Edit
                </i>
              </CButton>
            </CTooltip>
          </CCol>
        </CRow>
        <CRow>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Code:
          </CFormLabel>
          <CCol sm={3}>{JobOpeningById?.jobCode}</CCol>
        </CRow>
        <CRow>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Title:
          </CFormLabel>
          <CCol sm={3}>{JobOpeningById?.positionVacant}</CCol>
        </CRow>
        <CRow>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            No.of Vacancies:
          </CFormLabel>
          <CCol sm={3}>{JobOpeningById?.noOfRequirements}</CCol>
        </CRow>
        <CRow>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Experience:
          </CFormLabel>
          <CCol sm={3}>{JobOpeningById?.minimumExperience}</CCol>
        </CRow>
        <CRow>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Job Description:
          </CFormLabel>
          <CCol sm={3}>{JobOpeningById?.description}</CCol>
        </CRow>
        <CRow>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Status:
          </CFormLabel>
          <CCol sm={3}>{JobOpeningById?.status}</CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default ViewJobInfo
