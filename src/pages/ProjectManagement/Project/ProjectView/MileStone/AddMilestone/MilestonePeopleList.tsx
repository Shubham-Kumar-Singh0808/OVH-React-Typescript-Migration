import {
  CButton,
  CFormInput,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import {
  GetPeopleForMilestone,
  GetWorkDetails,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'
import { deviceLocale } from '../../../../../../utils/dateFormatUtils'

const MilestonePeopleList = ({
  onChangeHandleFromDate,
  onChangeHandleToDate,
  workingDaysOnChange,
  holidaysOnChange,
  leavesOnChange,
  totalDaysOnChange,
  hoursOnChange,
  totalHoursOnChange,
  roleOnChange,
  billableOnChange,
  item,
  index,
}: {
  onChangeHandleFromDate: (date: Date, index: number) => void
  onChangeHandleToDate: (date: Date, index: number) => void
  holidaysOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  workingDaysOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  leavesOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  totalDaysOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  hoursOnChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  totalHoursOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  roleOnChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void
  billableOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => void
  item: GetPeopleForMilestone
  index: number
}) => {
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  const [employeeName, setEmployeeName] = useState<string>()
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )

  const [workDays, setWorkDays] = useState<number>()
  const [holiDays, setHoliDays] = useState<number>()

  useEffect(() => {
    if (item?.empName) setEmployeeName(item?.empName)
  }, [item?.empName])

  // const checkListDetails = {} as GetPeopleForMilestone[]
  // const [checkList, setCheckList] = useState(checkListDetails)
  const dispatch = useAppDispatch()
  const commonFormatDate = 'l'
  useEffect(() => {
    dispatch(
      reduxServices.projectMileStone.getPeopleForMilestone(getProjectDetail.id),
    )
  }, [dispatch])

  const milestoneWorkDetails = useTypedSelector(
    reduxServices.projectMileStone.selectors.milestoneWorkDetails,
  )

  useEffect(() => {
    if (milestoneWorkDetails) setWorkDays(milestoneWorkDetails?.workingDays)
    setHoliDays(milestoneWorkDetails?.holidays)
    // setMilestoneMonthWorkDetails(Number(item.monthWorkingDays))
  }, [milestoneWorkDetails])

  useEffect(() => {
    if (item.monthWorkingDays && item.holidays) {
      setWorkDays(Number(item?.monthWorkingDays))
      setHoliDays(Number(item?.holidays))
    }
  }, [item.monthWorkingDays, item.holidays])

  const employeeData = getPeopleMilestone?.filter(
    (items) => items?.empName === employeeName,
  )

  useEffect(() => {
    if (item.endDate) {
      dispatch(
        reduxServices.projectMileStone.getWorkDetails({
          empId: employeeData[0].employeeId,
          fromdate: item.startDate || '',
          todate: item.endDate || '',
        }),
      )
    }
  }, [item.endDate])
  console.log(item.monthWorkingDays)
  console.log(milestoneWorkDetails)
  console.log(employeeData[0]?.employeeId)
  return (
    <>
      {getPeopleMilestone.length > 0 ? (
        <>
          <CTableBody>
            <CTableRow>
              <CTableDataCell scope="row">{item.employeeId}</CTableDataCell>
              <CTableDataCell scope="row">{employeeName}</CTableDataCell>
              <CTableDataCell scope="row">
                <DatePicker
                  id="editProjectEndDate"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  data-testid="end-date-picker"
                  dateFormat="dd/mm/yy"
                  name="editProjectEndDate"
                  autoComplete="off"
                  value={item.startDate}
                  onChange={(date: Date) => onChangeHandleFromDate(date, index)}
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <DatePicker
                  id="editProjectEndDate"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  data-testid="end-date-picker"
                  dateFormat="dd/mm/yy"
                  name="editProjectEndDate"
                  autoComplete="off"
                  value={item.endDate}
                  onChange={(date: Date) => onChangeHandleToDate(date, index)}
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormInput
                  onChange={(e) => workingDaysOnChange(e, index)}
                  value={workDays}
                  className="mt-2"
                  name="effort"
                  id="effort"
                  autoComplete="off"
                  data-testid="effort-test"
                  disabled
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormInput
                  onChange={(e) => holidaysOnChange(e, index)}
                  value={holiDays}
                  className="mt-2"
                  name="effort"
                  id="effort"
                  autoComplete="off"
                  data-testid="effort-test"
                  disabled
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormInput
                  onChange={(e) => leavesOnChange(e, index)}
                  value={item.leaves}
                  className="mt-2"
                  name="effort"
                  id="effort"
                  autoComplete="off"
                  data-testid="effort-test"
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormInput
                  onChange={(e) => totalDaysOnChange(e, index)}
                  value={item.totalDays}
                  className="mt-2"
                  name="effort"
                  id="effort"
                  autoComplete="off"
                  data-testid="effort-test"
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormInput
                  onChange={(e) => hoursOnChange(e, index)}
                  value={item.hours}
                  className="mt-2"
                  name="effort"
                  id="effort"
                  autoComplete="off"
                  data-testid="effort-test"
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormInput
                  onChange={(e) => totalHoursOnChange(e, index)}
                  value={item.totalValue}
                  className="mt-2"
                  name="effort"
                  id="effort"
                  autoComplete="off"
                  data-testid="effort-test"
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormSelect
                  className="mt-2"
                  aria-label="Default select example"
                  size="sm"
                  id="billable"
                  data-testid="billable-select"
                  name="billable"
                  value={item.desigination}
                  onChange={(e) => roleOnChange(e, index)}
                >
                  <option value="">Select</option>
                  <option value="true">Developer</option>
                  <option value="false">Designer</option>
                  <option value="true">Tester</option>
                  <option value="false">Project Manager</option>
                  <option value="true">Business Analyst</option>
                </CFormSelect>
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormSelect
                  className="mt-2"
                  aria-label="Default select example"
                  size="sm"
                  id="billable"
                  data-testid="billable-select"
                  name="billable"
                  value={item.billable}
                  onChange={(e) => billableOnChange(e, index)}
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </CFormSelect>
              </CTableDataCell>
              <CTableDataCell scope="row">
                <button
                  data-original-title="Comments"
                  ng-click="addCommentPOP(milestone)"
                  data-placement="top"
                  className="btn btn-primary pull-right"
                  type="submit"
                >
                  <i className="fa fa-comments fa-lg text-white"></i>
                </button>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default MilestonePeopleList
