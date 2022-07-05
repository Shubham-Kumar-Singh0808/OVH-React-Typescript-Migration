import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import {
  Birthday,
  Designation,
  EmploymentContract,
  Experience,
  FullName,
  HRAssociate,
  JoinedDate,
  ProjectManager,
  ReportingManager,
  Shift,
  UserNameEmail,
  WorkFrom,
} from './AddNewEmployeeChildComponents/index'
import EmployeeDesignationList from './DesignationList/EmployeeDesignationList'
import ShiftConfiguration from './ShiftConfiguration/ShiftConfiguration'
import {
  ShouldResetFields,
  GetAllReportingManagers,
  GetHrData,
  AddEmployee,
  GetHRAssociate,
  GetList,
  GetProjectManager,
  GetReportManager,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { EmployeeShiftDetails } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import OCard from '../../../../components/ReusableComponent/OCard'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import OToast from '../../../../components/ReusableComponent/OToast'
import { listComposer } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'

const AddNewEmployee = (): JSX.Element => {
  const dispatch = useAppDispatch()

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
    dateOfJoining: null,
    departmentName: '',
    designation: '',
    dob: null,
    employmentTypeName: '',
    experience: 0,
    firstName: '',
    middleName: '',
    gender: '',
    hrAssociate: hrAssociateValue,
    jobTypeName: '',
    lastName: '',
    manager: managerValue,
    projectManager: managerValue,
    role: '',
    technology: '',
    timeSlotDTO: shiftValue,
    userName: '',
    workStatus: 'Office',
  } as AddEmployee
  const [addEmployee, setAddEmployee] = useState(initEmployee)

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  // Start - Field handler
  const onHandleGender = (value: string) => {
    setAddEmployee({ ...addEmployee, gender: value })
  }
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
  const onHandleBirthday = (value: Date) => {
    setAddEmployee({ ...addEmployee, dob: value })
  }
  const onHandleJoinDate = (value: Date) => {
    setAddEmployee({ ...addEmployee, dateOfJoining: value })
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
  const onHandleLastName = (value: string) => {
    setAddEmployee({ ...addEmployee, lastName: value })
  }
  const onHandleMiddleName = (value: string) => {
    setAddEmployee({ ...addEmployee, middleName: value })
  }
  const onHandleFirstName = (value: string) => {
    setAddEmployee({ ...addEmployee, firstName: value })
  }
  const onHandleUsername = (value: string) => {
    setAddEmployee({ ...addEmployee, userName: value })
  }
  const onHandleContractExist = (value: string) => {
    setAddEmployee({ ...addEmployee, contractExists: value })
  }
  const onHandleWorkfrom = (value: string) => {
    setAddEmployee({ ...addEmployee, workStatus: value })
  }
  const onHandleExperience = (value: number) => {
    setAddEmployee({ ...addEmployee, experience: value })
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
      addEmployee.userName !== '' &&
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

  const onHandleAllowedUser = async (username: string) => {
    if (username === '' || username == null) return

    const response = await dispatch(
      reduxServices.newEmployee.userervice.checkIsUserExists(username),
    )

    if (response.payload) {
      dispatch(
        reduxServices.app.actions.addToast(
          alreadyExistToastMessage('Employee username is already exists!'),
        ),
      )
    } else {
      dispatch(
        reduxServices.app.actions.addToast(
          toastElement('Employee username is valid'),
        ),
      )
    }
  }

  const isUserExist = useTypedSelector(
    reduxServices.newEmployee.userervice.selectors.isUserExist,
  )
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
  const genderList: GetList[] = [
    { id: 1, name: 'Female' },
    { id: 2, name: 'Male' },
  ]
  const composedGenderList = listComposer(genderList as [], 'id', 'name')
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

  // POST method
  const handleAddEmployee = async () => {
    const newEmployeeResponse = await dispatch(
      reduxServices.newEmployee.addEmployeeService.addNewEmployee(addEmployee),
    )
    if (
      reduxServices.newEmployee.addEmployeeService.addNewEmployee.fulfilled.match(
        newEmployeeResponse,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          toastElement('New employee is successfully added'),
        ),
      )
    } else {
      dispatch(reduxServices.app.actions.addToast('Failed to add new employee'))
    }
  }

  const toastElement = (message: string) => (
    <OToast toastColor="success" toastMessage={message} />
  )

  const alreadyExistToastMessage = (message: string) => (
    <OToast toastMessage={message} toastColor="danger" />
  )

  const handleClearFields = () => {
    setAddEmployee(initEmployee)

    const shouldResetFields = {
      hrAssociate: true,
      projectManager: true,
      reportManager: true,
    } as ShouldResetFields
    setResetField(shouldResetFields)
  }

  const handleBackButton = () => {
    setDestinationToggle(false)
    setShiftToggle(false)
  }

  return (
    <>
      <OCard
        className="mb-4"
        title="Add New Employee"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {shiftToggle && (
          <ShiftConfiguration setToggleShift={handleBackButton} />
        )}
        {destinationToggle && (
          <EmployeeDesignationList setToggleDesignation={handleBackButton} />
        )}
        {!shiftToggle && !destinationToggle ? (
          <>
            <UserNameEmail
              dynamicFormLabelProps={dynamicFormLabelProps}
              usernameChangeHandler={onHandleUsername}
              onAllowedUserChangeHandler={onHandleAllowedUser}
              username={addEmployee.userName}
              isUserAllowed={(isUserExist as boolean) || false}
            />
            <FullName
              dynamicFormLabelProps={dynamicFormLabelProps}
              firstNameChangeHandler={onHandleFirstName}
              lastNameChangeHandler={onHandleLastName}
              middleNameChangeHandler={onHandleMiddleName}
              firstNameValue={addEmployee.firstName || ''}
              lastNameValue={addEmployee.lastName || ''}
              middleNameValue={addEmployee.middleName || ''}
            />
            <OSelectList
              dynamicFormLabelProps={dynamicFormLabelProps}
              list={composedGenderList}
              setValue={onHandleGender}
              value={addEmployee.gender}
              name="Gender"
              label="Select Gender"
            />
            <OSelectList
              dynamicFormLabelProps={dynamicFormLabelProps}
              list={countryList}
              setValue={onHandleCountryType}
              value={addEmployee.country}
              name="Country"
              label="Select Country"
            />
            <Birthday
              dynamicFormLabelProps={dynamicFormLabelProps}
              onDateChangeHandler={onHandleBirthday}
              dateValue={addEmployee.dob}
            />
            <JoinedDate
              dynamicFormLabelProps={dynamicFormLabelProps}
              onDateChangeHandler={onHandleJoinDate}
              dateValue={addEmployee.dateOfJoining}
            />
            <Experience
              dynamicFormLabelProps={dynamicFormLabelProps}
              onExperienceHandler={onHandleExperience}
              experienceValue={addEmployee.experience}
            />
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
              toggleValue={destinationToggle as boolean}
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
            <Shift
              dynamicFormLabelProps={dynamicFormLabelProps}
              list={employeeShifts}
              setValue={onHandleShift}
              value={addEmployee.timeSlotDTO.name}
              setToggleShift={() => setShiftToggle(!shiftToggle)}
              toggleValue={shiftToggle as boolean}
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
                  onClick={handleAddEmployee}
                >
                  Add
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
          </>
        ) : null}
      </OCard>
    </>
  )
}

export default AddNewEmployee
