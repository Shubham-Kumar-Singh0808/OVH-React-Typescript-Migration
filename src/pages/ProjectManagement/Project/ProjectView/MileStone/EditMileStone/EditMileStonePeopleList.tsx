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
import {
  AllocatedMilestonePeople,
  GetPeopleForMilestone,
  GetWorkDetails,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

const EditMileStonePeopleList = ({
  onChangeHandleFromDate,
  onChangeHandleToDate,
  roleOnChange,
  billableOnChange,
  item,
  index,
  monthWorkingOnChange,
  peopleListHolidays,
  peopleListLeaves,
  peopleListTotalDays,
  peopleListHours,
  // isDateEnabled,
  workDays,
  setWorkDays,
  holiDays,
  setHoliDays,
  leaves,
  setLeaves,
  totalDays,
  setTotalDays,
  hours,
  setHours,
  totalHours,
  setTotalHours,
  peopleListTotalValue,
}: // newCheckListWithoutOnChange,
{
  onChangeHandleFromDate: (date: Date, index: number) => void
  onChangeHandleToDate: (date: Date, index: number) => void
  monthWorkingOnChange: (value: string, index: number) => void
  peopleListHolidays: (value: string, index: number) => void
  peopleListLeaves: (value: string, index: number) => void
  peopleListTotalDays: (value: string, index: number) => void
  peopleListHours: (value: string, index: number) => void
  peopleListTotalValue: (value: string, index: number) => void
  roleOnChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void
  billableOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => void
  item: AllocatedMilestonePeople
  index: number
  // isDateEnabled: boolean
  workDays: string | undefined
  setWorkDays: React.Dispatch<React.SetStateAction<string | undefined>>
  holiDays: string
  setHoliDays: React.Dispatch<React.SetStateAction<string | undefined>>
  leaves: string
  setLeaves: React.Dispatch<React.SetStateAction<string | undefined>>
  totalDays: string
  setTotalDays: React.Dispatch<React.SetStateAction<string | undefined>>
  hours: string
  setHours: React.Dispatch<React.SetStateAction<string | undefined>>
  totalHours: string
  setTotalHours: React.Dispatch<React.SetStateAction<string | undefined>>
  // newCheckListWithoutOnChange: (object: GetWorkDetails, index: number) => void
}): JSX.Element => {
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  const [comments, setComments] = useState<string>()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteFamilyId, setToDeleteFamilyId] = useState(0)
  const [referenceIndex, setReferenceIndex] = useState<string>()
  const totalHoursCalculations = Number(totalDays) * Number(hours)
  const totalDaysResult = Number(workDays) - Number(leaves)

  const milestoneWorkDetails = useTypedSelector(
    reduxServices.projectMileStone.selectors.milestoneWorkDetails,
  )
  console.log(toDeleteFamilyId)
  useEffect(() => {
    if (totalHoursCalculations) {
      setTotalHours(String(totalHoursCalculations))
    }
  }, [totalHoursCalculations])

  useEffect(() => {
    if (totalDaysResult) {
      setTotalDays(String(totalDaysResult))
    }
  }, [totalDaysResult])

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (milestoneWorkDetails) setWorkDays(milestoneWorkDetails?.workingDays)
    setHoliDays(milestoneWorkDetails?.holidays)
    setLeaves(milestoneWorkDetails?.Leaves)
    setTotalDays(milestoneWorkDetails.totalDays)
    setHours(milestoneWorkDetails?.hours)
    // newCheckListWithoutOnChange(milestoneWorkDetails, index)
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
      setHoliDays(item?.holidays)
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
          empId: Number(item.employeeId),
          fromdate: item.startDate || '',
          todate: item.endDate || '',
        }),
      )
      setReferenceIndex(item.employeeId)
      monthWorkingOnChange(workDays as string, index)
      peopleListHolidays(holiDays as string, index)
      peopleListLeaves(leaves as string, index)
      peopleListTotalDays(totalDays as string, index)
      peopleListHours(hours as string, index)
      peopleListTotalValue(totalHours, index)
      // newCheckListWithoutOnChange(milestoneWorkDetails, index)
    }
  }, [item.endDate])

  const handleShowDeleteModal = (id: number) => {
    setIsDeleteModalVisible(true)
    setToDeleteFamilyId(id)
  }
  console.log(item.hours)
  const PeopleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    peopleListLeaves(e.target.value, index)
    setLeaves(e.target.value)
  }

  const totalDaysOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    peopleListTotalDays(e.target.value, index)
    setTotalDays(e.target.value)
  }
  const hoursOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    peopleListHours(e.target.value, index)
    setHours(e.target.value)
  }
  const totalHoursOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    peopleListTotalValue(e.target.value, index)
    setTotalHours(e.target.value)
  }
  return (
    <>
      {/* {getPeopleMilestone.length > 0 ? ( */}
      <>
        <CTableBody>
          <CTableRow>
            <CTableDataCell scope="row">{item.employeeId}</CTableDataCell>
            <CTableDataCell scope="row">{item.userName}</CTableDataCell>
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
                // disabled={!isDateEnabled}
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
                // disabled={!isDateEnabled}
              />
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CFormInput
                value={
                  referenceIndex === milestoneWorkDetails.employeeId
                    ? workDays
                    : item.monthWorkingDays
                }
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
                value={
                  referenceIndex === milestoneWorkDetails.employeeId
                    ? holiDays
                    : item.holidays
                }
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
                onChange={(e) => PeopleOnChange(e, index)}
                value={
                  referenceIndex === milestoneWorkDetails.employeeId
                    ? leaves
                    : item.leaves
                }
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
                // onChange={(e) => setTotalDays(e.target.value)}
                value={
                  referenceIndex === milestoneWorkDetails.employeeId
                    ? totalDays
                    : item.totalDays
                }
                className="mt-2"
                name="effort"
                id="effort"
                autoComplete="off"
                data-testid="effort-test"
              />
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CFormInput
                // onChange={(e) => setHours(e.target.value)}
                onChange={(e) => hoursOnChange(e, index)}
                value={
                  referenceIndex === milestoneWorkDetails.employeeId
                    ? hours
                    : item.hours
                }
                className="mt-2"
                name="effort"
                id="effort"
                autoComplete="off"
                data-testid="effort-test"
              />
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CFormInput
                // onChange={(e) => setTotalHours(e.target.value)}
                onChange={(e) => totalHoursOnChange(e, index)}
                value={
                  referenceIndex === milestoneWorkDetails.employeeId
                    ? totalHours
                    : item.totalValue
                }
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
                value={item.role}
                onChange={(e) => roleOnChange(e, index)}
              >
                <option value="">Select</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Tester">Tester</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Business Analyst">Business Analyst</option>
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

      {/* // ) : (
      //   ''
      // )} */}
    </>
  )
}

export default EditMileStonePeopleList
