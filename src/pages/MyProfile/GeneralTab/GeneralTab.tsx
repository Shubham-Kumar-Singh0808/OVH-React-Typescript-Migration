import { CCardHeader } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import EmployeeGeneralInformation from './GeneralInformation'
import EmployeeSkillsTable from '../QualificationsTab/EmployeeSkills/EmployeeSkillsTable'
import FamilyDetailsTable from '../PersonalInfoTab/FamilyDetailsTable'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { reduxServices } from '../../../reducers/reduxServices'

const GeneralTab = (): JSX.Element => {
  const [isViewingAnotherEmployee] = useSelectedEmployee()

  const { employeeProfileId } = useParams<{ employeeProfileId: string }>()
  const dispatch = useDispatch()
  useEffect(() => {
    if (window.location.pathname === '/reporteesEmpProfile') {
      dispatch(
        reduxServices.personalInformation.getEmployeeFamilyDetails(
          employeeProfileId,
        ),
      )
    }
  }, [])

  return (
    <>
      <EmployeeGeneralInformation />
      <CCardHeader className="fw-semibold">Other Information</CCardHeader>
      <FamilyDetailsTable
        striped={true}
        bordered={true}
        isFieldDisabled={false}
        tableClassName="mt-4"
      />
      {!isViewingAnotherEmployee &&
      location.pathname === '/reporteesEmpProfile' ? (
        <EmployeeSkillsTable
          striped={true}
          bordered={true}
          isFieldDisabled={false}
          tableClassName={''}
        />
      ) : (
        ''
      )}
    </>
  )
}
export default GeneralTab
