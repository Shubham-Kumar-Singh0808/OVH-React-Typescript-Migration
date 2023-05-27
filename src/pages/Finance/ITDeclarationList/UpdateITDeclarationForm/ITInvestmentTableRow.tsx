import {
  CTableRow,
  CTableDataCell,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import {
  getInvestmentDataFromInvestType,
  getSectionById,
} from '../ITDeclarationListHelpers'
import { ITInvestmentTableRowProps } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ITInvestmentTableRow = ({
  investment,
  investmentIndex,
  sectionsWithInvests,
  currentSectionId,
  investmentChangeHandler,
  amountChangeHandler,
  deleteInvestmentButtonHandler,
  contentButtonHandler,
}: ITInvestmentTableRowProps): JSX.Element => {
  return (
    <>
      <CTableRow data-testid={`investment-row-${currentSectionId}`}>
        <CTableDataCell scope="row">
          <CCol
            className="mt-2"
            data-testid={`investment-serial-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
          >
            {investmentIndex + 1}
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol sm={12}>
            <CFormSelect
              size="sm"
              id="investment"
              name="investmentName"
              data-testid={`investment-select-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
              value={investment.investmentId}
              onChange={(e) => {
                investmentChangeHandler(
                  e,
                  currentSectionId,
                  investment,
                  investmentIndex,
                )
              }}
            >
              <option
                value=""
                data-testid={`investment-select-options-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
              >
                Select Investment
              </option>
              {getSectionById(
                sectionsWithInvests,
                currentSectionId,
              )?.invests?.map((thisInvestment, index) => (
                <option
                  key={index}
                  value={thisInvestment.investmentId}
                  data-testid={`investment-select-options-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
                >
                  {thisInvestment.investmentName}
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
              data-testid={`investment-amount-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
              maxLength={12}
              value={investment.customAmount}
              onChange={(e) =>
                amountChangeHandler(
                  e,
                  currentSectionId,
                  investment,
                  investmentIndex,
                )
              }
            ></CFormInput>
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CCol className="mt-1">
            <CButton
              color="info"
              className="btn-ovh-employee-list me-1 text-white"
              size="sm"
              onClick={(e) => {
                deleteInvestmentButtonHandler(
                  e,
                  currentSectionId,
                  investment.investmentId,
                )
              }}
              data-testid={`investment-delete-btn-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </CButton>
          </CCol>
        </CTableDataCell>

        <CTableDataCell scope="row">
          <CCol className="mt-1">
            {getInvestmentDataFromInvestType(
              sectionsWithInvests,
              currentSectionId,
              investment,
            ).description && (
              <CButton
                color="info"
                className="btn btn-primary bigfont text-white"
                size="sm"
                onClick={(e) =>
                  contentButtonHandler(
                    e,
                    currentSectionId,
                    investment.investmentId,
                    'query',
                  )
                }
                data-testid={`investment-query-btn-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
              >
                <i className="fa fa-question" aria-hidden="true"></i>
              </CButton>
            )}
          </CCol>
        </CTableDataCell>
        <CTableDataCell scope="row">
          {getInvestmentDataFromInvestType(
            sectionsWithInvests,
            currentSectionId,
            investment,
          ).requiredDocs !== '' && (
            <CButton
              className="mt-2 btn-ovh text-primary"
              variant="outline"
              style={{
                backgroundColor: 'transparent',
                color: 'inherit',
                borderStyle: 'none',
              }}
              onClick={(e) =>
                contentButtonHandler(
                  e,
                  currentSectionId,
                  investment.investmentId,
                  'doc',
                )
              }
              data-testid={`investment-doc-btn-${investmentIndex}-${investment.investmentId}-${currentSectionId}`}
            >
              Documents Required
            </CButton>
          )}
        </CTableDataCell>
      </CTableRow>
    </>
  )
}

export default ITInvestmentTableRow
