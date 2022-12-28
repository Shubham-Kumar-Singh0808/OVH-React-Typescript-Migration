import React from 'react'
import ProjectHiveActivityReportOptions from './ProjectHiveActivityReportOptions'
import OCard from '../../../../../components/ReusableComponent/OCard'

const ProjectHiveActivityReport = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Hive Activity Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ProjectHiveActivityReportOptions />
      </OCard>
    </>
  )
}

export default ProjectHiveActivityReport
