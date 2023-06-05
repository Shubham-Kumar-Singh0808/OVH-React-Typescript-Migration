import {
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EmployeeProjectDetailsTable from './EmployeeProjectDetailsTable'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const EmployeeProjectsTable = (): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectEmpId, setSelectEmpId] = useState<number>()

  const handleExpandRow = (id: number) => {
    setIsIconVisible(true)
    setSelectEmpId(id)
  }

  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeProjects = useTypedSelector(
    reduxServices.employeeProjects.selectors.employeeProjects,
  )

  useEffect(() => {
    if (employeeId) {
      dispatch(reduxServices.employeeProjects.getEmployeeProjects(employeeId))
    }
  }, [dispatch, employeeId])

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase())
      })
      .join(' ')
  }
  return (
    <>
      <CCardBody className="ps-0 pe-0">
        <CTable
          striped
          responsive
          className="text-start text-left align-middle alignment"
        >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Client</CTableHeaderCell>
              <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {employeeProjects?.Projs?.map((data, index) => {
              let health
              if (data?.health === 'Green') {
                health = (
                  <span
                    data-testid="project-health"
                    className="profile-tab-label profile-tab-label-success"
                  >
                    {data.status}
                  </span>
                )
              }
              if (data?.health === 'Orange') {
                health = (
                  <span
                    data-testid="project-health"
                    className="profile-tab-label profile-tab-label-warning"
                  >
                    {data.status}
                  </span>
                )
              }
              if (data?.health === 'Red') {
                health = (
                  <span
                    data-testid="project-health"
                    className="profile-tab-label profile-tab-label-failed"
                  >
                    {data.status}
                  </span>
                )
              }
              if (data.health === 'Gray' || data.health === null) {
                health = (
                  <span
                    data-testid="project-health"
                    className="profile-tab-label profile-tab-label-null"
                  >
                    {data.status}
                  </span>
                )
              }

              const projectType =
                data.type === null ? ' ' : toTitleCase(data.type as string)
              return (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableDataCell scope="row">
                      {isIconVisible && selectEmpId === data.id ? (
                        <i
                          data-testid="minus-btn"
                          className="fa fa-minus-circle cursor-pointer"
                          onClick={() => setIsIconVisible(false)}
                        />
                      ) : (
                        <i
                          data-testid="plus-btn"
                          className="fa fa-plus-circle cursor-pointer"
                          onClick={() => handleExpandRow(Number(data.id))}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.projectName}
                    </CTableDataCell>
                    <CTableDataCell scope="row">{projectType}</CTableDataCell>
                    <CTableDataCell scope="row">{data.client}</CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.managerName}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.startdate}
                    </CTableDataCell>
                    <CTableDataCell scope="row">{data.enddate}</CTableDataCell>
                    <CTableDataCell scope="row">{health}</CTableDataCell>
                  </CTableRow>
                  {isIconVisible && selectEmpId === data.id ? (
                    <CTableDataCell colSpan={10}>
                      <EmployeeProjectDetailsTable
                        projectId={data.id as number}
                      />
                    </CTableDataCell>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              )
            })}
          </CTableBody>
        </CTable>
      </CCardBody>
      <p>
        <strong>
          {employeeProjects?.Projsize > 0
            ? `Total Records: ${employeeProjects.Projsize}`
            : 'No Records Found...'}
        </strong>
      </p>
    </>
  )
}

export default EmployeeProjectsTable
