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
import { reduxServices } from '../../../../reducers/reduxServices'
import { AddCategory } from '../../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'
import { showIsRequired } from '../../../../utils/helper'
import { TextDanger } from '../../../../constant/ClassName'

const AddNewCategory = (): JSX.Element => {
  const initialNewCategory = {} as AddCategory
  const [selectDepartment, setSelectDepartment] = useState<number | string>()
  const [addNewCategory, setAddNewCategory] = useState({
    ...initialNewCategory,
    mealType: false,
  })
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isAddCategoryButtonEnabled, setIsAddCategoryButtonEnabled] =
    useState<boolean>(false)
  const [categoryNameExist, setCategoryNameExist] = useState('')
  const dispatch = useAppDispatch()
  const allDepartments = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.departments,
  )
  const categories = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.categoryList,
  )
  const successToastMessage = (
    <OToast toastMessage="Category added successfully" toastColor="success" />
  )
  useEffect(() => {
    if (!allDepartments)
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationDepartments(),
      )
  }, [allDepartments])

  useEffect(() => {
    if (selectDepartment && addNewCategory.categoryName && !categoryNameExist) {
      setIsAddCategoryButtonEnabled(true)
    } else {
      setIsAddCategoryButtonEnabled(false)
    }
  }, [selectDepartment, addNewCategory.categoryName])

  const handleClearInputs = () => {
    setAddNewCategory({
      categoryName: '',
      mealType: false,
    })
    setSelectDepartment('')
    setIsChecked(false)
    setCategoryNameExist('')
  }
  const categoryNameExists = (name: string) => {
    return categories?.find((category) => {
      return category.categoryName.toLowerCase() === name.toLowerCase()
    })
  }
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'categoryName') {
      const categoryValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setAddNewCategory((prevState) => {
        return { ...prevState, ...{ [name]: categoryValue } }
      })
    }
    if (categoryNameExists(value)) {
      setCategoryNameExist(value)
    } else {
      setCategoryNameExist('')
    }
  }

  const handleAddNewCategory = async () => {
    const prepareObject = {
      ...addNewCategory,
      departmentId: selectDepartment as string,
      mealType: isChecked,
    }
    const addCategoryResultAction = await dispatch(
      reduxServices.ticketConfiguration.addCategory(prepareObject),
    )
    if (
      reduxServices.ticketConfiguration.addCategory.fulfilled.match(
        addCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
      dispatch(reduxServices.ticketConfiguration.getAllCategory())
    }
  }
  return (
    <>
      <CForm>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Department Name :
            <span className={showIsRequired(selectDepartment as string)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="department"
              name="department"
              id="department"
              data-testid="tc-dept-name"
              onChange={(e) => {
                setSelectDepartment(e.target.value)
              }}
              value={selectDepartment}
            >
              <option value="">Select Department</option>
              {allDepartments &&
                allDepartments?.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Category Name :
            <span
              className={showIsRequired(addNewCategory.categoryName as string)}
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
              placeholder="Enter Category Name"
              autoComplete="off"
              value={addNewCategory.categoryName}
              onChange={handledInputChange}
            />
          </CCol>
          <CCol sm={3}>
            {categoryNameExist && (
              <p className={TextDanger} data-testid="categoryName-exist">
                Category Name Already Exist
              </p>
            )}
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Meal Type :
          </CFormLabel>
          <CCol sm={3} className="pt-2">
            <CFormCheck
              className="mt-4"
              name="mealType"
              data-testid="ch-mealType"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CCol className="col-md-3 offset-md-3">
            <CButton
              color="success"
              className="btn-ovh me-1"
              size="sm"
              disabled={!isAddCategoryButtonEnabled}
              onClick={handleAddNewCategory}
            >
              Add
            </CButton>
            <CButton
              color="warning "
              className="btn-ovh"
              onClick={handleClearInputs}
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
