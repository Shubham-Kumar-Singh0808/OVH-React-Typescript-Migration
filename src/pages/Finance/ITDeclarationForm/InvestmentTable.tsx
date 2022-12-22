import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import {
  Investment,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'

const InvestmentTable = ({
  handleClickRemoveInvestment,
  currentSec,
  secIndex,
  onChangeCustomAmount,
  onChangeInvestment,
  index,
  sectionList,
}: {
  setShowSubTotalAmount: (value: number) => void
  handleClickRemoveInvestment: (id: number) => void
  currentSec: Investment
  secIndex: number
  sectionList: Sections[]
  index: number
  onChangeCustomAmount: (
    secIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void
  onChangeInvestment: (
    secIndex: number,
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => void
}): JSX.Element => {
  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          <CCol className="mt-2">{currentSec.id}</CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol sm={12}>
            <CFormSelect
              data-testid="form-select-investment"
              size="sm"
              id="investment"
              name="investmentName"
              value={currentSec.investmentId}
              onChange={(e) =>
                onChangeInvestment(secIndex, e, currentSec.id as number)
              }
            >
              <option value="">Select Investment</option>
              {sectionList[index]?.invests.map((invest, investIndex) => (
                <option key={investIndex} value={invest.investmentId}>
                  {invest.investmentName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol sm={12}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="savingAmount"
              size="sm"
              placeholder="Enter Savings Amount"
              name="customAmount"
              data-testid="custom-amount"
              maxLength={12}
              value={currentSec.customAmount}
              onChange={(e) =>
                onChangeCustomAmount(secIndex, e, currentSec.id as number)
              }
            ></CFormInput>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-1">
            <CButton
              color="info"
              data-testid={`df-remove-btn${index}`}
              className="btn-ovh-employee-list me-1 text-white"
              size="sm"
              onClick={() =>
                handleClickRemoveInvestment(currentSec.id as number)
              }
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </CButton>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-1">
            <CButton
              color="info"
              data-testid={`df-query-btn${index}`}
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
