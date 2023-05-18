import { CRow, CCol, CFormLabel, CFormSelect, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ITSections from './ITSections'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import {
  formLabelProps,
  defaultSelectSection,
  initialSections,
} from '../../ITDeclarationForm/ITDeclarationFormHelpers'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { Sections } from '../../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import { FormSection } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import {
  findFormSectionById,
  getSectionById,
  initialFormInvestment,
} from '../ITDeclarationListHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

const ITSectionsFilter = ({
  userSelectedSections,
  showAsterix,
  sectionsButtonText,
  isOldEmployee,
}: {
  userSelectedSections: FormSection[]
  showAsterix: boolean
  sectionsButtonText: string
  isOldEmployee: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const sectionsWithInvests = useTypedSelector(
    (state) => state.itDeclarationList.sectionsWithInvests,
  )
  const [selectedSection, setSelectedSection] =
    useState<Sections>(initialSections)
  const [isSectionsButtonEnabled, setIsSectionsButtonEnabled] =
    useState<boolean>(false)
  const [selectedSectionList, setSelectedSectionList] =
    useState<FormSection[]>(userSelectedSections)

  // whenever the data is changing in redux the values are changing locally using this
  useEffect(() => {
    setSelectedSectionList(userSelectedSections)
  }, [userSelectedSections])

  const sectionSelectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target
    const filterSection = sectionsWithInvests.filter(
      (currentSection) => currentSection.sectionId === Number(value),
    )
    setSelectedSection(filterSection[0])
  }

  const sectionsButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const isSectionExists = findFormSectionById(
      selectedSectionList,
      selectedSection.sectionId,
    )
    if (isSectionExists !== undefined) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast toastMessage="Section Already Exists" toastColor="danger" />,
        ),
      )
      return
    }
    const section = getSectionById(
      sectionsWithInvests,
      selectedSection.sectionId,
    )
    const newSection: FormSection = {
      maxLimit: section.sectionLimit,
      sectionId: section.sectionId,
      sectionName: section.sectionName,
      itSectionsId: null,
      isOld: isOldEmployee,
      formInvestmentDTO: [initialFormInvestment],
    }
    dispatch(
      reduxServices.itDeclarationList.actions.addSectionInUpdateIT(newSection),
    )
    setSelectedSection(initialSections)
  }

  useEffect(() => {
    if (selectedSection.sectionId !== initialSections.sectionId) {
      setIsSectionsButtonEnabled(true)
    } else {
      setIsSectionsButtonEnabled(false)
    }
  }, [selectedSection])

  return (
    <>
      <CRow className="mt-4 mb-4 ms-2">
        <CCol sm={1}>
          <CFormLabel {...formLabelProps}>
            Sections:
            {showAsterix && (
              <span
                className={
                  selectedSection?.sectionId !== -1 ? TextWhite : TextDanger
                }
              >
                *
              </span>
            )}
          </CFormLabel>
        </CCol>
        <CCol sm={3}>
          <CFormSelect
            size="sm"
            id="section"
            name="sectionName"
            data-testid={`updateIT-section-select-${isOldEmployee}`}
            value={selectedSection.sectionId}
            onChange={sectionSelectChangeHandler}
          >
            <option
              value={initialSections.sectionId.toString()}
              data-testid={`section-select-options-${isOldEmployee}`}
            >
              {defaultSelectSection}
            </option>
            {sectionsWithInvests?.length > 0 &&
              sectionsWithInvests?.map((sectionItem, index) => (
                <option
                  key={index}
                  value={sectionItem.sectionId.toString()}
                  data-testid={`section-select-options-${isOldEmployee}`}
                >
                  {sectionItem.sectionName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} className="d-flex align-items-center">
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            data-testid={`moreSectionsBtn-${isOldEmployee}`}
            disabled={!isSectionsButtonEnabled}
            onClick={sectionsButtonClickHandler}
          >
            <i className="fa fa-plus me-1"></i>
            {sectionsButtonText}
          </CButton>
        </CCol>
      </CRow>
      {selectedSectionList.length > 0 &&
        selectedSectionList?.map((section, index) => (
          <React.Fragment key={index}>
            <CRow>
              <CCol data-testid="section-column">
                <ITSections
                  currentSection={section}
                  sectionsWithInvests={sectionsWithInvests}
                  isOldEmployee={isOldEmployee}
                />
              </CCol>
            </CRow>
          </React.Fragment>
        ))}
    </>
  )
}

export default ITSectionsFilter
