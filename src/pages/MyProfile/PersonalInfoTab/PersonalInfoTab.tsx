import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React, { useState } from 'react'

import AddEditFamilyDetails from './AddEditFamilyDetails'
import AddEditVisaDetails from './AddEditVisaDetails'
import FamilyDetailsTable from './FamilyDetailsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import VisaDetailsTable from './VisaDetailsTable'
import { personalInfoThunk } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { useAppDispatch } from '../../../stateStore'
const PersonalInfoTab = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()

  const editButtonHandler = (familyId: number) => {
    setToggle('EditFamily')
    dispatch(personalInfoThunk.getEmployeeFamilyMember(familyId))
  }
  const editVisaButtonHandler = (id: number) => {
    setToggle('EditVisa')
    dispatch(personalInfoThunk.getEmployeeVisa(id))
  }

  return (
    <>
      <>
        {toggle === '' && (
          <>
            <CCardHeader>
              <h4 className="h4">Family Details</h4>
            </CCardHeader>
            <CCardBody className="ps-0 pe-0">
              <OAddButton addButtonHandler={() => setToggle('AddFamily')} />
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
              <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
              <VisaDetailsTable editVisaButtonHandler={editVisaButtonHandler} />
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
          <AddEditVisaDetails
            backButtonHandler={() => setToggle('')}
            headerTitle="Add Visa Details"
            confirmButtonText="Add"
          />
        )}
        {toggle === 'EditVisa' && (
          <AddEditVisaDetails
            headerTitle="Edit Visa Details"
            confirmButtonText="Update"
            backButtonHandler={() => setToggle('')}
            isEditVisaDetails={true}
          />
        )}
      </>
    </>
  )
}
export default PersonalInfoTab
