import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { CRow, CCol, CButton, CFormLabel } from '@coreui/react-pro'
import moment from 'moment'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  GetAllReportingManagers,
  GetHRAssociate,
  GetHrData,
  GetList,
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
  Status,
} from '../AddNewEmployee/AddNewEmployeeChildComponents'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import { EditEmployeeTypes } from '../../../../types/EmployeeDirectory/EmployeesList/EditEmployee'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { dateFormat } from '../../../../constant/DateFormat'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const EditEmployee = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const [getID, setID] = useState<string>()
  const { employeeId } = useParams<{ employeeId: string }>()
  useEffect(() => {
    setID(employeeId)
  }, [employeeId])

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
    contractStartDate: '',
    contractExists: false,
    relievingDate: '',
    country: '',
    departmentName: '',
    statusName: '',
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
    setEditEmployee({
      ...editEmployee,
      contractStartDate: moment(value).format(dateFormat),
    })
  }
  const onHandleEndDate = (value: Date) => {
    setEditEmployee({
      ...editEmployee,
      contractEndDate: moment(value).format(dateFormat),
    })
  }
  const onHandleContractExist = (value: boolean) => {
    setEditEmployee({ ...editEmployee, contractExists: value })
  }
  const onHandleWorkFrom = (value: string) => {
    setEditEmployee({ ...editEmployee, workStatus: value })
  }
  const onHandleEmployeeStatus = (value: string) => {
    setEditEmployee({ ...editEmployee, statusName: value })
  }
  const onHandleRelievingDate = (value: Date) => {
    setEditEmployee({
      ...editEmployee,
      relievingDate: moment(value).format(dateFormat),
    })
  }

  const onHandleReportManager = (value: GetReportManager) => {
    setResetField({ ...resetFields, reportManager: false })
    setEditEmployee({
      ...editEmployee,
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
    setEditEmployee({
      ...editEmployee,
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
    setEditEmployee({
      ...editEmployee,
      hrAssociate: {
        id: value.id,
        fullName: value.fullName,
        firstName: value.firstName,
        lastName: value.lastName,
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
    if (
      editEmployee.designation !== '' &&
      editEmployee.role !== '' &&
      editEmployee.manager != null &&
      editEmployee.hrAssociate?.fullName != null &&
      editEmployee.employmentTypeName !== '' &&
      editEmployee.jobTypeName !== '' &&
      editEmployee.timeSlotDTO != null
    ) {
      const hasContract =
        editEmployee.contractStartDate !== '' &&
        editEmployee.contractEndDate !== ''

      if (editEmployee.contractExists) {
        setViewBtnEnabled(hasContract)
      } else {
        setViewBtnEnabled(true)
      }
    } else {
      setViewBtnEnabled(false)
    }
  }, [editEmployee])

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
    if (getID) {
      dispatch(reduxServices.employee.getSelectedEmployeeInformation(getID))
    }
  }, [dispatch, getID])

  const selectedEmployeeData = useTypedSelector((state) =>
    reduxServices.employee.selectors.selectEmployeeData(state),
  )

  useEffect(() => {
    if (selectedEmployeeData != null) {
      setEditEmployee({
        contractEndDate: selectedEmployeeData.contractEndDate,
        contractExists: selectedEmployeeData.contractExists,
        contractStartDate: selectedEmployeeData.contractStartDate,
        country: selectedEmployeeData.country,
        departmentName: selectedEmployeeData.departmentName,
        designation: selectedEmployeeData.designation,
        employmentTypeName: selectedEmployeeData.employmentTypeName,
        hrAssociate: selectedEmployeeData.hrAssociate,
        jobTypeName: selectedEmployeeData.jobTypeName,
        statusName: selectedEmployeeData.statusName,
        manager: selectedEmployeeData.manager,
        projectManager: selectedEmployeeData.projectManager,
        role: selectedEmployeeData.role,
        technology: selectedEmployeeData.technology,
        timeSlotDTO: selectedEmployeeData.timeSlotDTO,
        workStatus: selectedEmployeeData.workStatus,
        relievingDate: selectedEmployeeData.relievingDate,
        firstName: selectedEmployeeData.firstName,
        lastName: selectedEmployeeData.lastName,
      })
    }
  }, [selectedEmployeeData])

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
  const isLoading = useTypedSelector(reduxServices.employee.selectors.isLoading)

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

  const employeeStatus: GetList[] = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
    { id: 3, name: 'UnderNotice' },
  ]
  // End - compose data

  // POST method
  const handleEditEmployee = async () => {
    const payload = { ...selectedEmployeeData, ...editEmployee }

    const newEmployeeResponse = await dispatch(
      reduxServices.employee.updateEmployeeDetails(payload),
    )

    if (
      reduxServices.employee.updateEmployeeDetails.fulfilled.match(
        newEmployeeResponse,
      )
    ) {
      history.goBack()
    }
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Edit Employee"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <Link to="/employeeList">
                <CButton
                  data-testid="back-btn"
                  color="info"
                  className="btn-ovh me-1"
                >
                  <i className="fa fa-arrow-left me-1"></i>Back
                </CButton>
              </Link>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps(
                'birthday',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Employee Name:
            </CFormLabel>
            <CCol sm={3}>
              <CFormLabel className="col-sm-3 col-form-label">
                <h5
                  style={{ width: '257px' }}
                >{`${editEmployee.firstName} ${editEmployee.lastName}`}</h5>
              </CFormLabel>
            </CCol>
          </CRow>
          <OSelectList
            isRequired={false}
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={countryList}
            setValue={onHandleCountryType}
            value={editEmployee.country}
            name="country"
            label="Country"
            placeHolder="Select Country"
          />
          <OSelectList
            isRequired={false}
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedDepartmentList}
            setValue={onHandleDepartment}
            value={editEmployee.departmentName}
            name="department"
            label="Department"
            placeHolder="Select Department"
          />
          <OSelectList
            isRequired={false}
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedTechnologyList}
            setValue={onHandleTechnology}
            value={editEmployee.technology}
            name="technology"
            label="Technology"
            placeHolder="Select"
          />
          <Designation
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedDesignationList}
            setValue={onHandleDesignation}
            value={editEmployee.designation}
            setToggleShift={() => setDestinationToggle(!destinationToggle)}
            toggleValue={destinationToggle}
            isAddDisable={true}
            isRequired={true}
          />
          <OSelectList
            isRequired={true}
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedUserRoles}
            setValue={onHandleUserRole}
            value={editEmployee.role}
            name="role"
            label="Role"
            placeHolder="Select Role"
          />
          <ReportingManager
            isRequired={true}
            dynamicFormLabelProps={dynamicFormLabelProps}
            reportManagersList={reportingManagersList}
            onSelectReportManager={onHandleReportManager}
            shouldReset={resetFields.reportManager}
            reportValue={`${editEmployee.manager?.firstName} ${editEmployee.manager?.lastName}`}
          />
          <ProjectManager
            isRequired={false}
            dynamicFormLabelProps={dynamicFormLabelProps}
            managersList={reportingManagersList}
            onSelectManager={onHandleProjectManager}
            shouldReset={resetFields.projectManager}
            projectValue={`${editEmployee.projectManager?.firstName} ${editEmployee.projectManager?.lastName}`}
          />
          <HRAssociate
            isRequired={true}
            dynamicFormLabelProps={dynamicFormLabelProps}
            hrDataList={hrDataList}
            onSelectHRAssociate={onHandleHRAssociate}
            shouldReset={resetFields.hrAssociate}
            hrValue={editEmployee.hrAssociate?.fullName}
          />
          <OSelectList
            isRequired={false}
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedEmploymentList}
            setValue={onHandleEmployeeType}
            value={editEmployee.employmentTypeName}
            name="EmploymentType"
            label="Employee Type"
            placeHolder="Select Type"
          />
          <OSelectList
            isRequired={true}
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={composedJobTypes}
            setValue={onHandleJobType}
            value={editEmployee.jobTypeName}
            name="JobType"
            label="Job Type"
            placeHolder="Select Job Type"
          />
          <Shift
            isRequired={true}
            dynamicFormLabelProps={dynamicFormLabelProps}
            list={employeeShifts}
            setValue={onHandleShift}
            value={editEmployee.timeSlotDTO?.name}
            setToggleShift={() => setShiftToggle(!shiftToggle)}
            toggleValue={shiftToggle}
            isAddDisable={true}
          />
          <Status
            list={employeeStatus}
            setStatusValue={onHandleEmployeeStatus}
            setStatusDateValue={onHandleRelievingDate}
            dateValue={editEmployee.relievingDate}
            value={editEmployee.statusName}
            isRequired={true}
            dynamicFormLabelProps={dynamicFormLabelProps}
          />
          <EmploymentContract
            isRequired={true}
            dynamicFormLabelProps={dynamicFormLabelProps}
            onStartDateChangeHandler={onHandleStartDate}
            onEndDateChangeHandler={onHandleEndDate}
            onContractExistHandler={onHandleContractExist}
            startDateValue={editEmployee.contractStartDate}
            endDateValue={editEmployee.contractEndDate}
            isContractExist={editEmployee.contractExists}
          />
          <WorkFrom
            dynamicFormLabelProps={dynamicFormLabelProps}
            onWorkFromHandler={onHandleWorkFrom}
            workFromValue={editEmployee.workStatus}
          />
          <CRow className="mb-3 align-items-center">
            <CCol sm={{ span: 6, offset: 3 }}>
              <CButton
                className="btn-ovh me-1"
                color="success"
                data-testid="edit-employee"
                disabled={!isViewBtnEnabled}
                onClick={handleEditEmployee}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </>
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </OCard>
  )
}

export default EditEmployee
