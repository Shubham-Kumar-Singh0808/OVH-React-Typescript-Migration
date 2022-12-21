import React from 'react'
import ProjectDetails from './ProjectDetails'
import ProjectViewTabs from './ProjectViewTabs'
import OCard from '../../../../../components/ReusableComponent/OCard'

const ProjectView = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ProjectDetails />
        <ProjectViewTabs />
      </OCard>
    </>
  )
}

export default ProjectView
