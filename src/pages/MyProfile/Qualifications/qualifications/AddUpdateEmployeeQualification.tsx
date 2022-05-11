import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { OTextEditor } from '../../../../components/ReusableComponent/OTextEditor'
import { useFormik } from 'formik'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { doFetchPgAndGraduationItems } from '../../../../reducers/Qualifications/qualificationSlice'
import { AddBackButtons } from '../../../../types/MyProfile/Qualifications/qualificationTypes'
const AddUpdateEmployeeQualification = ({
  backButtonHandler,
  addButtonHandler,
}: AddBackButtons): JSX.Element => {
  const getPgAndGraduationLookUpItems = useTypedSelector(
    (state) =>
      state.postGraduationAndGraduationList.pgLookUpAndGraduationLookUpDetails,
  )
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchPgAndGraduationItems())
  }, [dispatch])

  const formik = useFormik({
    initialValues: { name: '', message: '<p>Testing</p>' },
    onSubmit: (values) => {
      console.log('Logging in ', values)
    },
  })

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Add Qualification</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info btn-ovh me-1" onClick={addButtonHandler}>
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
            <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Post Graduation:
          </CFormLabel>
          <CCol sm={3}>
            <Multiselect
              className="ovh-multiselect"
              options={getPgAndGraduationLookUpItems?.pgDetails || []}
              displayValue="label"
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Graduation:<span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <Multiselect
              className="ovh-multiselect"
              options={getPgAndGraduationLookUpItems?.graduationDetails || []}
              displayValue="label"
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Higher Secondary Certificate:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Secondary School Certificate:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Other:
          </CFormLabel>
          <CCol sm={8}>
            <OTextEditor
              setFieldValue={(val) => formik.setFieldValue('message', val)}
              value={formik.values.message}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol className="col-md-3 offset-md-3">
            <CButton className="btn-ovh me-1" color="success">
              Add
            </CButton>
            <span>
              <CButton color="warning " className="btn-ovh">
                Clear
              </CButton>
            </span>
          </CCol>
        </CRow>
      </CCardBody>
    </>
  )
}

export default AddUpdateEmployeeQualification
