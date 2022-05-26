import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React, { useState } from 'react'

import AddUpdateEmployeeCertification from './EmployeeCertifications/AddUpdateEmployeeCertification'
import AddUpdateEmployeeQualification from './EmployeeQualifications/AddUpdateEmployeeQualification'
import EmployeeCertificationsTable from './EmployeeCertifications/EmployeeCertificationsTable'
import EmployeeQualifications from './EmployeeQualifications/EmployeeQualification'
import EmployeeSkillsTable from './EmployeeSkills/EmployeeSkillsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import { certificationThunk } from '../../../reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { useAppDispatch } from '../../../stateStore'
import { employeeSkillThunk } from '../../../reducers/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import AddEditEmployeeSkill from './EmployeeSkills/AddEditEmployeeSkill'
const QualificationDetails = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()

  const editCertificateButtonHandler = (id: number) => {
    setToggle('EditCertificateSection')
    dispatch(certificationThunk.getEmployeeCertificate(id))
  }
  const editSkillButtonHandler = (skillId: number) => {
    setToggle('editSkill')
    dispatch(employeeSkillThunk.getEmployeeSkillInformation(skillId))
  }

  return (
    <>
      {toggle === '' && (
        <>
          <CCardHeader>
            <h4 className="h4">Qualifications</h4>
          </CCardHeader>
          <CCardBody>
            <OAddButton
              addButtonHandler={() => setToggle('addQualificationSection')}
            />
            <EmployeeQualifications />
          </CCardBody>
          <CCardHeader>
            <h4 className="h4">Certifications</h4>
          </CCardHeader>
          <CCardBody>
            <OAddButton
              addButtonHandler={() => setToggle('addCertificationSection')}
            />
            <EmployeeCertificationsTable
              editCertificateButtonHandler={editCertificateButtonHandler}
            />
          </CCardBody>
          <CCardHeader>
            <h4 className="h4">Skills</h4>
          </CCardHeader>
          <CCardBody>
            <OAddButton addButtonHandler={() => setToggle('addSkills')} />
            <EmployeeSkillsTable
              editSkillButtonHandler={editSkillButtonHandler}
              isFieldDisabled={true}
              striped={true}
              bordered={false}
              tableClassName={''}
            />
          </CCardBody>
        </>
      )}
      {toggle === 'addQualificationSection' && (
        <AddUpdateEmployeeQualification
          isEmployeeQualificationExist={true}
          backButtonHandler={() => setToggle('')}
        />
      )}
      {toggle === 'addCertificationSection' && (
        <AddUpdateEmployeeCertification
          backButtonHandler={() => setToggle('')}
          headerTitle="Add Certification"
          confirmButtonText="Add"
        />
      )}
      {toggle === 'EditCertificateSection' && (
        <AddUpdateEmployeeCertification
          headerTitle="Edit Certification"
          confirmButtonText="Update"
          backButtonHandler={() => setToggle('')}
          isEditCertificationDetails={true}
        />
      )}
      {toggle === 'addSkills' && (
        <AddEditEmployeeSkill
          headerTitle="Add Skill"
          confirmButtonText="Add"
          backButtonHandler={() => setToggle('')}
        />
      )}
      {toggle === 'editSkill' && (
        <AddEditEmployeeSkill
          headerTitle="Edit Skill"
          confirmButtonText="Update"
          backButtonHandler={() => setToggle('')}
          isEditSkillsDetails={true}
        />
      )}
    </>
  )
}
export default QualificationDetails
