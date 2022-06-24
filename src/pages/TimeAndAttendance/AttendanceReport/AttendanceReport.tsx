import { CButton, CCol, CFormCheck, CRow } from '@coreui/react-pro'

import BiometricAndShiftFilterOptions from './BiometricAndShiftFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import OtherFilterOptions from './OtherFilterOptions'
import React, { useEffect, useState } from 'react'
import AttendanceReportTable from './AttendanceReportTable'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const AttendanceReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const previousMonth = currentMonth - 1

  const [selectMonth, setSelectMonth] = useState<number | string>(currentMonth)

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const listSize = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.listSize,
  )

  const handleChangeSelectMonth = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectMonth(event.target.value)
  }

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.employeeAttendanceReport.getEmployeeAttendanceReport({
        employeeId: Number(employeeId),
        month: selectMonth as number,
        year: currentYear,
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, currentYear, dispatch, employeeId, pageSize, selectMonth])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Attendance Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12}>
            <div className="mb-3">
              <div className="d-inline">
                <CFormCheck
                  type="radio"
                  name="selectMonth"
                  value={currentMonth}
                  id="currentMonth"
                  label="Current Month"
                  defaultChecked={selectMonth === currentMonth}
                  onChange={handleChangeSelectMonth}
                  inline
                />
                <CFormCheck
                  type="radio"
                  name="selectMonth"
                  value={previousMonth}
                  id="previousMonth"
                  label="Previous Month"
                  defaultChecked={selectMonth === previousMonth}
                  onChange={handleChangeSelectMonth}
                  inline
                />
                <CFormCheck
                  type="radio"
                  name="selectMonth"
                  value={'others'}
                  id="other"
                  label="Other"
                  defaultChecked={selectMonth === 'others'}
                  onChange={handleChangeSelectMonth}
                  inline
                />
              </div>
              <div className="d-inline pull-right ml15">
                <CButton color="info btn-ovh me-0">
                  <i className="fa fa-plus me-1"></i>
                  Click to Export Attendance
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
        {selectMonth === 'others' && <OtherFilterOptions />}
        <BiometricAndShiftFilterOptions />
        <AttendanceReportTable />
      </OCard>
    </>
  )
}
export default AttendanceReport
