import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import {
  Investment,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import { ITForm } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const EditInvestmentTable = ({
  handleClickRemoveInvestment,
  editMoreSections,
  currentSec,
  secIndex,
  onChangeCustomAmount,
  onChangeInvestment,
  index,
  sectionList,
  setEditMoreSections,
}: {
  setShowSubTotalAmount: (value: number) => void
  editMoreSections: ITForm
  setEditMoreSections: React.Dispatch<React.SetStateAction<ITForm>>
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
  const editDeclarationForm = useTypedSelector(
    reduxServices.itDeclarationList.selectors.editDeclarationForm,
  )

  useEffect(() => {
    setEditMoreSections(editDeclarationForm)
  }, [editDeclarationForm])
  return (
    <>
      {editMoreSections?.formSectionsDTOs?.length > 0 &&
        editMoreSections?.formSectionsDTOs?.map((cycle) => {
          return (
            <>
              {cycle.formInvestmentDTO?.length > 0 &&
                cycle.formInvestmentDTO?.map((count, index) => {
                  return (
                    <>
                      <CTableRow>
                        <CTableDataCell scope="row">
                          <CCol className="mt-2">{count.investmentId}</CCol>
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          <CCol sm={12}>
                            <CFormSelect
                              data-testid="form-select-investment"
                              size="sm"
                              id="investment"
                              name="investmentName"
                              value={count.investmentId}
                              onChange={(e) =>
                                onChangeInvestment(
                                  secIndex,
                                  e,
                                  count.investmentId as number,
                                )
                              }
                            >
                              <option value="">Select Investment</option>
                              {sectionList[index]?.invests.map(
                                (invest, investIndex) => (
                                  <option
                                    key={investIndex}
                                    value={invest.investmentId}
                                  >
                                    {invest.investmentName}
                                  </option>
                                ),
                              )}
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
                              value={count.customAmount}
                              onChange={(e) =>
                                onChangeCustomAmount(
                                  secIndex,
                                  e,
                                  count.investmentId as number,
                                )
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
                                handleClickRemoveInvestment(
                                  count.investmentId as number,
                                )
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
                              <i
                                className="fa fa-question"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CCol>
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          <CCol className="mt-2">Documents Required</CCol>
                        </CTableDataCell>
                      </CTableRow>
                    </>
                  )
                })}
            </>
          )
        })}
    </>
  )
}

export default EditInvestmentTable
