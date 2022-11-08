import React, { useState } from 'react'
import CreateNewTicketFilterOptions from './CreateNewTicketFilterOptions'
import TrackerList from './TrackerList/TrackerList'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const CreateNewTicket = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Tracker',
  )

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="New Ticket"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CreateNewTicketFilterOptions
              setToggle={setToggle}
              userViewAccess={userAccess?.viewaccess as boolean}
            />
          </OCard>
        </>
      )}
      {toggle === 'addTrackerList' && <TrackerList setToggle={setToggle} />}
    </>
  )
}

export default CreateNewTicket
