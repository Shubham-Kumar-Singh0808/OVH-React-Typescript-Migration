import React from 'react'
import EditConfiguration from './EditConfiguration'
import OCard from '../../../../components/ReusableComponent/OCard'

const EditConfigurationOptions = () => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Configuration"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EditConfiguration />
      </OCard>
    </>
  )
}

export default EditConfigurationOptions
