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
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import OModal from '../../../../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { GetPeopleForMilestone } from '../../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

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
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  const [employeeName, setEmployeeName] = useState<string>()
  const [workDays, setWorkDays] = useState<number>()
  const [holiDays, setHoliDays] = useState<number>()
  const [leaves, setLeaves] = useState<number>()
  const [totalDays, setTotalDays] = useState<number>()
  const [hours, setHours] = useState<number>()
  const [totalHours, setTotalHours] = useState<number>()
  const [comments, setComments] = useState<string>()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteFamilyId, setToDeleteFamilyId] = useState(0)

  const totalHoursCalculations = Number(totalDays) * Number(hours)
  useEffect(() => {
    if (item?.empName) setEmployeeName(item?.empName)
  }, [item?.empName])

  useEffect(() => {
    if (totalHoursCalculations) {
      setTotalHours(totalHoursCalculations)
    }
  }, [totalHoursCalculations])

  const dispatch = useAppDispatch()

  const milestoneWorkDetails = useTypedSelector(
    reduxServices.projectMileStone.selectors.milestoneWorkDetails,
  )

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
      setWorkDays(Number(item?.monthWorkingDays))
      setHoliDays(Number(item?.holidays))
      setLeaves(Number(item?.leaves))
      setTotalDays(Number(item?.totalDays))
      setHours(Number(item?.hours))
    }
  }, [
    item.monthWorkingDays,
    item.holidays,
    item?.leaves,
    item?.totalDays,
    item?.hours,
  ])

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

  const handleShowDeleteModal = (id: number) => {
    setIsDeleteModalVisible(true)
    setToDeleteFamilyId(id)
  }
  console.log(toDeleteFamilyId)
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
                  value={leaves}
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
                  value={totalDays}
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
                  value={hours}
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
                  value={totalHours}
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
                  onClick={() => handleShowDeleteModal(item.projectId)}
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
