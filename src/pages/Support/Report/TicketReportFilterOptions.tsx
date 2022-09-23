import { CRow, CCol, CFormSelect, CFormLabel, CButton } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import ticketReportApi from '../../../middleware/api/Support/Report/ticketReportsApi'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { deviceLocale, downloadFile } from '../../../utils/helper'

const TicketReportFilterOptions = ({
  selectDate,
  fromDate,
  toDate,
  selectDepartment,
  setSelectDate,
  setFromDate,
  setToDate,
  setSelectDepartment,
}: {
  selectDate: string
  fromDate: string
  toDate: string
  selectDepartment: string
  setSelectDate: React.Dispatch<React.SetStateAction<string>>
  setFromDate: React.Dispatch<React.SetStateAction<string>>
  setToDate: React.Dispatch<React.SetStateAction<string>>
  setSelectDepartment: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [dateError, setDateError] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const getDepartmentNameList = useTypedSelector(
    reduxServices.ticketReport.selectors.departmentNameList,
  )
  const getTicketReportList = useTypedSelector(
    reduxServices.ticketReport.selectors.ticketsReport,
  )

  useEffect(() => {
    dispatch(
      reduxServices.ticketReport.getTicketsReport({
        dateSelection: selectDate,
        departmentId: '',
        from: new Date(fromDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        ticketStatus: null,
        to: new Date(toDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      }),
    )
    dispatch(reduxServices.ticketReport.actions.setCurrentPage(1))
    dispatch(reduxServices.ticketReport.actions.setPageSize(20))
  }, [dispatch])

  useEffect(() => {
    dispatch(reduxServices.ticketReport.getDepartmentNameList())
  }, [dispatch])

  const dateOptionsList = [
    { label: 'Current Month', name: 'Current Month' },
    { label: 'Custom', name: 'Custom' },
    { label: 'Last Month', name: 'Last Month' },
    { label: 'Last Week Approval', name: 'Last Week' },
    { label: 'This Week', name: 'This Week' },
    { label: 'Today', name: 'Today' },
    { label: 'Yesterday', name: 'Yesterday' },
  ]

  const handleTicketReports = () => {
    dispatch(
      reduxServices.ticketReport.getTicketsReport({
        dateSelection: selectDate,
        departmentId: selectDepartment,
        from: new Date(fromDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        ticketStatus: null,
        to: new Date(toDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      }),
    )
  }

  const sortedDepartmentNames = useMemo(() => {
    if (getDepartmentNameList) {
      return getDepartmentNameList
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    }
    return []
  }, [getDepartmentNameList])

  const handleClearTicketReports = () => {
    setSelectDate('Today')
    setSelectDepartment('')
    dispatch(
      reduxServices.ticketReport.getTicketsReport({
        dateSelection: 'Today',
        departmentId: '',
        from: '',
        ticketStatus: null,
        to: '',
      }),
    )
  }

  useEffect(() => {
    const newFromDate = new Date(
      moment(fromDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(toDate?.toString()).format(commonFormatDate),
    )
    if (fromDate && toDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [fromDate, toDate])

  useEffect(() => {
    if (selectDate !== 'Custom') {
      setFromDate('')
      setToDate('')
    }
  }, [selectDate])

  const handleExportTicketReportData = async () => {
    const employeeTicketReportDownload =
      await ticketReportApi.exportTicketReportData({
        departmentId: selectDepartment,
        startIndex: 0,
        endIndex: 20,
        from: new Date(fromDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        to: new Date(toDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        ticketStatus: null,
        dateSelection: selectDate,
      })

    downloadFile(employeeTicketReportDownload, 'MailTemplateList.csv')
  }
  const toDateValue = toDate
    ? new Date(toDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const fromDateValue = fromDate
    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''
  const commonFormatDate = 'l'
  return (
    <>
      <CRow className="mt-3">
        <CCol sm={2} md={2}>
          <CFormLabel>Department Name :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectDepartment"
            data-testid="dept-select1"
            name="selectDepartment"
            value={selectDepartment}
            onChange={(e) => setSelectDepartment(e.target.value)}
          >
            <option value={''}>All</option>
            {sortedDepartmentNames?.map((department, index) => (
              <option key={index} value={department.id}>
                {department.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={2}>
          <CFormLabel>Date :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            data-testid="ticket-selectDate"
            id="selectDate"
            name="selectDate"
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            {dateOptionsList.map((currentOption, index) => (
              <option key={index} value={currentOption.label}>
                {currentOption.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        {selectDate === 'Custom' ? (
          <>
            <CCol sm={6}>
              <CRow>
                <CCol sm={4} md={4}>
                  <CFormLabel>
                    From :
                    {(fromDate == null || fromDate === '') && (
                      <span className="text-danger">*</span>
                    )}
                  </CFormLabel>
                  <ReactDatePicker
                    id="fromDate"
                    data-testid="ticketReportFromDate"
                    className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="dd/mm/yy"
                    placeholderText="dd/mm/yy"
                    name="fromDate"
                    value={fromDateValue}
                    onChange={(date: Date) =>
                      setFromDate(moment(date).format(commonFormatDate))
                    }
                  />
                </CCol>
                <CCol sm={4} md={4}>
                  <CFormLabel>
                    To :
                    {(toDate == null || toDate === '') && (
                      <span className="text-danger">*</span>
                    )}
                  </CFormLabel>
                  <ReactDatePicker
                    id="toDate"
                    data-testid="leaveApprovalFromDate"
                    className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="dd/mm/yy"
                    placeholderText="dd/mm/yy"
                    name="toDate"
                    value={toDateValue}
                    onChange={(date: Date) =>
                      setToDate(moment(date).format(commonFormatDate))
                    }
                  />
                </CCol>
              </CRow>
              {dateError && (
                <CRow className="mt-2">
                  <CCol sm={{ span: 6, offset: 4 }}>
                    <span className="text-danger">
                      To date should be greater than From date
                    </span>
                  </CCol>
                </CRow>
              )}
            </CCol>
          </>
        ) : (
          <></>
        )}
        <CCol sm={2} md={2} className="mt-4">
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            onClick={handleTicketReports}
            disabled={
              selectDate === 'Custom' &&
              !((fromDate !== '' && toDate !== '') || dateError)
            }
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            data-testid="clear-btn"
            color="warning btn-ovh me-1"
            onClick={handleClearTicketReports}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      {getTicketReportList?.length > 0 && (
        <CRow className="mt-2">
          <CCol xs={12} className="d-md-flex justify-content-md-end">
            <CButton
              color="info btn-ovh me-0"
              onClick={handleExportTicketReportData}
            >
              <i className="fa fa-plus me-1"></i>Click to Export
            </CButton>
          </CCol>
        </CRow>
      )}
    </>
  )
}
export default TicketReportFilterOptions
