import React from 'react'
import AddProjectRequestForm from './AddProjectRequestForm'
import OCard from '../../../../components/ReusableComponent/OCard'

const AddProjectRequest = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Request Project"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <AddProjectRequestForm />
      </OCard>
    </>
  )
}

export default AddProjectRequest
