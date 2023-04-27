import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import TicketApprovalsSearchFilterOptions from './TicketApprovalsSearchFilterOptions'
import {
  approvalStatusList,
  dateOptionsList,
  ticketStatusList,
} from '../../../constant/constantData'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { GetAllTicketsForApprovalProps } from '../../../types/Support/TicketApprovals/ticketApprovalsTypes'
import { commonDateFormat } from '../../../utils/dateFormatUtils'
import { dateFormat } from '../../../constant/DateFormat'

const TicketApprovalsFilterOptions = ({
  setTicketApprovalParams,
  deptId,
  setDeptId,
  categoryId,
  setCategoryId,
  subCategoryIdValue,
  setSubCategoryIdValue,
  initialState,
  handleExportTicketApprovalList,
  ticketFromDate,
  setTicketFromDate,
  ticketToDate,
  setTicketToDate,
}: {
  setTicketApprovalParams: React.Dispatch<
    React.SetStateAction<GetAllTicketsForApprovalProps>
  >
  deptId: number
  setDeptId: (value: number) => void
  categoryId: number
  setCategoryId: (value: number) => void
  subCategoryIdValue: number
  setSubCategoryIdValue: (value: number) => void
  initialState: GetAllTicketsForApprovalProps
  handleExportTicketApprovalList: (value: GetAllTicketsForApprovalProps) => void
  ticketFromDate: string | Date
  setTicketFromDate: (value: string | Date) => void
  ticketToDate: string | Date
  setTicketToDate: (value: string | Date) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const TicketStatusValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.TicketStatusValue,
  )
  const ApprovalStatusValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.ApprovalStatusValue,
  )
  const DateValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.DateValue,
  )
  const TrackerValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.TrackerValue,
  )
  const pendingApproval = 'Pending Approval'

  const [ticketStatusState, setTicketStatusState] =
    useState<string>(TicketStatusValue)

  const [approvalStatus, setApprovalStatus] =
    useState<string>(ApprovalStatusValue)

  const [dateOption, setDateOption] = useState<string>(DateValue)
  const [trackerValue, setTrackerValue] = useState<number | string>(
    Number(TrackerValue),
  )

  const [employeeNameCheckbox, setEmployeeNameCheckbox] =
    useState<boolean>(false)
  const [assigneeNameCheckbox, setAssigneeNameCheckbox] =
    useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [dateError, setDateError] = useState<boolean>(false)

  const departmentList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.departmentNameList,
  )

  const departmentCategoryList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.departmentCategoryList,
  )

  const subCategoryList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.subCategoryList,
  )

  const trackerList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.trackerList,
  )

  const getAllLookUps = useTypedSelector(
    reduxServices.ticketApprovals.selectors.allLookUps,
  )

  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )

  const ticketsForApproval = useTypedSelector(
    reduxServices.ticketApprovals.selectors.ticketsForApproval,
  )

  useEffect(() => {
    dispatch(
      reduxServices.ticketApprovals.actions.setTicketStatusValue(
        ticketStatusState,
      ),
    )
    dispatch(
      reduxServices.ticketApprovals.actions.setApprovalStatusValue(
        approvalStatus,
      ),
    )
    dispatch(reduxServices.ticketApprovals.actions.setDateValue(dateOption))
    dispatch(
      reduxServices.ticketApprovals.actions.setFormDataValue(ticketFromDate),
    )

    dispatch(reduxServices.ticketApprovals.actions.setToDateValue(ticketToDate))

    dispatch(
      reduxServices.ticketApprovals.actions.setTrackerValue(trackerValue),
    )
  }, [
    ticketStatusState,
    approvalStatus,
    dateOption,
    trackerValue,
    ticketFromDate,
    ticketToDate,
  ])

  const prepareObject = {
    categoryId,
    dateSelection: dateOption || '',
    departmentId: deptId,
    endIndex: 20,
    fromDate: (ticketFromDate as string) || '',
    multiSearch: searchValue,
    progressStatus: ticketStatusState,
    searchByEmpName: employeeNameCheckbox,
    searchByAssigneeName: assigneeNameCheckbox,
    startIndex: 0,
    subCategoryId: subCategoryIdValue,
    ticketStatus: approvalStatus,
    toDate: (ticketToDate as string) || '',
    trackerID: Number(trackerValue),
  }

  const viewButtonHandler = () => {
    setTicketApprovalParams(prepareObject)
  }

  const searchBtnHandler = () => {
    setTicketApprovalParams(prepareObject)
  }

  const searchButtonOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setTicketApprovalParams({
        ...prepareObject,
        multiSearch: searchValue,
      })
    }
  }

  const clearBtnHandler = () => {
    setDeptId(0)
    setCategoryId(0)
    setSubCategoryIdValue(0)
    setTicketStatusState('New')
    setApprovalStatus(pendingApproval)
    setDateOption('Today')
    setTrackerValue(0)
    setTicketFromDate('')
    setTicketToDate('')
    setEmployeeNameCheckbox(false)
    setAssigneeNameCheckbox(false)
    setSearchValue('')
    setTicketApprovalParams(initialState)
  }

  useEffect(() => {
    const start = moment(ticketFromDate, commonDateFormat).format(
      commonDateFormat,
    )
    const end = moment(ticketToDate, commonDateFormat).format(commonDateFormat)

    setDateError(moment(end).isBefore(start))
  }, [ticketFromDate, ticketToDate])

  const categoryListToUse =
    employeeRole === 'admin' ? departmentCategoryList : getAllLookUps

  const onHandleToDatePicker = (value: Date) => {
    setTicketToDate(moment(value).format(dateFormat))
    dispatch(
      reduxServices.ticketApprovals.actions.setToDateValue(
        moment(value).format(dateFormat),
      ),
    )
  }

  const onHandleFromDatePicker = (value: Date) => {
    setTicketFromDate(moment(value).format(dateFormat))
    dispatch(
      reduxServices.ticketApprovals.actions.setFormDataValue(
        moment(value).format(dateFormat),
      ),
    )
  }

  return (
    <>
      <CRow className="mt-4">
        <CCol sm={2}>
          <CFormLabel>Ticket Status:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="ticketStatus"
            data-testid="ticketStatus"
            name="ticketStatus"
            value={ticketStatusState}
            onChange={(e) => {
              setTicketStatusState(e.target.value)
              dispatch(
                reduxServices.ticketApprovals.actions.setTicketStatusValue(
                  e.target.value,
                ),
              )
            }}
          >
            {ticketStatusList.map((ticketItem, index) => (
              <option key={index} value={ticketItem.label}>
                {ticketItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2}>
          <CFormLabel>Approval Status:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            className="approval-status-select"
            size="sm"
            id="approvalStatus"
            data-testid="approvalStatus"
            name="approvalStatus"
            value={approvalStatus}
            onChange={(e) => {
              setApprovalStatus(e.target.value)
              dispatch(
                reduxServices.ticketApprovals.actions.setApprovalStatusValue(
                  e.target.value,
                ),
              )
            }}
          >
            {approvalStatusList.map((approvalItem, index) => (
              <option key={index} value={approvalItem.label}>
                {approvalItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>

        {employeeRole === 'admin' && (
          <CCol sm={2}>
            <CFormLabel>Department Name:</CFormLabel>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="departmentName"
              data-testid="departmentName"
              name="departmentName"
              value={deptId}
              onChange={(e) => {
                setDeptId(Number(e.target.value))
              }}
            >
              <option value="">All</option>
              {departmentList
                .slice()
                .sort((department1, department2) =>
                  department1.name.localeCompare(department2.name),
                )
                ?.map((dept, index) => (
                  <option key={index} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        )}
        <CCol sm={2}>
          <CFormLabel>Category Name:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="categoryName"
            data-testid="categoryNameSelect"
            name="categoryName"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(Number(e.target.value))
            }}
          >
            <option value="">All</option>
            {categoryListToUse
              .slice()
              .sort((category1, category2) =>
                category1.categoryName.localeCompare(category2.categoryName),
              )
              ?.map((category, categoryIndex) => (
                <option key={categoryIndex} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2}>
          <CFormLabel>Sub-Category Name:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="subCategoryName"
            data-testid="subCategoryNameSelect"
            name="subCategoryName"
            value={subCategoryIdValue}
            onChange={(e) => {
              setSubCategoryIdValue(Number(e.target.value))
            }}
          >
            <option value="">All</option>
            {subCategoryList
              .slice()
              .sort((subCategory1, subCategory2) =>
                subCategory1.subCategoryName.localeCompare(
                  subCategory2.subCategoryName,
                ),
              )
              ?.map((subCategory, subCategoryIndex) => (
                <option
                  key={subCategoryIndex}
                  value={subCategory.subCategoryId}
                >
                  {subCategory.subCategoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2}>
          <CFormLabel>Date:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="dateOption"
            data-testid="dateOptionSelect"
            name="dateOption"
            value={dateOption}
            onChange={(e) => {
              setDateOption(e.target.value)
              dispatch(
                reduxServices.ticketApprovals.actions.setDateValue(
                  e.target.value,
                ),
              )
            }}
          >
            {dateOptionsList.map((currentOption, index) => (
              <option key={index} value={currentOption.label}>
                {currentOption.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4 justify-content-between">
        <CCol sm={2}>
          <CFormLabel>Tracker:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="tracker"
            data-testid="trackerSelect"
            name="tracker"
            value={trackerValue}
            onChange={(e) => {
              setTrackerValue(Number(e.target.value))
              dispatch(
                reduxServices.ticketApprovals.actions.setTrackerValue(
                  e.target.value,
                ),
              )
            }}
          >
            <option value="">All</option>
            {trackerList?.map((trackerItem, trackerItemIndex) => (
              <option key={trackerItemIndex} value={trackerItem.id}>
                {trackerItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        {dateOption === 'Custom' && (
          <CCol sm={7} className="d-md-flex justify-content-md-end">
            <CCol sm={3} className="ticket-from-date-col">
              <CRow>
                <CFormLabel>
                  From:
                  {(ticketFromDate == null || ticketFromDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  autoComplete="off"
                  id="from-date"
                  data-testid="ticketsApprovalsFromDate"
                  className="form-control form-control-sm sh-date-picker"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  name="ticketsFromDate"
                  value={ticketFromDate as string}
                  onChange={(date: Date) => onHandleFromDatePicker(date)}
                />
              </CRow>
            </CCol>

            <CCol sm={3} className="justify-content-md-end">
              <CRow>
                <CFormLabel>
                  To:
                  {(ticketToDate == null || ticketToDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  autoComplete="off"
                  id="from-date"
                  data-testid="ticketsApprovalsToDate"
                  className="form-control form-control-sm sh-date-picker"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  name="ticketsToDate"
                  value={ticketToDate as string}
                  onChange={(date: Date) => onHandleToDatePicker(date)}
                />
                {dateError && (
                  <CCol sm={12} className="mt-1 pt-1">
                    <span className="text-danger fw-bold">
                      To date should be greater than From date
                    </span>
                  </CCol>
                )}
              </CRow>
            </CCol>
          </CCol>
        )}
      </CRow>
      {ticketsForApproval.list?.length > 0 && (
        <CRow className="time-in-office-report-options mt-4">
          <CCol md={12}>
            <CButton
              color="info"
              className="text-white btn-ovh pull-right"
              size="sm"
              onClick={() => handleExportTicketApprovalList(prepareObject)}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export
            </CButton>
          </CCol>
        </CRow>
      )}
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 4 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            disabled={
              dateOption === 'Custom' &&
              !(ticketFromDate !== '' && ticketToDate !== '' && !dateError)
            }
            onClick={viewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            onClick={clearBtnHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      <TicketApprovalsSearchFilterOptions
        employeeNameCheckbox={employeeNameCheckbox}
        setEmployeeNameCheckbox={setEmployeeNameCheckbox}
        assigneeNameCheckbox={assigneeNameCheckbox}
        setAssigneeNameCheckbox={setAssigneeNameCheckbox}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchButtonOnKeyDown={searchButtonOnKeyDown}
        searchBtnHandler={searchBtnHandler}
      />
    </>
  )
}

export default TicketApprovalsFilterOptions
