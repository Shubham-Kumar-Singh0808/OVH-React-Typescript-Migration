import { CCardHeader } from '@coreui/react-pro'

import React from 'react'
import ProjectsTabTable from './ProjectsTabTable'

const ProjectsTab = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Project Report</h4>
      </CCardHeader>
      <br />
      <ProjectsTabTable />
    </>
  )
}

export default ProjectsTab
