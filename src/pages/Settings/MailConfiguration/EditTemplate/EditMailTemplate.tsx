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
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OCard from '../../../../components/ReusableComponent/OCard'
import {
  EditEmployeeMailTemplate,
  EditTemplateProps,
} from '../../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'

const EditMailTemplate = ({
  backButtonHandler,
  editEmployeeTemplate,
  employeeTemplate,
  setEditEmployeeTemplate,
}: EditTemplateProps): JSX.Element => {
  const [showAssetType, setShowAssetType] = useState<boolean>(false)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (Number(editEmployeeTemplate.templateTypeId) === 11) {
      setShowAssetType(true)
    } else {
      setShowAssetType(false)
    }
    if (!showAssetType) {
      if (editEmployeeTemplate.template?.replace(/^\s*/, '')) {
        setIsUpdateButtonEnabled(true)
      } else {
        setIsUpdateButtonEnabled(false)
      }
    }
  }, [editEmployeeTemplate.template])

  const handleDescription = (template: string) => {
    setEditEmployeeTemplate((prevState: EditEmployeeMailTemplate) => {
      return { ...prevState, ...{ template } }
    })
  }

  const handleUpdateMailTemplate = async () => {
    const updateMailTemplateResultAction = await dispatch(
      reduxServices.employeeMailConfiguration.updateMailTemplate(
        editEmployeeTemplate,
      ),
    )
    if (
      reduxServices.employeeMailConfiguration.updateMailTemplate.fulfilled.match(
        updateMailTemplateResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(
        reduxServices.employeeMailConfiguration.getEmployeeMailTemplate({
          templateName: employeeTemplate.templateName,
          templateTypeId: employeeTemplate.templateTypeId,
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Mail Template updated successfully"
          />,
        ),
      )
    }
  }

  const formLabelProps = {
    htmlFor: 'inputNewTemplate',
    className: 'col-form-label category-label',
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
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-btn"
              onClick={backButtonHandler}
            >
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
              Type :
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
                  Asset Type :
                </CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    data-testid="form-select-asset-type"
                    size="sm"
                    id="assetType"
                    name="assetTypeId"
                    value={editEmployeeTemplate?.assetTypeId as string}
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
                  Email :
                </CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    type="email"
                    data-testid="email-address"
                    name="email"
                    value={editEmployeeTemplate?.email as string}
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
              Title :
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
              Template :
              <span
                className={
                  editEmployeeTemplate.template?.replace(/^\s*/, '')
                    ? TextWhite
                    : TextDanger
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
                onClick={handleUpdateMailTemplate}
                data-testid="btn-update"
                disabled={!isUpdateButtonEnabled}
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
