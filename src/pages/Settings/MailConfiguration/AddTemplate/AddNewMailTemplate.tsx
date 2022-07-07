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
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddNewTemplate } from '../../../../types/Settings/MailConfiguration/AddTemplate/addMailTemplateTypes'
import OToast from '../../../../components/ReusableComponent/OToast'

function AddNewMailTemplate(): JSX.Element {
  const initialMailTemplateDetails = {} as AddNewTemplate
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [addNewTemplate, setAddNewTemplate] = useState(
    initialMailTemplateDetails,
  )
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const getTemplateTypes = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplateTypes,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeMailConfiguration.getMailTemplateTypes())
    dispatch(reduxServices.addNewMailTemplate.getAssetTypes())
  }, [dispatch])

  const getAssetTypes = useTypedSelector(
    reduxServices.addNewMailTemplate.selectors.assetTypes,
  )

  useEffect(() => {
    if (
      addNewTemplate.assetTypeId &&
      addNewTemplate.template &&
      addNewTemplate.templateName &&
      addNewTemplate.email &&
      addNewTemplate.templateTypeId
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [addNewTemplate])

  const formLabelProps = {
    htmlFor: 'inputNewTemplate',
    className: 'col-form-label category-label',
  }

  const handleDescription = (template: string) => {
    setAddNewTemplate((prevState) => {
      return { ...prevState, ...{ template } }
    })
  }

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    console.log(name)
    setAddNewTemplate((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const successToastMessage = (
    <OToast
      toastMessage="Mail Template added successfully"
      toastColor="success"
    />
  )

  const handleAddNewHandbookPage = async () => {
    const addNewTemplateResultAction = await dispatch(
      reduxServices.addNewMailTemplate.addNewMailTemplate(addNewTemplate),
    )

    if (
      reduxServices.addNewMailTemplate.addNewMailTemplate.fulfilled.match(
        addNewTemplateResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

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
                id="templateTypeId"
                name="templateTypeId"
                value={addNewTemplate?.templateTypeId}
                onChange={handleInputChange}
              >
                <option value={''}>Select Type</option>
                {getTemplateTypes?.map((templateType, index) => (
                  <option key={index} value={templateType.id}>
                    {templateType.name}
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
              Asset Type: <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={4}>
              <CFormSelect
                data-testid="form-select"
                aria-label="Default select example"
                size="sm"
                id="assetType"
                name="assetTypeId"
                value={addNewTemplate?.assetTypeId}
                onChange={handleInputChange}
              >
                <option value={''}>Select Type</option>
                {getAssetTypes?.map((assetType, index) => (
                  <option key={index} value={assetType.id}>
                    {assetType.assetType}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Email:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={4}>
              <CFormInput
                type="text"
                name="email"
                value={addNewTemplate?.email}
                maxLength={50}
                onChange={handleInputChange}
              />
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
              <CFormInput
                type="text"
                name="templateName"
                value={addNewTemplate?.templateName}
                maxLength={50}
                onChange={handleInputChange}
              />
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
                  initData={addNewTemplate?.template}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleDescription(editor.getData().trim())
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
              <CButton
                className="btn-ovh me-1"
                color="success"
                onClick={handleAddNewHandbookPage}
              >
                Add
              </CButton>
              <CButton color="warning " className="btn-ovh me-1">
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default AddNewMailTemplate
