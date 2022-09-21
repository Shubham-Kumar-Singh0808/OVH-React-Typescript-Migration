import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import React, { useMemo, useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import EmployeeAllocationReportTable from './EmployeeAllocationReportTable'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { downloadFile, showIsRequired } from '../../../utils/helper'
import employeeAllocationReportApi from '../../../middleware/api/ProjectManagement/EmployeeAllocation/employeeAllocationApi'
import { EmployeeDepartment } from '../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const EmployeeAllocationFilterOptions = (): JSX.Element => {
  const [Select, setSelect] = useState<string>('Current Month')
  const [billingStatus, setBillingStatus] = useState<string>('All')
  const [allocationStatus, setAllocationStatus] = useState<string>('')
  const [selectTechnology, setSelectTechnology] = useState<string>('')
  const [selectDepartment, setSelectDepartment] = useState<
    EmployeeDepartment[]
  >([])
  const [showSelectCustom, setShowSelectCustom] = useState<boolean>(false)
  const [fromDate, setFromDate] = useState<Date | string>()
  const [toDate, setToDate] = useState<Date | string>()
  const [searchInput, setSearchInput] = useState<string>('')
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const dispatch = useAppDispatch()

  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )

  const departmentsList = useTypedSelector(
    reduxServices.newEmployee.employeeDepartmentsService.selectors
      .employeeDepartments,
  )

  const isLoading = useTypedSelector(
    reduxServices.employeeAllocationReport.selectors.isLoading,
  )
  const commonFormatDate = 'DD/MM/YYYY'
  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      reduxServices.newEmployee.employeeDepartmentsService.getEmployeeDepartments(),
    )
  }, [dispatch])

  useEffect(() => {
    if (Select === 'Custom') {
      setShowSelectCustom(true)
    } else {
      setShowSelectCustom(false)
    }
  })

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

  const handleViewButtonHandler = () => {
    dispatch(
      reduxServices.employeeAllocationReport.getEmployeeAllocationReport({
        Billingtype: billingStatus,
        EmployeeStatus: allocationStatus,
        dateSelection: Select,
        departmentNames: selectDepartment?.map((currentItem) =>
          currentItem.departmentName.toString(),
        ),
        employeeName: '',
        endIndex: 20,
        startdate: moment(fromDate).format(commonFormatDate),
        enddate: moment(toDate).format(commonFormatDate),
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

  const clearButtonHandler = () => {
    setSelect('Current Month')
    setBillingStatus('All')
    setSelectTechnology('')
    setAllocationStatus('')
    setSelectDepartment([])
    setFromDate('')
    setToDate('')
  }

  const handleSearch = () => {
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
        startdate: moment(fromDate).format(commonFormatDate),
        enddate: moment(toDate).format(commonFormatDate),
        firstIndex: 0,
        technology: selectTechnology,
      }),
    )
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
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
          startdate: moment(fromDate).format(commonFormatDate),
          enddate: moment(toDate).format(commonFormatDate),
          firstIndex: 0,
          technology: selectTechnology,
        }),
      )
    }
  }

  const handleExportEmployeeAllocation = async () => {
    const employeeEmployeeAllocationReportDownload =
      await employeeAllocationReportApi.ExportEmployeeAllocationReportList({
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

  const handleMultiSelect = (list: EmployeeDepartment[]) => {
    setSelectDepartment(list)
  }

  const handleOnRemoveSelectedOption = (selectedList: EmployeeDepartment[]) => {
    setSelectDepartment(selectedList)
  }

  return (
    <>
      <CRow className="employeeAllocation-form">
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
          <CFormLabel className="mt-1">Employee Billing Status:</CFormLabel>
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
          <CFormLabel className="mt-1">Allocation Status:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="allocationStatus"
            data-testid="form-select2"
            name="allocationStatus"
            value={allocationStatus}
            onChange={(e) => setAllocationStatus(e.target.value)}
          >
            <option value="true">Allocated</option>
            <option value="false">De-Allocated</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Department:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <Multiselect
            className="ovh-multiselect"
            data-testid="employee-option"
            options={departmentsList?.map((department) => department) || []}
            displayValue="departmentName"
            placeholder="Select"
            selectedValues={selectDepartment}
            onSelect={(list: EmployeeDepartment[]) => handleMultiSelect(list)}
            onRemove={(selectedList: EmployeeDepartment[]) =>
              handleOnRemoveSelectedOption(selectedList)
            }
          />
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Technology:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="technology"
            data-testid="form-select1"
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
        {showSelectCustom ? (
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
                id="fromDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={fromDate as string}
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
                minDate={new Date()}
                id="toDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={toDate as string}
                onChange={(date: Date) => setToDate(date)}
                selected={toDate as Date}
              />
            </CCol>
          </>
        ) : (
          <></>
        )}
        <CCol className="d-md-flex justify-content-md-end">
          <CButton
            color="info btn-ovh me-0"
            onClick={handleExportEmployeeAllocation}
          >
            <i className="fa fa-plus me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mt-5 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            onClick={handleViewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={3} md={4} lg={5} xl={4} xxl={3}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
              onKeyUp={handleSearchByEnter}
            />
            <CButton
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={handleSearch}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
      <CCol xs={12} className="mt-3 ms-3">
        {isLoading !== ApiLoadingState.loading ? (
          <CCol xs={12}>
            <EmployeeAllocationReportTable
              Select={Select}
              toDate={toDate as string}
              allocationStatus={allocationStatus}
              billingStatus={billingStatus}
              fromDate={fromDate as string}
            />
          </CCol>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </CCol>
    </>
  )
}
export default EmployeeAllocationFilterOptions
