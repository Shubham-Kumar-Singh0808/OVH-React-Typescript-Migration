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
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import DatePicker from 'react-datepicker'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'

const AddNewEmployee = (): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }
  const onDateChangeHandler = (e: Date) => {
    console.log(e)
  }

  //   const handleContractIsDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(e.currentTarget.value)
  //   }

  //making dispatch
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.getEmpDepartments.employeeDepartmentsService.selectors
      .isLoading,
  )
  const departmentsList = useTypedSelector(
    reduxServices.getEmpDepartments.employeeDepartmentsService.selectors
      .employeeDepartments,
  )
  useEffect(() => {
    dispatch(
      reduxServices.getEmpDepartments.employeeDepartmentsService.getEmployeeDepartments(),
    )
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4"
        title="Add New Employee"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end mb-3">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>

        <UserNameEmail dynamicFormLabelProps={dynamicFormLabelProps} />

        <FullName dynamicFormLabelProps={dynamicFormLabelProps} />

        <Gender dynamicFormLabelProps={dynamicFormLabelProps} />

        <Birthday
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
        />

        <DateOfJoining
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
        />

        <Experience dynamicFormLabelProps={dynamicFormLabelProps} />

        <Department
          dynamicFormLabelProps={dynamicFormLabelProps}
          departmentsList={departmentsList}
        />
        <Technology dynamicFormLabelProps={dynamicFormLabelProps} />

        <Designation dynamicFormLabelProps={dynamicFormLabelProps} />

        <Role dynamicFormLabelProps={dynamicFormLabelProps} />

        <ReportingManager dynamicFormLabelProps={dynamicFormLabelProps} />

        <ProjectManager dynamicFormLabelProps={dynamicFormLabelProps} />

        <HRAssociate dynamicFormLabelProps={dynamicFormLabelProps} />

        <EmploymentType dynamicFormLabelProps={dynamicFormLabelProps} />

        <JobType dynamicFormLabelProps={dynamicFormLabelProps} />

        <Country dynamicFormLabelProps={dynamicFormLabelProps} />

        <Shift dynamicFormLabelProps={dynamicFormLabelProps} />

        <EmploymentContract
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
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
