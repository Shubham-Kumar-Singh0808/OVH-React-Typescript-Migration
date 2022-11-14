import React from 'react'
import SubmitResignationFilterOptions from './SubmitResignationFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const SubmitResignation = (): JSX.Element => {
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Submit Resignation"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <SubmitResignationFilterOptions />
    </OCard>
  )
}

export default SubmitResignation
