import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CRow, CCol, CButton, CFormLabel, CSpinner } from '@coreui/react-pro'
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
import { ApiLoadingState } from '../../../../middleware/api/apiList'

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
  const [editEmployee, setEditEmployee] = useState(initEmployee)
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  // Start - Field handler
  const onHandleDepartment = (value: string) => {
    setEditEmployee({ ...editEmployee, departmentName: value })
  }
  const onHandleTechnology = (value: string) => {
    setEditEmployee({ ...editEmployee, technology: value })
  }
  const onHandleDesignation = (value: string) => {
    setEditEmployee({ ...editEmployee, designation: value })
  }
  const onHandleUserRole = (value: string) => {
    setEditEmployee({ ...editEmployee, role: value })
  }
  const onHandleEmployeeType = (value: string) => {
    setEditEmployee({ ...editEmployee, employmentTypeName: value })
  }
  const onHandleCountryType = (value: string) => {
    setEditEmployee({ ...editEmployee, country: value })
  }
  const onHandleJobType = (value: string) => {
    setEditEmployee({ ...editEmployee, jobTypeName: value })
  }
  const onHandleStartDate = (value: Date) => {
    setEditEmployee({ ...editEmployee, contractStartDate: value })
  }
  const onHandleEndDate = (value: Date) => {
    setEditEmployee({ ...editEmployee, contractEndDate: value })
  }
  const onHandleContractExist = (value: string) => {
    setEditEmployee({ ...editEmployee, contractExists: value })
  }
  const onHandleWorkfrom = (value: string) => {
    setEditEmployee({ ...editEmployee, workStatus: value })
  }

  const onHandleReportManager = (value: GetReportManager) => {
    setResetField({ ...resetFields, reportManager: false })
    setEditEmployee({
      ...editEmployee,
      manager: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleProjectManager = (value: GetProjectManager) => {
    setResetField({ ...resetFields, projectManager: false })
    setEditEmployee({
      ...editEmployee,
      projectManager: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleHRAssociate = (value: GetHRAssociate) => {
    setResetField({ ...resetFields, hrAssociate: false })
    setEditEmployee({
      ...editEmployee,
      hrAssociate: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleShift = (value: EmployeeShiftDetails) => {
    setEditEmployee({
      ...editEmployee,
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
      setEditEmployee({
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
        firstName: selectedEmployeeData.firstName,
        lastName: selectedEmployeeData.lastName,
      })
    }
  }, [selectedEmployeeData])

  useEffect(() => {
    if (
      editEmployee.country !== '' &&
      editEmployee.dateOfJoining != null &&
      editEmployee.departmentName !== '' &&
      editEmployee.designation !== '' &&
      editEmployee.dob !== null &&
      editEmployee.employmentTypeName !== '' &&
      editEmployee.firstName !== '' &&
      editEmployee.gender !== '' &&
      editEmployee.lastName !== '' &&
      editEmployee.middleName !== '' &&
      editEmployee.hrAssociate.fullName != null &&
      editEmployee.jobTypeName !== '' &&
      editEmployee.manager.fullName != null &&
      editEmployee.projectManager.fullName != null &&
      editEmployee.role !== '' &&
      editEmployee.technology !== '' &&
      editEmployee.timeSlotDTO.name != null &&
      editEmployee.workStatus !== ''
    ) {
      const hasContract =
        editEmployee.contractStartDate !== null &&
        editEmployee.contractEndDate !== null

      if (editEmployee.contractExists === 'true') {
        setViewBtnEnabled(hasContract)
      } else {
        setViewBtnEnabled(true)
      }
    } else {
      setViewBtnEnabled(false)
    }
  }, [editEmployee])

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
  const isLoading = useTypedSelector(reduxServices.employee.selectors.isLoading)

  console.log(isLoading)

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
    setEditEmployee(initEmployee)

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
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps(
                'birthday',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Employee Name:
            </CFormLabel>
            <CCol
              sm={3}
            >{`${editEmployee.firstName} ${editEmployee.lastName}`}</CCol>
          </CRow>
          <OSelectList
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedDepartmentList}
            setValue={onHandleDepartment}
            value={editEmployee.departmentName}
            name="Department"
            label="Select Department"
          />
          <OSelectList
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedTechnologyList}
            setValue={onHandleTechnology}
            value={editEmployee.technology}
            name="Technology"
            label="Select Technology"
          />
          <Designation
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedDesignationList}
            setValue={onHandleDesignation}
            value={editEmployee.designation}
            setToggleShift={() => setDestinationToggle(!destinationToggle)}
            toggleValue={destinationToggle}
            isAddDisable={true}
          />
          <OSelectList
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedUserRoles}
            setValue={onHandleUserRole}
            value={editEmployee.role}
            name="Role"
            label="Select Role"
          />
          <ReportingManager
            dynamicFormLabelProps={dynamicFormLabelProps}
            reportManagersList={reportingManagersList}
            onSelectReportManager={onHandleReportManager}
            shouldReset={resetFields.reportManager}
            reportValue={`${editEmployee.manager?.firstName} ${editEmployee.manager?.lastName}`}
          />
          <ProjectManager
            dynamicFormLabelProps={dynamicFormLabelProps}
            managersList={reportingManagersList}
            onSelectManager={onHandleProjectManager}
            shouldReset={resetFields.projectManager}
            projectValue={`${editEmployee.manager?.firstName} ${editEmployee.manager?.lastName}`}
          />
          <HRAssociate
            dynamicFormLabelProps={dynamicFormLabelProps}
            hrDataList={hrDataList}
            onSelectHRAssociate={onHandleHRAssociate}
            shouldReset={resetFields.hrAssociate}
            hrValue={`${editEmployee.hrAssociate?.firstName} ${editEmployee.hrAssociate?.lastName}`}
          />
          <OSelectList
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedEmploymentList}
            setValue={onHandleEmployeeType}
            value={editEmployee.employmentTypeName}
            name="EmploymentType"
            label="Select Employment Type"
          />
          <OSelectList
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedJobTypes}
            setValue={onHandleJobType}
            value={editEmployee.jobTypeName}
            name="JobType"
            label="Select Job Type"
          />
          <OSelectList
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={countryList}
            setValue={onHandleCountryType}
            value={editEmployee.country}
            name="Country"
            label="Select Country"
          />
          <Shift
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={employeeShifts}
            setValue={onHandleShift}
            value={editEmployee.timeSlotDTO.name}
            setToggleShift={() => setShiftToggle(!shiftToggle)}
            toggleValue={shiftToggle}
            isAddDisable={true}
          />
          <OSelectList
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={countryList}
            setValue={onHandleCountryType}
            value={editEmployee.country}
            name="Employee Status"
            label="Select Employee Status"
          />
          <EmploymentContract
            dynamicFormLabelProps={dynamicFormLabelProps}
            onStartDateChangeHandler={onHandleStartDate}
            onEndDateChangeHandler={onHandleEndDate}
            onContractExistHandler={onHandleContractExist}
            startDateValue={editEmployee.contractStartDate as Date}
            endDateValue={editEmployee.contractEndDate as Date}
            isContractExist={editEmployee.contractExists}
          />
          <WorkFrom
            dynamicFormLabelProps={dynamicFormLabelProps}
            onWorkFromHandler={onHandleWorkfrom}
            workFromValue={editEmployee.workStatus}
          />
          <CRow className="mb-3 align-items-center">
            <CCol sm={{ span: 6, offset: 3 }}>
              <CButton
                className="btn-ovh me-1"
                color="success"
                disabled={!isViewBtnEnabled}
                data-testid="edit-employee"
              >
                Update
              </CButton>
              <CButton
                color="warning "
                className="btn-ovh"
                data-testid="clear-employee"
                onClick={handleClearFields}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </>
      ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </OCard>
  )
}

export default EditEmployee
