import React from 'react'
import CreateNewTicketFilterOptions from './CreateNewTicketFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
// import AddTrackerList from '../Raise Ticket/Add Tracker List/AddTrackerList'

const CreateNewTicket = (): JSX.Element => {
  // const [toggle, setToggle] = useState('')
  return (
    <>
      {/* {toggle === '' && ( */}
      <>
        <OCard
          className="mb-4 myprofile-wrapper"
          title="New Ticket"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          {/* <CreateNewTicketFilterOptions setToggle={setToggle} /> */}
          <CreateNewTicketFilterOptions />
        </OCard>
      </>
      {/* )}
      {toggle === 'addTrackerList' && <AddTrackerList />} */}
    </>
  )
}

export default CreateNewTicket
