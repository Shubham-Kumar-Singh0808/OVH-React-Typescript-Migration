import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CBadge,
  CRow,
  CCol,
} from '@coreui/react-pro'

import React, { useEffect, useMemo } from 'react'
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
