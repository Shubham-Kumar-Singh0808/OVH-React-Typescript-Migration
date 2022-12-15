import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddSection } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { showIsRequired } from '../../../../utils/helper'

const AddNewSection = (): JSX.Element => {
  const initialSectionDetails = {} as AddSection
  const [addNewSection, setAddNewSection] = useState(initialSectionDetails)
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const formLabelProps = {
    htmlFor: 'inputAddSection',
    className: 'col-form-label section-label',
  }
  const dispatch = useAppDispatch()
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddSection = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Section and Investment',
  )
  useEffect(() => {
    if (addNewSection.sectionName && addNewSection.sectionLimit) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [addNewSection])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'sectionLimit') {
      const limit = value.replace(/\D/g, '')
      setAddNewSection((prevState) => {
        return { ...prevState, ...{ [name]: limit } }
      })
    } else {
      setAddNewSection((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const handleClearInputs = () => {
    setAddNewSection({
      sectionName: '',
      sectionLimit: '',
    })
  }
  const successToastMessage = (
    <OToast toastMessage="Section added Successfully" toastColor="success" />
  )
  const alreadyExistToastMessage = (
    <OToast toastColor="danger" toastMessage="Section already exist" />
  )
  const handleAddNewSection = async () => {
    const sectionExist = {
      sectionId: -1,
      sectionName: addNewSection.sectionName,
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
    } else {
      const addSectionResultAction = await dispatch(
        reduxServices.itDeclarationList.addSection(addNewSection),
      )

      if (
        reduxServices.itDeclarationList.addSection.fulfilled.match(
          addSectionResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(successToastMessage))
      }
      dispatch(reduxServices.investmentCheckList.getSections())
      handleClearInputs()
    }
  }

  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Section :
            <span className={showIsRequired(addNewSection?.sectionName)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="ps-2"
              data-testid="section-name"
              type="text"
              name="sectionName"
              placeholder="Section"
              autoComplete="off"
              value={addNewSection.sectionName}
              maxLength={24}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Limit :
            <span className={showIsRequired(addNewSection?.sectionLimit)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="ps-2"
              data-testid="section-limit"
              type="text"
              name="sectionLimit"
              placeholder="Limit"
              autoComplete="off"
              value={addNewSection.sectionLimit}
              maxLength={16}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CCol md={{ span: 6, offset: 3 }}>
            {userAccessToAddSection?.createaccess && (
              <>
                <CButton
                  data-testid="as-add-btn"
                  className="btn-ovh me-1 text-white"
                  color="success"
                  onClick={handleAddNewSection}
                  disabled={!isAddButtonEnabled}
                >
                  Add
                </CButton>
                <CButton
                  data-testid="as-clear-btn"
                  color="warning "
                  className="btn-ovh text-white"
                  onClick={handleClearInputs}
                >
                  Clear
                </CButton>
              </>
            )}
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddNewSection
