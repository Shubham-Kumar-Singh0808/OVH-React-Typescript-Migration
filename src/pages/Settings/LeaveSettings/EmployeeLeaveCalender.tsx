// Todd: remove eslint and fix error
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmployeeSaveLeaveCalenderSetting } from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

const EmployeeLeaveCalender = (): JSX.Element => {
  const [employeeLeaveCalender, setEmployeeLeaveCalender] =
    useState<EmployeeSaveLeaveCalenderSetting>({
      id: '1',
      leaveCycleMonth: '',
      leavesPerYear: 0,
      maxAccrualPerYear: 0,
      maxLeavesEarned: 0,
      payrollCutoffDate: 0,
      probationPeriod: 0,
    })

  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)
  const [maxLeavesEarnedValueError, setMaxLeavesEarnedValueError] =
    useState<boolean>(false)
  const [numberOfLeavesValueError, setNumberOfLeavesValueError] =
    useState<boolean>(false)

  const [maximumAccrualValueError, setMaximumAccrualValueError] =
    useState<boolean>(false)

  const getEmployeeCalender = useTypedSelector(
    reduxServices.employeeLeaveSettings.selectors.getEmployeeLeaveCalender,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      reduxServices.employeeLeaveSettings.getEmployeeLeaveCalenderSettings(),
    )
  }, [dispatch])

  useEffect(() => {
    if (getEmployeeCalender) {
      setEmployeeLeaveCalender(getEmployeeCalender)
    }
  }, [getEmployeeCalender])

  const onChangeLeaveCalenderHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    const replaceValue = value.replace(/[^1-9]/gi, '')
    setIsSaveButtonEnabled(true)
    if (name === 'maxLeavesEarned') {
      const maxLeavesEarnedValue = replaceValue
      validateMaxLeavesEarnedValue(maxLeavesEarnedValue)
      setEmployeeLeaveCalender((prevState) => {
        return { ...prevState, ...{ [name]: maxLeavesEarnedValue } }
      })
    } else if (name === 'leavesPerYear') {
      const leavesPerYearValue = replaceValue
      validateNumberOfLeavesValue(leavesPerYearValue)
      setEmployeeLeaveCalender((prevState) => {
        return { ...prevState, ...{ [name]: leavesPerYearValue } }
      })
    } else if (name === 'maxAccrualPerYear') {
      const maxAccrualPerYearValue = replaceValue
      validateMaximumAccrualValue(maxAccrualPerYearValue)
      setEmployeeLeaveCalender((prevState) => {
        return { ...prevState, ...{ [name]: maxAccrualPerYearValue } }
      })
    } else {
      setEmployeeLeaveCalender((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const validateMaxLeavesEarnedValue = (maxLeavesEarnedValue: string) => {
    if (maxLeavesEarnedValue.length < 3) {
      setMaxLeavesEarnedValueError(false)
    } else {
      setMaxLeavesEarnedValueError(true)
      setIsSaveButtonEnabled(false)
    }
  }

  const validateMaximumAccrualValue = (maxAccrualPerYear: string) => {
    if (maxAccrualPerYear.length < 3) {
      setMaximumAccrualValueError(false)
    } else {
      setMaximumAccrualValueError(true)
      setIsSaveButtonEnabled(false)
    }
  }

  const validateNumberOfLeavesValue = (leavesPerYear: string) => {
    if (leavesPerYear.length < 3) {
      setNumberOfLeavesValueError(false)
    } else {
      setNumberOfLeavesValueError(true)
      setIsSaveButtonEnabled(false)
    }
  }

  const handleClearDetails = () => {
    setEmployeeLeaveCalender(getEmployeeCalender)
  }

  const handleSaveLeaveCalender = async () => {
    const SaveLeaveCalenderResultAction = await dispatch(
      reduxServices.employeeLeaveSettings.saveEmployeeLeaveCalenderSettings(
        employeeLeaveCalender,
      ),
    )
    if (
      reduxServices.employeeLeaveSettings.saveEmployeeLeaveCalenderSettings.fulfilled.match(
        SaveLeaveCalenderResultAction,
      )
    ) {
      await dispatch(
        reduxServices.employeeLeaveSettings.getEmployeeLeaveCalenderSettings(),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Leave calender settings are done"
          />,
        ),
      )
    }
  }
  const formLabelProps = {
    htmlFor: 'inputNewLeaveCalender',
    className: 'col-form-label category-label',
  }
  const danger = 'text-danger'
  const white = 'text-white'

  return (
    <>
      <CRow className="mt-4 mb-4">
        <h3 className="calender-title">Leave Calendar Settings</h3>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Leave Cycle Month:
        </CFormLabel>
        <CCol sm={2}>
          <CFormSelect
            aria-label="leaveCycleMonth"
            name="leaveCycleMonth"
            id="leaveCycleMonth"
            value={employeeLeaveCalender?.leaveCycleMonth}
            onChange={onChangeLeaveCalenderHandler}
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
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Probation Period (Months):
        </CFormLabel>
        <CCol sm={2}>
          <CFormSelect
            aria-label="probationPeriod"
            name="probationPeriod"
            id="probationPeriod"
            value={employeeLeaveCalender?.probationPeriod}
            onChange={onChangeLeaveCalenderHandler}
          >
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
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Max Leaves Earned (Days):
          <span
            className={
              employeeLeaveCalender?.maxLeavesEarned &&
              !maxLeavesEarnedValueError
                ? white
                : danger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={2}>
          <CFormInput
            type="number"
            id="maxLeavesEarned"
            name="maxLeavesEarned"
            value={employeeLeaveCalender?.maxLeavesEarned}
            onChange={onChangeLeaveCalenderHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Payroll Cutoff Date (Day):
        </CFormLabel>
        <CCol sm={2}>
          <CFormSelect
            aria-label="payrollCutoffDate"
            name="payrollCutoffDate"
            id="payrollCutoffDate"
            value={employeeLeaveCalender?.payrollCutoffDate}
            onChange={onChangeLeaveCalenderHandler}
          >
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
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Number of Leaves/Year :
          <span
            className={
              employeeLeaveCalender?.leavesPerYear && !numberOfLeavesValueError
                ? white
                : danger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={2}>
          <CFormInput
            type="number"
            id="leavesPerYear"
            name="leavesPerYear"
            value={employeeLeaveCalender?.leavesPerYear}
            onChange={onChangeLeaveCalenderHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Maximum Accrual/Year:
          <span
            className={
              employeeLeaveCalender?.maxAccrualPerYear &&
              !maximumAccrualValueError
                ? white
                : danger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={2}>
          <CFormInput
            type="number"
            id="maxAccrualPerYear"
            name="maxAccrualPerYear"
            value={employeeLeaveCalender?.maxAccrualPerYear}
            onChange={onChangeLeaveCalenderHandler}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            className="btn-ovh me-1"
            color="success"
            onClick={handleSaveLeaveCalender}
            disabled={!isSaveButtonEnabled}
          >
            Save
          </CButton>
          <CButton
            color="warning "
            className="btn-ovh"
            onClick={handleClearDetails}
            disabled={!isSaveButtonEnabled}
          >
            Cancel
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}
export default EmployeeLeaveCalender
