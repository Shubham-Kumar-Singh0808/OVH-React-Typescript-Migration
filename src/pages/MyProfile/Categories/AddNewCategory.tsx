import { CButton, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'

const AddNewCategory = (): JSX.Element => {
  const categories = useTypedSelector(
    reduxServices.category.selectors.categories,
  )
  const dispatch = useAppDispatch()

  const [newCategoryName, setNewCategoryName] = useState('')
  const [isAddCategoryBtnEnabled, setIsAddCategoryBtnEnabled] = useState(false)

  const toastElement = (
    <OToast toastMessage="Category already exists!" toastColor="danger" />
  )
  const SuccessToastMessage = (
    <OToast toastMessage="Category Added Successfully" toastColor="success" />
  )

  useEffect(() => {
    if (newCategoryName) {
      setIsAddCategoryBtnEnabled(true)
    } else {
      setIsAddCategoryBtnEnabled(false)
    }
  }, [newCategoryName])

  const handleEnterKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isAddCategoryBtnEnabled && event.key === 'Enter') {
      const toAddCategoryName = newCategoryName

      if (
        categories.length > 0 &&
        categories.filter(
          (category) =>
            category.categoryType.toLowerCase() ===
            newCategoryName.toLowerCase(),
        ).length > 0
      ) {
        dispatch(reduxServices.app.actions.addToast(toastElement))
        setNewCategoryName('')
        return
      }

      setNewCategoryName('')

      dispatch(reduxServices.category.createCategory(toAddCategoryName))
      dispatch(reduxServices.category.getAllCategories())
      dispatch(reduxServices.app.actions.addToast(SuccessToastMessage))
    }
  }

  const handleAddCategory = () => {
    const toAddCategoryName = newCategoryName

    if (
      categories.length > 0 &&
      categories.filter(
        (category) =>
          category.categoryType.toLowerCase() === newCategoryName.toLowerCase(),
      ).length > 0
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      setNewCategoryName('')
      return
    }

    setNewCategoryName('')

    dispatch(reduxServices.category.createCategory(toAddCategoryName))
    dispatch(reduxServices.app.actions.addToast(SuccessToastMessage))
  }

  const formLabelProps = {
    htmlFor: 'inputNewCategory',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <CRow className="mb-35">
        <CCol sm={4} className="new-category-col">
          <CFormLabel {...formLabelProps}>Category:</CFormLabel>
        </CCol>
        <CCol sm={4} className="new-category-col">
          <CFormInput
            type="text"
            id="inputNewCategory"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={handleEnterKeyword}
            placeholder={'Category Name'}
          />
        </CCol>
        <CCol sm={4} className="d-flex align-items-center new-category-col">
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            disabled={!isAddCategoryBtnEnabled}
            onClick={handleAddCategory}
          >
            <i className="fa fa-plus me-1"></i>
            Add Category
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default AddNewCategory
