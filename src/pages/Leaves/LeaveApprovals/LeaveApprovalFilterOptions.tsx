import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import ReactDatePicker from 'react-datepicker'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { deviceLocale } from '../../../utils/leaveApprovalsUtils'

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

  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>('All')
  const [fromDate, setFromDate] = useState<string>(filterByFromDate)
  const [toDate, setToDate] = useState<string>(filterByToDate)
  const [selectEmployeeStatus, setSelectEmployeeStatus] =
    useState<string>('PendingApproval')
  const [selectMember, setSelectMember] = useState<number | null>()
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)
  const [dateError, setDateError] = useState<boolean>(false)

  const onHandleSelectReportManager = (fullName: string) => {
    setAutoCompleteTarget(fullName)
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
      autoCompleteTarget
    ) {
      setIsViewBtnEnabled(true)
    } else {
      setIsViewBtnEnabled(false)
    }
  }, [fromDate, toDate, selectEmployeeStatus, selectMember])

  useEffect(() => {
    const tempFromDate = new Date(
      moment(fromDate.toString()).format(commonFormatDate),
    )
    const tempToDate = new Date(
      moment(toDate.toString()).format(commonFormatDate),
    )
    if (tempToDate.getTime() < tempFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
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
    setAutoCompleteTarget('All')
    setFromDate(moment(previousMonthResult).format(commonFormatDate))
    setToDate(moment(currentMonthResult).format(commonFormatDate))
    setSelectEmployeeStatus('PendingApproval')
  }

  return (
    <>
      <CRow className="mt-1">
        <CCol sm={8}>
          <CRow>
            <CCol sm={6}>
              <CFormLabel className="col-sm-4 col-form-label">
                From Date:
                <span className={fromDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <ReactDatePicker
                id="to-date"
                data-testid="scheduledInterviewsToDate"
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="Select Start Date"
                name="scheduledInterviewsToDate"
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
            <CCol sm={6}>
              <CFormLabel className="col-sm-3 col-form-label">
                To Date:
                <span className={toDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <ReactDatePicker
                id="to-date"
                data-testid="scheduledInterviewsToDate"
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="Select End Date"
                name="scheduledInterviewsToDate"
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
          </CRow>
        </CCol>
        {dateError && (
          <CCol sm={4} className="mt-4 pt-1">
            <span className="text-danger">
              To date should be greater than From date
            </span>
          </CCol>
        )}
      </CRow>
      <CRow className="mt-3">
        <CCol sm={8}>
          <CFormLabel className="col-sm-3 col-form-label">
            Team Member:
            <span className={autoCompleteTarget ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm sh-leave-form-control',
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
                  autoCompleteTarget && autoCompleteTarget.length > 0
                    ? 'autocomplete-dropdown-wrap'
                    : 'autocomplete-dropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                data-testid="option"
                className={
                  isHighlighted
                    ? 'autocomplete-dropdown-item active'
                    : 'autocomplete-dropdown-item '
                }
                key={item.id}
              >
                {item.fullName}
              </div>
            )}
            value={autoCompleteTarget}
            shouldItemRender={(item, value) =>
              item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(value) => onHandleSelectReportManager(value)}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol sm={8}>
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
            disabled={!isViewBtnEnabled}
            onClick={viewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer sh-ovh-btn-new"
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
