import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormCheck,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import ProjectReportsTable from './ProjectReportTable'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OCard from '../../../components/ReusableComponent/OCard'
import { downloadFile, showIsRequired } from '../../../utils/helper'
import AddProject from '../../../middleware/api/ProjectManagement/Project'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { UserAccessToFeatures } from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const ProjectReport = (): JSX.Element => {
  const getSelectedValue = useTypedSelector(
    reduxServices.projectReport.selectors.getSelectValue,
  )
  const getProjectStatus = useTypedSelector(
    reduxServices.projectReport.selectors.getStatusValue,
  )
  const getPricingModel = useTypedSelector(
    reduxServices.projectReport.selectors.getPricingModel,
  )
  const getProjectHealth = useTypedSelector(
    reduxServices.projectReport.selectors.getProjectHealth,
  )
  const getCustomFromValue = useTypedSelector(
    reduxServices.projectReport.selectors.getCustomFromValue,
  )
  const getCustomToValue = useTypedSelector(
    reduxServices.projectReport.selectors.getCustomToValue,
  )
  const [Select, setSelect] = useState<string>(getSelectedValue)
  const [projectStatus, setProjectStatus] = useState<string>(getProjectStatus)
  const [pricingModel, setPricingModel] = useState<string>(getPricingModel)
  const [projectHealth, setProjectHealth] = useState<string>(getProjectHealth)
  const [checked, setChecked] = useState<boolean>(false)
  const [multiSearch, setMultiSearch] = useState<string>('')
  const [selectFromDate, setSelectFromDate] = useState<Date | string>(
    getCustomFromValue,
  )
  const [selectToDate, setSelectToDate] = useState<Date | string>(
    getCustomToValue,
  )
  const SelectDateVersion = 'Select Date'
  const [isCloseBtnVisible, setIsCloseBtnVisible] = useState(true)
  const dispatch = useAppDispatch()
  const projectReports = useTypedSelector(
    reduxServices.projectReport.selectors.projectReports,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Projects',
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const listSize = useTypedSelector(
    reduxServices.projectReport.selectors.listSize,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)
  // const handleExportProjectList = async () => {
  //   const projectListDownload = await AddProject.exportProjectList({
  //     employeeId: Number(employeeId),
  //     projectStatus: params.projectStatus,
  //     type: params.type,
  //     health: params.health,
  //     startdate: params.startdate as string,
  //     enddate: params.enddate as string,
  //     multiSearch: params.multiSearch as string,
  //     projectDatePeriod: params.projectDatePeriod as string,
  //     intrnalOrNot: params.intrnalOrNot as boolean,
  //   })
  //   downloadFile(projectListDownload, 'ProjectList.csv')
  // }

  const handleExportProjectList = async () => {
    const projectListDownload = await AddProject.exportProjectList({
      employeeId: Number(employeeId),
      projectStatus,
      type: 'All',
      health: 'All',
      startdate: '',
      enddate: '',
      multiSearch: '',
      projectDatePeriod: Select,
      intrnalOrNot: false,
    })

    downloadFile(projectListDownload, 'ProjectList.csv')
  }
  const commonFormatDate = 'l'
  const fromDateValue = selectFromDate
    ? new Date(selectFromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const toDateValue = selectToDate
    ? new Date(selectToDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''
  useEffect(() => {
    dispatch(
      reduxServices.projectReport.getFetchSearchAllocationReport({
        employeeId: Number(employeeId),
        endIndex: pageSize * currentPage,
        enddate: '',
        firstIndex: pageSize * (currentPage - 1),
        health: projectHealth || 'All',
        intrnalOrNot: false,
        multiSearch: '',
        projectDatePeriod: Select || SelectDateVersion,
        projectStatus: projectStatus || 'ALL',
        startdate: '',
        type: pricingModel || 'All',
      }),
    )
  }, [currentPage, dispatch, pageSize])

  const viewBtnHandler = () => {
    dispatch(
      reduxServices.projectReport.getFetchSearchAllocationReport({
        employeeId: Number(employeeId),
        endIndex: pageSize * currentPage,
        enddate: toDateValue,
        firstIndex: pageSize * (currentPage - 1),
        health: projectHealth || 'All',
        intrnalOrNot: false,
        multiSearch: '',
        projectDatePeriod: Select || SelectDateVersion,
        projectStatus: projectStatus || 'ALL',
        startdate: fromDateValue,
        type: pricingModel || 'All',
      }),
    )
  }
  const searchBtnHandler = () => {
    dispatch(
      reduxServices.projectReport.getFetchSearchAllocationReport({
        employeeId: Number(employeeId),
        endIndex: pageSize * currentPage,
        enddate: toDateValue,
        firstIndex: pageSize * (currentPage - 1),
        health: projectHealth || 'All',
        intrnalOrNot: false,
        multiSearch,
        projectDatePeriod: Select || SelectDateVersion,
        projectStatus: projectStatus || 'ALL',
        startdate: fromDateValue,
        type: pricingModel || 'All',
      }),
    )
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper project-report"
        title="Project Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CRow>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">Select:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="Select"
                data-testid="form-select1"
                name="Select"
                value={Select}
                onChange={(e) => {
                  dispatch(
                    reduxServices.projectReport.actions.setSelectValue(
                      e.target.value,
                    ),
                  )
                  setSelect(e.target.value)
                }}
              >
                <option value="">Select Date</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="Last Week">Last Week</option>
                <option value="Last Month">Last Month</option>
                <option value="Current Month">Current Month</option>
                <option value="Custom">Custom</option>
              </CFormSelect>
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">Status:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="employeeStatus"
                data-testid="form-select3"
                name="employeeStatus"
                value={projectStatus}
                onChange={(e) => {
                  dispatch(
                    reduxServices.projectReport.actions.setStatusValue(
                      e.target.value,
                    ),
                  )
                  setProjectStatus(e.target.value)
                }}
              >
                <option value="New">New</option>
                <option value="INPROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
                <option value="ALL">All</option>
              </CFormSelect>
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">Pricing Model:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="employeeStatus"
                data-testid="form-select3"
                name="employeeStatus"
                value={pricingModel}
                onChange={(e) => {
                  dispatch(
                    reduxServices.projectReport.actions.setPricingModel(
                      e.target.value,
                    ),
                  )
                  setPricingModel(e.target.value)
                }}
              >
                <option value="All">All</option>
                <option value="FIXEDBID">Fixed Bid</option>
                <option value="RETAINER">Retainer</option>
                <option value="SUPPORT">Support</option>
                <option value="TM">T&amp;M</option>
              </CFormSelect>
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">Project Health:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="employeeStatus"
                data-testid="form-select3"
                name="employeeStatus"
                value={projectHealth}
                onChange={(e) => {
                  dispatch(
                    reduxServices.projectReport.actions.setProjectHealth(
                      e.target.value,
                    ),
                  )
                  setProjectHealth(e.target.value)
                }}
              >
                <option value="All">All</option>
                <option value="Gray">Project not yet started</option>
                <option value="Green">Good</option>
                <option value="Orange">Critical</option>
                <option value="Red">Danger</option>
              </CFormSelect>
            </CCol>
          </CRow>
          {Select === 'Custom' && (
            <CRow className="mt-2 mb-2">
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">
                  From:
                  <span className={showIsRequired(selectFromDate as string)}>
                    *
                  </span>
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <DatePicker
                  autoComplete="off"
                  id="startDate"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  dateFormat="dd/mm/yy"
                  name="startDate"
                  value={fromDateValue}
                  onChange={(date: Date) => {
                    dispatch(
                      reduxServices.projectReport.actions.setCustomFromValue(
                        date,
                      ),
                    )
                    setSelectFromDate(date)
                  }}
                  selected={selectFromDate as Date}
                />
              </CCol>

              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">
                  To:
                  <span className={showIsRequired(selectToDate as string)}>
                    *
                  </span>
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <DatePicker
                  autoComplete="off"
                  id="endDate"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yy"
                  dateFormat="dd/mm/yy"
                  name="endDate"
                  value={toDateValue}
                  onChange={(date: Date) => {
                    dispatch(
                      reduxServices.projectReport.actions.setCustomToValue(
                        date,
                      ),
                    )
                    setSelectToDate(date)
                  }}
                  selected={selectToDate as Date}
                />
              </CCol>
            </CRow>
          )}
          <CRow className="mt-4 mb-4">
            <CCol sm={{ span: 10, offset: 2 }}>
              <CButton
                className="cursor-pointer"
                color="success btn-ovh me-1"
                onClick={viewBtnHandler}
                // disabled={!isViewBtnEnable}
              >
                View
              </CButton>
              <CButton
                className="cursor-pointer"
                color="warning btn-ovh me-1"
                data-testid="clearButton"
                // onClick={clearHandler}
              >
                Clear
              </CButton>
              <div className="d-md-flex justify-content-md-end pull-right">
                {projectReports?.length > 0 && (
                  <CButton
                    color="info btn-ovh me-0"
                    onClick={handleExportProjectList}
                  >
                    <i className="fa fa-plus me-1"></i>Click to Export
                  </CButton>
                )}
                &nbsp; &nbsp; &nbsp;
                {userAccess?.createaccess && (
                  <Link to="/addProject">
                    <CButton color="info btn-ovh me-0" data-testid="addButton">
                      <i className="fa fa-plus me-1"></i>Add Project
                    </CButton>
                  </Link>
                )}
              </div>
            </CCol>
          </CRow>
          <CRow>
            <div className="d-md-flex justify-content-md-end pull-right">
              <CFormCheck
                className="ticket-search-checkbox"
                inline
                type="checkbox"
                name="internalProject"
                data-testid="internalProject"
                id="internalProject"
                label="Search For Internal Project"
                onChange={(event) => setChecked(event.target.checked)}
                checked={checked}
              />
            </div>
          </CRow>
          <CRow className="gap-2 d-md-flex justify-content-md-end">
            <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
              <CInputGroup className="global-search me-0">
                <CFormInput
                  placeholder="Multiple Search"
                  aria-label="Multiple Search"
                  aria-describedby="search-field"
                  data-testid="multi-search-input"
                  value={multiSearch}
                  onChange={(event) => setMultiSearch(event.target.value)}
                  onKeyUp={searchBtnHandler}
                />
                <CButton
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="search-field"
                  onClick={searchBtnHandler}
                  disabled={!multiSearch}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
          </CRow>
        </CRow>
        <CRow className="justify-content-end mt-3">
          <ProjectReportsTable
            paginationRange={paginationRange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isCloseBtnVisible={isCloseBtnVisible}
            userAccess={userAccess as UserAccessToFeatures}
          />
        </CRow>
      </OCard>
    </>
  )
}

export default ProjectReport
