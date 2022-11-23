import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const AddBankAccount = ({
  backButtonHandler,
}: {
  backButtonHandler: () => void
}): JSX.Element => {
  const [accountNumber, setIsAccountNumber] = useState<string>('')
  const [bankName, setBankName] = useState<string>('')
  const [bankIfscCode, setBankIfscCode] = useState<string>('')

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const bankData = useTypedSelector(
    reduxServices.bankDetails.selectors.bankList,
  )
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'number') {
      const accountNumber = value.replace(/\D/g, '')
      setIsAccountNumber(accountNumber)
    } else if (name === 'code') {
      const ifscCode = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setBankIfscCode(ifscCode)
    }
  }

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
              onClick={backButtonHandler}
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
              <span className={accountNumber ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-2"
                data-testid="bankAccountNumber"
                type="text"
                id="Number"
                size="sm"
                name="number"
                maxLength={9}
                autoComplete="off"
                placeholder="Bank Account Number"
                onChange={onChangeHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Name of the Bank:
              <span className={bankName ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="bankName"
                data-testid="form-select1"
                name="bankName"
                onChange={(e) => setBankName(e.target.value)}
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
              <span className={bankIfscCode ? TextWhite : TextDanger}>*</span>
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
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
            >
              Add
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default AddBankAccount
