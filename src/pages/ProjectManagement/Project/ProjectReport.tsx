import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CSpinner,
  CInputGroup,
  CFormLabel,
  CButton,
  CFormCheck,
  CFormInput,
} from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { SelectFilter } from './ProjectComponent/SelectFilter'
import ProjectReportsTable from './ProjectReportTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { ProjectReportQueryParams } from '../../../types/ProjectManagement/Project/ProjectTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { dateFormat } from '../../../constant/DateFormat'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ProjectReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const listSize = useTypedSelector(
    reduxServices.projectReport.selectors.listSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.projectReport.selectors.isLoading,
  )

  const initValue = {
    endIndex: 20,
    firstIndex: 0,
    health: 'All',
    projectStatus: 'INPROGRESS',
    type: 'All',
    projectDatePeriod: '',
    intrnalOrNot: false,
    multiSearch: '',
  }
  const [params, setParams] = useState<ProjectReportQueryParams>(initValue)
  const [isViewBtnEnable, setViewBtnEnable] = useState(true)

  useEffect(() => {
    dispatch(reduxServices.projectReport.getFetchActiveProjectReports(params))
  }, [dispatch])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    const payload =
      params.projectDatePeriod === 'Custom'
        ? {
            ...params,
            firstIndex: pageSize * (currentPage - 1),
            endIndex: pageSize * currentPage,
            employeeId: Number(employeeId),
          }
        : {
            ...params,
            firstIndex: pageSize * (currentPage - 1),
            endIndex: pageSize * currentPage,
            startdate: '',
            enddate: '',
            employeeId: Number(employeeId),
          }

    dispatch(reduxServices.projectReport.getFetchActiveProjectReports(payload))
  }, [currentPage, dispatch, pageSize])

  const selectDate = [
    { label: 'Select Date', name: 'Select Date' },
    { label: 'Today', name: 'Today' },
    { label: 'Yesterday', name: 'Yesterday' },
    { label: 'Week', name: 'This Week' },
    { label: 'Last Week', name: 'Last Week' },
    { label: 'Last Month', name: 'Last Month' },
    { label: 'Current Month', name: 'Current Month' },
    { label: 'Custom', name: 'Custom' },
  ]

  const selectStatus = [
    { label: 'NEW', name: 'New' },
    { label: 'INPROGRESS', name: 'In Progress' },
    { label: 'ONHOLD', name: 'On Hold' },
    { label: 'CLOSED', name: 'Closed' },
    { label: 'ALL', name: 'All' },
  ]

  const selectPriceModel = [
    { label: 'ALL', name: 'All' },
    { label: 'FIXEDBID', name: 'Fixed  Bid' },
    { label: 'RETAINER', name: 'Retainer' },
    { label: 'SUPPORT', name: 'Support' },
    { label: 'TM', name: 'T&M' },
  ]

  const selectHealth = [
    { label: 'All', name: 'All' },
    { label: 'Gray', name: 'Project not yet started' },
    { label: 'Green', name: 'Good' },
    { label: 'Orange', name: 'Critical' },
    { label: 'Red', name: 'Danger' },
  ]

  const handleSelectDate = (value: string) => {
    if (value === 'Custom') {
      setViewBtnEnable(false)
    } else {
      setViewBtnEnable(true)
    }

    setParams({ ...params, projectDatePeriod: value })
  }

  const handleStatus = (value: string) => {
    setParams({ ...params, projectStatus: value })
  }

  const handlePriceModel = (value: string) => {
    setParams({ ...params, type: value })
  }

  const handleProjectHealth = (value: string) => {
    setParams({ ...params, health: value })
  }

  const handleStartDate = (value: Date) => {
    setParams({ ...params, startdate: moment(value).format(dateFormat) })
  }

  const handleEndDate = (value: Date) => {
    if (
      (params.enddate !== '' || params.enddate != null) &&
      (params.startdate !== '' || params.startdate != null)
    ) {
      setViewBtnEnable(true)
    } else {
      setViewBtnEnable(false)
    }
    setParams({ ...params, enddate: moment(value).format(dateFormat) })
  }

  const handleIsInternalStatus = (value: boolean) => {
    setParams({ ...params, intrnalOrNot: value })
  }

  const handleMultipleSearch = (value: string) => {
    setParams({ ...params, multiSearch: value })
  }

  const viewHandler = () => {
    const payload =
      params.projectDatePeriod === 'Custom'
        ? {
            ...params,
            employeeId: Number(employeeId),
          }
        : {
            ...params,
            startdate: '',
            enddate: '',
            employeeId: Number(employeeId),
          }

    dispatch(
      reduxServices.projectReport.getFetchSearchAllocationReport(payload),
    )
  }

  const clearHandler = () => {
    setViewBtnEnable(true)
    setParams({ ...initValue, projectDatePeriod: '', multiSearch: '' })
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper project-report"
      title="Project Report"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          <CRow className="justify-content-end">
            <CRow>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">Select:</CFormLabel>
              </CCol>
              <CCol sm={2}>
                <SelectFilter
                  list={selectDate}
                  label="Select"
                  name="selectDate"
                  value={params.projectDatePeriod}
                  onChange={handleSelectDate}
                />
              </CCol>

              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">Status:</CFormLabel>
              </CCol>
              <CCol sm={2}>
                <SelectFilter
                  list={selectStatus}
                  label="Status"
                  name="status"
                  value={params.projectStatus}
                  onChange={handleStatus}
                />
              </CCol>

              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">Price Model:</CFormLabel>
              </CCol>
              <CCol sm={2}>
                <SelectFilter
                  list={selectPriceModel}
                  label="Price Model"
                  name="priceModel"
                  value={params.type}
                  onChange={handlePriceModel}
                />
              </CCol>

              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">Project Health:</CFormLabel>
              </CCol>
              <CCol sm={2}>
                <SelectFilter
                  list={selectHealth}
                  label="Project Health"
                  name="projectHealth"
                  value={params.health}
                  onChange={handleProjectHealth}
                />
              </CCol>
            </CRow>
            {params.projectDatePeriod === 'Custom' && (
              <CRow className="mt-2 mb-2">
                <CCol sm={2} md={1} className="text-end">
                  <CFormLabel className="mt-1">
                    From:
                    {(params.startdate == null || params.startdate === '') && (
                      <span className="text-danger">*</span>
                    )}
                  </CFormLabel>
                </CCol>
                <CCol sm={2}>
                  <DatePicker
                    id="startDate"
                    className="form-control form-control-sm sh-date-picker"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    data-testid="start-date-picker"
                    placeholderText="dd/mm/yy"
                    dateFormat="dd/mm/yy"
                    name="startDate"
                    value={params.startdate}
                    onChange={(date: Date) => handleStartDate(date)}
                  />
                </CCol>

                <CCol sm={2} md={1} className="text-end">
                  <CFormLabel className="mt-1">
                    To:
                    {(params.enddate == null || params.enddate === '') && (
                      <span className="text-danger">*</span>
                    )}
                  </CFormLabel>
                </CCol>
                <CCol sm={2}>
                  <DatePicker
                    id="endDate"
                    className="form-control form-control-sm sh-date-picker"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    data-testid="start-date-picker"
                    placeholderText="dd/mm/yy"
                    dateFormat="dd/mm/yy"
                    name="endDate"
                    value={params.enddate}
                    onChange={(date: Date) => handleEndDate(date)}
                  />
                </CCol>
              </CRow>
            )}
            <CRow className="mt-4 mb-4">
              <CCol sm={{ span: 10, offset: 2 }}>
                <CButton
                  className="cursor-pointer"
                  color="success btn-ovh me-1"
                  onClick={viewHandler}
                  disabled={!isViewBtnEnable}
                >
                  View
                </CButton>
                <CButton
                  className="cursor-pointer"
                  color="warning btn-ovh me-1"
                  onClick={clearHandler}
                >
                  Clear
                </CButton>
                <div className="d-md-flex justify-content-md-end pull-right">
                  <CButton color="info btn-ovh me-0">
                    <i className="fa fa-plus me-1"></i>Click to Export
                  </CButton>
                  &nbsp; &nbsp; &nbsp;
                  <Link to="/addProject">
                    <CButton color="info btn-ovh me-0">
                      <i className="fa fa-plus me-1"></i>Add Project
                    </CButton>
                  </Link>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <div className="d-md-flex justify-content-md-end pull-right">
                <CFormCheck
                  inline
                  type="checkbox"
                  name="internalProject"
                  data-testid="internalProject"
                  id="internalProject"
                  label="Search For Internal Project"
                  onChange={(event) =>
                    handleIsInternalStatus(event.target.checked)
                  }
                  checked={params.intrnalOrNot}
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
                    value={params.multiSearch}
                    onChange={(event) =>
                      handleMultipleSearch(event.target.value)
                    }
                  />
                  <CButton
                    data-testid="multi-search-btn"
                    className="cursor-pointer"
                    type="button"
                    color="info"
                    id="search-field"
                    onClick={viewHandler}
                    disabled={
                      params.multiSearch == null || params.multiSearch === ''
                    }
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
            />
            {/* <CTable striped align="middle">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell className="text-center"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">Project Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Pricing Model</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Client</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Resources</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Project Manager
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Delivery Manager
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {projectReports?.Projs.map((value, index) => {
                  return (
                    <>
                      <CTableRow key={index}>
                        <CTableDataCell className="text-center">
                          <i className="fa fa-minus-circle cursor-pointer" />
                        </CTableDataCell>

                        <CTableDataCell>{value.projectCode}</CTableDataCell>
                        <CTableDataCell>{value.projectName}</CTableDataCell>
                        <CTableDataCell>{value.type}</CTableDataCell>
                        <CTableDataCell>{value.client}</CTableDataCell>
                        <CTableDataCell>{value.count}</CTableDataCell>
                        <CTableDataCell>{value.managerName}</CTableDataCell>
                        <CTableDataCell>{value.deliveryManager}</CTableDataCell>
                        <CTableDataCell>{value.startdate}</CTableDataCell>
                        <CTableDataCell>{value.enddate}</CTableDataCell>
                        <CTableDataCell>{value.status}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            className="cursor-pointer"
                            color="danger btn-sm me-1"
                            data-testid="reject-btn"
                          >
                            <i
                              className="fa fa-times text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell style={{ width: '120px' }}>
                          <CButton
                            className="cursor-pointer"
                            color="info btn-sm me-1"
                            data-testid="view-btn"
                          >
                            <i
                              className="fa fa-eye text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                          <CButton
                            className="cursor-pointer"
                            color="primary btn-sm me-1"
                            data-testid="edit-btn"
                          >
                            <i
                              className="fa fa-edit text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                          <CButton
                            className="cursor-pointer"
                            color="danger btn-sm me-1"
                            data-testid="delete-btn"
                          >
                            <i
                              className="fa fa-trash-o text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    </>
                  )
                })}
              </CTableBody>
            </CTable>
            <CRow>
              <CCol xs={4}>
                <p>
                  <strong>Total Records: {projectReports.Projsize}</strong>
                </p>
              </CCol>
              <CCol xs={3}>
                {projectReports.Projsize > 20 && (
                  <OPageSizeSelect
                    handlePageSizeSelectChange={handlePageSizeSelectChange}
                    options={[20, 40, 60, 80]}
                    selectedPageSize={projectReports.Projsize}
                  />
                )}
              </CCol>
              {projectReports.Projsize > 20 && (
                <CCol
                  xs={5}
                  className="gap-1 d-grid d-md-flex justify-content-md-end"
                >
                  <OPagination
                    currentPage={currentPage}
                    pageSetter={setCurrentPage}
                    paginationRange={paginationRange}
                  />
                </CCol>
              )}
            </CRow> */}
          </CRow>
        </>
      ) : (
        <CCol data-testid="spinner">
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </OCard>
  )
}

export default ProjectReport
