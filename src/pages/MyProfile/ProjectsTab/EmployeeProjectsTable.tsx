import {
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EmployeeProjectsEntry from './EmployeeProjectsEntry'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeProjectsTable = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeProjects = useTypedSelector(
    reduxServices.employeeProjects.selectors.employeeProjects,
  )

  useEffect(() => {
    setIsLoading(true)
    if (employeeId) {
      dispatch(reduxServices.employeeProjects.getEmployeeProjects(employeeId))
    }
  }, [dispatch, employeeId])

  useEffect(() => {
    if (employeeProjects) setIsLoading(false)
  }, [employeeProjects])

  return (
    <>
      <CCardBody className="ps-0 pe-0">
        <CTable className="text-left" striped>
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
            {!isLoading ? (
              employeeProjects &&
              employeeProjects.Projs?.map((project, index) => (
                <EmployeeProjectsEntry
                  id={index}
                  project={project}
                  key={index}
                />
              ))
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
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
