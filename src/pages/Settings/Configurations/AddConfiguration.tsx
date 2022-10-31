import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextDanger, TextWhite } from '../../../constant/ClassName'

const AppraisalConfigurations = (): JSX.Element => {
  const [selectReviewTitle, setSelectReviewTitle] = useState('')
  const [selectReviewType, setSelectReviewType] = useState('')
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const formLabel = 'col-sm-3 col-form-label text-end'
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'reviewTitle') {
      const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setSelectReviewTitle(newValue)
    }
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Configuration"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {' '}
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
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
              Review Title:
              <span
                className={
                  selectReviewTitle
                    ?.replace(/^\s*/, '')
                    .replace(/[^a-z\s]/gi, '')
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                size="sm"
                name="reviewTitle"
                placeholder="Name"
                value={selectReviewTitle}
                onChange={handledInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel {...dynamicFormLabelProps('reviewType', formLabel)}>
              Review Type:
              <span className={selectReviewType ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="reviewType"
                data-testid="form-select1"
                size="sm"
                aria-label="reviewType"
                name="reviewType"
                value={selectReviewType}
                onChange={(e) => {
                  setSelectReviewType(e.target.value)
                }}
              >
                <option value={''}>Select </option>
                <option>Monthly</option>
                <option>Annual</option>
                <option>Probation</option>
                <option>Quaterly</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default AppraisalConfigurations
