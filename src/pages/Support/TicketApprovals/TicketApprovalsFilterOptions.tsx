import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { GetAllTicketsForApprovalProps } from '../../../types/Support/TicketApprovals/ticketApprovalsTypes'
import { commonDateFormat, deviceLocale } from '../../../utils/dateFormatUtils'

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
}): JSX.Element => {
  const pendingApproval = 'Pending Approval'
  const [ticketStatusState, setTicketStatusState] = useState<string>('New')
  const [approvalStatus, setApprovalStatus] = useState<string>(pendingApproval)
  const [dateOption, setDateOption] = useState<string>('Today')
  const [trackerValue, setTrackerValue] = useState<number>()
  const [ticketFromDate, setTicketFromDate] = useState<string>('')
  const [ticketToDate, setTicketToDate] = useState<string>('')
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

  const ticketStatusList = [
    { label: 'All', name: 'All' },
    { label: 'Closed', name: 'Closed' },
    { label: 'Feedback', name: 'Feedback' },
    { label: 'Fixed', name: 'Fixed' },
    { label: 'In Progress', name: 'In Progress' },
    { label: 'New', name: 'New' },
  ]

  const approvalStatusList = [
    { label: 'All', name: 'All' },
    { label: 'Approved', name: 'Approved' },
    { label: 'Cancelled', name: 'Cancelled' },
    { label: 'Pending Approval', name: pendingApproval },
    { label: 'Rejected', name: 'Rejected' },
  ]

  const dateOptionsList = [
    { label: 'Current Month', name: 'Current Month' },
    { label: 'Custom', name: 'Custom' },
    { label: 'Last Month', name: 'Last Month' },
    { label: 'Last Week Approval', name: 'Last Week' },
    { label: 'This Week', name: 'This Week' },
    { label: 'Today', name: 'Today' },
    { label: 'Yesterday', name: 'Yesterday' },
  ]

  const prepareObject = {
    categoryId,
    dateSelection: dateOption,
    departmentId: deptId,
    endIndex: 20,
    fromDate: new Date(ticketFromDate).toLocaleDateString(deviceLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    multiSearch: searchValue,
    progressStatus: ticketStatusState,
    searchByEmpName: employeeNameCheckbox,
    searchByAssigneeName: assigneeNameCheckbox,
    startIndex: 0,
    subCategoryId: subCategoryIdValue,
    ticketStatus: approvalStatus,
    toDate: new Date(ticketToDate).toLocaleDateString(deviceLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    trackerID: trackerValue,
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
    setTrackerValue(undefined)
    setTicketFromDate('')
    setTicketToDate('')
    setEmployeeNameCheckbox(false)
    setAssigneeNameCheckbox(false)
    setSearchValue('')
    setTicketApprovalParams(initialState)
  }

  useEffect(() => {
    const tempFromDate = new Date(
      moment(ticketFromDate.toString()).format(commonDateFormat),
    )
    const tempToDate = new Date(
      moment(ticketToDate.toString()).format(commonDateFormat),
    )
    if (tempToDate.getTime() < tempFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [ticketFromDate, ticketToDate])

  const categoryListToUse =
    employeeRole === 'admin' ? departmentCategoryList : getAllLookUps

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
            size="sm"
            id="ApprovalStatus"
            data-testid="ApprovalStatus"
            name="ApprovalStatus"
            value={approvalStatus}
            onChange={(e) => {
              setApprovalStatus(e.target.value)
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
            {categoryListToUse?.map((category, categoryIndex) => (
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
            {subCategoryList?.map((subCategory, subCategoryIndex) => (
              <option key={subCategoryIndex} value={subCategory.subCategoryId}>
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
                  id="from-date"
                  data-testid="ticketsApprovalsFromDate"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  name="ticketsFromDate"
                  value={
                    ticketFromDate
                      ? new Date(ticketFromDate).toLocaleDateString(
                          deviceLocale,
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          },
                        )
                      : ''
                  }
                  onChange={(date: Date) =>
                    setTicketFromDate(moment(date).format(commonDateFormat))
                  }
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
                  id="from-date"
                  data-testid="ticketsApprovalsToDate"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  name="ticketsToDate"
                  value={
                    ticketToDate
                      ? new Date(ticketToDate).toLocaleDateString(
                          deviceLocale,
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          },
                        )
                      : ''
                  }
                  onChange={(date: Date) =>
                    setTicketToDate(moment(date).format(commonDateFormat))
                  }
                />
                {dateError && (
                  <CCol sm={12} className="mt-1 pt-1">
                    <span className="text-danger">
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
              !(ticketFromDate !== '' && ticketToDate !== '')
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
      <CRow>
        <CCol sm={12} className="justify-content-md-end">
          <div className="d-flex flex-column pull-right">
            <CFormCheck
              inline
              className="ticket-search-checkbox"
              type="checkbox"
              name="searchByEmployeeName"
              data-testid="searchByEmployeeName"
              id="searchByEmployeeName"
              label="Search by Employee Name"
              onChange={(e) => setEmployeeNameCheckbox(e.target.checked)}
              checked={employeeNameCheckbox}
            />
            <CFormCheck
              inline
              className="ticket-search-checkbox"
              type="checkbox"
              name="searchByAssigneeName"
              data-testid="searchByAssigneeName"
              id="searchByAssigneeName"
              label="Search by Assignee Name"
              onChange={(e) => setAssigneeNameCheckbox(e.target.checked)}
              checked={assigneeNameCheckbox}
            />
            <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
              <CInputGroup className="global-search me-0 flex-nowrap">
                <CFormInput
                  placeholder="Multiple Search"
                  aria-label="Multiple Search"
                  aria-describedby="search-field"
                  data-testid="multi-search-input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={searchButtonOnKeyDown}
                />
                <CButton
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="search-field"
                  onClick={searchBtnHandler}
                  disabled={searchValue == null || searchValue === ''}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default TicketApprovalsFilterOptions
