/* eslint-disable require-await */
// Todo: remove eslint and fix error
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { QualificationCategory } from '../../../../types/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategoryTypes'
import { reduxServices } from '../../../../reducers/reduxServices'

const AddNewCategory = (): JSX.Element => {
  // const employeeQualificationCategories = useTypedSelector(
  //   reduxServices.employeeQualificationCategory.selectors
  //     .qualificationCategories,
  // )
  // const dispatch = useAppDispatch()
  // const initialNewQualificationCategory = {} as QualificationCategory
  // const [newQualificationCategory, setNewQualificationCategory] = useState(
  //   initialNewQualificationCategory,
  // )
  // const [
  //   isAddQualificationCategoryBtnEnabled,
  //   setIsAddQualificationCategoryBtnEnabled,
  // ] = useState(false)

  // const alreadyExistToastMessage = (
  //   <OToast
  //     toastMessage="This qualification details are already added"
  //     toastColor="danger"
  //   />
  // )

  // const successToastMessage = (
  //   <OToast
  //     toastMessage="Qualification details added successfully."
  //     toastColor="success"
  //   />
  // )

  // useEffect(() => {
  //   if (
  //     newQualificationCategory.qualificationCategory &&
  //     newQualificationCategory.qualificationName
  //   ) {
  //     setIsAddQualificationCategoryBtnEnabled(true)
  //   } else {
  //     setIsAddQualificationCategoryBtnEnabled(false)
  //   }
  // }, [
  //   newQualificationCategory.qualificationCategory,
  //   newQualificationCategory.qualificationName,
  // ])
  // const handleInputChange = (
  //   event:
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const { name, value } = event.target
  //   if (name === 'qualificationName') {
  //     const qualificationName = value.replace(/^\s*/, '')
  //     setNewQualificationCategory((prevState) => {
  //       return { ...prevState, ...{ [name]: qualificationName } }
  //     })
  //   } else {
  //     setNewQualificationCategory((values) => {
  //       return { ...values, ...{ [name]: value } }
  //     })
  //   }
  // }

  // const handleAddQualificationCategory = async () => {
  //   const addQualificationName = newQualificationCategory
  //   if (
  //     employeeQualificationCategories.filter(
  //       (category) =>
  //         category.qualificationName.toLowerCase() ===
  //         newQualificationCategory.qualificationName.toLowerCase(),
  //     ).length > 0
  //   ) {
  //     dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
  //     return
  //   }

  //   setNewQualificationCategory({
  //     qualificationCategory: '',
  //     qualificationName: '',
  //   })

  //   dispatch(
  //     reduxServices.employeeQualificationCategory.createQualificationCategory(
  //       addQualificationName,
  //     ),
  //   )
  //   dispatch(
  //     reduxServices.employeeQualificationCategory.getQualificationCategories(),
  //   )
  //   dispatch(reduxServices.app.actions.addToast(successToastMessage))
  // }

  return (
    <>
      <CForm>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Department Name :
            <span
            //   className={
            //     newQualificationCategory.qualificationCategory
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="form-select-dept"
              aria-label="Default select example"
              size="sm"
              name="departmentName"
              //   value={newQualificationCategory?.qualificationCategory}
              //   onChange={handleInputChange}
            >
              <option value={''}>Select Category</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Graduation">Graduation</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Category Name :
            <span
            //   className={
            //     newQualificationCategory.qualificationName
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              id="categoryName"
              data-testid="category-name"
              size="sm"
              name="categoryName"
              //   value={newQualificationCategory.qualificationName}
              //   onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Meal Type :
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck name="mealType" data-testid="ch-mealType" />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CCol className="col-md-3 offset-md-3">
            <CButton
              color="success"
              className="btn-ovh me-1"
              size="sm"
              //   disabled={!isAddQualificationCategoryBtnEnabled}
              //   onClick={handleAddQualificationCategory}
            >
              Add
            </CButton>
            <CButton
              color="warning "
              className="btn-ovh"
              //   onClick={() => {
              //     setNewQualificationCategory({
              //       qualificationCategory: '',
              //       qualificationName: '',
              //     })
              //   }}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddNewCategory
