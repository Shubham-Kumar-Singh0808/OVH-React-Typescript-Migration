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
import EditMileStonePeopleList from './EditMileStonePeopleList'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { ckeditorConfig } from '../../../../../../utils/ckEditorUtils'
import { AllocatedMilestonePeople } from '../../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

const EditMileStoneForm = (): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [mileStoneCRDetails, setMileStoneCRDetails] = useState<string>()
  const [plannedEndDate, setPlannedDate] = useState<string>()
  const [actualEndDate, setActualDate] = useState<string>()
  const [billable, setBillable] = useState<string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [comments, setComments] = useState<string>()
  const projectAllocatedPeopleMilestone = {} as AllocatedMilestonePeople[]
  const [peopleListMilestone, setPeopleListMilestone] = useState(
    projectAllocatedPeopleMilestone,
  )
  const commonFormatDate = 'l'
  const dispatch = useAppDispatch()
  const [holiDays, setHoliDays] = useState<string>()
  const [workDays, setWorkDays] = useState<string>()
  const [leaves, setLeaves] = useState<string>()
  const [totalDays, setTotalDays] = useState<string>()
  const [hours, setHours] = useState<string>()
  const [totalHours, setTotalHours] = useState<string>()
  const history = useHistory()
  const whiteText = 'text-white'
  const dangerText = 'text-danger'
  const handleDescription = (comment: string) => {
    setComments(comment)
  }
  const getProjectDetail = useTypedSelector(
    reduxServices.projectMileStone.selectors.getMilestone,
  )

  const getProjectMilestoneDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  console.log(setShowEditor)
  useEffect(() => {
    if (getProjectDetail != null) {
      setTitle(getProjectDetail.title)
      setPlannedDate(getProjectDetail.planedDate)
      setActualDate(getProjectDetail.actualDate)
      setBillable(getProjectDetail.billable)
      setComments(getProjectDetail.comments)
      setPeopleListMilestone(
        getProjectDetail.allocatedMilestonePeople as AllocatedMilestonePeople[],
      )
    }
  }, [getProjectDetail])

  const onChangeHandleFromDate = (date: Date, index: number) => {
    const newMileStone: AllocatedMilestonePeople[] = JSON.parse(
      JSON.stringify(peopleListMilestone),
    )
    newMileStone[index].startDate = moment(date).format('DD/MM/YYYY')
    setPeopleListMilestone(newMileStone)
  }
  const onChangeHandleToDate = (date: Date, index: number) => {
    const newMileStone: AllocatedMilestonePeople[] = JSON.parse(
      JSON.stringify(peopleListMilestone),
    )
    newMileStone[index].endDate = moment(date).format('DD/MM/YYYY')
    setPeopleListMilestone(newMileStone)
  }
  const roleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newMileStone: AllocatedMilestonePeople[] = JSON.parse(
      JSON.stringify(peopleListMilestone),
    )
    newMileStone[index].role = e.target.value
    setPeopleListMilestone(newMileStone)
  }

  const billableOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newMileStone: AllocatedMilestonePeople[] = JSON.parse(
      JSON.stringify(peopleListMilestone),
    )
    newMileStone[index].billable = e.target.value
    setPeopleListMilestone(newMileStone)
  }

  const handleUpdateMilestoneHandler = async () => {
    const addMilestoneResultAction = await dispatch(
      reduxServices.projectMileStone.updateProjectMilestone({
        actualDate: actualEndDate as string,
        billable: getProjectDetail.billable as string,
        comments: comments as string,
        crId: 263,
        milestoneNumber: getProjectDetail.milestoneNumber,
        milestonePercentage: getProjectDetail.milestonePercentage,
        milestoneTypeFlag: getProjectDetail.milestoneTypeFlag,
        planedDate: plannedEndDate as string,
        projectId: getProjectDetail.projectId,
        allocatedMilestonePeople: peopleListMilestone,
        title,
        client: getProjectDetail.client,
        crDuration: getProjectDetail.crDuration,
        crName: getProjectDetail.crName,
        effort: getProjectDetail.effort,
        enableReopenFlag: getProjectDetail.enableReopenFlag,
        id: getProjectDetail.id,
        invoiceExits: getProjectDetail.invoiceExits,
        invoiceReopenFlag: getProjectDetail.invoiceReopenFlag,
        invoiceStatus: getProjectDetail.invoiceStatus,
        isClosed: getProjectDetail.isClosed,
        milestoneAmount: getProjectDetail.milestoneAmount,
        milestonePeopleDTO: getProjectDetail.milestonePeopleDTO,
        project: getProjectDetail.project,
        projectType: getProjectDetail.projectType,
        raisedInvoicePercentage: getProjectDetail.raisedInvoicePercentage,
        remainingPercentage: getProjectDetail.remainingPercentage,
      }),
    )
    if (
      reduxServices.projectMileStone.updateProjectMilestone.fulfilled.match(
        addMilestoneResultAction,
      )
    ) {
      history.push(`/viewProject/${getProjectDetail.id}`)
    }
  }

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
              value={getProjectDetail.milestoneNumber}
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
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Planned End Date: :
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
              value={plannedEndDate}
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
              value={actualEndDate}
              onChange={(date: Date) =>
                setActualDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Billable:: :
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={billable}
              onChange={(e) => {
                setBillable(e.target.value)
              }}
            >
              <option value="">Select Tracker</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            className="col-sm-2 col-form-label text-end"
            data-testid="ckEditor-component"
          >
            Comments: :
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
        {getProjectMilestoneDetail.type === 'FIXEDBID' ? (
          ''
        ) : (
          <>
            {peopleListMilestone?.length > 0 ? (
              <>
                <div className="table-scroll">
                  <div className="table-responsive colorTable">
                    WD<span style={{ color: 'red' }}>*</span> = Working Days ,
                    HD
                    <span style={{ color: 'red' }}>*</span> = Holidays , TD
                    <span style={{ color: 'red' }}>*</span> = Total Days , THrs
                    <span style={{ color: 'red' }}>*</span> = Total Hours.
                  </div>
                </div>
                <CTable
                  striped
                  responsive
                  className="sh-project-report-details"
                >
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
                  {/* {peopleListMilestone.length > 0 &&
                    peopleListMilestone.map((item, index) => {
                      return (
                        <EditMileStonePeopleList
                          onChangeHandleToDate={onChangeHandleToDate}
                          onChangeHandleFromDate={onChangeHandleFromDate}
                          roleOnChange={roleOnChange}
                          billableOnChange={billableOnChange}
                          // monthWorkingOnChange={monthWorkingOnChange}
                          // peopleListHolidays={peopleListHolidays}
                          // peopleListLeaves={peopleListLeaves}
                          // peopleListTotalDays={peopleListTotalDays}
                          // peopleListHours={peopleListHours}
                          // peopleListTotalValue={peopleListTotalValue}
                          item={item as AllocatedMilestonePeople}
                          index={index}
                          key={index}
                          workDays={workDays}
                          setWorkDays={setWorkDays}
                          holiDays={holiDays as string}
                          setHoliDays={setHoliDays}
                          leaves={leaves as string}
                          setLeaves={setLeaves}
                          totalDays={totalDays as string}
                          setTotalDays={setTotalDays}
                          hours={hours as string}
                          setHours={setHours}
                          totalHours={totalHours as string}
                          setTotalHours={setTotalHours}
                        />
                      )
                    })} */}
                </CTable>
              </>
            ) : (
              ''
            )}
          </>
        )}
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="create-btn"
                color="success"
                onClick={handleUpdateMilestoneHandler}
                // disabled={!isCreateButtonEnabled || dateError}
              >
                Update
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EditMileStoneForm
