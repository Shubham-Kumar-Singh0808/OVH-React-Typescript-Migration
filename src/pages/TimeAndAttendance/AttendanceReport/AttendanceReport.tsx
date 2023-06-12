import { CButton, CCol, CFormCheck, CRow } from '@coreui/react-pro'
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import AttendanceReportTable from './AttendanceReportTable'
import BiometricAndShiftFilterOptions from './BiometricAndShiftFilterOptions'
import OtherFilterOptions from './OtherFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import attendanceReportApi from '../../../middleware/api/TimeAndAttendance/AttendanceReport/attendanceReportApi'

const AttendanceReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const currentMonthDate = new Date().getDate()
  const currentMonth =
    currentMonthDate > 24 ? new Date().getMonth() + 1 : new Date().getMonth()
  const previousMonth = currentMonth - 1

  const [currentYear, setCurrentYear] = useState<number | string>(
    new Date().getFullYear(),
  )
  const [selectMonth, setSelectMonth] = useState<number>(currentMonth)
  const [isOther, setIsOther] = useState<string>('')
  const [isBiometric, setIsBiometric] = useState<string>('')
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

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const setMonthToDisplay = useCallback(
    (dateValue: number) => {
      const monthToDisplay =
        dateValue === currentMonth
          ? moment().format('MMMM-YYYY')
          : moment().subtract(1, 'months').format('MMMM-YYYY')
      dispatch(
        reduxServices.employeeAttendanceReport.actions.setMonthDisplay(
          monthToDisplay,
        ),
      )
    },
    [selectMonth],
  )

  const handleChangeSelectMonth = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectMonth(Number(event.target.value))
    setMonthToDisplay(+event.target.value)
    setIsOther('')
    setFilterByEmployeeStatus('')
    setSearchEmployee('')
  }

  const handleChangeSelectOther = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsOther(event.target.value)
  }

  const downloadFile = (
    excelDownload: Blob | undefined,
    downloadFormat: string,
  ) => {
    if (excelDownload) {
      const url = window.URL.createObjectURL(
        new Blob([excelDownload], {
          type: excelDownload.type,
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', downloadFormat)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  const handleExportAttendanceReport = async () => {
    const attendanceReportDownload =
      await attendanceReportApi.exportAttendanceReport({
        employeeId: Number(employeeId),
        month: selectMonth,
        year: currentYear as number,
        search: searchEmployee,
        shiftId: selectShiftId,
        status: filterByEmployeeStatus,
      })
    downloadFile(attendanceReportDownload, 'Attendance.csv')
  }

  const handleExportBiometricAttendanceReport = async () => {
    const biometricAttendanceReportDownload =
      await attendanceReportApi.exportBiometricAttendanceReport({
        employeeId: Number(employeeId),
        month: selectMonth,
        year: currentYear as number,
        search: searchEmployee,
        shiftId: selectShiftId,
        status: filterByEmployeeStatus,
      })
    downloadFile(biometricAttendanceReportDownload, 'BiometricAttendance.csv')
  }

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
    dispatch(
      reduxServices.employeeAttendanceReport.getEmployeeAttendanceReport({
        employeeId: Number(employeeId),
        month: selectMonth,
        year: currentYear as number,
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        search: searchEmployee,
        shiftId: selectShiftId,
        status: filterByEmployeeStatus,
      }),
    )
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

  const userAccess = userAccessToFeatures?.find(
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
                    defaultChecked={isOther === 'others'}
                    onChange={handleChangeSelectOther}
                    inline
                  />
                )}
              </div>
              <div className="d-inline pull-right ml15">
                {isBiometric === 'WithBiometric' && (
                  <CButton
                    color="info btn-ovh me-0"
                    onClick={handleExportBiometricAttendanceReport}
                  >
                    <i className="fa fa-plus me-1"></i>
                    Click to Export Biometric Attendance
                  </CButton>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CButton
                  color="info btn-ovh me-0"
                  onClick={handleExportAttendanceReport}
                >
                  <i className="fa fa-plus me-1"></i>
                  Click to Export Attendance
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
        {(isOther === 'others' ||
          selectMonth + 1 === (filterByDate?.getMonth() as number) + 1) && (
          <OtherFilterOptions
            setFilterByEmployeeStatus={setFilterByEmployeeStatus}
            setFilterByDate={setFilterByDate}
          />
        )}
        <BiometricAndShiftFilterOptions
          isBiometric={isBiometric}
          setIsBiometric={setIsBiometric}
          employeeRole={employeeRole}
          setSearchEmployee={setSearchEmployee}
          userAccess={userAccess?.viewaccess as boolean}
          employeeShifts={employeeShifts}
          selectShiftId={selectShiftId}
          setSelectShiftId={setSelectShiftId}
          selectMonth={selectMonth}
          isOther={isOther}
        />
        <AttendanceReportTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
          isBiometric={isBiometric}
        />
      </OCard>
    </>
  )
}
export default AttendanceReport
