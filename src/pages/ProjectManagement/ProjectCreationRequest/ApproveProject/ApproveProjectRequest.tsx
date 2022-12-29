import React from 'react'
import ApproveProjectForm from './ApproveProjectForm'
import OCard from '../../../../components/ReusableComponent/OCard'

const ApproveProjectRequest = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Project"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ApproveProjectForm />
      </OCard>
    </>
  )
}

export default ApproveProjectRequest
