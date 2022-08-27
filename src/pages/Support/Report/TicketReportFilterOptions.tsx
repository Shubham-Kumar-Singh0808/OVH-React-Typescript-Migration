import { CRow, CCol, CFormSelect, CFormLabel, CButton } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

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
  const [showSelectCustom, setShowSelectCustom] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const getDepartmentNameList = useTypedSelector(
    reduxServices.ticketReport.selectors.departmentNameList,
  )

  const getTicketReportList = useTypedSelector(
    reduxServices.ticketReport.selectors.ticketsReport,
  )

  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  useEffect(() => {
    dispatch(
      reduxServices.ticketReport.getTicketsReport({
        dateSelection: selectDate,
        departmentId: '',
        from: '',
        ticketStatus: null,
        to: '',
      }),
    )
    dispatch(reduxServices.ticketReport.actions.setCurrentPage(1))
    dispatch(reduxServices.ticketReport.actions.setPageSize(20))
  }, [dispatch])

  useEffect(() => {
    dispatch(reduxServices.ticketReport.getDepartmentNameList())
  }, [dispatch])

  const handleTicketReports = () => {
    dispatch(
      reduxServices.ticketReport.getTicketsReport({
        dateSelection: selectDate,
        departmentId: selectDepartment,
        from: new Date(fromDate as string).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        ticketStatus: null,
        to: new Date(toDate as string).toLocaleDateString(deviceLocale, {
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
        dateSelection: selectDate,
        departmentId: '',
        from: '',
        ticketStatus: null,
        to: '',
      }),
    )
  }

  useEffect(() => {
    if (selectDate === 'Custom') {
      setShowSelectCustom(true)
    } else {
      setShowSelectCustom(false)
    }
  })

  useEffect(() => {
    if (selectDate !== 'Custom') {
      setFromDate('')
      setToDate('')
    }
  }, [selectDate])

  const commonFormatDate = 'l'
  return (
    <>
      <CRow className="mt-3">
        <CCol sm={2} md={2} className="me-2">
          <CFormLabel>Department Name:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectDepartment"
            data-testid="form-select1"
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
          <CFormLabel>Date:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectDate"
            name="selectDate"
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value="Current Month">Current Month</option>
            <option value="Custom">Custom</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Week">Last Week</option>
            <option value="This Week">This Week</option>
            <option value="Today" selected>
              Today
            </option>
            <option value="Yesterday">Yesterday</option>
          </CFormSelect>
        </CCol>
        {showSelectCustom ? (
          <>
            <CCol sm={2} md={2}>
              <CFormLabel className="col-sm-4 col-form-label">
                From :
                <span className={fromDate ? TextWhite : TextDanger}> *</span>
              </CFormLabel>
              <ReactDatePicker
                id="fromDate"
                data-testid="leaveApprovalFromDate"
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="fromDate"
                value={
                  fromDate
                    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setFromDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
            <CCol sm={2} md={2}>
              <CFormLabel className="col-sm-4 col-form-label">
                To :
                <span className={fromDate ? TextWhite : TextDanger}> *</span>
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
                value={
                  toDate
                    ? new Date(toDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setToDate(moment(date).format(commonFormatDate))
                }
              />
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
            // disabled={!isViewButtonEnabled}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            color="warning btn-ovh me-1"
            onClick={handleClearTicketReports}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      {getTicketReportList ? (
        <CRow className="mt-2 mb-4">
          <CCol xs={12} className="d-md-flex justify-content-md-end">
            <CButton color="info btn-ovh me-0">
              <i className="fa fa-plus me-1"></i>Click to Export
            </CButton>
          </CCol>
        </CRow>
      ) : (
        ''
      )}
    </>
  )
}
export default TicketReportFilterOptions
