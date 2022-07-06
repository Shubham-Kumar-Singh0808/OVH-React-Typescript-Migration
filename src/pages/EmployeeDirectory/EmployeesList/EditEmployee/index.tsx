import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CRow, CCol, CButton, CFormLabel } from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  GetAllReportingManagers,
  GetHRAssociate,
  GetHrData,
  GetProjectManager,
  GetReportManager,
  ShouldResetFields,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { listComposer } from '../../../../utils/helper'
import { EmployeeShiftDetails } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import {
  Designation,
  EmploymentContract,
  HRAssociate,
  ProjectManager,
  ReportingManager,
  Shift,
  WorkFrom,
} from '../AddNewEmployee/AddNewEmployeeChildComponents'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import { EditEmployeeTypes } from '../../../../types/EmployeeDirectory/EmployeesList/EditEmployee'

const EditEmployee = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { employeeId } = useParams<{ employeeId?: string }>()

  const [shiftToggle, setShiftToggle] = useState<boolean>(false)
  const [destinationToggle, setDestinationToggle] = useState<boolean>(false)
  const [isViewBtnEnabled, setViewBtnEnabled] = useState<boolean>(false)

  const initResetFields = {
    hrAssociate: false,
    projectManager: false,
    reportManager: false,
  } as ShouldResetFields
  const [resetFields, setResetField] = useState(initResetFields)
  const managerValue = {} as GetAllReportingManagers
  const hrAssociateValue = {} as GetHrData
  const shiftValue = {} as EmployeeShiftDetails

  const initEmployee = {
    contractEndDate: null,
    contractExists: 'false',
    contractStartDate: null,
    country: '',
    departmentName: '',
    designation: '',
    employmentTypeName: '',
    hrAssociate: hrAssociateValue,
    jobTypeName: '',
    manager: managerValue,
    projectManager: managerValue,
    role: '',
    technology: '',
    timeSlotDTO: shiftValue,
    workStatus: '',
  } as EditEmployeeTypes
  const [addEmployee, setAddEmployee] = useState(initEmployee)
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  // Start - Field handler
  const onHandleDepartment = (value: string) => {
    setAddEmployee({ ...addEmployee, departmentName: value })
  }
  const onHandleTechnology = (value: string) => {
    setAddEmployee({ ...addEmployee, technology: value })
  }
  const onHandleDesignation = (value: string) => {
    setAddEmployee({ ...addEmployee, designation: value })
  }
  const onHandleUserRole = (value: string) => {
    setAddEmployee({ ...addEmployee, role: value })
  }
  const onHandleEmployeeType = (value: string) => {
    setAddEmployee({ ...addEmployee, employmentTypeName: value })
  }
  const onHandleCountryType = (value: string) => {
    setAddEmployee({ ...addEmployee, country: value })
  }
  const onHandleJobType = (value: string) => {
    setAddEmployee({ ...addEmployee, jobTypeName: value })
  }
  const onHandleStartDate = (value: Date) => {
    setAddEmployee({ ...addEmployee, contractStartDate: value })
  }
  const onHandleEndDate = (value: Date) => {
    setAddEmployee({ ...addEmployee, contractEndDate: value })
  }
  const onHandleContractExist = (value: string) => {
    setAddEmployee({ ...addEmployee, contractExists: value })
  }
  const onHandleWorkfrom = (value: string) => {
    setAddEmployee({ ...addEmployee, workStatus: value })
  }

  const onHandleReportManager = (value: GetReportManager) => {
    setResetField({ ...resetFields, reportManager: false })
    setAddEmployee({
      ...addEmployee,
      manager: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleProjectManager = (value: GetProjectManager) => {
    setResetField({ ...resetFields, projectManager: false })
    setAddEmployee({
      ...addEmployee,
      projectManager: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleHRAssociate = (value: GetHRAssociate) => {
    setResetField({ ...resetFields, hrAssociate: false })
    setAddEmployee({
      ...addEmployee,
      hrAssociate: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleShift = (value: EmployeeShiftDetails) => {
    setAddEmployee({
      ...addEmployee,
      timeSlotDTO: {
        id: value.id,
        name: value.name,
        startTimeHour: value.startTimeHour,
        startTimeMinutes: value.startTimeMinutes,
        endTimeHour: value.endTimeHour,
        endTimeMinutes: value.endTimeMinutes,
        graceTime: value.graceTime,
      },
    })
  }

  useEffect(() => {
    dispatch(
      reduxServices.newEmployee.employeeDepartmentsService.getEmployeeDepartments(),
    )
    dispatch(reduxServices.technology.getAllTechnology())
    dispatch(reduxServices.newEmployee.countryService.getAllCountries())
    dispatch(reduxServices.newEmployee.hrDataService.getAllHrData())
    dispatch(
      reduxServices.newEmployee.reportingManagersService.getAllReportingManagers(),
    )
    dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
    dispatch(reduxServices.userRolesAndPermissions.getUserRoles())
    dispatch(reduxServices.newEmployee.employmentService.getAllEmploymentType())
    dispatch(reduxServices.newEmployee.jobTypeService.getAllJobType())
    dispatch(reduxServices.employeeDesignation.getAllEmployeeDesignations())
  }, [dispatch])

  useEffect(() => {
    if (employeeId) {
      dispatch(
        reduxServices.employee.getSelectedEmployeeInformation(employeeId),
      )
    }
  }, [dispatch, employeeId])

  const selectedEmployeeData = useTypedSelector((state) =>
    reduxServices.employee.selectors.selectEmployeeData(state),
  )
  useEffect(() => {
    if (selectedEmployeeData != null) {
      setAddEmployee({
        contractEndDate: null,
        contractExists: 'false',
        contractStartDate: null,
        country: selectedEmployeeData.country,
        departmentName: selectedEmployeeData.departmentName,
        designation: selectedEmployeeData.designation,
        employmentTypeName: selectedEmployeeData.employmentTypeName,
        hrAssociate: selectedEmployeeData.hrAssociate,
        jobTypeName: selectedEmployeeData.jobTypeName,
        manager: selectedEmployeeData.manager,
        projectManager: selectedEmployeeData.projectManager,
        role: selectedEmployeeData.role,
        technology: selectedEmployeeData.technology,
        timeSlotDTO: selectedEmployeeData.timeSlotDTO,
        workStatus: selectedEmployeeData.workStatus,
      })
    }
  }, [selectedEmployeeData])

  useEffect(() => {
    if (
      addEmployee.country !== '' &&
      addEmployee.dateOfJoining != null &&
      addEmployee.departmentName !== '' &&
      addEmployee.designation !== '' &&
      addEmployee.dob !== null &&
      addEmployee.employmentTypeName !== '' &&
      addEmployee.firstName !== '' &&
      addEmployee.gender !== '' &&
      addEmployee.lastName !== '' &&
      addEmployee.middleName !== '' &&
      addEmployee.hrAssociate.fullName != null &&
      addEmployee.jobTypeName !== '' &&
      addEmployee.manager.fullName != null &&
      addEmployee.projectManager.fullName != null &&
      addEmployee.role !== '' &&
      addEmployee.technology !== '' &&
      addEmployee.timeSlotDTO.name != null &&
      addEmployee.workStatus !== ''
    ) {
      const hasContract =
        addEmployee.contractStartDate !== null &&
        addEmployee.contractEndDate !== null

      if (addEmployee.contractExists === 'true') {
        setViewBtnEnabled(hasContract)
      } else {
        setViewBtnEnabled(true)
      }
    } else {
      setViewBtnEnabled(false)
    }
  }, [addEmployee])

  const countryList = useTypedSelector(
    reduxServices.newEmployee.countryService.selectors.countriesList,
  )
  const hrDataList = useTypedSelector(
    reduxServices.newEmployee.hrDataService.selectors.hrDataList,
  )
  const reportingManagersList = useTypedSelector(
    reduxServices.newEmployee.reportingManagersService.selectors
      .reportingManagersList,
  )
  const employeeShifts = useTypedSelector(
    reduxServices.shiftConfiguration.selectors.employeeShifts,
  )
  const userRoles = useTypedSelector(
    reduxServices.userRolesAndPermissions.selectors.userRoles,
  )
  const technologyList = useTypedSelector(
    reduxServices.technology.selectors.technologies,
  )
  const departmentsList = useTypedSelector(
    reduxServices.newEmployee.employeeDepartmentsService.selectors
      .employeeDepartments,
  )
  const employmentTypes = useTypedSelector(
    reduxServices.newEmployee.employmentService.selectors.employments,
  )
  const jobTypes = useTypedSelector(
    reduxServices.newEmployee.jobTypeService.selectors.jobTypes,
  )
  const employeeDesignationList = useTypedSelector(
    reduxServices.employeeDesignation.selectors.employeeDesignationList,
  )

  // Start - Compose data
  const composedDepartmentList = listComposer(
    departmentsList as [],
    'departmentId',
    'departmentName',
  )
  const composedTechnologyList = listComposer(
    technologyList as [],
    'id',
    'name',
  )
  const composedUserRoles = listComposer(userRoles as [], 'roleId', 'name')

  const composedDesignationList = listComposer(
    employeeDesignationList as [],
    'id',
    'name',
  )
  const composedJobTypes = listComposer(jobTypes as [], 'id', 'jobType')
  const composedEmploymentList = listComposer(
    employmentTypes as [],
    'id',
    'employmentType',
  )
  // End - compose data

  const handleClearFields = () => {
    setAddEmployee(initEmployee)

    const shouldResetFields = {
      hrAssociate: true,
      projectManager: true,
      reportManager: true,
    } as ShouldResetFields
    setResetField(shouldResetFields)
  }

  return (
    <OCard
      className="mb-4"
      title="Edit Employee"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'birthday',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Employee Name:
        </CFormLabel>
        <CCol sm={3}>Test 1 2 3</CCol>
      </CRow>
      <OSelectList
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={composedDepartmentList}
        setValue={onHandleDepartment}
        value={addEmployee.departmentName}
        name="Department"
        label="Select Department"
      />
      <OSelectList
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={composedTechnologyList}
        setValue={onHandleTechnology}
        value={addEmployee.technology}
        name="Technology"
        label="Select Technology"
      />
      <Designation
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={composedDesignationList}
        setValue={onHandleDesignation}
        value={addEmployee.designation}
        setToggleShift={() => setDestinationToggle(!destinationToggle)}
        toggleValue={destinationToggle}
        isAddDisable={true}
      />
      <OSelectList
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={composedUserRoles}
        setValue={onHandleUserRole}
        value={addEmployee.role}
        name="Role"
        label="Select Role"
      />
      <ReportingManager
        dynamicFormLabelProps={dynamicFormLabelProps}
        reportManagersList={reportingManagersList}
        onSelectReportManager={onHandleReportManager}
        shouldReset={resetFields.reportManager}
      />
      <ProjectManager
        dynamicFormLabelProps={dynamicFormLabelProps}
        managersList={reportingManagersList}
        onSelectManager={onHandleProjectManager}
        shouldReset={resetFields.projectManager}
      />
      <HRAssociate
        dynamicFormLabelProps={dynamicFormLabelProps}
        hrDataList={hrDataList}
        onSelectHRAssociate={onHandleHRAssociate}
        shouldReset={resetFields.hrAssociate}
      />
      <OSelectList
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={composedEmploymentList}
        setValue={onHandleEmployeeType}
        value={addEmployee.employmentTypeName}
        name="EmploymentType"
        label="Select Employment Type"
      />
      <OSelectList
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={composedJobTypes}
        setValue={onHandleJobType}
        value={addEmployee.jobTypeName}
        name="JobType"
        label="Select Job Type"
      />
      <OSelectList
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={countryList}
        setValue={onHandleCountryType}
        value={addEmployee.country}
        name="Country"
        label="Select Country"
      />
      <Shift
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={employeeShifts}
        setValue={onHandleShift}
        value={addEmployee.timeSlotDTO.name}
        setToggleShift={() => setShiftToggle(!shiftToggle)}
        toggleValue={shiftToggle as boolean}
        isAddDisable={true}
      />
      <OSelectList
        dynamicFormLabelProps={dynamicFormLabelProps}
        list={countryList}
        setValue={onHandleCountryType}
        value={addEmployee.country}
        name="Employee Status"
        label="Select Employee Status"
      />
      <EmploymentContract
        dynamicFormLabelProps={dynamicFormLabelProps}
        onStartDateChangeHandler={onHandleStartDate}
        onEndDateChangeHandler={onHandleEndDate}
        onContractExistHandler={onHandleContractExist}
        startDateValue={addEmployee.contractStartDate as Date}
        endDateValue={addEmployee.contractEndDate as Date}
        isContractExist={addEmployee.contractExists}
      />
      <WorkFrom
        dynamicFormLabelProps={dynamicFormLabelProps}
        onWorkFromHandler={onHandleWorkfrom}
        workFromValue={addEmployee.workStatus}
      />
      <CRow className="mb-3 align-items-center">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="btn-ovh me-1"
            color="success"
            disabled={!isViewBtnEnabled}
            data-testid="add-new-employee"
          >
            Update
          </CButton>
          <CButton
            color="warning "
            className="btn-ovh"
            data-testid="clear-new-employee"
            onClick={handleClearFields}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </OCard>
  )
}

export default EditEmployee
