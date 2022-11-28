import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const InvestmentTable = ({
  setShowSubTotalAmount,
}: {
  setShowSubTotalAmount: (value: number) => void
  //   currentSec: Investment
}): JSX.Element => {
  const investments = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.investments,
  )

  const handleSubTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSubTotalAmount(Number(e.target.value))
  }

  // const removeInvestmentsHandler = () => {
  //   const removeInvestment = investments?.filter(
  //     (selectedInvest) => selectedInvest.investmentId === currentSec.id,
  //   )
  //   console.log(removeInvestment)
  // }

  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          <CCol className="mt-2">*</CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol sm={12}>
            <CFormSelect
              data-testid="form-select-investment"
              size="sm"
              id="technologyId"
              name="technologyId"
            >
              <option value="">Select Investment</option>
              {investments?.map((invest, index) => (
                <option key={index} value={invest.investmentId}>
                  {invest.investmentName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol sm={12}>
            <CFormInput
              type="text"
              id="savingAmount"
              size="sm"
              placeholder="Enter Savings Amount"
              name="customAmount"
              maxLength={12}
              onChange={handleSubTotalChange}
            ></CFormInput>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-1">
            <CButton
              color="info"
              data-testid={`df-remove-btn`}
              className="btn-ovh-employee-list me-1 text-white"
              size="sm"
              // onClick={removeInvestmentsHandler}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </CButton>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-1">
            <CButton
              color="info"
              data-testid={`df-query-btn`}
              className="btn btn-primary bigfont text-white"
              size="sm"
            >
              <i className="fa fa-question" aria-hidden="true"></i>
            </CButton>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-2">Documents Required</CCol>
        </CTableDataCell>
      </CTableRow>
    </>
  )
}

export default InvestmentTable
