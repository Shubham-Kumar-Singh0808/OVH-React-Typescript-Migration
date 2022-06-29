import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../stateStore'
import OCard from '../../../components/ReusableComponent/OCard'
import OToast from '../../../components/ReusableComponent/OToast'
import {
  EmployeeAddUpdateLeaveCategory,
  EmployeeLeaveCategoryProps as AddEditLeaveCategoryProps,
} from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'
import { reduxServices } from '../../../reducers/reduxServices'

const AddEditLeaveCategories = ({
  confirmButtonText,
  backButtonHandler,
}: AddEditLeaveCategoryProps): JSX.Element => {
  const initialEmployeeAddLeaveCategories = {} as EmployeeAddUpdateLeaveCategory

  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [employeeLeaveCategories, setEmployeeLeaveCategories] = useState(
    initialEmployeeAddLeaveCategories,
  )

  const dispatch = useAppDispatch()

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'name') {
      const nameValue = value.replace(/[^a-zA-Z\s]$/gi, '')
      setEmployeeLeaveCategories((prevState) => {
        return { ...prevState, ...{ [name]: nameValue } }
      })
    } else {
      setEmployeeLeaveCategories((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  const handleAddLeaveCategory = async () => {
    const addLeaveCategoryResultAction = await dispatch(
      reduxServices.employeeLeaveSettings.addEmployeeLeaveCategory(
        employeeLeaveCategories,
      ),
    )
    if (
      reduxServices.employeeLeaveSettings.addEmployeeLeaveCategory.fulfilled.match(
        addLeaveCategoryResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="leave category added successfully"
          />,
        ),
      )
    } else if (
      reduxServices.employeeLeaveSettings.addEmployeeLeaveCategory.rejected.match(
        addLeaveCategoryResultAction,
      ) &&
      addLeaveCategoryResultAction.payload === 500
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="Given leave category is already added."
          />,
        ),
      )
    }
  }

  useEffect(() => {
    if (
      employeeLeaveCategories?.name?.replace(/^\s*/, '') &&
      employeeLeaveCategories.leaveType
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [employeeLeaveCategories?.name, employeeLeaveCategories.leaveType])

  const formLabelProps = {
    htmlFor: 'inputNewLeaveCategory',
    className: 'col-form-label category-label',
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
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Name Of Leave Category
              <span
                className={
                  employeeLeaveCategories?.name?.replace(/^\s*/, '')
                    ? 'text-white'
                    : 'text-danger'
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
                value={employeeLeaveCategories?.name}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end col-form-label category-label"
            >
              Category:{' '}
              <span
                className={
                  employeeLeaveCategories.leaveType
                    ? 'text-white'
                    : 'text-danger'
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
                value={employeeLeaveCategories.leaveType}
                onChange={handleInputChange}
              >
                <option value={''}>Select Leave Type</option>
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
                disabled={!isAddButtonEnabled}
                onClick={handleAddLeaveCategory}
              >
                {confirmButtonText}
              </CButton>
              <CButton
                color="warning "
                className="btn-ovh"
                onClick={() => {
                  setEmployeeLeaveCategories({
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
