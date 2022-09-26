import React from 'react'
import TrackerListOptions from './TrackerListOptions'
import OCard from '../../../../components/ReusableComponent/OCard'

const TrackerList = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Tracker List'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <TrackerListOptions setToggle={setToggle} />
      </OCard>
    </>
  )
}

export default TrackerList
