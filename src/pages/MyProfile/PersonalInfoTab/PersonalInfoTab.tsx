import React, { useState } from 'react'
import {
  CCardHeader,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CButton,
} from '@coreui/react-pro'
// import DatePicker from 'react-datepicker'
import FamilyDetailsTable from './FamilyDetailsTable'
import VisaDetailsTable from './VisaDetailsTable'
import AddEditVisaDetails from './AddEditVisaDetails'
import AddEditFamilyDetails from './AddEditFamilyDetails'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import { useAppDispatch } from '../../../stateStore'
import { personalInfoThunk } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
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
            <CCardBody>
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
            <CCardBody>
              <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
              <VisaDetailsTable editVisaButtonHandler={editVisaButtonHandler} />
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Contact Details</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Mobile:<span className="text-danger">*</span>
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder="98xxxxxxxx" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Alternative Mobile:
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput type="text" size="sm" placeholder="98xxxxxxxx" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Home:
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={2}>
                  <CFormInput type="text" size="sm" />
                </CCol>
                <CCol sm={3}>
                  <CFormInput type="text" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Work:
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={2}>
                  <CFormInput type="text" size="sm" />
                </CCol>
                <CCol sm={3}>
                  <CFormInput type="text" size="sm" />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Emergency Contact</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Name:<span className="text-danger">*</span>
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    size="sm"
                    id="Name"
                    placeholder="Name"
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Mobile:<span className="text-danger">*</span>
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="+91"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    id="Mobile"
                    placeholder="9xxxxxxxxx"
                    size="sm"
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Relationship:
                  <span className="text-danger">*</span>
                </CFormLabel>
                <CCol sm={3}>
                  <CFormSelect
                    aria-label="Relationship"
                    name="relationShip"
                    id="Relationship"
                    size="sm"
                  >
                    <option value={''}>Select Relationship</option>
                    <option value="Brother">Brother</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Father">Father</option>
                    <option value="Friend">Friend</option>
                    <option value="Husband">Husband</option>
                    <option value="Mother">Mother</option>
                    <option value="Sister">Sister</option>
                    <option value="Son">Son</option>
                    <option value="Wife">Wife</option>
                    <option value="Other">Other</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Present Address</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Address:<span className="text-danger">*</span>
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder="Address" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  City/Town:<span className="text-danger">*</span>
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder="City/Town" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Zip:<span className="text-danger">*</span>
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder="Zip" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Landmark:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder="Landmark" size="sm" />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Permanent Address</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormCheck
                  id="flexCheckDefault"
                  label="Same as Present Address"
                />
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Address:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder=" Address" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  City/Town:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder=" City/Town" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Zip:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder=" Zip" size="sm" />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Landmark:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput type="text" placeholder="Landmark" size="sm" />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Passport Details</h4>
            </CCardHeader>
            <CCardBody>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Number:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    placeholder="Passport Number"
                    size="sm"
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Place of Issue:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="text"
                    size="sm"
                    placeholder="Place"
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Date of Issue :
                </CFormLabel>
                <CCol sm={3}>
                  {/* <DatePicker
                    className="form-control form-control-sm"
                    name="dateOfBirth"
                    maxDate={new Date()}
                    id="dateOfBirth"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                  /> */}
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Date of Expiry:
                </CFormLabel>
                <CCol sm={3}>
                  {/* <DatePicker
                    className="form-control"
                    name="dateOfBirth"
                    maxDate={new Date()}
                     selected={dateOfBirth as Date}
                     onChange={(date: Date) => onDateChangeHandler(date)}
                    id="dateOfBirth"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                  /> */}
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Upload Passport Front Copy:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="file"
                    name="file"
                    className="form-control form-control-sm"
                    id="exampleFormControlFile2"
                  />
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel className="col-sm-3 col-form-label text-end">
                  Upload Passport Back Copy:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormInput
                    type="file"
                    name="file"
                    className="form-control form-control-sm"
                    id="exampleFormControlFile2"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={{ span: 6, offset: 3 }}>
                  <CButton
                    className="btn-ovh btn btn-success mt-4"
                    size="sm"
                    type="submit"
                  >
                    Save
                  </CButton>
                </CCol>
              </CRow>
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
