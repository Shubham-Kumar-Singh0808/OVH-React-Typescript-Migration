import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormSelect,
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'

const AddNewSubCategory = (): JSX.Element => {
  const [selectDepartment, setSelectDepartment] = useState<number | string>()
  const [selectCategory, setSelectCategory] = useState<number | string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  //   const isLoading = useTypedSelector(
  //     reduxServices.ticketConfiguration.selectors.isLoading,
  //   )

  const backButtonHandler = () => {
    dispatch(reduxServices.ticketConfiguration.actions.setToggle(''))
  }

  const getDepartments = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.departments,
  )
  const getCategories = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.categories,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Sub-Category"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-btn"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Department Name :<span>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="deptName"
                name="deptName"
                id="deptName"
                data-testid="department-name"
                onChange={(e) => {
                  setSelectDepartment(e.target.value)
                  setSelectCategory('')
                }}
                value={selectDepartment}
              >
                <option value="">Select Department</option>
                {getDepartments &&
                  getDepartments?.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Category Name :<span>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="category"
                name="category"
                id="category"
                data-testid="category"
                defaultValue={selectCategory}
                disabled={!selectDepartment}
                onChange={(e) => setSelectCategory(e.target.value)}
                value={selectCategory}
              >
                <option value="">Select Category</option>
                {getCategories &&
                  getCategories?.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol className="col-sm-3">
              <CButton
                color="info"
                className="btn-ovh"
                data-testid="addCategory-btn"
                disabled
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Sub-Category Name:
              <span>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="subCategory"
                size="sm"
                type="text"
                name="subCategory"
                placeholder="Enter Sub-Category Name"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Estimated Time :
            </CFormLabel>
            <CCol sm={1}>
              <CFormInput
                id="estimatedTimeHours"
                size="sm"
                type="text"
                name="estimatedTimeHours"
                data-testid="tc-estimatedTimeHours"
                placeholder="Hours"
                maxLength={2}
              />
            </CCol>
            <CCol sm={1}>
              <CFormInput
                id="estimatedTimeMins"
                size="sm"
                type="text"
                name="estimatedTimeMins"
                data-testid="tc-estimatedTimeMins"
                placeholder="Min"
                maxLength={2}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Work Flow :
            </CFormLabel>
            <CCol sm={1} className="mt-2">
              <CFormCheck checked={!isChecked} />
            </CCol>
            <CFormLabel className="col-sm-1 col-form-label text-end">
              Level:
            </CFormLabel>
            <CCol sm={1}>
              <CFormInput
                id="level"
                size="sm"
                type="text"
                name="level"
                data-testid="tc-level"
                defaultValue={1}
                maxLength={2}
              />
            </CCol>
          </CRow>
          <CRow className="mt-2 mb-2">
            <CCol className="col-md-3 offset-md-3">
              <CButton color="success" className="btn-ovh me-1" size="sm">
                Add
              </CButton>
              <CButton color="warning " className="btn-ovh">
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default AddNewSubCategory
