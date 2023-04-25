import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useHistory } from 'react-router-dom'
import MilestonePeopleList from './MilestonePeopleList'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { ckeditorConfig } from '../../../../../../utils/ckEditorUtils'
import { deviceLocale } from '../../../../../../utils/dateFormatUtils'
import { GetPeopleForMilestone } from '../../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

const AddMileStoneForm = (): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [mileStoneCRDetails, setMileStoneCRDetails] = useState<string>()
  const [plannedEndDate, setPlannedDate] = useState<string>()
  const [actualEndDate, setActualDate] = useState<string>()
  const [billable, setBillable] = useState<string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [comments, setComments] = useState<string>()
  const [isDateEnabled, setIsDateButtonEnabled] = useState(false)
  const [isAddEnabled, setIsAddButtonEnabled] = useState(false)
  const [employeeName, setEmployeeName] = useState<string>()
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()

  const commonFormatDate = 'l'
  const dispatch = useAppDispatch()
  const whiteText = 'text-white'
  const dangerText = 'text-danger'
  const handleDescription = (comment: string) => {
    setComments(comment)
  }
  console.log(setShowEditor)
  const checkListDetails = {} as GetPeopleForMilestone[]
  const [checkList, setCheckList] = useState(checkListDetails)
  const milestoneNumber = useTypedSelector(
    reduxServices.projectMileStone.selectors.milestoneNumber,
  )
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  const getCRListMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getCRListMilestone,
  )
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  const milestoneWorkDetails = useTypedSelector(
    reduxServices.projectMileStone.selectors.milestoneWorkDetails,
  )
  const history = useHistory()
  useEffect(() => {
    if (plannedEndDate) {
      setIsDateButtonEnabled(true)
    } else {
      setIsDateButtonEnabled(false)
    }
  }, [plannedEndDate])

  useEffect(() => {
    if (title && plannedEndDate && billable && comments) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [plannedEndDate, plannedEndDate, comments, billable])

  console.log(actualEndDate)

  const handleAddMilestone = async () => {
    const addMilestoneResultAction = await dispatch(
      reduxServices.projectMileStone.addProjectMilestone({
        actualDate: actualEndDate as string,
        billable: billable as string,
        comments: comments as string,
        crId: 263,
        milestoneNumber: String(milestoneNumber),
        milestonePercentage: '',
        milestoneTypeFlag: 'false',
        planedDate: plannedEndDate as string,
        projectId: getProjectDetail.id,
        allocatedMilestonePeople: checkList,
        title,
      }),
    )
    if (
      reduxServices.projectMileStone.addProjectMilestone.fulfilled.match(
        addMilestoneResultAction,
      )
    ) {
      history.push(`/viewProject/${getProjectDetail.id}`)
      console.log('test')
    }
  }
  const handleClearDetails = () => {
    setTitle('')
    setPlannedDate('')
    setActualDate('')
    setBillable('')
    setComments('')
  }
  const onChangeHandleFromDate = (date: Date, index: number) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].startDate = moment(date).format('DD/MM/YYYY')
    setCheckList(newMileStone)
  }
  const onChangeHandleToDate = (date: Date, index: number) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].endDate = moment(date).format('DD/MM/YYYY')
    setCheckList(newMileStone)
  }

  const monthWorkingOnChange = (value: string, index: number) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].monthWorkingDays = value
    setCheckList(newMileStone)
  }

  const holidaysOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].holidays = e.target.value
    setCheckList(newMileStone)
  }

  const workingDaysOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].monthWorkingDays = e.target.value
    setCheckList(newMileStone)
  }

  const leavesOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].leaves = e.target.value
    setCheckList(newMileStone)
  }

  const totalDaysOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].totalDays = e.target.value
    setCheckList(newMileStone)
  }

  const hoursOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].hours = e.target.value
    setCheckList(newMileStone)
  }

  const totalHoursOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].totalValue = e.target.value
    setCheckList(newMileStone)
  }

  const roleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].desigination = e.target.value
    setCheckList(newMileStone)
  }

  const billableOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newMileStone: GetPeopleForMilestone[] = JSON.parse(
      JSON.stringify(checkList),
    )
    newMileStone[index].billable = e.target.value
    setCheckList(newMileStone)
  }

  useEffect(() => {
    if (getPeopleMilestone) setCheckList(getPeopleMilestone)
  }, [getPeopleMilestone])
  const employeeData = getPeopleMilestone?.filter(
    (items) => items?.empName === employeeName,
  )
  useEffect(() => {
    if (toDate) {
      dispatch(
        reduxServices.projectMileStone.getWorkDetails({
          empId: Number(employeeData[0].employeeId),
          fromdate: fromDate || '',
          todate: toDate || '',
        }),
      )
    }
  }, [toDate])
  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Title :<span className={title ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="selectSubject"
              id="subjectValue"
              name="subjectValue"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Milestone Number :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="selectSubject"
              id="subjectValue"
              name="subjectValue"
              value={milestoneNumber}
              disabled
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            CR :
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={mileStoneCRDetails}
              onChange={(e) => {
                setMileStoneCRDetails(e.target.value)
              }}
            >
              <option value="">Select Tracker</option>
              {getCRListMilestone.length > 0 &&
                getCRListMilestone.map((item, index) => {
                  return <option key={index}>{item.name}</option>
                })}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Planned End Date:
            <span className={plannedEndDate ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="fromDate"
              data-testid="dateOptionSelect"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              showMonthDropdown
              showYearDropdown
              minDate={new Date()}
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              autoComplete="off"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={
                plannedEndDate
                  ? new Date(plannedEndDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setPlannedDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            End Date :
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="toDate"
              data-testid="dateOptionSelect"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              showMonthDropdown
              showYearDropdown
              minDate={new Date()}
              dropdownMode="select"
              autoComplete="off"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="toDate"
              value={
                actualEndDate
                  ? new Date(actualEndDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setActualDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Billable:{' '}
            <span className={billable ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="billable"
              data-testid="trackerSelect"
              name="billable"
              value={billable}
              onChange={(e) => {
                setBillable(e.target.value)
              }}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            className="col-sm-2 col-form-label text-end"
            data-testid="ckEditor-component"
          >
            Comments:
            <span className={comments ? whiteText : dangerText}>*</span>
          </CFormLabel>
          {showEditor ? (
            <CCol sm={8}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={comments}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="create-btn"
                color="success"
                onClick={handleAddMilestone}
                disabled={!isAddEnabled}
              >
                Add
              </CButton>
              <CButton
                color="warning "
                className="btn-ovh"
                onClick={handleClearDetails}
              >
                Clear
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
      {getProjectDetail.type === 'FIXEDBID' ? (
        ''
      ) : (
        // <MilestonePeopleList isDateEnabled={isDateEnabled} />
        <>
          {/* // <MilestonePeopleList isDateEnabled={isDateEnabled} /> */}
          {checkList.length > 0 ? (
            <>
              <div className="table-scroll">
                <div className="table-responsive colorTable">
                  WD<span style={{ color: 'red' }}>*</span> = Working Days , HD
                  <span style={{ color: 'red' }}>*</span> = Holidays , TD
                  <span style={{ color: 'red' }}>*</span> = Total Days , THrs
                  <span style={{ color: 'red' }}>*</span> = Total Hours.
                </div>
              </div>
              <CTable striped responsive className="sh-project-report-details">
                <CTableHead className="profile-tab-header">
                  <CTableRow>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      ID
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      From Date
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      To Date
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      WD
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      HD
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      Leaves
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      TD
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      Hours
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      THrs
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      Role
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      Billable
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="profile-tab-content"
                    >
                      Comments
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {checkList.length > 0 &&
                  checkList.map((item, index) => {
                    return (
                      <MilestonePeopleList
                        onChangeHandleToDate={onChangeHandleToDate}
                        onChangeHandleFromDate={onChangeHandleFromDate}
                        workingDaysOnChange={workingDaysOnChange}
                        holidaysOnChange={holidaysOnChange}
                        leavesOnChange={leavesOnChange}
                        totalDaysOnChange={totalDaysOnChange}
                        hoursOnChange={hoursOnChange}
                        totalHoursOnChange={totalHoursOnChange}
                        roleOnChange={roleOnChange}
                        billableOnChange={billableOnChange}
                        monthWorkingOnChange={monthWorkingOnChange}
                        item={item}
                        index={index}
                        key={index}
                        // fromDate={fromDate as string}
                        // setFromDate={setFromDate}
                        // toDate={toDate as string}
                        // setToDate={setToDate}
                        employeeName={employeeName as string}
                        setEmployeeName={setEmployeeName}
                      />
                    )
                  })}
              </CTable>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

export default AddMileStoneForm
