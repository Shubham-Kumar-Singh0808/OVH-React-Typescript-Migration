import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'

import React, { useState } from 'react'
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { EmployeeHandbook } from '../../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

function AddNewHandbook(): JSX.Element {
  const initialHandbookDetails = {} as EmployeeHandbook
  const [addNewPage, setAddNewPage] = useState(initialHandbookDetails)
  const [showEditor, setShowEditor] = useState<boolean>(false)

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }

  const handleDescription = (description: string) => {
    setAddNewPage((prevState) => {
      return { ...prevState, ...{ description: description } }
    })
  }

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Add New Page</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'title',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Title:
              <span>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput type="text" name="title" maxLength={50} />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'pageName',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Page Name:
              <span>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput type="text" name="pageName" maxLength={50} />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'displayOrder',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Display Order::
              <span>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput type="text" name="displayOrder" maxLength={50} />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'country',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Country:
              <span>*</span>
            </CFormLabel>
            <CCol sm={3}></CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Description:
            </CFormLabel>
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData=""
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
              <p className="text-danger">
                Please enter at least 150 characters.
              </p>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton className="btn-ovh me-1 text-white" color="success">
                Save
              </CButton>
              <CButton color="warning " className="btn-ovh text-white">
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}
export default AddNewHandbook
