/* eslint-disable @typescript-eslint/no-unused-vars */
import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import MoreSections from './MoreSections'
import {
  defaultSelectSection,
  formLabelProps,
  initialSections,
} from './ITDeclarationFormHelpers'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  itDeclarationFormSectionList,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { emptyString } from '../../../constant/constantData'

const SectionsFilterOptions = ({
  showAsterix,
  moreSectionButtonText = 'More Sections',
  isOldEmployee,
}: {
  showAsterix: boolean
  moreSectionButtonText?: string
  isOldEmployee: boolean
}): JSX.Element => {
  const [selectedSection, setSelectedSection] =
    useState<Sections>(initialSections)
  const [showInvestment, setShowInvestment] = useState<boolean>(false)
  const [isMoreSectionsButtonEnabled, setIsMoreSectionsButtonEnabled] =
    useState<boolean>(false)
  const [sectionList, setSectionList] = useState<Sections[]>([])
  const [formSectionList, setFormSectionList] = useState<
    itDeclarationFormSectionList[]
  >([])
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const [toCancelSection, setToCancelSection] = useState('')
  const [toCancelSectionId, setToCancelSectionId] = useState(0)

  const dispatch = useAppDispatch()

  const sections: Sections[] = useTypedSelector(
    (state) => state.itDeclarationForm.sections,
  )

  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.getSectionsHavingInvests())
  }, [dispatch])

  useEffect(() => {
    if (selectedSection?.sectionId !== -1) {
      setIsMoreSectionsButtonEnabled(true)
    } else {
      setIsMoreSectionsButtonEnabled(false)
    }
  }, [selectedSection?.sectionId])

  const handleOnChangeSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const filterSection = sections.filter(
      (currentSection) => currentSection.sectionId === Number(value),
    )
    setSelectedSection(filterSection[0])
  }

  const alreadyExistToastMessage = (
    <OToast toastMessage="Section already exist" toastColor="danger" />
  )
  const handleClickSection = () => {
    const isSectionExists = sectionList.find(
      (currSection) => currSection.sectionId === selectedSection.sectionId,
    )

    if (isSectionExists === undefined) {
      setShowInvestment(true)
      setSectionList([...sectionList, selectedSection])
    } else {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
      setTimeout(() => {
        dispatch(reduxServices.app.actions.addToast(undefined))
      }, 2000)
    }
    setSelectedSection(initialSections)
  }

  useEffect(() => {
    if (selectedSection?.sectionId !== -1) {
      dispatch(
        reduxServices.itDeclarationForm.getInvestsBySectionId(
          selectedSection?.sectionId,
        ),
      )
    }
  }, [selectedSection?.sectionId])

  useEffect(() => {
    //if there are no sections selected
    if (sectionList.length === 0 && isOldEmployee === true) {
      dispatch(
        reduxServices.itDeclarationForm.actions.setSubmitButtonDisabled(),
      )
    }
    dispatch(reduxServices.itDeclarationForm.actions.setGrandTotalFinal())
  }, [sectionList, isOldEmployee])

  const handleShowRemoveSectionModal = (
    sectionId: number,
    sectionName: string,
  ) => {
    setIsCancelModalVisible(true)
    setToCancelSection(sectionName)
    setToCancelSectionId(sectionId)
  }

  const handleConfirmCancelSection = () => {
    setIsCancelModalVisible(false)
    const newSectionList = sectionList.filter(
      (itSection) => itSection.sectionId !== toCancelSectionId,
    )
    setSectionList(newSectionList)
    dispatch(
      reduxServices.itDeclarationForm.actions.removeFormSectionDTO({
        sectionId: toCancelSectionId,
        isOld: isOldEmployee,
      }),
    )
  }

  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.actions.setGrandTotalFinal())
  }, [sectionList])

  useEffect(() => {
    const newList = sectionList.map((item) => {
      const existingInvestments = formSectionList.find(
        (eachInvestment) => eachInvestment.sectionId === item.sectionId,
      )
      if (existingInvestments) {
        return {
          ...item,
          formInvestmentDTO: existingInvestments.formInvestmentDTO,
        }
      } else {
        return { ...item, formInvestmentDTO: [] }
      }
    })
    setFormSectionList(newList)
  }, [sectionList])

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
            data-testid={`mainSectionSelect-${isOldEmployee}`}
            name="sectionName"
            onChange={(e) => {
              handleOnChangeSection(e)
            }}
            value={selectedSection?.sectionId}
          >
            <option value={''}>{defaultSelectSection}</option>
            {sections.length > 0 &&
              sections?.map((sectionItem, index) => (
                <option key={index} value={sectionItem.sectionId.toString()}>
                  {sectionItem.sectionName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} className="d-flex align-items-center">
          <CButton
            color="info"
            className="text-white btn-ovh"
            data-testid={`btn-moreSections-${moreSectionButtonText}`}
            size="sm"
            disabled={!isMoreSectionsButtonEnabled}
            onClick={handleClickSection}
          >
            <i className="fa fa-plus me-1"></i>
            {moreSectionButtonText}
          </CButton>
        </CCol>
      </CRow>
      {showInvestment &&
        sectionList.length > 0 &&
        sectionList?.map((currentSec, index) => {
          return (
            <CRow key={index}>
              <CCol>
                <MoreSections
                  index={index}
                  sectionItem={currentSec}
                  handleShowRemoveSectionModal={handleShowRemoveSectionModal}
                  handleConfirmCancelSection={handleConfirmCancelSection}
                  setSectionList={setSectionList}
                  sectionList={sectionList}
                  setFormSectionList={setFormSectionList}
                  formSectionList={formSectionList}
                  isOldEmployee={isOldEmployee}
                />
              </CCol>
            </CRow>
          )
        })}
      <OModal
        alignment="center"
        visible={isCancelModalVisible}
        setVisible={setIsCancelModalVisible}
        modalTitle="Remove Section"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmCancelSection}
      >
        <>
          Do you really want to remove this <strong>{toCancelSection}</strong>?
        </>
      </OModal>
    </>
  )
}

export default SectionsFilterOptions
