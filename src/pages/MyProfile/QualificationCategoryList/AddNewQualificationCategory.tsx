import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import {
  qualificationCategorySelectors,
  qualificationCategoryThunk,
} from '../../../reducers/MyProfile/QualificationCategoryList/qualificationCategorySlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import OToast from '../../../components/ReusableComponent/OToast'
import { QualificationCategoryList } from '../../../types/MyProfile/QualificationCategoryList/qualificationCategoryTypes'
import { appActions } from '../../../reducers/appSlice'

const AddNewQualificationCategory = (): JSX.Element => {
  const employeeQualificationCategories = useTypedSelector(
    qualificationCategorySelectors.selectQualificationCategoryList,
  )
  const dispatch = useAppDispatch()
  const initialNewQualificationCategory = {} as QualificationCategoryList
  const [newQualificationCategory, setNewQualificationCategory] = useState(
    initialNewQualificationCategory,
  )
  const [
    isAddQualificationCategoryBtnEnabled,
    setIsAddQualificationCategoryBtnEnabled,
  ] = useState(false)

  const alreadyExistToastMessage = (
    <OToast
      toastMessage="This qualification details are already added"
      toastColor="danger"
    />
  )

  const successToastMessage = (
    <OToast
      toastMessage="Qualification details added successfully."
      toastColor="success"
    />
  )

  useEffect(() => {
    if (
      newQualificationCategory.qualificationCategory &&
      newQualificationCategory.qualificationName
    ) {
      setIsAddQualificationCategoryBtnEnabled(true)
    } else {
      setIsAddQualificationCategoryBtnEnabled(false)
    }
  }, [
    newQualificationCategory.qualificationCategory,
    newQualificationCategory.qualificationName,
  ])
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setNewQualificationCategory((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  const handleAddQualificationCategory = async () => {
    const toAddQualificationName = newQualificationCategory
    if (
      employeeQualificationCategories.filter(
        (category) =>
          category.qualificationName.toLowerCase() ===
          newQualificationCategory.qualificationName.toLowerCase(),
      ).length > 0
    ) {
      dispatch(appActions.addToast(alreadyExistToastMessage))
      return
    }

    setNewQualificationCategory({
      qualificationCategory: '',
      qualificationName: '',
    })

    dispatch(
      qualificationCategoryThunk.addNewQualificationCategoryByName(
        toAddQualificationName,
      ),
    )
    dispatch(qualificationCategoryThunk.getQualificationCategories())
    dispatch(appActions.addToast(successToastMessage))
  }

  const formLabelProps = {
    htmlFor: 'inputNewQualifictionCategory',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <CForm>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Category:{' '}
            <span
              className={
                newQualificationCategory.qualificationCategory
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              name="qualificationCategory"
              value={newQualificationCategory?.qualificationCategory}
              onChange={handleInputChange}
            >
              <option value={''}>Select Category</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Graduation">Graduation</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Name:
            <span
              className={
                newQualificationCategory.qualificationName
                  ? 'text-white'
                  : 'text-danger'
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              id="Name"
              size="sm"
              name="qualificationName"
              value={newQualificationCategory.qualificationName}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CCol className="col-md-3 offset-md-3">
            <CButton
              color="success"
              className="btn-ovh me-1"
              size="sm"
              disabled={!isAddQualificationCategoryBtnEnabled}
              onClick={handleAddQualificationCategory}
            >
              Add
            </CButton>
            <CButton
              color="warning "
              className="btn-ovh"
              onClick={() => {
                setNewQualificationCategory({
                  qualificationCategory: '',
                  qualificationName: '',
                })
              }}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddNewQualificationCategory
