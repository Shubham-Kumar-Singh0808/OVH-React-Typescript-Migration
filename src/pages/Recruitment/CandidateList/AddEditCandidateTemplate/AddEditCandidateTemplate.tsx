import { CButton, CCol, CFormInput, CFormSelect, CRow } from '@coreui/react-pro'
import React from 'react'
import CandidateEntryItem from './CandidateEntryItem'
import { AddEditCandidateTemplateProps } from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import { useTypedSelector } from '../../../../stateStore'

const AddEditCandidateTemplate = ({
  firstName,
  firstNameChangeHandler,
  lastName,
  lastNameChangeHandler,
}: AddEditCandidateTemplateProps) => {
  const allJobVacanciesList = useTypedSelector(
    (state) => state.candidateList.allJobVacancies.list,
  )
  const allEmpCountriesList = useTypedSelector(
    (state) => state.candidateList.empCountries,
  )
  const allTechnologyList = useTypedSelector(
    (state) => state.candidateList.getAllTechnology,
  )
  return (
    <>
      <CRow className="mt-2 justify-content-end text-end">
        <CCol xs={2} className="px-0">
          <CButton color="info" className="btn-ovh me-3">
            <i className="fa fa-arrow-left me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <div>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="First Name" showAsterix>
              <CFormInput
                type="text"
                placeholder="FirstName"
                value={firstName}
                onChange={firstNameChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Last Name" showAsterix>
              <CFormInput
                type="text"
                placeholder="LastName"
                value={lastName}
                onChange={lastNameChangeHandler}
              />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Aadhar Number">
              <CFormInput type="text" placeholder="Aadhar Number" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="PAN Number">
              <CFormInput type="text" placeholder="PAN Number" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Applied For" showAsterix>
              <CFormSelect>
                <option>Select Position Vacant</option>
                {allJobVacanciesList?.map((position, positionIndex) => (
                  <option key={positionIndex}>{position.positionVacant}</option>
                ))}
              </CFormSelect>
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Email">
              <CFormInput type="text" placeholder="LastName" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Source Type">
              <CFormInput type="text" placeholder="FirstName" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Experience">
              <CFormInput type="text" placeholder="LastName" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Source Name">
              <CFormInput type="text" placeholder="FirstName" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Technology">
              <CFormSelect>
                <option>Select</option>
                {allTechnologyList?.map((technology, technologyIndex) => (
                  <option key={technologyIndex}>{technology.name}</option>
                ))}
              </CFormSelect>
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="LinkedIn ID">
              <CFormInput type="text" placeholder="LinkedIn ID" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="DOB">
              <CFormInput type="text" placeholder="FirstName" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Mobile">
              <CFormInput type="text" placeholder="LastName" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Recruiter Name">
              <CFormInput type="text" placeholder="FirstName" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Skills">
              <CFormInput type="text" placeholder="LastName" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="CTC">
              <CFormInput type="text" placeholder="FirstName" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="ECTC">
              <CFormInput type="text" placeholder="LastName" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Current Employer">
              <CFormInput type="text" placeholder="Current Employer" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Current Location">
              <CFormInput type="text" placeholder="Current Location" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Notice Period">
              <CFormInput type="text" placeholder="Notice Period" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Job Type">
              <CFormInput type="text" placeholder="Job Type" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Skype ID">
              <CFormInput type="text" placeholder="Skype ID" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="Country">
              <CFormSelect>
                <option>Select Country</option>
                {allEmpCountriesList?.map((country, countryIndex) => (
                  <option key={countryIndex}>{country.name}</option>
                ))}
              </CFormSelect>
            </CandidateEntryItem>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CandidateEntryItem label="Upload Resume">
              <input type="file" />
            </CandidateEntryItem>
          </CCol>
          <CCol sm={6}>
            <CandidateEntryItem label="WhatsApp Notifications">
              <CFormInput type="text" placeholder="Country" />
            </CandidateEntryItem>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default AddEditCandidateTemplate
