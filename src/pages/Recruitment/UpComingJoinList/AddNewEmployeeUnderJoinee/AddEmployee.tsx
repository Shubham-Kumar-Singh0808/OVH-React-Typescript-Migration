import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
// import {
//   Birthday,
//   Designation,
//   EmploymentContract,
//   Experience,
//   FullName,
//   HRAssociate,
//   JoinedDate,
//   ProjectManager,
//   ReportingManager,
//   Shift,
//   UserNameEmail,
//   WorkFrom,
// } from './AddNewEmployeeChildComponents/index'
// import EmployeeDesignationList from './DesignationList/EmployeeDesignationList'
// import ShiftConfiguration from './ShiftConfiguration/ShiftConfiguration'
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
import { dateFormat } from '../../../../constant/DateFormat'
import {
  UserNameEmail,
  FullName,
  Birthday,
  JoinedDate,
  Experience,
  Designation,
  ReportingManager,
  ProjectManager,
  HRAssociate,
  Shift,
  EmploymentContract,
  WorkFrom,
} from '../../../EmployeeDirectory/EmployeesList/AddNewEmployee/AddNewEmployeeChildComponents'
import EmployeeDesignationList from '../../../EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/EmployeeDesignationList'
import ShiftConfiguration from '../../../EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/ShiftConfiguration'

const AddNewEmployee = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()

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
    contractEndDate: '',
    contractExists: false,
    contractStartDate: '',
    country: '',
    dateOfJoining: '',
    departmentName: '',
    designation: '',
    dob: '',
    employmentTypeName: '',
    experience: '',
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
    setAddEmployee({ ...addEmployee, dob: moment(value).format(dateFormat) })
  }
  const onHandleJoinDate = (value: Date) => {
    setAddEmployee({
      ...addEmployee,
      dateOfJoining: moment(value).format(dateFormat),
    })
  }
  const onHandleJobType = (value: string) => {
    setAddEmployee({ ...addEmployee, jobTypeName: value })
  }
  const onHandleStartDate = (value: Date) => {
    setAddEmployee({
      ...addEmployee,
      contractStartDate: moment(value).format(dateFormat),
    })
  }
  const onHandleEndDate = (value: Date) => {
    setAddEmployee({
      ...addEmployee,
      contractEndDate: moment(value).format(dateFormat),
    })
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
  const onHandleContractExist = (value: boolean) => {
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
        firstName: value.firstName,
        lastName: value.lastName,
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
        firstName: value.firstName,
        lastName: value.lastName,
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
    dispatch(reduxServices.userRolesConfigurations.getUserRolesThunk())
    dispatch(reduxServices.newEmployee.employmentService.getAllEmploymentType())
    dispatch(reduxServices.newEmployee.jobTypeService.getAllJobType())
    dispatch(reduxServices.employeeDesignation.getAllEmployeeDesignations())
  }, [dispatch])

  useEffect(() => {
    if (
      addEmployee.country !== '' &&
      addEmployee.dateOfJoining !== '' &&
      addEmployee.departmentName !== '' &&
      addEmployee.designation !== '' &&
      addEmployee.dob !== '' &&
      addEmployee.employmentTypeName !== '' &&
      addEmployee.firstName !== '' &&
      addEmployee.gender !== '' &&
      addEmployee.lastName !== '' &&
      addEmployee.hrAssociate.fullName != null &&
      addEmployee.jobTypeName !== '' &&
      addEmployee.manager.fullName != null &&
      addEmployee.projectManager.fullName != null &&
      addEmployee.role !== '' &&
      addEmployee.timeSlotDTO.name != null &&
      addEmployee.userName !== '' &&
      addEmployee.workStatus !== ''
    ) {
      const hasContract =
        addEmployee.contractStartDate !== '' &&
        addEmployee.contractEndDate !== ''

      if (addEmployee.contractExists) {
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

      setAddEmployee({ ...addEmployee, userName: '' })
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
    (state) => state.userRolesConfiguration.roles,
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

      history.push('/employeeList')
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
      {shiftToggle && <ShiftConfiguration setToggleShift={handleBackButton} />}
      {destinationToggle && (
        <EmployeeDesignationList setToggleDesignation={handleBackButton} />
      )}
      {!shiftToggle && !destinationToggle ? (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Add New Employee"
          CFooterClassName="d-none"
        >
          <CRow>
            <CCol
              xs={12}
              className="gap-2 d-md-flex justify-content-md-end pe-0"
            >
              <CButton
                data-testid="back-btn"
                color="info btn-ovh me-1"
                onClick={() => history.push('/employeeList')}
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
            <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
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
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={composedGenderList}
                setValue={onHandleGender}
                value={addEmployee.gender}
                name="gender"
                label="Gender"
                placeHolder="Select Gender"
              />
              <OSelectList
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={countryList}
                setValue={onHandleCountryType}
                value={addEmployee.country}
                name="country"
                label="Country"
                placeHolder="Select Country"
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
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={composedDepartmentList}
                setValue={onHandleDepartment}
                value={addEmployee.departmentName}
                name="Department"
                label="Department"
                placeHolder="Select Department"
              />
              <OSelectList
                isRequired={false}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={composedTechnologyList}
                setValue={onHandleTechnology}
                value={addEmployee.technology}
                name="technology"
                label="Technology"
                placeHolder="Select"
              />
              <Designation
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={composedDesignationList}
                setValue={onHandleDesignation}
                value={addEmployee.designation}
                setToggleShift={() => setDestinationToggle(!destinationToggle)}
                toggleValue={destinationToggle as boolean}
                isAddDisable={false}
              />
              <OSelectList
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={composedUserRoles}
                setValue={onHandleUserRole}
                value={addEmployee.role}
                name="Role"
                label="Role"
                placeHolder="Select Role"
              />
              <ReportingManager
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                reportManagersList={reportingManagersList}
                onSelectReportManager={onHandleReportManager}
                shouldReset={resetFields.reportManager}
                reportValue={addEmployee.manager.fullName}
              />
              <ProjectManager
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                managersList={reportingManagersList}
                onSelectManager={onHandleProjectManager}
                shouldReset={resetFields.projectManager}
                projectValue={addEmployee.projectManager.fullName}
              />
              <HRAssociate
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                hrDataList={hrDataList}
                onSelectHRAssociate={onHandleHRAssociate}
                shouldReset={resetFields.hrAssociate}
                hrValue={addEmployee.hrAssociate.fullName}
              />
              <OSelectList
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={composedEmploymentList}
                setValue={onHandleEmployeeType}
                value={addEmployee.employmentTypeName}
                name="EmploymentType"
                label="Employment Type"
                placeHolder="Select Employment Type"
              />
              <OSelectList
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={composedJobTypes}
                setValue={onHandleJobType}
                value={addEmployee.jobTypeName}
                name="JobType"
                label="Job Type"
                placeHolder="Select Job Type"
              />
              <Shift
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                list={employeeShifts}
                setValue={onHandleShift}
                value={addEmployee.timeSlotDTO.name}
                setToggleShift={() => setShiftToggle(!shiftToggle)}
                toggleValue={shiftToggle as boolean}
                isAddDisable={false}
              />
              <EmploymentContract
                isRequired={true}
                dynamicFormLabelProps={dynamicFormLabelProps}
                onStartDateChangeHandler={onHandleStartDate}
                onEndDateChangeHandler={onHandleEndDate}
                onContractExistHandler={onHandleContractExist}
                startDateValue={addEmployee.contractStartDate}
                endDateValue={addEmployee.contractEndDate}
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
            </CCol>
          </CRow>
        </OCard>
      ) : null}
    </>
  )
}

export default AddNewEmployee
