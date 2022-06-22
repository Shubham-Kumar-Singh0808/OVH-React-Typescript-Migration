import React, { useState } from 'react'
import {
  CCardBody,
  CCardHeader,
  CRow,
  CFormLabel,
  CFormSelect,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
import { EmployeeSaveLeaveCalenderTypes } from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'

const EmployeeLeaveCalender = (): JSX.Element => {
  const initialEmployeeLeaveSettings = {} as EmployeeSaveLeaveCalenderTypes
  const [employeeLeaveCalender, setEmployeeLeaveCalender] = useState(
    initialEmployeeLeaveSettings,
  )
  const dispatch = useAppDispatch()

  const onChangeLeavecalenderHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEmployeeLeaveCalender((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  const handleSaveLeaveCalender = async () => {
    const prepareObject = {
      ...employeeLeaveCalender,
    }

    const addFamilyMemberResultAction = await dispatch(
      reduxServices.employeeLeaveSettings.employeeLeaveCalenderSettings(
        prepareObject,
      ),
    )
    if (
      reduxServices.employeeLeaveSettings.employeeLeaveCalenderSettings.fulfilled.match(
        addFamilyMemberResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Family Detail deleted successfully"
          />,
        ),
      )
    }
  }
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Leave Settings</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="mt-4 mb-4">
          <h4>Leave Calendar Settings</h4>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Leave Cycle Month:
          </CFormLabel>
          <CCol sm={2}>
            <CFormSelect
              aria-label="leaveCycleMonth"
              name="leaveCycleMonth"
              id="leaveCycleMonth"
              value={employeeLeaveCalender?.leaveCycleMonth}
              onChange={onChangeLeavecalenderHandler}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value=" May"> May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Probation Period (Months):
          </CFormLabel>
          <CCol sm={2}>
            <CFormSelect
              aria-label="probationPeriod"
              name="probationPeriod"
              id="probationPeriod"
              value={employeeLeaveCalender?.probationPeriod}
              onChange={onChangeLeavecalenderHandler}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Max Leaves Earned (Days):
          </CFormLabel>
          <CCol sm={2}>
            <CFormInput
              type="number"
              id="maxLeavesEarned"
              name="maxLeavesEarned"
              value={employeeLeaveCalender?.maxLeavesEarned}
              onChange={onChangeLeavecalenderHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Payroll Cutoff Date (Day):
          </CFormLabel>
          <CCol sm={2}>
            <CFormSelect
              aria-label="payrollCutoffDate"
              name="payrollCutoffDate"
              id="payrollCutoffDate"
              value={employeeLeaveCalender?.payrollCutoffDate}
              onChange={onChangeLeavecalenderHandler}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Number of Leaves/Year :
          </CFormLabel>
          <CCol sm={2}>
            <CFormInput
              type="number"
              id="leavesPerYear"
              name="leavesPerYear"
              value={employeeLeaveCalender?.leavesPerYear}
              onChange={onChangeLeavecalenderHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Maximum Accrual/Year:
          </CFormLabel>
          <CCol sm={2}>
            <CFormInput
              type="number"
              id="maxAccrualPerYear"
              name="maxAccrualPerYear"
              value={employeeLeaveCalender?.maxAccrualPerYear}
              onChange={onChangeLeavecalenderHandler}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh me-1"
              color="success"
              onClick={handleSaveLeaveCalender}
            >
              Save
            </CButton>
            <CButton color="warning " className="btn-ovh">
              Cancel
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </>
  )
}
export default EmployeeLeaveCalender
