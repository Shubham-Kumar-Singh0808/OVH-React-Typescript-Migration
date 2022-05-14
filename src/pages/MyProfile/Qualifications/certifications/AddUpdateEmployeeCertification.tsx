import {
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { OTextEditor } from '../../../../components/ReusableComponent/OTextEditor'
import { EmployeeCertificationProps } from '../../../../types/MyProfile/Qualifications/certificcationTypes'
import { EmployeeCertifications } from '../../../../types/MyProfile/Qualifications/qualificationTypes'
function AddUpdateEmployeeCertification({
  isEditCertificationDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: EmployeeCertificationProps): JSX.Element {
  const initialCerificationDetails = {} as EmployeeCertifications

  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [addCerification, setAddCerification] = useState({
    initialCerificationDetails,
  })
  const [dateOfIssue, setDateOfIssue] = useState<Date | string>()
  const [dateOfExpire, setDateOfExpire] = useState<Date | string>()
  const [error, setError] = useState<Date | null>(null)

  const formik = useFormik({
    initialValues: { name: '', message: '' },
    onSubmit: (values) => {
      console.log('Logging in ', values)
    },
  })
  const technologyLabelProps = {
    htmlFor: 'technology',
    className: 'col-sm-3 col-form-label text-end',
  }
  const certificationTypeLabelProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'certificationType',
  }
  const certificationLabelProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'ContactNumber',
  }
  const registrationLabelProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'registrationNumber',
  }
  const percentageLabelProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'percentage',
  }
  const descriptionLabelProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'description',
  }
  const onChangeDateOfCompletionHandler = (date: Date) => {
    if (isEditCertificationDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'completedDate'
      setAddCerification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setDateOfIssue(date)
    }
  }
  const onChangeDateOfExpireHandler = (date: Date) => {
    if (isEditCertificationDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'expiryDate'
      setAddCerification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setDateOfExpire(date)
    }
    setError(date)
  }
  return (
    <>
      <CCardHeader>
        <h4 className="h4">{headerTitle}</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...technologyLabelProps}>
              Technology:
              <span className={'text-danger'}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="technologyId"
                id="technology"
                // value={employeeVisaDetails?.countryId}
                // onChange={onChangeCountryHandler}
              >
                <option value={''}>Select Technology</option>
                {/* {fetchCountryDetails?.countries?.map((countriesItem, index) => (
                  <option key={index} value={countriesItem.id}>
                    {countriesItem.name}
                  </option>
                ))} */}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...certificationTypeLabelProps}>
              CertificateType: <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="certificateType"
                id="certificationType"
              >
                <option value={''}>Select Type of Certificate</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...certificationLabelProps}>
              Certification:<span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="certification"
                name="name"
                placeholder="Certification Name"
                maxLength={10}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...registrationLabelProps}>
              Registration No:<span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="registrationNumber"
                name="code"
                placeholder="Certification Id"
                maxLength={10}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Completed Date:
              <span className={dateOfIssue ? 'text-white' : 'text-danger'}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="dateOfIssue"
                maxDate={new Date()}
                value={dateOfIssue as string}
                selected={dateOfIssue as Date}
                onChange={onChangeDateOfCompletionHandler}
                id="dateOfIssue"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Expiry Date :
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="dateOfExpire"
                value={(dateOfExpire as string) || (dateOfExpire as string)}
                selected={dateOfExpire as Date}
                onChange={onChangeDateOfExpireHandler}
                id="dateOfExpire"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...percentageLabelProps}>Percentage:</CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="number"
                id="percentage"
                name="percent"
                placeholder="100"
                maxLength={3}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...descriptionLabelProps}>Description:</CFormLabel>
            <CCol sm={8}>
              <OTextEditor
                setFieldValue={(val) => formik.setFieldValue('', val)}
                value={''}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditCertificationDetails ? (
                <CButton className="btn-ovh me-2" color="success">
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled}
                  >
                    {confirmButtonText}
                  </CButton>
                  <CButton color="warning " className="btn-ovh">
                    Clear
                  </CButton>
                </>
              )}
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}
export default AddUpdateEmployeeCertification
