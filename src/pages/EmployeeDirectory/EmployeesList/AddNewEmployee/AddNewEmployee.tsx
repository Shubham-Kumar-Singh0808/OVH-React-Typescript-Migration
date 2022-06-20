import {
  AddEmployee,
  ToggleShiftProp,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  Birthday,
  Country,
  DateOfJoining,
  Department,
  Designation,
  EmploymentContract,
  EmploymentType,
  Experience,
  FullName,
  Gender,
  HRAssociate,
  JobType,
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
import { reduxServices } from '../../../../reducers/reduxServices'

const AddNewEmployee = ({ setToggleShift }: ToggleShiftProp): JSX.Element => {
  const dispatch = useAppDispatch()
  const [shiftName, setShiftName] = useState<string>()
  const [gender, setGender] = useState<string>()
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
  const technologyList = useTypedSelector(
    reduxServices.newEmployee.technologyService.selectors.technologies,
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
  console.log(shiftName)
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
        <Gender
          dynamicFormLabelProps={dynamicFormLabelProps}
          setEmployeeGender={setGender}
          employeeGender={gender as string}
        />
        <Birthday
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
          dateValue={date as Date}
        />
        <DateOfJoining
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
          dateValue={date as Date}
        />
        <Experience dynamicFormLabelProps={dynamicFormLabelProps} />
        <Department
          dynamicFormLabelProps={dynamicFormLabelProps}
          departmentsList={departmentsList}
        />
        <Technology
          dynamicFormLabelProps={dynamicFormLabelProps}
          technologyList={technologyList}
        />
        <Designation dynamicFormLabelProps={dynamicFormLabelProps} />
        <Role dynamicFormLabelProps={dynamicFormLabelProps} />
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
        <EmploymentType dynamicFormLabelProps={dynamicFormLabelProps} />
        <JobType dynamicFormLabelProps={dynamicFormLabelProps} />
        <Country
          dynamicFormLabelProps={dynamicFormLabelProps}
          countryList={countryList}
        />
        <Shift
          dynamicFormLabelProps={dynamicFormLabelProps}
          employeeShifts={employeeShifts}
          setShiftName={setShiftName}
          shiftName={shiftName as string}
          setToggleShift={setToggleShift}
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
