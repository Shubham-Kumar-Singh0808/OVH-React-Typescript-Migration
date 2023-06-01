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

  const categoryNames = useTypedSelector(
    reduxServices.categoryList.selectors.categories,
  )

  const categoryNameExists = (name: string) => {
    return categoryNames?.find((categoryName) => {
      return categoryName.categoryName.toLowerCase() === name.toLowerCase()
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
        dispatch(
          reduxServices.addNewCategory.checkDuplicateCategory(categoryName),
        )
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
    if (categoryName) {
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
      dispatch(
        reduxServices.addNewCategory.checkDuplicateCategory(categoryName),
      )
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

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Category:
          <span className={showIsRequired(categoryName)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="categoryName"
            type="text"
            id="name"
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
              <b>Category already exist</b>
            </span>
          )}
        </CCol>
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            data-testid="save-btn"
            className="btn-ovh me-1 text-white"
            color="success"
            disabled={
              isAddButtonEnabled
                ? isAddButtonEnabled && isCategoryNameExist.length > 0
                : !isAddButtonEnabled
            }
            onClick={addCategoryNameButtonHandler}
          >
            Add
          </CButton>
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
