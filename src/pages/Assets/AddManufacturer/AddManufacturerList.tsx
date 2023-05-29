import React, { useEffect } from 'react'
import AddManuFactureFilterOptions from './AddManuFactureFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'

const AddManufacturerList = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.ManufacturerList.getAllLookUps())
  }, [dispatch])
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
