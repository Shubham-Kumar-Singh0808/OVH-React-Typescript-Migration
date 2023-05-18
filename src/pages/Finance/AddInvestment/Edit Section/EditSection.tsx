import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  ITDeclarationFormToggleType,
  UpdateSection,
} from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { showIsRequired } from '../../../../utils/helper'

const EditSection = ({
  editSection,
}: {
  editSection: UpdateSection
}): JSX.Element => {
  const [editSectionCopy, setEditSectionCopy] = useState(editSection)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)

  const formLabelProps = {
    htmlFor: 'inputEditSection',
    className: 'col-form-label section-label',
  }
  const sections = useTypedSelector(
    reduxServices.investmentCheckList.selectors.sections,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (editSectionCopy.sectionName && editSectionCopy.sectionLimit) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editSectionCopy])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'sectionLimit') {
      const secLimit = value.replace(/\D/g, '')
      setEditSectionCopy((prevState) => {
        return { ...prevState, ...{ [name]: secLimit } }
      })
    } else if (name === 'sectionName') {
      const sectionNameValue = value.replace(/^\s*/, '')
      setEditSectionCopy((prevState) => {
        return { ...prevState, ...{ [name]: sectionNameValue } }
      })
    } else {
      setEditSectionCopy((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const successToastMessage = (
    <OToast toastMessage="Section Updated Successfully" toastColor="success" />
  )
  const alreadyExistToastMessage = (
    <OToast toastColor="danger" toastMessage="Section already exist" />
  )
  const backButtonHandler = () => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.HomePage,
      ),
    )
  }
  const handleUpdateSection = async () => {
    const filteredInvest = sections.filter(
      (currSection) => currSection.sectionId === editSection.sectionId,
    )
    console.log(filteredInvest)

    const sectionExist = {
      sectionId: editSectionCopy.sectionId,
      sectionName: editSectionCopy.sectionName,
    }
    const isSectionExistsResultAction = await dispatch(
      reduxServices.itDeclarationList.isSectionExist(sectionExist),
    )
    if (
      reduxServices.itDeclarationList.isSectionExist.fulfilled.match(
        isSectionExistsResultAction,
      ) &&
      isSectionExistsResultAction.payload === true
    ) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
      setEditSectionCopy({
        ...editSectionCopy,
        sectionName: '',
      })
    } else {
      const prepareObject = {
        ...editSectionCopy,
        invests: filteredInvest[0].invests,
      }
      const editResultAction = await dispatch(
        reduxServices.itDeclarationList.updateSection(prepareObject),
      )
      if (
        reduxServices.itDeclarationList.updateSection.fulfilled.match(
          editResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(successToastMessage))
        dispatch(reduxServices.investmentCheckList.getSections())
        backButtonHandler()
      }
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={"Edit Section's"}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="es-back-btn"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Section :
              <span className={showIsRequired(editSectionCopy?.sectionName)}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="ps-2"
                data-testid="es-section-name"
                type="text"
                name="sectionName"
                placeholder="Section"
                autoComplete="off"
                value={editSectionCopy.sectionName}
                maxLength={24}
                onChange={handleOnChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Limit :
              <span
                className={showIsRequired(
                  editSectionCopy?.sectionLimit as string,
                )}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="ps-2"
                data-testid="es-section-limit"
                type="text"
                name="sectionLimit"
                placeholder="Limit"
                autoComplete="off"
                value={editSectionCopy.sectionLimit}
                maxLength={16}
                onChange={handleOnChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="es-update-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={handleUpdateSection}
                disabled={!isUpdateButtonEnabled}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditSection
