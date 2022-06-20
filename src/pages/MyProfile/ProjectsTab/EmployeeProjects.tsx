import { CCardHeader } from '@coreui/react-pro'

import React from 'react'
import EmployeeProjectsTable from './ProjectsTabTable'

const EmployeeProjects = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Project Report</h4>
      </CCardHeader>
      <br />
      <EmployeeProjectsTable />
    </>
  )
}

export default EmployeeProjects
