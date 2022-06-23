import {
  AddEmployee,
  GetHRAssociate,
  GetList,
  GetProjectManager,
  GetReportManager,
  ToggleShiftProp,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
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
import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import EmployeeDesignationList from './DesignationList/EmployeeDesignationList'
import OCard from '../../../../components/ReusableComponent/OCard'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import OToast from '../../../../components/ReusableComponent/OToast'
import ShiftConfiguration from './ShiftConfiguration/ShiftConfiguration'
import { listComposer } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'

const AddNewEmployee = ({ setToggleShift }: ToggleShiftProp): JSX.Element => {
  const dispatch = useAppDispatch()

  // Todo: Remove all the state and use single state with Add Employee
  const [shiftName, setShiftName] = useState<string>()
  const [shiftToggle, setShiftToggle] = useState<boolean>(false)
  const [destinationToggle, setDestinationoggle] = useState<boolean>(false)

  const initEmployee = {} as AddEmployee
  const [addEmployee, setAddEmployee] = useState(initEmployee)

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
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
    setAddEmployee({
      ...addEmployee,
      manager: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleProjectManager = (value: GetProjectManager) => {
    setAddEmployee({
      ...addEmployee,
      projectManager: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  const onHandleHRAssociate = (value: GetHRAssociate) => {
    setAddEmployee({
      ...addEmployee,
      hrAssociate: {
        id: value.id,
        fullName: value.fullName,
      },
    })
  }
  // const onHandleMiddleName = (value: string) => {
  //   setAddEmployee({ ...addEmployee, middleName: value })
  // }
  // End - Field handler

  //   const handleContractIsDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(e.currentTarget.value)
  //   }

  // const isLoading = useTypedSelector(
  //   reduxServices.newEmployee.employeeDepartmentsService.selectors.isLoading,
  // )

  useEffect(() => {
    dispatch(
      reduxServices.newEmployee.employeeDepartmentsService.getEmployeeDepartments(),
    )
    dispatch(reduxServices.newEmployee.technologyService.getAllTechnology())
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
          toastElement('Employee username is invalid'),
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
    reduxServices.newEmployee.technologyService.selectors.technologies,
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
    // Note: timeSlotDTO is static because someone working on this
    const payload: AddEmployee = {
      ...addEmployee,
      timeSlotDTO: {
        id: 1,
        name: 'General Shift',
        startTimeHour: '09',
        startTimeMinutes: '00',
        endTimeHour: '18',
        endTimeMinutes: '19',
        graceTime: '30',
      },
    }

    const newEmployeeResponse = await dispatch(
      reduxServices.newEmployee.addEmployeeService.addNewEmployee(payload),
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
  }

  const handleBackButton = () => {
    setDestinationoggle(false)
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
              isUserAllowed={isUserExist as boolean}
            />
            <FullName
              dynamicFormLabelProps={dynamicFormLabelProps}
              firstNameChangeHandler={onHandleFirstName}
              lastNameChangeHandler={onHandleLastName}
              middleNameChangeHandler={onHandleLastName}
              firstNameValue={addEmployee.firstName}
              lastNameValue={addEmployee.lastName}
              middleNameValue={addEmployee.firstName}
            />
            <OSelectList
              dynamicFormLabelProps={dynamicFormLabelProps}
              list={composedGenderList}
              setValue={onHandleGender}
              value={addEmployee.gender}
              name="Gender"
              label="Select Gender"
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
              setToggleShift={() => setDestinationoggle(!destinationToggle)}
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
            />
            <ProjectManager
              dynamicFormLabelProps={dynamicFormLabelProps}
              managersList={reportingManagersList}
              onSelectManager={onHandleProjectManager}
            />
            <HRAssociate
              dynamicFormLabelProps={dynamicFormLabelProps}
              hrDataList={hrDataList}
              onSelectHRAssociate={onHandleHRAssociate}
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
              setValue={setShiftName}
              value={shiftName as string}
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
                  onClick={handleAddEmployee}
                >
                  Add
                </CButton>
                <CButton
                  color="warning "
                  className="btn-ovh"
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
