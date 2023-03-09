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
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  Invest,
  Investment,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import {
  FormInvestmentDTOProps,
  ITForm,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const EditInvestmentTable = ({
  handleClickRemoveInvestment,
  editMoreSections,
  formSectionsDTOs,
  secIndex,
  onChangeCustomAmount,
  onChangeInvestment,
  index,
  sectionList,
  investId,
  setEditMoreSections,
}: {
  setShowSubTotalAmount: (value: number) => void
  editMoreSections: ITForm
  setEditMoreSections: React.Dispatch<React.SetStateAction<ITForm>>
  handleClickRemoveInvestment: (id: number) => void
  formSectionsDTOs: FormInvestmentDTOProps
  secIndex: number
  investId: number | undefined
  sectionList: Sections[]
  index: number
  onChangeCustomAmount: (
    secIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void
  onChangeInvestment: (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => void
}): JSX.Element => {
  // const [investId, setInvestId] = useState<number>()
  const dispatch = useAppDispatch()
  const editDeclarationForm = useTypedSelector(
    reduxServices.itDeclarationList.selectors.editDeclarationForm,
  )
  const getSectionsHavingInvests = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.sections,
  )

  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.getSectionsHavingInvests())
  }, [dispatch])
  useEffect(() => {
    setEditMoreSections(editDeclarationForm)
  }, [editDeclarationForm])
  // const filterSelectDropdown = () => {
  //   getSectionsHavingInvests
  //     .filter(
  //       (getSecItem) => getSecItem.sectionName === formSectionsDTOs.sectionName,
  //     )
  //     .map((filteredSecItem) =>
  //       filteredSecItem.invests?.map((investItem) => (
  //         <option key={investItem.sectionId} value={investItem.investmentId}>
  //           {investItem.investmentName}
  //         </option>
  //       )),
  //     )
  // }
  const selectDropdownOptions = () => {
    const filteredInvests =
      getSectionsHavingInvests.find(
        (item) => item.sectionName === formSectionsDTOs.sectionName,
      )?.invests || []
    return filteredInvests.map((item) => (
      <option key={item.investmentId} value={item.investmentId}>
        {item.investmentName}
      </option>
    ))
  }
  return (
    <>
      {formSectionsDTOs.formInvestmentDTO?.map((item, index) => {
        const investmentId = investId ?? item.investmentId
        const filteredInvests = getSectionsHavingInvests?.filter(
          (getSecItem) =>
            getSecItem.sectionName === formSectionsDTOs.sectionName,
        )[0]?.invests
        const handleInvestmentChange = (
          e: React.ChangeEvent<HTMLSelectElement>,
        ) => {
          e.preventDefault()
          onChangeInvestment(index, e, investmentId)
        }

        return (
          <>
            <CTableRow key={index + 1}>
              <CTableDataCell scope="row">
                <CCol className="mt-2">{index + 1}</CCol>
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CCol sm={12}>
                  <CFormSelect
                    data-testid="form-select-investment"
                    size="sm"
                    id={`investment${index}`}
                    name="investmentName"
                    value={investmentId}
                    onChange={handleInvestmentChange}
                  >
                    {filteredInvests?.map((investItem) => (
                      <option
                        key={investItem.sectionId}
                        value={investItem.investmentId}
                      >
                        {investItem.investmentName}
                      </option>
                    ))}
                    {/* {selectDropdownOptions()} */}
                    {/* {getSectionsHavingInvests &&
                      getSectionsHavingInvests
                        .filter(
                          (getSecItem) =>
                            getSecItem.sectionName ===
                            formSectionsDTOs.sectionName,
                        )
                        .map((filteredSecItem) =>
                          filteredSecItem.invests?.map((investItem) => {
                            return (
                              <option
                                key={investItem.sectionId}
                                value={investItem.investmentId}
                              >
                                {investItem.investmentName}
                              </option>
                            )
                          }),
                        )} */}
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
                    value={item.customAmount}
                    onChange={(e) =>
                      onChangeCustomAmount(
                        index,
                        e,
                        item.investmentId as number,
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
                      handleClickRemoveInvestment(item.investmentId as number)
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
      })}
    </>
  )
}

export default EditInvestmentTable
