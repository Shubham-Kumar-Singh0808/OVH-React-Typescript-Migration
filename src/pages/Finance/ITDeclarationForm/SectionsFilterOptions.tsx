/* eslint-disable @typescript-eslint/no-unused-vars */
import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import MoreSections from './MoreSections'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  itDeclarationFormSectionList,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { TextWhite, TextDanger } from '../../../constant/ClassName'

const SectionsFilterOptions = (): JSX.Element => {
  const [selectedSection, setSelectedSection] = useState<Sections>(
    {} as Sections,
  )
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

  const section = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.sections,
  )

  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.getSectionsHavingInvests())
  }, [dispatch])

  useEffect(() => {
    if (selectedSection?.sectionId) {
      setIsMoreSectionsButtonEnabled(true)
    } else {
      setIsMoreSectionsButtonEnabled(false)
    }
  }, [selectedSection?.sectionId])

  const formLabelProps = {
    htmlFor: 'inputSection',
    className: 'col-form-label sections-label',
  }

  const handleOnChangeSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const filterSection = section.filter(
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
  }

  useEffect(() => {
    if (selectedSection?.sectionId) {
      dispatch(
        reduxServices.itDeclarationForm.getInvestsBySectionId(
          selectedSection?.sectionId,
        ),
      )
    }
  }, [selectedSection?.sectionId])

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
  }

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

  useEffect(() => {
    const grandTotalArray = formSectionList.map((list) =>
      list.formInvestmentDTO.reduce((prev, current) => {
        return prev + +current.customAmount
      }, 0),
    )
    const grandTotal = grandTotalArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    )
    dispatch(reduxServices.itDeclarationForm.actions.setGrandTotal(grandTotal))
    dispatch(
      reduxServices.itDeclarationForm.actions.setFormSectionData(
        formSectionList.map((each) => {
          each.formInvestmentDTO.forEach((e) => delete e.id)
          const { invests, ...rest } = each
          const { sectionLimit, ...rest2 } = rest
          rest2.isOld = true
          rest2.itSectionsId = null
          return rest2
        }),
      ),
    )
  }, [formSectionList])

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CCol sm={1}>
          <CFormLabel {...formLabelProps}>
            Sections:
            <span
              className={selectedSection?.sectionId ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
        </CCol>
        <CCol sm={3}>
          <CFormSelect
            size="sm"
            id="section"
            data-testid="form-select-section"
            name="sectionName"
            onChange={(e) => {
              handleOnChangeSection(e)
            }}
            value={selectedSection?.sectionId}
          >
            <option value={''}>Select section</option>
            {section?.map((sectionItem, index) => (
              <option key={index} value={sectionItem.sectionId}>
                {sectionItem.sectionName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} className="d-flex align-items-center">
          <CButton
            color="info"
            className="text-white btn-ovh"
            data-testid="btn-moreSections"
            size="sm"
            disabled={!isMoreSectionsButtonEnabled}
            onClick={handleClickSection}
          >
            <i className="fa fa-plus me-1"></i>
            More Sections
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
