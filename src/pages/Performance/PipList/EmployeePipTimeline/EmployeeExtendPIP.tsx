import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react-pro'
import React from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'

const EmployeeExtendPIP = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Extend PIP'}
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
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Employee Name:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="appraisalTitle"
                type="text"
                id="appraisalTitle"
                size="sm"
                name="name"
                disabled={true}
              />
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EmployeeExtendPIP
