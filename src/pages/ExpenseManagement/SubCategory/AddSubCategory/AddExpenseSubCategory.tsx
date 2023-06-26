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
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddExpenseSubCategory = (): JSX.Element => {
  const [expenseCategoryName, SetExpenseCategoryName] = useState('')
  const [expenseSubCategoryName, setExpenseSubCategoryName] = useState('')
  const [isSubCategoryNameExist, setIsSubCategoryNameExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const formLabelProps = {
    htmlFor: 'inputNewExpenseCategory',
    className: 'col-form-label category-label',
  }

  const expenseCategoryNames = useTypedSelector(
    reduxServices.subCategoryList.selectors.categories,
  )

  const expenseSubCategoryNames = useTypedSelector(
    reduxServices.subCategoryList.selectors.subCategories,
  )

  const subCategoryNameExists = (name: string) => {
    return expenseSubCategoryNames?.find((subCategoryName) => {
      return (
        subCategoryName.subCategoryName.toLowerCase() === name.toLowerCase()
      )
    })
  }

  useEffect(() => {
    if (expenseCategoryName && expenseSubCategoryName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [expenseCategoryName, expenseSubCategoryName])

  const successToast = (
    <OToast
      toastMessage="Sub Category Added Successfully"
      toastColor="success"
    />
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )

  const addSubCategoryNameButtonHandler = async () => {
    const addExpenseSubCategoryobject = {
      categoryId: Number(expenseCategoryName),
      subCategoryName: expenseSubCategoryName,
    }
    const isAddExpenseSubCategory = await dispatch(
      reduxServices.subCategoryList.addSubCategoryList(
        addExpenseSubCategoryobject,
      ),
    )
    if (
      reduxServices.subCategoryList.addSubCategoryList.fulfilled.match(
        isAddExpenseSubCategory,
      )
    ) {
      dispatch(reduxServices.subCategoryList.getSubCategoryList())
      SetExpenseCategoryName('')
      setExpenseSubCategoryName('')
      dispatch(reduxServices.app.actions.addToast(successToast))
    }
  }

  //Input and Enter button handler
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
      setExpenseSubCategoryName(subCategoryName)
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
      const expenseSubCategoryObject = {
        categoryId: Number(expenseCategoryName),
        subCategoryName: expenseSubCategoryName,
      }
      const isExpenseSubCategory = await dispatch(
        reduxServices.subCategoryList.addSubCategoryList(
          expenseSubCategoryObject,
        ),
      )
      if (
        reduxServices.subCategoryList.addSubCategoryList.fulfilled.match(
          isExpenseSubCategory,
        )
      ) {
        setExpenseSubCategoryName('')
        dispatch(reduxServices.subCategoryList.getSubCategoryList())
        dispatch(reduxServices.app.actions.addToast(successToast))
      }
    }
  }

  //Clear Button Handler
  const clearInputs = () => {
    SetExpenseCategoryName('')
    setExpenseSubCategoryName('')
    setIsSubCategoryNameExist('')
  }

  return (
    <>
      <CRow className="mt-2 mb-2">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="categoryLabel"
        >
          Category:
          <span className={expenseCategoryName ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="categoryName"
            id="categoryName"
            size="sm"
            aria-label="Category"
            name="categoryName"
            onChange={(e) => {
              SetExpenseCategoryName(e.target.value)
            }}
            value={expenseCategoryName}
          >
            <option value={''}>Select Category</option>
            {expenseCategoryNames
              .slice()
<<<<<<<< HEAD:src/pages/ExpenseManagement/SubCategory/AddSubCategory/AddExpenseSubCategory.tsx
              .sort((subCategory1, subCategory2) =>
                subCategory1.categoryName.localeCompare(
                  subCategory2.categoryName,
========
              .sort((categories1, categories2) =>
                categories1.categoryName.localeCompare(
                  categories2.categoryName,
>>>>>>>> develop:src/pages/ExpenseManagement/Sub-Category/AddNewSubCategory/AddExpenseSubCategory.tsx
                ),
              )
              ?.map((categoryNames, index) => (
                <option key={index} value={categoryNames.id}>
                  {categoryNames.categoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Sub-Category:
          <span className={expenseSubCategoryName ? TextWhite : TextDanger}>
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
            value={expenseSubCategoryName}
            onChange={handleCategoryInput}
            onKeyDown={handleEnterKeyword}
            maxLength={50}
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
