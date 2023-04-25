import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import OModal from '../../../../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { GetPeopleForMilestone } from '../../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'
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
  // fromDate,
  // setFromDate,
  // toDate,
  // setToDate,
  employeeName,
  setEmployeeName,
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
  // fromDate: string
  // setFromDate: React.Dispatch<React.SetStateAction<string | undefined>>
  // toDate: string
  // setToDate: React.Dispatch<React.SetStateAction<string | undefined>>
  employeeName: string
  setEmployeeName: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  // const [employeeName, setEmployeeName] = useState<string>()
  const [workDays, setWorkDays] = useState<string>()
  const [holiDays, setHoliDays] = useState<number>()
  const [leaves, setLeaves] = useState<string>()
  const [totalDays, setTotalDays] = useState<string>()
  const [hours, setHours] = useState<string>()
  const [totalHours, setTotalHours] = useState<string>()
  const [comments, setComments] = useState<string>()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteFamilyId, setToDeleteFamilyId] = useState(0)
  const commonFormatDate = 'l'
  const totalHoursCalculations = Number(totalDays) * Number(hours)
  useEffect(() => {
    if (item?.empName) setEmployeeName(item?.empName)
  }, [item?.empName])
  const milestoneWorkDetails = useTypedSelector(
    reduxServices.projectMileStone.selectors.milestoneWorkDetails,
  )
  const employeeData = getPeopleMilestone?.filter(
    (items) => items?.empName === employeeName,
  )

  const result = getPeopleMilestone?.filter(
    (items) => items?.empName === milestoneWorkDetails?.employeeId,
  )
  console.log(result[0]?.employeeId)
  useEffect(() => {
    if (totalHoursCalculations) {
      setTotalHours(String(totalHoursCalculations))
    }
  }, [totalHoursCalculations])

  const dispatch = useAppDispatch()

  console.log(milestoneWorkDetails)
  useEffect(() => {
    if (milestoneWorkDetails) setWorkDays(milestoneWorkDetails?.workingDays)
    setHoliDays(milestoneWorkDetails?.holidays)
    setLeaves(milestoneWorkDetails?.Leaves)
    setTotalDays(milestoneWorkDetails.totalDays)
    setHours(milestoneWorkDetails?.hours)
  }, [milestoneWorkDetails])

  useEffect(() => {
    if (
      item.monthWorkingDays &&
      item.holidays &&
      item?.leaves &&
      item?.totalDays &&
      item?.hours
    ) {
      setWorkDays(item?.monthWorkingDays)
      setHoliDays(Number(item?.holidays))
      setLeaves(item?.leaves)
      setTotalDays(item?.totalDays)
      setHours(item?.hours)
    }
  }, [
    item.monthWorkingDays,
    item.holidays,
    item?.leaves,
    item?.totalDays,
    item?.hours,
  ])

  useEffect(() => {
    if (item.endDate) {
      dispatch(
        reduxServices.projectMileStone.getWorkDetails({
          empId: Number(employeeData[0]?.employeeId),
          fromdate: item.startDate || '',
          todate: item.endDate || '',
        }),
      )
    }
  }, [item.endDate])

  const handleShowDeleteModal = (id: number) => {
    setIsDeleteModalVisible(true)
    setToDeleteFamilyId(id)
  }
  // console.log(toDeleteFamilyId)

  console.log(workDays)

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
                  // value={fromDate}
                  value={item.startDate}
                  // onChange={(date: Date) => onChangeHandleFromDate(date, index)}
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
                  // value={toDate}
                  // onChange={(date: Date) => onChangeHandleToDate(date, index)}
                  onChange={(date: Date) => onChangeHandleToDate(date, index)}
                />
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CFormInput
                  // onChange={(e) => setWorkDays(e.target.value)}
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
                  value={item.holidays}
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
                  value={item?.totalValue}
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
                  onClick={() => handleShowDeleteModal(Number(item.employeeId))}
                >
                  <i className="fa fa-comments fa-lg text-white"></i>
                </button>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
          <OModal
            alignment="center"
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            modalHeaderClass="d-none"
            confirmButtonText="Yes"
            cancelButtonText="No"
            modalFooterClass="d-none"
          >
            <div>
              <CRow className="mt-1 mb-0 align-items-center pt-4">
                <CFormLabel className="form-label col-form-label p-1 ps-3 pe-3">
                  <b>Add Comments</b>
                </CFormLabel>
                <CCol sm={6} className="w-100">
                  <CFormTextarea
                    aria-label="textarea"
                    id="textArea"
                    name="textArea"
                    data-testid="text-area"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></CFormTextarea>
                </CCol>
              </CRow>
            </div>
          </OModal>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default MilestonePeopleList
