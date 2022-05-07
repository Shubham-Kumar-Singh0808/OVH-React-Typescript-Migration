import React, { useState } from 'react'
import { CCardHeader, CCardBody } from '@coreui/react-pro'
import FamilyDetailsTable from './FamilyDetailsTable'
import VisaDetailsTable from './VisaDetailsTable'
import AddEditVisaDetails from './AddEditVisaDetails'
import AddEditFamilyDetails from './AddEditFamilyDetails'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import { useAppDispatch } from '../../../stateStore'
import { doEditNewFamilyMember } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
const PersonalInfoTab = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()

  const editButtonHandler = (familyId: number) => {
    setToggle('EditFamily')
    dispatch(doEditNewFamilyMember(familyId))
  }

  return (
    <>
      <>
        {toggle === '' && (
          <>
            <CCardHeader>
              <h4 className="h4">Family Details</h4>
            </CCardHeader>
            <CCardBody>
              <OAddButton addButtonHandler={() => setToggle('AddFamily')} />
              <FamilyDetailsTable editButtonHandler={editButtonHandler} />
            </CCardBody>

            <CCardHeader>
              <h4 className="h4">Visa Details</h4>
            </CCardHeader>
            <CCardBody>
              <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
              <VisaDetailsTable />
            </CCardBody>
          </>
        )}
        {toggle === 'AddFamily' && (
          <AddEditFamilyDetails
            headerTitle="Add Family Member"
            confirmButtonText="Add"
            backButtonHandler={() => setToggle('')}
          />
        )}
        {toggle === 'EditFamily' && (
          <AddEditFamilyDetails
            headerTitle="Edit Family Member"
            confirmButtonText="Update"
            backButtonHandler={() => setToggle('')}
            isEditFamilyDetails={true}
          />
        )}

        {toggle === 'AddVisa' && (
          <AddEditVisaDetails backButtonHandler={() => setToggle('')} />
        )}
      </>
    </>
  )
}
export default PersonalInfoTab
