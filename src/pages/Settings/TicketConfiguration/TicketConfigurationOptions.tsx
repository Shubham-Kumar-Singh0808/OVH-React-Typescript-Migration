import { CRow, CFormLabel, CCol, CFormSelect, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import {
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationSubCategories,
  TicketConfigurationSubCategoryType,
} from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const TicketConfigurationOptions = (): JSX.Element => {
  const [selectedDepartment, setSelectedDepartment] = useState<number>()
  const [selectedCategory, setSelectedCategory] = useState<number>()
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  let departmentDefault = selectedDepartment
  let categoryDefault = selectedCategory
  let subCategoryDefault = selectedSubCategory

  const onDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== undefined) {
      setSelectedDepartment(event.target.value as unknown as number)
      departmentDefault = event.target.value as unknown as number
    }
  }

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== undefined) {
      setSelectedCategory(event.target.value as unknown as number)
      categoryDefault = event.target.value as unknown as number
    }
  }

  const onSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== undefined) {
      setSelectedSubCategory(event.target.value as unknown as number)
      subCategoryDefault = event.target.value as unknown as number
    }
  }

  const onViewHandler = async () => {
    if (selectedDepartment) {
      const prepareObject: TicketConfigurationSubCategoryType = {
        departmentId: selectedDepartment,
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
        endIndex: 20,
        startIndex: 0,
      }

      await dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationSubCategoryList(
          prepareObject,
        ),
      )
    }
  }

  const handleClearButton = () => {
    setSelectedDepartment(0)
    setSelectedCategory(0)
    setSelectedSubCategory(0)
  }

  useEffect(() => {
    if (!departments)
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationDepartments(),
      )
  }, [dispatch])

  useEffect(() => {
    if (selectedDepartment) {
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationCategories(
          selectedDepartment,
        ),
      )
    }

    setSelectedCategory(undefined)
    setSelectedSubCategory(undefined)
  }, [selectedDepartment])

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationSubCategories(
          selectedCategory,
        ),
      )
    }
  }, [selectedCategory])

  return (
    <>
      {isLoading && <OLoadingSpinner type={LoadingType.COMPONENT} />}
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
                onChange={onDepartmentChange}
                value={departmentDefault}
              >
                <option value="0">Select Department</option>
                {departments &&
                  departments.map((department) => (
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
                defaultValue={selectedCategory}
                disabled={!selectedDepartment}
                onChange={onCategoryChange}
                value={categoryDefault}
              >
                <option value="0" hidden>
                  Select Category
                </option>
                {categories &&
                  categories.map((category) => (
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
                defaultValue={selectedSubCategory}
                disabled={!selectedCategory}
                onChange={onSubCategoryChange}
                value={subCategoryDefault}
              >
                <option value="0" hidden>
                  Select Sub-Category
                </option>
                {subCategories &&
                  subCategories.map((subCategory) => (
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
        <CCol sm={3}>
          <CRow>
            <CCol className="text-end mt-4">
              <CButton color="info" className="btn-ovh me-1 mt-2">
                <i className="fa fa-plus  me-1"></i>Add
              </CButton>
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
          >
            View
          </CButton>
          <CButton
            onClick={handleClearButton}
            color="warning"
            className="btn-ovh me-1 mt-2"
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default TicketConfigurationOptions
