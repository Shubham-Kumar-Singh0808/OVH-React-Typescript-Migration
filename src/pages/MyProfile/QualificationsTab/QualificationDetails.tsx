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

const QualificationDetails = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()

  const editCertificateButtonHandler = (id: number) => {
    setToggle('EditCertificateSection')
    dispatch(certificationThunk.getEmployeeCertificate(id))
  }
  return (
    <>
      {toggle === '' && (
        <>
          <CCardHeader>
            <h4 className="h4">Qualifications</h4>
          </CCardHeader>
          <CCardBody className="ps-0">
            <OAddButton
              addButtonHandler={() => setToggle('addQualificationSection')}
            />
            <EmployeeQualifications />
          </CCardBody>
          <CCardHeader>
            <h4 className="h4">Certifications</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0">
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
          <CCardBody className="ps-0 pe-0">
            <OAddButton />
            <EmployeeSkillsTable
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
    </>
  )
}
export default QualificationDetails
