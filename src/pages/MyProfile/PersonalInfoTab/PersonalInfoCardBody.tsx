import React from 'react'
import { CCardBody, CCardHeader } from '@coreui/react-pro'
import FamilyDetailsTable from './FamilyDetailsTable'
import VisaDetailsTable from './VisaDetailsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import { cardBodyProps } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'

const PersonalInfoCardBody = ({
  isViewingAnotherEmployee,
  setToggle,
  editButtonHandler,
  editVisaButtonHandler,
}: cardBodyProps): JSX.Element => {
  return (
    <>
      <CCardBody className="ps-0 pe-0">
        {!isViewingAnotherEmployee ? (
          <OAddButton addButtonHandler={() => setToggle('AddFamily')} />
        ) : (
          <></>
        )}
        <FamilyDetailsTable
          editButtonHandler={editButtonHandler}
          isFieldDisabled={true}
          striped={true}
          bordered={false}
          tableClassName=""
        />
      </CCardBody>
      <CCardHeader>
        <h4 className="h4">Visa Details</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0">
        {!isViewingAnotherEmployee ? (
          <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
        ) : (
          <></>
        )}
        <VisaDetailsTable editVisaButtonHandler={editVisaButtonHandler} />
      </CCardBody>
    </>
  )
}

export default PersonalInfoCardBody
