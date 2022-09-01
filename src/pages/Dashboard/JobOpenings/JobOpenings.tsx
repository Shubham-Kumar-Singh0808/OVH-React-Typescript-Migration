import React from 'react'
import JobOpeningsTable from './JobOpeningsTable'
import OCard from '../../../components/ReusableComponent/OCard'

const JobOpenings = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Job Openings"
        CFooterClassName="d-none"
      >
        <JobOpeningsTable />
      </OCard>
    </>
  )
}

export default JobOpenings
