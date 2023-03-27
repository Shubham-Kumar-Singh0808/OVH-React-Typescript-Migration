import { CRow, CFormLabel, CCol, CFormSelect, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationSubCategories,
} from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const TicketConfigurationOptions = ({
  setFilterByDepartment,
  setFilterByCategory,
  setFilterBySubCategory,
  setIsTableView,
}: {
  setFilterByDepartment: (value: number | string) => void
  setFilterByCategory: (value: number | string) => void
  setFilterBySubCategory: (value: number | string) => void
  setIsTableView: (value: boolean) => void
}): JSX.Element => {
  const [selectedDepartment, setSelectedDepartment] = useState<
    number | string
  >()
  const [selectedCategory, setSelectedCategory] = useState<number | string>()
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    number | string
  >()
  const [showExportButton, setShowExportButton] = useState<boolean>(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const departments: TicketConfigurationDepartments[] = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.departments,
  )
  const categories: TicketConfigurationCategories[] = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.categories,
  )
  const subCategories: TicketConfigurationSubCategories[] = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.subCategories,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddSubCategory = userAccessToFeatures?.find(
    (feature) => feature.name === 'Ticket Configuration',
  )

  const subCategoryList = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.subCategoryList,
  )

  const onViewHandler = () => {
    setFilterByDepartment(selectedDepartment as number)
    setFilterByCategory(selectedCategory as number)
    setFilterBySubCategory(selectedSubCategory as number)
    setShowExportButton(true)
    setIsTableView(true)
  }

  useEffect(() => {
    if (selectedDepartment) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [selectedDepartment])

  const handleClearButton = () => {
    setSelectedDepartment('')
    setSelectedCategory('')
    setSelectedSubCategory('')
    setFilterByDepartment('')
    setFilterByCategory('')
    setFilterBySubCategory('')
    setShowExportButton(false)
    setIsTableView(false)
    if (subCategoryList) {
      dispatch(reduxServices.ticketConfiguration.actions.clearSubCategoryList())
    }
  }

  useEffect(() => {
    if (!departments)
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationDepartments(),
      )
    if (selectedDepartment) {
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationCategories(
          selectedDepartment as number,
        ),
      )
    }
    if (selectedCategory) {
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationSubCategories(
          selectedCategory as number,
        ),
      )
    }
  }, [dispatch, selectedDepartment, selectedCategory, departments])

  const addSubCategoryButtonHandler = () => {
    dispatch(
      reduxServices.ticketConfiguration.actions.setToggle('addSubCategory'),
    )
  }

  return (
    <>
      <CRow className="mt-3">
        <CCol sm={3}>
          <CFormLabel className="col-sm-12 col-form-label text-start">
            Department Name:
          </CFormLabel>
          <CRow>
            <CCol>
              <CFormSelect
                aria-label="departmentName"
                name="departmentName"
                id="departmentName"
                data-testid="dept-name"
                onChange={(e) => {
                  setSelectedDepartment(e.target.value)
                  setSelectedCategory('')
                  setSelectedSubCategory('')
                }}
                value={selectedDepartment}
              >
                <option value="">Select Department</option>
                {departments &&
                  departments
                    ?.slice()
                    .sort((dept1, dept2) =>
                      dept1.name?.localeCompare(dept2.name),
                    )
                    ?.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol sm={3}>
          <CFormLabel className="col-sm-12 col-form-label text-start">
            Category Name:
          </CFormLabel>
          <CRow>
            <CCol>
              <CFormSelect
                aria-label="categoryName"
                name="categoryName"
                id="categoryName"
                data-testid="category-name"
                // defaultValue={selectedCategory}
                disabled={!selectedDepartment}
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="">Select Category</option>
                {categories &&
                  categories
                    ?.slice()
                    .sort((cat1, cat2) =>
                      cat1.categoryName?.localeCompare(cat2.categoryName),
                    )
                    ?.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol sm={3}>
          <CFormLabel className="col-sm-12 col-form-label text-start">
            Sub-Category Name:
          </CFormLabel>
          <CRow>
            <CCol>
              <CFormSelect
                aria-label="subCategoryName"
                name="subCategoryName"
                id="subCategoryName"
                data-testid="sub-category-name"
                // defaultValue={selectedSubCategory}
                disabled={!selectedCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                value={selectedSubCategory}
              >
                <option value="">Select Sub-Category</option>
                {subCategories &&
                  subCategories
                    ?.slice()
                    .sort((subCat1, subCat2) =>
                      subCat1.subCategoryName?.localeCompare(
                        subCat2.subCategoryName,
                      ),
                    )
                    ?.map((subCategory) => (
                      <option
                        key={subCategory.subCategoryId}
                        value={subCategory.subCategoryId}
                      >
                        {subCategory.subCategoryName}
                      </option>
                    ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol sm={2}>
          {showExportButton && (
            <CRow>
              <CCol className="text-end mt-4">
                <CButton
                  color="info"
                  className="btn-ovh me-1 mt-2"
                  size="sm"
                  data-testid="export-button"
                >
                  <i className="fa fa-plus me-1"></i>
                  Click to Export
                </CButton>
              </CCol>
            </CRow>
          )}
        </CCol>
        <CCol sm={1}>
          <CRow>
            <CCol className="text-end mt-4">
              {userAccessToAddSubCategory?.createaccess && (
                <CButton
                  color="info"
                  className="btn-ovh me-1 mt-2"
                  data-testid="addSubCategory-btn"
                  disabled={!isButtonEnabled}
                  onClick={addSubCategoryButtonHandler}
                >
                  <i className="fa fa-plus  me-1"></i>Add
                </CButton>
              )}
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="text-center mt-1">
        <CCol sm={3}></CCol>
        <CCol sm={3} className="text-start">
          <CButton
            color="success"
            onClick={onViewHandler}
            className="btn-ovh me-1 mt-2"
            data-testid="view-button"
            disabled={!isButtonEnabled}
          >
            View
          </CButton>
          <CButton
            onClick={handleClearButton}
            color="warning"
            className="btn-ovh me-1 mt-2"
            data-testid="clear-button"
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default TicketConfigurationOptions
