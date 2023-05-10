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
  investmentButtonHandler,
  index,
  sectionList,
}: {
  setShowSubTotalAmount: (value: number) => void
  handleClickRemoveInvestment: (id: number) => void
  investmentButtonHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
    investmentId: number,
    type: 'query' | 'doc',
  ) => void
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
          <CCol className="mt-2">{currentSec?.id}</CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol sm={12}>
            <CFormSelect
              data-testid={`form-select-investment${secIndex}`}
              size="sm"
              id="investment"
              name="investmentName"
              value={currentSec.investmentId}
              onChange={(e) => {
                onChangeInvestment(secIndex, e, +currentSec.investmentId)
              }}
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
              data-testid={`custom-amount${secIndex}`}
              maxLength={12}
              value={currentSec.customAmount}
              onChange={(e) =>
                onChangeCustomAmount(secIndex, e, +currentSec.investmentId)
              }
            ></CFormInput>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-1">
            <CButton
              color="info"
              data-testid={`df-remove-btn${secIndex}`}
              className="btn-ovh-employee-list me-1 text-white"
              size="sm"
              onClick={() => {
                handleClickRemoveInvestment(+currentSec.investmentId)
              }}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </CButton>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-1">
            {currentSec.description && (
              <CButton
                color="info"
                data-testid={`df-query-btn${secIndex}`}
                className="btn btn-primary bigfont text-white"
                size="sm"
                onClick={(e) =>
                  investmentButtonHandler(e, +currentSec.investmentId, 'query')
                }
              >
                <i className="fa fa-question" aria-hidden="true"></i>
              </CButton>
            )}
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          {currentSec.requiredDocs !== '' ? (
            <CButton
              className="mt-2 btn-ovh text-primary"
              variant="outline"
              style={{
                backgroundColor: 'transparent',
                color: 'inherit',
                borderStyle: 'none',
              }}
              data-testid={`df-doc-btn${secIndex}`}
              onClick={(e) => {
                investmentButtonHandler(e, +currentSec.investmentId, 'doc')
              }}
            >
              Documents Required
            </CButton>
          ) : (
            <></>
          )}
        </CTableDataCell>
      </CTableRow>
    </>
  )
}

export default InvestmentTable
