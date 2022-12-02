import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import EmployeeViewProfileDetails from './EmployeeViewProfileDetails'
import EmployeeViewProfileTabs from './EmployeeViewProfileTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeProfile = (): JSX.Element => {
  const employeeProfileInformation = useTypedSelector((state) =>
    reduxServices.employeeProfileView.selectors.selectLoggedInEmployeeData(
      state,
    ),
  )
  console.log(employeeProfileInformation)
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Profile Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={'/employeeList'}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <EmployeeViewProfileDetails
          employeeGeneralInformation={employeeProfileInformation}
        />
        <EmployeeViewProfileTabs />
      </OCard>
    </>
  )
}

export default EmployeeProfile
