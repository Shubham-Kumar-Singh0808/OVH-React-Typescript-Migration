import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import MoreSections from './MoreSections'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { Sections } from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const SectionsFilterOptions = (): JSX.Element => {
  const [selectedSection, setSelectedSection] = useState<Sections>(
    {} as Sections,
  )
  const [showInvestment, setShowInvestment] = useState<boolean>(false)
  const [isMoreSectionsButtonEnabled, setIsMoreSectionsButtonEnabled] =
    useState<boolean>(false)
  const [sectionList, setSectionList] = useState<Sections[]>([])
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
  const handleClearInputs = () => {
    setShowInvestment(false)
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
  const handleClickSection = async () => {
    const isSectionExists = sectionList.find(
      (currSection) => currSection.sectionId === selectedSection.sectionId,
    )

    if (isSectionExists === undefined) {
      setShowInvestment(true)
      setSectionList([...sectionList, selectedSection])
    } else {
      await dispatch(
        reduxServices.app.actions.addToast(alreadyExistToastMessage),
      )
      dispatch(reduxServices.app.actions.addToast(undefined))
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
      (section) => section.sectionId !== toCancelSectionId,
    )
    setSectionList(newSectionList)
  }

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CCol sm={1}>
          <CFormLabel {...formLabelProps}>Sections:</CFormLabel>
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
                  sectionItem={currentSec}
                  handleShowRemoveSectionModal={handleShowRemoveSectionModal}
                  handleConfirmCancelSection={handleConfirmCancelSection}
                  setSectionList={setSectionList}
                  sectionList={sectionList}
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
