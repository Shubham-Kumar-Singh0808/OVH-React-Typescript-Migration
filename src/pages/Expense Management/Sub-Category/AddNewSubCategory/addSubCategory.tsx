import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { showIsRequired } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { SubCategoryList } from '../../../../types/ExpenseManagement/Sub-Category/subCategoryListTypes'
import { TextDanger } from '../../../../constant/ClassName'
import SubCategoryList from '../SubCategoryList'
import SubCategoryList from '../SubCategoryList'

const AddExpenseSubCategory = (): JSX.Element => {
  const initialSubCategoryDetails = SubCategoryList[]
  const [addExpenseSubCategory, setAddExpenseSubCategory] = useState({
    ...initialSubCategoryDetails,
  })
  const [subCategoryName, setSubCategoryName] = useState('')
  const [isSubCategoryNameExist, setIsSubCategoryNameExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const formLabelProps = {
    htmlFor: 'input New Expense Sub Category',
    className: 'col-form-label category-label',
  }

  const expenseCategory = useTypedSelector(
    reduxServices.subCategory.selectors.categories,
  )

  const expenseSubCategory = useTypedSelector(
    reduxServices.subCategory.selectors.subCategories,
  )

  const subCategoryNameExists = (name: string) => {
    return expenseSubCategory?.find((subCategoryName) => {
      return (
        subCategoryName.subCategoryName.toLowerCase() === name.toLowerCase()
      )
    })
  }

  const subCategoryNameRegexReplace = /-_[^a-z0-9\s]/gi

  const handleCategoryInput = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'categoryName') {
      const subCategoryName = value
        .replace(subCategoryNameRegexReplace, '')
        .replace(/^\s*/, '')
      setAddExpenseSubCategory((values) => {
        return { ...values, ...{ [name]: subCategoryName } }
      })
    }
    if (subCategoryNameExists(value.trim())) {
      setIsSubCategoryNameExist(value.trim())
    } else {
      setIsSubCategoryNameExist('')
    }
  }

  const handleEnterKeyword = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      isAddButtonEnabled &&
      event.key === 'Enter' &&
      !isSubCategoryNameExist
    ) {
      const isAddExpenseSubCategory = await dispatch(
        reduxServices.subCategory.addSubCategoryList(addExpenseSubCategory),
      )
      if (
        reduxServices.subCategory.addSubCategoryList.fulfilled.match(
          isAddExpenseSubCategory,
        )
      ) {
        dispatch(reduxServices.subCategory.existSubCategoryList())
        dispatch(reduxServices.subCategory.getSubCategoryList())
        setSubCategoryName('')
        dispatch(reduxServices.app.actions.addToast(successToast))
      }
    }
  }

  const successToast = (
    <OToast
      toastMessage="Sub Category Added Successfully"
      toastColor="success"
    />
  )

  useEffect(() => {
    if (
      addExpenseSubCategory.id &&
      addExpenseSubCategory.categoryId &&
      addExpenseSubCategory.categoryName &&
      addExpenseSubCategory.subCategoryName &&
      addExpenseSubCategory.createdBy &&
      addExpenseSubCategory.updatedBy &&
      addExpenseSubCategory.createdDate &&
      addExpenseSubCategory.updatedDate
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [subCategoryName])

  const addSubCategoryNameButtonHandler = async () => {
    const expenseSubCategory = {
      ...addExpenseSubCategory,
    }
    const isAddExpenseSubCategory = await dispatch(
      reduxServices.subCategory.addSubCategoryList(expenseSubCategory),
    )
    if (
      reduxServices.subCategory.addSubCategoryList.fulfilled.match(
        isAddExpenseSubCategory,
      )
    ) {
      dispatch(reduxServices.subCategory.existSubCategoryList())
      dispatch(reduxServices.subCategory.getSubCategoryList())
      setSubCategoryName('')
      dispatch(reduxServices.app.actions.addToast(successToast))
    }
  }
  const clearInputs = () => {
    setAddExpenseSubCategory({
      id: 0,
      categoryId: 0,
      categoryName: '',
      subCategoryName: '',
      createdBy: '',
      updatedBy: '',
      createdDate: '',
      updatedDate: '',
    })
    setIsSubCategoryNameExist('')
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Category:
          <span className={showIsRequired(addExpenseSubCategory.categoryName)}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="categoryId"
            id="category"
            size="sm"
            aria-label="Category"
            name="departmentId"
            onChange={handleCategoryInput}
            value={addExpenseSubCategory.categoryName}
          >
            <option value={''}>Select Category</option>
            {expenseCategory &&
              expenseCategory?.length > 0 &&
              expenseCategory?.map((categoryNames, index) => (
                <option key={index} value={categoryNames.id}>
                  {categoryNames.categoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Sub-Category:
          <span
            className={showIsRequired(addExpenseSubCategory.subCategoryName)}
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="subCategoryName"
            type="text"
            id="name"
            size="sm"
            name="subCategoryName"
            autoComplete="off"
            placeholder="Category Name"
            value={addExpenseSubCategory.subCategoryName}
            onChange={handleCategoryInput}
            onKeyDown={handleEnterKeyword}
          />
          {/* {isSubCategoryNameExist && (
            <span className={TextDanger} data-testid="nameAlreadyExist">
              <b>Category already exist</b>
            </span>
          )} */}
        </CCol>
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          {userAccess?.createaccess && (
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={
                isAddButtonEnabled
                  ? isAddButtonEnabled && isSubCategoryNameExist.length > 0
                  : !isAddButtonEnabled
              }
              onClick={addSubCategoryNameButtonHandler}
            >
              Add
            </CButton>
          )}
          <CButton
            data-testid="clear-btn"
            color="warning"
            className="btn-ovh text-white"
            onClick={clearInputs}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default AddExpenseSubCategory
