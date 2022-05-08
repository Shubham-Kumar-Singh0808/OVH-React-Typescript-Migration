import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { selectQualificationCategoryList } from '../../../reducers/MyProfile/QualificationCategoryList/qualificationCategorySlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import OToast from '../../../components/ReusableComponent/OToast'
import { addToast } from '../../../reducers/appSlice'

const AddNewQualificationCategory = (): JSX.Element => {
  const employeeQualificationCategories = useTypedSelector(
    selectQualificationCategoryList,
  )
  const dispatch = useAppDispatch()

  const [newQualificationCategoryName, setNewQualificationCategoryName] =
    useState('')
  const [
    isAddQualificationCategoryBtnEnabled,
    setIsAddQualificationCategoryBtnEnabled,
  ] = useState(false)

  const toastElement = (
    <OToast toastMessage="Category already exists!" toastColor="danger" />
  )

  useEffect(() => {
    if (newQualificationCategoryName) {
      setIsAddQualificationCategoryBtnEnabled(true)
    } else {
      setIsAddQualificationCategoryBtnEnabled(false)
    }
  }, [newQualificationCategoryName])

  const handleAddQualificationCategory = async () => {
    const toAddQualificationCategoryName = newQualificationCategoryName
    if (
      employeeQualificationCategories.filter(
        (category) =>
          category.qualificationCategory.toLowerCase() ===
          newQualificationCategoryName.toLowerCase(),
      ).length > 0
    ) {
      dispatch(addToast(toastElement))
      return
    }

    setNewQualificationCategoryName('')

    //dispatch(addNewQualificationCategoryByName(toAddQualificationCategoryName))
  }

  const formLabelProps = {
    htmlFor: 'inputNewCategory',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <CRow>
        <CCol sm={4} className="new-category-col">
          <CFormLabel {...formLabelProps}>Category:</CFormLabel>
        </CCol>
        <CCol sm={4} className="new-category-col">
          <CFormSelect aria-label="Default select example">
            <option>Select Category</option>
            <option value="1">Post Graduation</option>
            <option value="2">Graduation</option>
          </CFormSelect>
        </CCol>
        <CCol sm={4} className="new-category-col">
          <CFormLabel {...formLabelProps}>Name:</CFormLabel>
        </CCol>
        <CCol sm={4} className="new-category-col">
          <CFormInput
            type="text"
            id="inputNewCategory"
            value={newQualificationCategoryName}
            onChange={(e) => setNewQualificationCategoryName(e.target.value)}
          />
        </CCol>
        <CCol sm={4} className="d-flex align-items-center new-category-col">
          <CButton
            color="warning"
            className="px-4 text-white"
            size="sm"
            disabled={!isAddQualificationCategoryBtnEnabled}
            onClick={handleAddQualificationCategory}
          >
            Add
          </CButton>
          <CButton>Clear</CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default AddNewQualificationCategory
