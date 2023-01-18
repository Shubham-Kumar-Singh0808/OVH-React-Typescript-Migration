import React from 'react'
import ProjectTailoringTable from './ProjectTailoringTable'
import OCard from '../../../../../components/ReusableComponent/OCard'

const ProjectTailoring = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Tailoring for Project Document"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ProjectTailoringTable />
      </OCard>
    </>
  )
}

export default ProjectTailoring
