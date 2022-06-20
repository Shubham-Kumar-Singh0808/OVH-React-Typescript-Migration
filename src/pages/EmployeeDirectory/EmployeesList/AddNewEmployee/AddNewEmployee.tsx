import {
  AddEmployee,
  GetList,
  ToggleShiftProp,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  Birthday,
  Country,
  Department,
  Designation,
  EmploymentContract,
  EmploymentType,
  Experience,
  FullName,
  Gender,
  HRAssociate,
  JobType,
  JoinedDate,
  ProjectManager,
  ReportingManager,
  Role,
  Shift,
  Technology,
  UserNameEmail,
  WorkFrom,
} from './AddNewEmployeeChildComponents/index'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import OCard from '../../../../components/ReusableComponent/OCard'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import { listComposer } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'

const AddNewEmployee = ({ setToggleShift }: ToggleShiftProp): JSX.Element => {
  const dispatch = useAppDispatch()

  // Todo: Remove all the state and use single state with Add Employee
  const [shiftName, setShiftName] = useState<string>()
  const [gender, setGender] = useState<string>()
  const [department, setDepartment] = useState<string>()
  const [technology, setTechnology] = useState<string>()
  const [designation, setDesignation] = useState<string>()
  const [userRole, setUserRole] = useState<string>()
  const [employmentType, setEmploymentType] = useState<string>()
  const [countryType, setCountryType] = useState<string>()
  const [date, setDate] = useState<Date>()
  const [addEmployee, setAddEmployee] = useState<AddEmployee>()

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }

  const onDateChangeHandler = (e: Date) => {
    setDate(e)
  }

  console.log('gender', gender)
  console.log('date', date)
  console.log('department', department)

  //   const handleContractIsDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(e.currentTarget.value)
  //   }

  // const isLoading = useTypedSelector(
  //   reduxServices.newEmployee.employeeDepartmentsService.selectors.isLoading,
  // )
  const departmentsList = useTypedSelector(
    reduxServices.newEmployee.employeeDepartmentsService.selectors
      .employeeDepartments,
  )

  const composedDepartmentList = listComposer(
    departmentsList as [],
    'departmentId',
    'departmentName',
  )

  const technologyList = useTypedSelector(
    reduxServices.newEmployee.technologyService.selectors.technologies,
  )

  const composedTechnologyList = listComposer(
    technologyList as [],
    'id',
    'name',
  )

  const genderList: GetList[] = [
    { id: 1, name: 'Female' },
    { id: 2, name: 'Male' },
  ]
  const composedGenderList = listComposer(genderList as [], 'id', 'name')

  const designationList: GetList[] = [
    { id: 1, name: 'Accounts' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Networking' },
  ]
  const composedDesignationList = listComposer(
    designationList as [],
    'id',
    'name',
  )

  const userRoles = useTypedSelector(
    reduxServices.userRolesAndPermissions.selectors.userRoles,
  )

  const composedUserRoles = listComposer(userRoles as [], 'roleId', 'name')

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
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4"
        title="Add New Employee"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mb-3 justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        {addEmployee?.userName}
        <UserNameEmail dynamicFormLabelProps={dynamicFormLabelProps} />

        <FullName dynamicFormLabelProps={dynamicFormLabelProps} />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={composedGenderList}
          setValue={setGender}
          value={gender as string}
          name="Gender"
          label="Select Gender"
        />
        <Birthday
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
          dateValue={date as Date}
        />
        <JoinedDate
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
          dateValue={date as Date}
        />
        <Experience dynamicFormLabelProps={dynamicFormLabelProps} />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={composedDepartmentList}
          setValue={setDepartment}
          value={department as string}
          name="Department"
          label="Select Department"
        />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={composedTechnologyList}
          setValue={setTechnology}
          value={technology as string}
          name="Technology"
          label="Select Technology"
        />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={composedDesignationList}
          setValue={setDesignation}
          value={designation as string}
          name="Designation"
          label="Select Designation"
        />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={composedUserRoles}
          setValue={setUserRole}
          value={userRole as string}
          name="Role"
          label="Select Role"
        />
        <ReportingManager
          dynamicFormLabelProps={dynamicFormLabelProps}
          reportingManagersList={reportingManagersList}
        />
        <ProjectManager
          dynamicFormLabelProps={dynamicFormLabelProps}
          reportingManagersList={reportingManagersList}
        />
        <HRAssociate
          dynamicFormLabelProps={dynamicFormLabelProps}
          hrDataList={hrDataList}
        />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={designationList}
          setValue={setEmploymentType}
          value={employmentType as string}
          name="EmploymentType"
          label="Select Employment Type"
        />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={designationList}
          setValue={setEmploymentType}
          value={employmentType as string}
          name="JobType"
          label="Select Job Type"
        />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={countryList}
          setValue={setCountryType}
          value={countryType as string}
          name="Country"
          label="Select Country"
        />
        <OSelectList
          dynamicFormLabelProps={dynamicFormLabelProps}
          list={employeeShifts}
          setValue={setShiftName}
          value={shiftName as string}
          name="Shift"
          label="Select Shift"
        />
        <EmploymentContract
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
          dateValue={date as Date}
        />
        <WorkFrom dynamicFormLabelProps={dynamicFormLabelProps} />
        <CRow className="mb-3 align-items-center">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton className="btn-ovh me-1" color="success">
              Add
            </CButton>
            <CButton color="warning " className="btn-ovh">
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default AddNewEmployee
