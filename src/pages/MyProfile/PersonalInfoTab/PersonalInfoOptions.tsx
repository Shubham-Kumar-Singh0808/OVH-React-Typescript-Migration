import { CCardBody } from '@coreui/react-pro'
import React from 'react'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const PersonalInfoOptions = ({
  isViewingAnotherEmployee,
  setToggle,
}: {
  isViewingAnotherEmployee: boolean
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'My Profile-PersonalInfo-Family Details',
  )

  const familyAddButton =
    !isViewingAnotherEmployee && userAccess?.createaccess ? (
      <OAddButton addButtonHandler={() => setToggle('AddFamily')} />
    ) : (
      <></>
    )
  return (
    <>
      <CCardBody className="ps-0 pe-0">{familyAddButton}</CCardBody>
    </>
  )
}

export default PersonalInfoOptions
