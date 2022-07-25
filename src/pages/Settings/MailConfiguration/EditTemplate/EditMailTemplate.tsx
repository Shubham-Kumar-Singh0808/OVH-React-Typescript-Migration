/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import {
  EditEmployeeMailTemplate,
  EditTemplateProps,
} from '../../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'

const EditMailTemplate = ({
  backButtonHandler,
  editEmployeeTemplate,
  setEditEmployeeTemplate,
}: EditTemplateProps): JSX.Element => {
  const [showAssetType, setShowAssetType] = useState<boolean>(false)
  const formLabelProps = {
    htmlFor: 'inputNewTemplate',
    className: 'col-form-label category-label',
  }

  useEffect(() => {
    if (Number(editEmployeeTemplate.templateTypeId) === 11) {
      setShowAssetType(true)
    } else {
      setShowAssetType(false)
    }
  })

  console.log(editEmployeeTemplate)
  const handleDescription = (template: string) => {
    setEditEmployeeTemplate((prevState: EditEmployeeMailTemplate) => {
      return { ...prevState, ...{ template } }
    })
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Template"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4} onClick={backButtonHandler}>
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
              Type:
            </CFormLabel>
            <CCol sm={4}>
              <CFormSelect
                data-testid="form-select-type"
                size="sm"
                id="templateTypeId"
                name="templateTypeId"
                value={editEmployeeTemplate?.templateTypeId}
                aria-label="Disabled input example"
                disabled
              >
                <option value={editEmployeeTemplate?.templateType}>
                  {editEmployeeTemplate?.templateType}
                </option>
              </CFormSelect>
            </CCol>
          </CRow>
          {showAssetType ? (
            <>
              <CRow className="mt-4 mb-4">
                <CFormLabel
                  {...formLabelProps}
                  className="col-sm-2 col-form-label text-end"
                >
                  Asset Type:
                </CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    data-testid="form-select-asset-type"
                    size="sm"
                    id="assetType"
                    name="assetTypeId"
                    value={editEmployeeTemplate?.assetTypeId}
                    aria-label="Disabled input example"
                    disabled
                  >
                    <option value={''}>Select Type</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mt-4 mb-4">
                <CFormLabel
                  {...formLabelProps}
                  className="col-sm-2 col-form-label text-end"
                >
                  Email:
                </CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    type="email"
                    data-testid="email-address"
                    name="email"
                    value={editEmployeeTemplate?.email}
                    maxLength={50}
                    aria-label="Disabled input example"
                    disabled
                  />
                </CCol>
              </CRow>
            </>
          ) : (
            <></>
          )}
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Title:
            </CFormLabel>
            <CCol sm={4}>
              <CFormInput
                data-testid="title-input"
                type="text"
                name="templateName"
                value={editEmployeeTemplate?.templateName}
                maxLength={50}
                aria-label="Disabled input example"
                disabled
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Template:{' '}
              <span
                className={
                  editEmployeeTemplate.template ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={10} data-testid="ckEditor-component">
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editEmployeeTemplate?.template}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          </CRow>
          <CRow>
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            ></CFormLabel>
            <CCol sm={4}>
              <CButton
                className="btn-ovh me-2"
                color="success"
                // disabled={!isAddButtonEnabled}
                // onClick={handleUpdateSkill}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default EditMailTemplate
