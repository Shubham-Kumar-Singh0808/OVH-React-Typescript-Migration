import { CRow, CCol, CButton, CFormInput, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import AppraisalTemplateViewActionTable from './AppraisalTemplateViewActionTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { GetDesignationsUnderCycle } from '../../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'

const AppraisalTemplateViewAction = ({
  setToggle,
  editAppraisalId,
}: {
  setToggle: () => void
  editAppraisalId: GetDesignationsUnderCycle | undefined
}): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Assign Template"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={setToggle}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Appraisal Title:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-control form-control-not-allowed"
              data-testid="title"
              id="title"
              size="sm"
              name="title"
              disabled={true}
              value={editAppraisalId?.appraisalCycleDto.name}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-control form-control-not-allowed"
              data-testid="department"
              id="department"
              size="sm"
              name="department"
              disabled={true}
              value={editAppraisalId?.designation.departmentName}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Designation:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-control form-control-not-allowed"
              data-testid="designation"
              id="designation"
              size="sm"
              name="designation"
              disabled={true}
              value={editAppraisalId?.designation.name}
            />
          </CCol>
        </CRow>
        <AppraisalTemplateViewActionTable />
      </OCard>
    </>
  )
}

export default AppraisalTemplateViewAction
