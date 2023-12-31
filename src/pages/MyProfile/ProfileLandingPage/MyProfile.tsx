import { CButton, CCol, CRow } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import React from 'react'
import MyProfileTabs from './MyProfileTabs'
import ProfileDetails from './ProfileDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { useTypedSelector } from '../../../stateStore'

const MyProfile = (): JSX.Element => {
  const [isViewingAnotherEmployee, employeeId] = useSelectedEmployee()
  const employeeGeneralInformation = useTypedSelector((state) =>
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData(
      state,
      isViewingAnotherEmployee,
    ),
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Profile Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isViewingAnotherEmployee ? (
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <Link to={`/editEmployee/${employeeId}`}>
                <CButton color="info" className="btn-ovh me-1">
                  <i className="fa fa-pencil-square-o  me-1"></i>Edit
                </CButton>
              </Link>
              <Link to={'/employeeList'}>
                <CButton color="info" className="btn-ovh me-1">
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </Link>
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
        <ProfileDetails
          employeeGeneralInformation={employeeGeneralInformation}
        />
        <MyProfileTabs />
      </OCard>
    </>
  )
}

export default MyProfile
