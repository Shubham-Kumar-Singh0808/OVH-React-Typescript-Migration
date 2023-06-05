import React, { useEffect, useState } from 'react'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { showIsRequired } from '../../../../utils/helper'
import {
  AddSubCategoryList,
  SubCategoryList,
} from '../../../../types/ExpenseManagement/Sub-Category/subCategoryListTypes'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddExpenseSubCategory = (): JSX.Element => {
  const initialSubCategoryDetails = {} as AddSubCategoryList
  const [addExpenseSubCategory, setAddExpenseSubCategory] = useState({
    ...initialSubCategoryDetails,
  })
  const [subCategoryName, setSubCategoryName] = useState('')
  const [isSubCategoryNameExist, setIsSubCategoryNameExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const formLabelProps = {
    htmlFor: 'inputNewExpenseCategory',
    className: 'col-form-label category-label',
  }

  const expenseCategoryNames = useTypedSelector(
    reduxServices.subCategory.selectors.categories,
  )

  const expenseSubCategoryNames = useTypedSelector(
    reduxServices.subCategory.selectors.subCategories,
  )

  const subCategoryNameExists = (name: string) => {
    return expenseSubCategoryNames?.find((subCategoryName) => {
      return (
        subCategoryName.subCategoryName.toLowerCase() === name.toLowerCase()
      )
    })
  }

  useEffect(() => {
    if (addExpenseSubCategory.id && addExpenseSubCategory.subCategoryName) {
      setIsAddButtonEnabled(false)
    } else {
      setIsAddButtonEnabled(true)
    }
  }, [addExpenseSubCategory, subCategoryName])

  const subCategoryNameRegexReplace = /-_[^a-z0-9\s]/gi

  const handleCategoryInput = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'subCategoryName') {
      const subCategoryName = value
        .replace(subCategoryNameRegexReplace, '')
        .replace(/^\s*/, '')
      setSubCategoryName(subCategoryName)
    } else {
      setAddExpenseSubCategory((values) => {
        const trimFieldValue = value.trimStart()
        return { ...values, ...{ [name]: trimFieldValue } }
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
      const expenseSubCategoryResult = {
        ...addExpenseSubCategory,
      }
      const isAddExpenseSubCategory = await dispatch(
        reduxServices.subCategory.addSubCategoryList({
          id: expenseSubCategoryResult.id,
          subCategoryName: expenseSubCategoryResult.subCategoryName,
        }),
      )
      if (
        reduxServices.subCategory.addSubCategoryList.fulfilled.match(
          isAddExpenseSubCategory,
        )
      ) {
        //dispatch(reduxServices.subCategory.existSubCategoryList())
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

  const clearInputs = () => {
    setAddExpenseSubCategory({
      id: 0,
      subCategoryName: '',
    })
    setSubCategoryName('')
    setIsSubCategoryNameExist('')
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )

  const addSubCategoryNameButtonHandler = async () => {
    const expenseSubCategoryResult = {
      ...addExpenseSubCategory,
    }
    const isAddExpenseSubCategory = await dispatch(
      reduxServices.subCategory.addSubCategoryList({
        id: expenseSubCategoryResult.id,
        subCategoryName: expenseSubCategoryResult.subCategoryName,
      }),
    )
    if (
      reduxServices.subCategory.addSubCategoryList.fulfilled.match(
        isAddExpenseSubCategory,
      )
    ) {
      dispatch(reduxServices.subCategory.getSubCategoryList())
      setSubCategoryName('')
      dispatch(reduxServices.app.actions.addToast(successToast))
    }
  }

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Category:
          <span
            className={addExpenseSubCategory?.id !== 0 ? TextWhite : TextDanger}
          >
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
            name="id"
            onChange={handleCategoryInput}
            value={addExpenseSubCategory.id}
          >
            <option value={''}>Select Category</option>
            {expenseCategoryNames &&
              expenseCategoryNames?.length > 0 &&
              expenseCategoryNames?.map((categoryNames, index) => (
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
            placeholder="Sub Category Name"
            value={addExpenseSubCategory.subCategoryName}
            onChange={handleCategoryInput}
            onKeyDown={handleEnterKeyword}
          />
          {isSubCategoryNameExist && (
            <span className={TextDanger} data-testid="nameAlreadyExist">
              <b>Sub Category already exist</b>
            </span>
          )}
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
