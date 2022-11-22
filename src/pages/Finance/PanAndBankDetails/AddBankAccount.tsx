import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const AddBankAccount = (): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const bankData = useTypedSelector(
    reduxServices.bankDetails.selectors.bankList,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Add Bank Account Information'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
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
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Bank Account Number:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-2"
                data-testid="bankAccountNumber"
                type="text"
                id="Number"
                size="sm"
                name="number"
                autoComplete="off"
                placeholder="Bank Account Number"
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Name of the Bank:
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="bankName"
                data-testid="form-select1"
                name="bankName"
              >
                <option value={''}>Select</option>
                {bankData.length > 0 &&
                  bankData?.map((name, index) => (
                    <option key={index} value={name.bankId}>
                      {name.bankName}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              IFSC Code:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-2"
                data-testid="ifsc-code"
                type="text"
                id="code"
                size="sm"
                name="code"
                autoComplete="off"
                placeholder="IFSC Code"
              />
            </CCol>
          </CRow>
        </CForm>
        <CCol sm={2}>
          <CButton
            data-testid="designationButton"
            color="info"
            className="btn-ovh me-1"
          >
            <i className="fa fa-plus me-1"></i>Add
          </CButton>
        </CCol>
      </OCard>
    </>
  )
}

export default AddBankAccount
