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
  item,
  index,
}: {
  onChangeHandleFromDate: (date: Date, index: number) => void
  onChangeHandleToDate: (date: Date, index: number) => void
  workingDaysOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  // commentsOnChange: (
  //   e: React.ChangeEvent<HTMLTextAreaElement>,
  //   index: number,
  // ) => void
  item: GetPeopleForMilestone
  index: number
}) => {
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  const [workDetails, setMilestoneWorkDetails] = useState<GetWorkDetails>()
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

  console.log(milestoneWorkDetails)

  useEffect(() => {
    if (milestoneWorkDetails) setMilestoneWorkDetails(milestoneWorkDetails)
  }, [milestoneWorkDetails])

  useEffect(() => {
    if (item.endDate) {
      dispatch(
        reduxServices.projectMileStone.getWorkDetails({
          empId: Number(getProjectDetail.employeeId),
          fromdate: item.startDate as string,
          todate: item.endDate as string,
        }),
      )
    }
  }, [toDate])
  return (
    <>
      {getPeopleMilestone.length > 0 ? (
        <>
          <CTableBody>
            <CTableRow>
              <CTableDataCell scope="row">{item.employeeId}</CTableDataCell>
              <CTableDataCell scope="row">{item.empName}</CTableDataCell>
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
                  value={item.monthWorkingDays}
                  className="mt-2"
                  name="effort"
                  id="effort"
                  autoComplete="off"
                  placeholder="Effort"
                  data-testid="effort-test"
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                {/* <CFormTextarea
                  placeholder="Purpose"
                  aria-label="textarea"
                  id="textArea"
                  className="checklist-textarea"
                  name="textArea "
                  data-testid="text-area"
                  value={item.comments}
                  onChange={(e) => commentsOnChange(e, index)}
                ></CFormTextarea> */}
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
