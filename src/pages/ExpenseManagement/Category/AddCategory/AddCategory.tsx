import { CRow, CCol, CButton, CFormInput, CFormLabel } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { showIsRequired } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const AddExpenseCategory = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const formLabelProps = {
    htmlFor: 'inputNewExpenseCategory',
    className: 'col-form-label category-label',
  }
  const [categoryName, setCategoryName] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const categoryNames = useTypedSelector(
    reduxServices.addNewCategory.selectors.expenseCategory,
  )

  useEffect(() => {
    dispatch(reduxServices.addNewCategory.checkDuplicateCategory(categoryName))
  }, [dispatch])

  const clearInputs = () => {
    setCategoryName('')
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
            data-testid="vendorName"
            type="text"
            id="name"
            size="sm"
            name="vendorName"
            autoComplete="off"
            placeholder="Category"
            value={categoryName}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            data-testid="save-btn"
            className="btn-ovh me-1 text-white"
            color="success"
            disabled={!isAddButtonEnabled}
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
