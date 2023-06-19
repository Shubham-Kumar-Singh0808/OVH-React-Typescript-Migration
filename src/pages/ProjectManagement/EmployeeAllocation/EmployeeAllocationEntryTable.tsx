/* eslint-disable sonarjs/cognitive-complexity */
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
  CFormInput,
  CFormSelect,
  CTooltip,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import OToast from '../../../components/ReusableComponent/OToast'
import { dateFormat } from '../../../constant/DateFormat'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { UpdateEmployeeAllocationProject } from '../../../types/ProjectManagement/EmployeeAllocation/employeeAllocationTypes'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const EmployeeAllocationEntryTable = (props: {
  id: number
  Select: string
  toDate: string
  allocationStatus: string
  billingStatus: string
  fromDate: string
}): JSX.Element => {
  const initialEmployeeAllocation = {} as UpdateEmployeeAllocationProject
  const [editEmployeeAllocation, setEditEmployeeAllocation] = useState(
    initialEmployeeAllocation,
  )
  const [dateError, setDateError] = useState<boolean>(false)
  const [templateId, setTemplateId] = useState(0)
  const [isProjectAllocationEdit, setIsProjectAllocationEdit] =
    useState<boolean>(false)

  const projectUnderReport = useTypedSelector(
    reduxServices.employeeAllocationReport.selectors.employeeUnderProject,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Employee Allocation',
  )

  const dispatch = useAppDispatch()
  const { Select, toDate, allocationStatus, billingStatus, fromDate } = props

  const allocationStatusLabelColor = (status: string): JSX.Element => {
    if (status === 'New') {
      return <CBadge className="rounded-pill label-default">{status}</CBadge>
    } else if (status === 'In Progress') {
      return <CBadge className="rounded-pill label-success">{status}</CBadge>
    } else if (status === 'Closed') {
      return <CBadge className="rounded-pill label-success">{status}</CBadge>
    }
    return <></>
  }

  const editProjectAllocationButtonHandler = (
    projectReport: UpdateEmployeeAllocationProject,
  ): void => {
    setIsProjectAllocationEdit(true)
    setTemplateId(projectReport.id)
    setEditEmployeeAllocation(projectReport)
  }

  const handleEditProjectAllocationHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    setEditEmployeeAllocation((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }
  const onEndDateChangeHandler = (date: Date) => {
    const toDateValue = moment(date).format('DD/MM/YYYY')
    const name = 'enddate'
    setEditEmployeeAllocation((prevState) => {
      return { ...prevState, ...{ [name]: toDateValue } }
    })
  }
  const onStartDateChangeHandler = (date: Date) => {
    const formatDate = moment(date).format('DD/MM/YYYY')
    const name = 'startdate'
    setEditEmployeeAllocation((prevState) => {
      return { ...prevState, ...{ [name]: formatDate } }
    })
  }

  const saveProjectAllocationHandler = async () => {
    const saveProjectAllocationResultAction = await dispatch(
      reduxServices.employeeAllocationReport.updateEmployeeAllocationProject(
        editEmployeeAllocation,
      ),
    )
    if (
      reduxServices.employeeAllocationReport.updateEmployeeAllocationProject.fulfilled.match(
        saveProjectAllocationResultAction,
      )
    ) {
      setIsProjectAllocationEdit(false)
      dispatch(
        reduxServices.employeeAllocationReport.getEmployeeAllocationReport({
          Billingtype: billingStatus,
          EmployeeStatus: allocationStatus,
          dateSelection: Select,
          departmentNames: [],
          employeeName: '',
          endIndex: 20,
          enddate: toDate
            ? new Date(toDate).toLocaleDateString(deviceLocale, {
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
              })
            : '',
          firstIndex: 0,
          startdate: fromDate
            ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
              })
            : '',
          technology: '',
        }),
      )
      dispatch(
        reduxServices.employeeAllocationReport.projectUnderEmployeesReport({
          dateSelection: Select,
          employeeid: editEmployeeAllocation.employeeId,
          enddate: toDate
            ? new Date(toDate).toLocaleDateString(deviceLocale, {
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
              })
            : '',
          isAllocated: allocationStatus,
          isBillale: billingStatus,
          startdate: fromDate
            ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
              })
            : '',
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Project Allocation has been modified."
          />,
        ),
      )
    }
  }

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(editEmployeeAllocation?.startdate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(editEmployeeAllocation?.enddate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setDateError(moment(end).isBefore(start))
  }, [editEmployeeAllocation?.startdate, editEmployeeAllocation?.enddate])

  const cancelProjectAllocationButtonHandler = () => {
    setIsProjectAllocationEdit(false)
  }

  useEffect(() => {
    if (dateError) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="End date should be greater than allocation date"
          />,
        ),
      )
    }
  }, [dispatch, dateError])

  return (
    <>
      <CTableRow>
        <CTableDataCell colSpan={8}>
          <CTable responsive striped className="Allocation-table">
            <CTableHead color="info">
              <CTableRow>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Project Name
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Manager
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Status
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Allocation Date
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  End Date
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Allocation(%)
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Billable
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Current Status
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projectUnderReport?.length > 0 &&
                projectUnderReport?.map((projectReport, KRAindex) => {
                  const billable = projectReport.billable ? 'yes' : 'No'
                  const allocated = projectReport.isAllocated
                    ? 'Allocated'
                    : 'De-Allocated'
                  return (
                    <CTableRow key={KRAindex} col-span={7}>
                      <CTableDataCell scope="row">
                        <Link to={`#`} className="employee-name">
                          {projectReport.projectName}
                        </Link>
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {projectReport.managerName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {allocationStatusLabelColor(projectReport.status)}
                      </CTableDataCell>
                      {isProjectAllocationEdit &&
                      projectReport.id === templateId ? (
                        <CTableDataCell scope="row">
                          <div className="edit-time-control">
                            <DatePicker
                              className="form-control form-control-sm sh-date-picker"
                              placeholderText="dd/mm/yy"
                              name="startdate"
                              id="startdate"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              value={editEmployeeAllocation?.startdate}
                              onChange={(date: Date) =>
                                onStartDateChangeHandler(date)
                              }
                            />
                          </div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell scope="row">
                          {projectReport.startdate}
                        </CTableDataCell>
                      )}
                      {isProjectAllocationEdit &&
                      projectReport.id === templateId ? (
                        <CTableDataCell scope="row">
                          <div className="edit-time-control">
                            <DatePicker
                              className="form-control form-control-sm sh-date-picker"
                              placeholderText="dd/mm/yy"
                              name="enddate"
                              id="enddate"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              value={editEmployeeAllocation?.enddate}
                              onChange={(date: Date) =>
                                onEndDateChangeHandler(date)
                              }
                            />
                          </div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell scope="row">
                          {projectReport.enddate}
                        </CTableDataCell>
                      )}
                      {isProjectAllocationEdit &&
                      projectReport.id === templateId ? (
                        <CTableDataCell scope="row">
                          <div className="edit-time-control">
                            <CFormInput
                              type="text"
                              id="allocation"
                              data-testid="template-input"
                              name="allocation"
                              value={editEmployeeAllocation.allocation}
                              onChange={handleEditProjectAllocationHandler}
                            />
                          </div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell scope="row">
                          {projectReport.allocation}%
                        </CTableDataCell>
                      )}
                      {isProjectAllocationEdit &&
                      projectReport.id === templateId ? (
                        <CTableDataCell scope="row" style={{ width: '90px' }}>
                          <div className="edit-time-control">
                            <CFormSelect
                              aria-label="Default select example"
                              size="sm"
                              id="billable"
                              data-testid="form-select2"
                              name="billable"
                              value={
                                editEmployeeAllocation.billable as unknown as string
                              }
                              onChange={handleEditProjectAllocationHandler}
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </CFormSelect>
                          </div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell scope="row">{billable}</CTableDataCell>
                      )}
                      {isProjectAllocationEdit &&
                      projectReport.id === templateId ? (
                        <CTableDataCell scope="row" style={{ width: '150px' }}>
                          <div className="edit-time-control">
                            <CFormSelect
                              aria-label="Default select example"
                              size="sm"
                              id="isAllocated"
                              data-testid="form-select2"
                              name="isAllocated"
                              value={
                                editEmployeeAllocation.isAllocated as unknown as string
                              }
                              onChange={handleEditProjectAllocationHandler}
                            >
                              <option value="true">Allocated</option>
                              <option value="false">De-Allocated</option>
                            </CFormSelect>
                          </div>
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell scope="row">{allocated}</CTableDataCell>
                      )}
                      <CTableDataCell scope="row">
                        {isProjectAllocationEdit &&
                        projectReport.id === templateId ? (
                          <>
                            <CButton
                              color="success"
                              className="btn-ovh me-1 mb-1"
                              onClick={saveProjectAllocationHandler}
                              disabled={dateError}
                            >
                              <i
                                className="fa fa-floppy-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                            <CTooltip content="Cancel">
                              <CButton
                                color="warning"
                                data-testid="cancel-btn"
                                className="btn-ovh me-1 mb-1"
                                onClick={cancelProjectAllocationButtonHandler}
                              >
                                <i
                                  className="fa fa-times"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                            </CTooltip>
                          </>
                        ) : (
                          <>
                            {userAccess?.updateaccess && (
                              <CTooltip content="Edit">
                                <CButton
                                  color="info btn-ovh me-2"
                                  data-testid="edit-btn"
                                  onClick={() => {
                                    editProjectAllocationButtonHandler(
                                      projectReport,
                                    )
                                  }}
                                >
                                  <i className="fa fa-pencil-square-o"></i>
                                </CButton>
                              </CTooltip>
                            )}
                          </>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
        </CTableDataCell>
      </CTableRow>
    </>
  )
}
export default EmployeeAllocationEntryTable
