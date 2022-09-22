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
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import OToast from '../../../components/ReusableComponent/OToast'
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
  const [templateId, setTemplateId] = useState(0)
  const [isProjectAllocationEdit, setIsProjectAllocationEdit] =
    useState<boolean>(false)

  const projectUnderReport = useTypedSelector(
    reduxServices.employeeAllocationReport.selectors.employeeUnderProject,
  )

  const dispatch = useAppDispatch()
  const { Select, toDate, allocationStatus, billingStatus, fromDate, id } =
    props

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
  const commonFormatDate = 'l'
  useEffect(() => {
    const newFromDate = new Date(
      moment(editEmployeeAllocation?.startdate?.toString()).format(
        commonFormatDate,
      ),
    )
    const newToDate = new Date(
      moment(editEmployeeAllocation?.enddate?.toString()).format(
        commonFormatDate,
      ),
    )
    if (
      editEmployeeAllocation?.startdate &&
      editEmployeeAllocation?.enddate &&
      newToDate.getTime() < newFromDate.getTime()
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            Leave already applied on mentioned date."
          />,
        ),
      )
    }
  }, [editEmployeeAllocation?.startdate, editEmployeeAllocation?.enddate])

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
    const formatDate = moment(date).format('DD/MM/YYYY')
    const name = 'enddate'
    setEditEmployeeAllocation((prevState) => {
      return { ...prevState, ...{ [name]: formatDate } }
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
      dispatch(
        reduxServices.employeeAllocationReport.projectUnderEmployeesReport({
          dateSelection: Select,
          employeeid: id as number,
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
      setIsProjectAllocationEdit(false)
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

  const cancelProjectAllocationButtonHandler = () => {
    setIsProjectAllocationEdit(false)
  }
  console.log(editEmployeeAllocation?.startdate)

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
              {projectUnderReport?.map((projectReport, KRAindex) => {
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
                      <CTableDataCell scope="row">
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
                            <option value="true">yes</option>
                            <option value="false">No</option>
                          </CFormSelect>
                        </div>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell scope="row">
                        {projectReport.billable ? 'yes' : 'No'}
                      </CTableDataCell>
                    )}
                    {isProjectAllocationEdit &&
                    projectReport.id === templateId ? (
                      <CTableDataCell scope="row">
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
                      <CTableDataCell scope="row">
                        {projectReport.isAllocated
                          ? 'Allocated'
                          : 'De-Allocated'}
                      </CTableDataCell>
                    )}
                    <CTableDataCell scope="row">
                      {isProjectAllocationEdit &&
                      projectReport.id === templateId ? (
                        <>
                          <CButton
                            color="success"
                            className="btn-ovh me-1"
                            onClick={saveProjectAllocationHandler}
                          >
                            <i
                              className="fa fa-floppy-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                          <CButton
                            color="warning"
                            className="btn-ovh me-1"
                            onClick={cancelProjectAllocationButtonHandler}
                          >
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </CButton>
                        </>
                      ) : (
                        <>
                          <CButton
                            color="info btn-ovh me-2"
                            onClick={() => {
                              editProjectAllocationButtonHandler(projectReport)
                            }}
                          >
                            <i className="fa fa-pencil-square-o"></i>
                          </CButton>
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
