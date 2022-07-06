import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

function AddNewTemplate(): JSX.Element {
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [addNewTemplate, setAddNewTemplate] = useState()

  const getTemplateTypes = useTypedSelector(
    reduxServices.addNewMailTemplate.selectors.templateTypes,
  )

  const formLabelProps = {
    htmlFor: 'inputNewTemplate',
    className: 'col-form-label category-label',
  }

  //   const handleDescription = (description: string) => {
  //     setAddNewTemplate((prevState) => {
  //       return { ...prevState, ...{ description } }
  //     })
  //   }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Template"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
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
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Type: <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={4}>
              <CFormSelect
                data-testid="form-select"
                aria-label="Default select example"
                size="sm"
                id="type"
                name="type"
              >
                <option value={''}>Select Type</option>
                {getTemplateTypes?.map((template, index) => (
                  <option key={index} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <CButton color="info btn-ovh me-1" size="sm">
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Title:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={4}>
              <CFormInput type="text" name="title" maxLength={50} />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Template: <span className="text-danger">*</span>
            </CFormLabel>
            {showEditor ? (
              <CCol sm={10}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={''}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    //   handleDescription(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow>
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            ></CFormLabel>
            <CCol sm={4}>
              <CButton className="btn-ovh me-1 text-white" color="success">
                Add
              </CButton>
              <CButton color="warning " className="btn-ovh text-white">
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default AddNewTemplate
