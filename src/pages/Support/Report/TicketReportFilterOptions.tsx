import { CRow, CCol, CFormSelect, CFormLabel, CButton } from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const TicketReportFilterOptions = (): JSX.Element => {
  const [selectDate, setSelectDate] = useState('Today')

  const [selectDepartment, setSelectDepartment] = useState<string | number>()
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
        departmentId: 0,
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
        departmentId: selectDepartment as number,
        from: '',
        ticketStatus: null,
        to: '',
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
        departmentId: 0,
        from: '',
        ticketStatus: null,
        to: '',
      }),
    )
  }

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
        <CCol sm={2} md={2} className="mt-4">
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            onClick={handleTicketReports}
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
