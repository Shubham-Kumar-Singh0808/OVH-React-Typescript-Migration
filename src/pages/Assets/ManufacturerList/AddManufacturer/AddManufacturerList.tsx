import React from 'react'
import AddManuFactureFilterOptions from './AddManuFactureFilterOptions'
import OCard from '../../../../components/ReusableComponent/OCard'

const AddManufacturerList = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Manufacturer Name"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <>
          <AddManuFactureFilterOptions setToggle={setToggle} />
        </>
      </OCard>
    </>
  )
}

export default AddManufacturerList
