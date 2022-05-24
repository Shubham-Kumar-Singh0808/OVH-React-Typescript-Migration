import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React, { useState } from 'react'
import CertificationsTable from '../certifications/CertificationsTable'
import EmployeeQualifications from './EmployeeQualification'
import OAddButton from '../../../../components/ReusableComponent/OAddButton'
import SkillsTable from '../skills/SkillsTable'
import AddUpdateEmployeeQualification from './AddUpdateEmployeeQualification'
import AddUpdateEmployeeCertification from '../certifications/AddUpdateEmployeeCertification'
import { certificationThunk } from '../../../../reducers/MyProfile/Qualifications/certificationSlice'
import { useAppDispatch } from '../../../../stateStore'

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
            <CertificationsTable
              editCertificateButtonHandler={editCertificateButtonHandler}
            />
          </CCardBody>
          <CCardHeader>
            <h4 className="h4">Skills</h4>
          </CCardHeader>
          <CCardBody>
            <OAddButton />
            <SkillsTable
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
