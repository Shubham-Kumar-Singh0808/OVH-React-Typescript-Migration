import { CButton, CCol, CFormCheck, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import AttendanceReportTable from './AttendanceReportTable'
import BiometricAndShiftFilterOptions from './BiometricAndShiftFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import OtherFilterOptions from './OtherFilterOptions'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const AttendanceReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const currentMonthDate = new Date().getDate()
  const currentMonth =
    currentMonthDate > 24 ? new Date().getMonth() + 1 : new Date().getMonth()
  const previousMonth = currentMonth - 1

  const [currentYear, setCurrentYear] = useState<number | string>(
    new Date().getFullYear(),
  )
  const [selectMonth, setSelectMonth] = useState<number | string>(currentMonth)
  const [biometric, setBiometric] = useState<string>('')
  const [searchEmployee, setSearchEmployee] = useState<string>('')
  const [selectShiftId, setSelectShiftId] = useState<string>('')
  const [filterByEmployeeStatus, setFilterByEmployeeStatus] =
    useState<string>('')
  const [filterByDate, setFilterByDate] = useState<Date | null>()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )

  const listSize = useTypedSelector(
    reduxServices.employeeAttendanceReport.selectors.listSize,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const employeeShifts = useTypedSelector(
    reduxServices.shiftConfiguration.selectors.employeeShifts,
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
    if (filterByEmployeeStatus && filterByDate) {
      setSelectMonth(filterByDate.getMonth())
      setCurrentYear(filterByDate.getFullYear())
    }
  }, [filterByDate, filterByEmployeeStatus])

  useEffect(() => {
    dispatch(
      reduxServices.userAccessToFeatures.getUserAccessToFeatures(employeeId),
    )
    dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
    if (selectMonth !== 'others') {
      dispatch(
        reduxServices.employeeAttendanceReport.getEmployeeAttendanceReport({
          employeeId: Number(employeeId),
          month: selectMonth as number,
          year: currentYear as number,
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          search: searchEmployee,
          shiftId: selectShiftId,
          status: filterByEmployeeStatus,
        }),
      )
    }
  }, [
    currentPage,
    currentYear,
    dispatch,
    employeeId,
    pageSize,
    searchEmployee,
    selectMonth,
    selectShiftId,
    filterByEmployeeStatus,
  ])

  const userAccess = userAccessToFeatures?.filter(
    (feature) => feature.name === 'Shift Time',
  )

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
                {(employeeRole === 'admin' ||
                  employeeRole === 'HR' ||
                  employeeRole === 'HR Manager') && (
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
                )}
              </div>
              <div className="d-inline pull-right ml15">
                {biometric === 'WithBiometric' && (
                  <CButton color="info btn-ovh me-0">
                    <i className="fa fa-plus me-1"></i>
                    Click to Export Biometric Attendance
                  </CButton>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CButton color="info btn-ovh me-0">
                  <i className="fa fa-plus me-1"></i>
                  Click to Export Attendance
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
        {(selectMonth === 'others' ||
          (selectMonth as number) + 1 ===
            (filterByDate?.getMonth() as number) + 1) && (
          <OtherFilterOptions
            setFilterByEmployeeStatus={setFilterByEmployeeStatus}
            setFilterByDate={setFilterByDate}
          />
        )}
        <BiometricAndShiftFilterOptions
          biometric={biometric}
          setBiometric={setBiometric}
          employeeRole={employeeRole}
          setSearchEmployee={setSearchEmployee}
          userAccess={userAccess[0]?.viewaccess}
          employeeShifts={employeeShifts}
          selectShiftId={selectShiftId}
          setSelectShiftId={setSelectShiftId}
        />
        <AttendanceReportTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}
export default AttendanceReport
