import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import ReactDatePicker from 'react-datepicker'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { commonDateFormat, deviceLocale } from '../../../utils/dateFormatUtils'

const LeaveApprovalFilterOptions = ({
  previousMonthResult,
  currentMonthResult,
}: {
  previousMonthResult: Date
  currentMonthResult: Date
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const commonFormatDate = 'l'

  const getAllEmployees = useTypedSelector(
    reduxServices.leaveApprovals.selectors.getEmployeesForAutoComplete,
  )

  const filterByFromDate = useTypedSelector(
    reduxServices.leaveApprovals.selectors.filterByFromDate,
  )

  const filterByToDate = useTypedSelector(
    reduxServices.leaveApprovals.selectors.filterByToDate,
  )

  const [autoCompleteTargetValue, setAutoCompleteTargetValue] =
    useState<string>('All')
  const [fromDate, setFromDate] = useState<string>(filterByFromDate)
  const [toDate, setToDate] = useState<string>(filterByToDate)
  const [selectEmployeeStatus, setSelectEmployeeStatus] =
    useState<string>('PendingApproval')
  const [selectMember, setSelectMember] = useState<number | null>()
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)
  const [dateError, setDateError] = useState<boolean>(false)

  const onHandleSelectReportManager = (fullName: string) => {
    setAutoCompleteTargetValue(fullName)
    const selectedEmployee = getAllEmployees.find(
      (value) => value.fullName === fullName,
    )
    setSelectMember(selectedEmployee?.id as number)
  }

  useEffect(() => {
    if (
      fromDate &&
      toDate &&
      selectEmployeeStatus &&
      selectMember !== null &&
      autoCompleteTargetValue
    ) {
      setIsViewBtnEnabled(true)
    } else {
      setIsViewBtnEnabled(false)
    }
  }, [fromDate, toDate, selectEmployeeStatus, selectMember])

  useEffect(() => {
    const tempFromDate = moment(fromDate, commonDateFormat).format(
      commonDateFormat,
    )
    const tempToDate = moment(toDate, commonDateFormat).format(commonDateFormat)

    setDateError(moment(tempToDate).isBefore(tempFromDate))
  }, [fromDate, toDate])

  const viewButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(
      reduxServices.leaveApprovals.actions.setSelectStatus(
        selectEmployeeStatus === 'All' ? null : selectEmployeeStatus,
      ),
    )
    dispatch(reduxServices.leaveApprovals.actions.setFilterByFromDate(fromDate))
    dispatch(reduxServices.leaveApprovals.actions.setFilterByToDate(toDate))
    dispatch(reduxServices.leaveApprovals.actions.setSelectMember(selectMember))
    dispatch(reduxServices.leaveApprovals.actions.setIsViewBtnClick(true))
  }

  const clearButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(reduxServices.leaveApprovals.actions.setIsViewBtnClick(false))
    dispatch(
      reduxServices.leaveApprovals.actions.setSelectStatus('PendingApproval'),
    )
    dispatch(
      reduxServices.leaveApprovals.actions.setFilterByFromDate(
        moment(previousMonthResult).format(commonFormatDate),
      ),
    )
    dispatch(
      reduxServices.leaveApprovals.actions.setFilterByToDate(
        moment(currentMonthResult).format(commonFormatDate),
      ),
    )
    dispatch(reduxServices.leaveApprovals.actions.setSelectMember(null))
    setAutoCompleteTargetValue('All')
    setFromDate(moment(previousMonthResult).format(commonFormatDate))
    setToDate(moment(currentMonthResult).format(commonFormatDate))
    setSelectEmployeeStatus('PendingApproval')
  }

  return (
    <>
      <CRow className="mt-1">
        <CCol sm={12}>
          <CRow>
            <CCol sm={4}>
              <CFormLabel className="col-sm-4 col-form-label">
                From Date:
                <span className={fromDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <ReactDatePicker
                autoComplete="off"
                id="to-date"
                data-testid="leaveApprovalFromDate"
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="Select Start Date"
                name="leaveApprovalFromDate"
                value={
                  fromDate
                    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setFromDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
            <CCol sm={4}>
              <CFormLabel className="col-sm-3 col-form-label">
                To Date:
                <span className={toDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <ReactDatePicker
                autoComplete="off"
                id="to-date"
                data-testid="leaveApprovalToDate"
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="Select End Date"
                name="leaveApprovalToDate"
                value={
                  toDate
                    ? new Date(toDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setToDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
            <CCol sm={4}>
              <CFormLabel className="col-sm-4 col-form-label">
                Team Member:
                <span
                  className={autoCompleteTargetValue ? TextWhite : TextDanger}
                >
                  *
                </span>
              </CFormLabel>
              <Autocomplete
                inputProps={{
                  className:
                    'form-control form-control-sm sh-leave-form-control',
                  id: 'employees-autocomplete',
                  placeholder: 'Select Team Member',
                }}
                getItemValue={(item) => item.fullName}
                items={getAllEmployees}
                data-testid="employee-input"
                wrapperStyle={{ position: 'relative' }}
                renderMenu={(children) => (
                  <div
                    className={
                      autoCompleteTargetValue &&
                      autoCompleteTargetValue.length > 0
                        ? 'autocomplete-dropdown-wrap'
                        : 'autocomplete-dropdown-wrap hide'
                    }
                  >
                    {children}
                  </div>
                )}
                renderItem={(currentItem, isHighlightedValue) => (
                  <div
                    data-testid="autoComplete-options"
                    className={
                      isHighlightedValue
                        ? 'autocomplete-dropdown-item active'
                        : 'autocomplete-dropdown-item '
                    }
                    key={currentItem.id}
                  >
                    {currentItem.fullName}
                  </div>
                )}
                value={autoCompleteTargetValue}
                shouldItemRender={(currentItem, value) =>
                  currentItem.fullName
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) > -1
                }
                onChange={(e) => setAutoCompleteTargetValue(e.target.value)}
                onSelect={(value) => onHandleSelectReportManager(value)}
              />
            </CCol>
          </CRow>
        </CCol>
        {dateError && (
          <CCol sm={4} className="mt-1 pt-1">
            <span className="text-danger">
              To date should be greater than From date
            </span>
          </CCol>
        )}
      </CRow>
      <CRow className="mt-3">
        <CCol sm={4}>
          <CFormLabel className="col-sm-3 col-form-label">
            Status:{' '}
            <span className={selectEmployeeStatus ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <CFormSelect
            className="mt-0 sh-leave-form-control"
            size="sm"
            id="status"
            data-testid="leaveApprovalStatus"
            name="status"
            value={selectEmployeeStatus}
            onChange={(e) => {
              setSelectEmployeeStatus(e.target.value)
            }}
          >
            <option value="">Select Status</option>
            <option value="All">All</option>
            <option value="PendingApproval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rejected">Rejected</option>
            <option value="CancelAfterApproval">CancelAfterApproval</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol sm={4}>
          <CButton
            className="cursor-pointer sh-ovh-btn-new"
            color="primary me-1"
            data-testid="sh-view-button"
            disabled={!isViewBtnEnabled}
            onClick={viewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer sh-ovh-btn-new"
            data-testid="sh-clear-button"
            disabled={false}
            color="light me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default LeaveApprovalFilterOptions
