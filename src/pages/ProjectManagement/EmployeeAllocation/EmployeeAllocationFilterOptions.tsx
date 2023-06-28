import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import React, { useMemo, useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import EmployeeAllocationReportTable from './EmployeeAllocationReportTable'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  deviceLocale,
  downloadFile,
  showIsRequired,
} from '../../../utils/helper'
import { EmployeeDepartment } from '../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import employeeAllocationReportApi from '../../../middleware/api/ProjectManagement/EmployeeAllocation/employeeAllocationApi'

const EmployeeAllocationFilterOptions = ({
  Select,
  setSelect,
}: {
  Select: string
  setSelect: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const currentMonth = 'Current Month'
  const [billingStatus, setBillingStatus] = useState<string>('All')
  const [allocationStatus, setAllocationStatus] = useState<string>('')
  const [selectTechnology, setSelectTechnology] = useState<string>('')
  const [selectDepartment, setSelectDepartment] = useState<
    EmployeeDepartment[]
  >([])
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedKRA, setSelectedKRA] = useState(0)
  const [dateError, setDateError] = useState<boolean>(false)
  const [fromDate, setFromDate] = useState<Date | string>()
  const [toDate, setToDate] = useState<Date | string>()
  const [searchInput, setSearchInput] = useState<string>('')

  const dispatch = useAppDispatch()
  const commonFormatDate = 'l'
  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )

  const departmentsList = useTypedSelector(
    reduxServices.newEmployee.employeeDepartmentsService.selectors
      .employeeDepartments,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessAllocationFeature = userAccessToFeatures?.find(
    (feature) => feature.name === 'Hierarchy Employee Allocation',
  )

  const userAccessIndividualAllocationFeature = userAccessToFeatures?.find(
    (feature) => feature.name === 'Individual Employee Allocation',
  )

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      reduxServices.newEmployee.employeeDepartmentsService.getEmployeeDepartments(),
    )
  }, [dispatch])

  useEffect(() => {
    if (Select !== 'Custom') {
      setFromDate('')
      setToDate('')
    }
  }, [Select])

  useEffect(() => {
    dispatch(
      reduxServices.employeeAllocationReport.getEmployeeAllocationReport({
        Billingtype: billingStatus,
        EmployeeStatus: '',
        dateSelection: Select,
        departmentNames: [],
        employeeName: '',
        endIndex: 20,
        enddate: '',
        firstIndex: 0,
        startdate: '',
        technology: '',
      }),
    )
  }, [dispatch])

  const handleViewBtnHandler = () => {
    dispatch(
      reduxServices.employeeAllocationReport.getEmployeeAllocationReport({
        Billingtype: billingStatus,
        EmployeeStatus: allocationStatus,
        dateSelection: Select,
        departmentNames: selectDepartment?.map((item) =>
          item.departmentName.toString(),
        ),
        employeeName: '',
        endIndex: 20,
        startdate: fromDate
          ? new Date(fromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        enddate: toDate
          ? new Date(toDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        firstIndex: 0,
        technology: selectTechnology,
      }),
    )
  }
  // eslint-disable-next-line consistent-return
  const sortedTechnologies = useMemo(() => {
    if (getTechnologies) {
      return getTechnologies
        .slice()
        .sort((technology1, technology2) =>
          technology1.name.localeCompare(technology2.name),
        )
    }
  }, [getTechnologies])

  const clearBtnHandler = () => {
    setSelect('Current Month')
    setBillingStatus('All')
    setSelectTechnology('')
    setAllocationStatus('')
    setSelectDepartment([])
    setFromDate('')
    setToDate('')
    dispatch(
      reduxServices.employeeAllocationReport.getEmployeeAllocationReport({
        Billingtype: 'All',
        EmployeeStatus: '',
        dateSelection: currentMonth,
        departmentNames: [],
        employeeName: '',
        endIndex: 20,
        enddate: '',
        firstIndex: 0,
        startdate: '',
        technology: '',
      }),
    )
    setIsIconVisible(false)
  }

  const handleSearchResult = () => {
    dispatch(
      reduxServices.employeeAllocationReport.getEmployeeAllocationReport({
        Billingtype: billingStatus,
        EmployeeStatus: allocationStatus,
        dateSelection: Select,
        departmentNames: selectDepartment?.map((currentItem) =>
          currentItem.departmentName.toString(),
        ),
        employeeName: searchInput,
        endIndex: 20,
        startdate: fromDate
          ? new Date(fromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        enddate: toDate
          ? new Date(toDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        firstIndex: 0,
        technology: selectTechnology,
      }),
    )
  }

  const handleExportEmployeeAllocation = async () => {
    const employeeEmployeeAllocationReportDownload =
      await employeeAllocationReportApi.exportEmployeeAllocationData({
        id: employeeId,
        startIndex: 0,
        endIndex: 20,
        empName: '',
        technology: '',
        isbillable: billingStatus,
        isAllocated: '',
        startdate: '',
        lastdate: '',
        departmentNames:
          'Networking,Administrative,HR,Accounts,Designing,Development,Sales,Testing,Business Analyst,Presales,Marketing,Software Quality Assurance',
        dateSelection: Select,
      })
    downloadFile(
      employeeEmployeeAllocationReportDownload,
      'EmployeeAllocationList.csv',
    )
  }

  const handleDepartmentMultiSelect = (list: EmployeeDepartment[]) => {
    setSelectDepartment(list)
  }

  const handleOnRemoveDepartmentSelectedOption = (
    selectedList: EmployeeDepartment[],
  ) => {
    setSelectDepartment(selectedList)
  }

  useEffect(() => {
    const newFromDate = new Date(
      moment(fromDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(toDate?.toString()).format(commonFormatDate),
    )
    if (fromDate && toDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [fromDate, toDate])

  const toDateValue = toDate
    ? new Date(toDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const fromDateValue = fromDate
    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''
  const ProjectReportViewUserAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project ReportView',
  )
  const employeeAllocationReport = useTypedSelector(
    reduxServices.employeeAllocationReport.selectors.employeeAllocationReport,
  )

  return (
    <>
      {ProjectReportViewUserAccess?.viewaccess && (
        <CRow className="employeeAllocation-form">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Select:</CFormLabel>
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
                setSelect(e.target.value)
              }}
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
              <option value="Current Month">Current Month</option>
              <option value="Custom">Custom</option>
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel>Employee Billing Status:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="billingStatus"
              data-testid="form-select2"
              name="billingStatus"
              value={billingStatus}
              onChange={(e) => setBillingStatus(e.target.value)}
            >
              <option value="All" selected>
                All
              </option>
              <option value="true">Billable</option>
              <option value="false">Non-Billable</option>
              <option value="onBench">Bench</option>
            </CFormSelect>
          </CCol>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel>Allocation Status:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="allocationStatus"
              data-testid="form-select3"
              name="allocationStatus"
              value={allocationStatus}
              onChange={(e) => setAllocationStatus(e.target.value)}
            >
              <option value="true">Allocated</option>
              <option value="false">De-Allocated</option>
            </CFormSelect>
          </CCol>

          {!userAccessAllocationFeature?.viewaccess &&
            !userAccessIndividualAllocationFeature?.viewaccess && (
              <>
                <CCol sm={2} md={1} className="text-end">
                  <CFormLabel className="mt-2">Department:</CFormLabel>
                </CCol>

                <CCol sm={2}>
                  <Multiselect
                    className="ovh-multiselect"
                    data-testid="department-option"
                    options={
                      departmentsList?.map((department) => department) || []
                    }
                    displayValue="departmentName"
                    placeholder="Select"
                    selectedValues={selectDepartment}
                    onSelect={(list: EmployeeDepartment[]) =>
                      handleDepartmentMultiSelect(list)
                    }
                    onRemove={(selectedList: EmployeeDepartment[]) =>
                      handleOnRemoveDepartmentSelectedOption(selectedList)
                    }
                  />
                </CCol>
              </>
            )}
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-2">Technology:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="technology"
              data-testid="technology-select1"
              name="technology"
              value={selectTechnology}
              onChange={(e) => {
                setSelectTechnology(e.target.value)
              }}
            >
              <option value={''}>Select</option>
              {sortedTechnologies?.map((certificateItem, index) => (
                <option key={index} value={certificateItem.name}>
                  {certificateItem.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          {Select === 'Custom' ? (
            <>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">
                  From:{' '}
                  <span className={showIsRequired(fromDate as string)}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <DatePicker
                  className="form-control form-control-sm sh-date-picker"
                  data-testid="date-picker"
                  placeholderText="dd/mm/yy"
                  name="fromDate"
                  maxDate={new Date()}
                  autoComplete="off"
                  id="fromDate"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  value={fromDateValue}
                  onChange={(date: Date) => setFromDate(date)}
                  selected={fromDate as Date}
                />
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">
                  To:<span className={showIsRequired(toDate as string)}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <DatePicker
                  className="form-control form-control-sm sh-date-picker"
                  data-testid="date-picker"
                  placeholderText="dd/mm/yy"
                  name="toDate"
                  id="toDate"
                  autoComplete="off"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  value={toDateValue}
                  onChange={(date: Date) => setToDate(date)}
                  selected={toDate as Date}
                />
                {dateError && (
                  <span className="text-danger" data-testid="errorMessage">
                    To date should be greater than From date
                  </span>
                )}
              </CCol>
            </>
          ) : (
            <></>
          )}
          <CCol className="employee-allocation-export-btn">
            {employeeAllocationReport?.Empsize > 0 && (
              <CButton
                color="info btn-ovh me-0"
                data-testid="export-btn"
                onClick={handleExportEmployeeAllocation}
              >
                <i className="fa fa-plus me-1"></i>Click to Export
              </CButton>
            )}
          </CCol>
        </CRow>
      )}
      {ProjectReportViewUserAccess?.viewaccess && (
        <CRow className="mt-5 mb-4">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              data-testid="view-btn"
              onClick={handleViewBtnHandler}
              disabled={
                Select === 'Custom' && !(fromDate !== '' && toDate !== '')
              }
            >
              View
            </CButton>
            <CButton
              className="cursor-pointer"
              disabled={false}
              data-testid="clear-btn"
              color="warning btn-ovh me-1"
              onClick={clearBtnHandler}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      )}
      {ProjectReportViewUserAccess?.viewaccess && (
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={3} md={4} lg={5} xl={4} xxl={3}>
            <CInputGroup className="global-search me-0">
              <CFormInput
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                data-testid="search-input"
                aria-describedby="button-addon2"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
              />
              <CButton
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={handleSearchResult}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      )}
      <CCol xs={12} className="mt-3 ms-3">
        <CCol xs={12}>
          <EmployeeAllocationReportTable
            Select={Select}
            toDate={toDate as string}
            allocationStatus={allocationStatus}
            billingStatus={billingStatus}
            fromDate={fromDate as string}
            isIconVisible={isIconVisible}
            selectedKRA={selectedKRA}
            setIsIconVisible={setIsIconVisible}
            setSelectedKRA={setSelectedKRA}
          />
        </CCol>
      </CCol>
    </>
  )
}
export default EmployeeAllocationFilterOptions
