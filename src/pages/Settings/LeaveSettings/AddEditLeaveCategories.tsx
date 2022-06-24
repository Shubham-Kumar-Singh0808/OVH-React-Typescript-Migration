import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import {
  EmployeeAddLeaveCategories,
  EmployeeLeaveCategoryProps,
} from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

const AddEditLeaveCategories = ({
  confirmButtonText,
  backButtonHandler,
}: EmployeeLeaveCategoryProps): JSX.Element => {
  const initialEmployeeAddLeaveCategories = {} as EmployeeAddLeaveCategories

  const [employeeLeaveCategory, setEmployeeLeaveCategory] = useState(
    initialEmployeeAddLeaveCategories,
  )

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'name') {
      const name = value.replace(/^\s*/, '')
      setEmployeeLeaveCategory((prevState) => {
        return { ...prevState, ...{ [name]: name } }
      })
    } else {
      setEmployeeLeaveCategory((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Leave Category"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Name Of Leave Category
              <span
                className={
                  employeeLeaveCategory?.name ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="name"
                name="name"
                placeholder="Leave Name"
                value={employeeLeaveCategory?.name}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel className="col-sm-3 col-form-label text-end col-form-label category-label">
              Category:{' '}
              <span
                className={
                  employeeLeaveCategory.leaveType ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                data-testid="form-select"
                aria-label="Default select example"
                size="sm"
                id="leaveType"
                name="leaveType"
                value={employeeLeaveCategory.leaveType}
                onChange={handleInputChange}
              >
                <option value={''}>select Leave Type</option>
                <option value="EARNED">EARNED</option>
                <option value="LOP">LOP</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CCol className="col-md-3 offset-md-3">
              <CButton
                color="success"
                className="btn-ovh me-1"
                size="sm"
                // disabled={!isAddQualificationCategoryBtnEnabled}
                // onClick={handleAddQualificationCategory}
              >
                {confirmButtonText}
              </CButton>
              <CButton
                color="warning "
                className="btn-ovh"
                onClick={() => {
                  setEmployeeLeaveCategory({
                    name: '',
                    leaveType: '',
                  })
                }}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default AddEditLeaveCategories
