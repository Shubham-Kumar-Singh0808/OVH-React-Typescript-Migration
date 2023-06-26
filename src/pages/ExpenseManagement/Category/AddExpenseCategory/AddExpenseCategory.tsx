import { CRow, CCol, CButton, CFormInput, CFormLabel } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { showIsRequired } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger } from '../../../../constant/ClassName'

const AddExpenseCategory = (): JSX.Element => {
  const [categoryName, setCategoryName] = useState('')
  const [isCategoryNameExist, setIsCategoryNameExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const formLabelProps = {
    htmlFor: 'inputNewExpenseCategory',
    className: 'col-form-label category-label',
  }

  const existCategoryNames = useTypedSelector(
    reduxServices.categoryList.selectors.categories,
  )

  const categoryNameExists = (name: string) => {
    return existCategoryNames?.find((categoriesList) => {
      return categoriesList.categoryName.toLowerCase() === name.toLowerCase()
    })
  }

  const handleCategoryInput = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'categoryName') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setCategoryName(newValue)
    }
    if (categoryNameExists(value.trim())) {
      setIsCategoryNameExist(value.trim())
    } else {
      setIsCategoryNameExist('')
    }
  }

  const handleEnterKeyword = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (isAddButtonEnabled && event.key === 'Enter' && !isCategoryNameExist) {
      const isAddExpenseCategory = await dispatch(
        reduxServices.addNewCategory.addNewExpenseCategory(categoryName),
      )
      if (
        reduxServices.addNewCategory.addNewExpenseCategory.fulfilled.match(
          isAddExpenseCategory,
        )
      ) {
        dispatch(reduxServices.categoryList.getCategoryList())
        setCategoryName('')
        dispatch(reduxServices.app.actions.addToast(successToast))
        dispatch(reduxServices.app.actions.addToast(undefined))
      }
    }
  }

  const successToast = (
    <OToast toastMessage="Category Added Successfully" toastColor="success" />
  )

  useEffect(() => {
    if (categoryName !== isCategoryNameExist) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [categoryName])

  const addCategoryNameButtonHandler = async () => {
    const isAddExpenseCategory = await dispatch(
      reduxServices.addNewCategory.addNewExpenseCategory(categoryName),
    )
    if (
      reduxServices.addNewCategory.addNewExpenseCategory.fulfilled.match(
        isAddExpenseCategory,
      )
    ) {
      dispatch(reduxServices.categoryList.getCategoryList())
      setCategoryName('')
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  const clearInputs = () => {
    setCategoryName('')
    setIsCategoryNameExist('')
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
          data-testid="categoryLabel"
        >
          Category:
          <span className={showIsRequired(categoryName)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="categoryName"
            type="text"
            id="categoryName"
            size="sm"
            name="categoryName"
            autoComplete="off"
            placeholder="Category Name"
            value={categoryName}
            onChange={handleCategoryInput}
            onKeyDown={handleEnterKeyword}
          />
          {isCategoryNameExist && (
            <span className={TextDanger} data-testid="nameAlreadyExist">
              <p>Category already exist</p>
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
              disabled={!isAddButtonEnabled}
              onClick={addCategoryNameButtonHandler}
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

export default AddExpenseCategory
