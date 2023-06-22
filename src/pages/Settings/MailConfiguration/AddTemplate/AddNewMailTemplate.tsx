import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import validator from 'validator'
import { Link } from 'react-router-dom'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddNewTemplate } from '../../../../types/Settings/MailConfiguration/AddTemplate/addMailTemplateTypes'
import OToast from '../../../../components/ReusableComponent/OToast'
import MailTemplateTypeList from '../AddMailTemplateType/MailTemplateTypeList'

function AddNewMailTemplate(): JSX.Element {
  const initialMailTemplateDetails = {} as AddNewTemplate
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [addNewTemplate, setAddNewTemplate] = useState(
    initialMailTemplateDetails,
  )
  const [toggle, setToggle] = useState('')
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [showAssetType, setShowAssetType] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const getTemplateTypes = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplateTypes,
  )

  useEffect(() => {
    dispatch(
      reduxServices.employeeMailConfiguration.getEmployeeMailTemplateTypes(),
    )
    dispatch(reduxServices.addNewMailTemplate.getAssetTypes())
  }, [dispatch, toggle])

  const getAssetTypes = useTypedSelector(
    reduxServices.addNewMailTemplate.selectors.assetTypes,
  )
  const validateEmail = (email: string) => {
    if (email.length > 0 && !validator.isEmail(email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  useEffect(() => {
    if (showAssetType) {
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
    }
    if (!showAssetType) {
      if (
        addNewTemplate.template &&
        addNewTemplate.templateName?.replace(/^\s*/, '') &&
        addNewTemplate.templateTypeId
      ) {
        setIsButtonEnabled(true)
      } else {
        setIsButtonEnabled(false)
      }
    }
    if (addNewTemplate.email) {
      validateEmail(addNewTemplate.email)
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
    if (name === 'email') {
      const personalEmail = value
      validateEmail(personalEmail)
      setAddNewTemplate((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else {
      setAddNewTemplate((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  useEffect(() => {
    if (Number(addNewTemplate.templateTypeId) === 11) {
      setShowAssetType(true)
    } else {
      setShowAssetType(false)
    }
  })

  const successToastMessage = (
    <OToast
      toastMessage="Mail Template added successfully"
      toastColor="success"
    />
  )

  const handleClearInputs = () => {
    setAddNewTemplate({
      templateTypeId: 0,
      templateName: '',
      template: '',
      email: '',
      assetTypeId: '',
    })
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }

  const handleAddNewHandbookPage = async () => {
    const addNewTemplateResultAction = await dispatch(
      reduxServices.addNewMailTemplate.addNewMailTemplate(addNewTemplate),
    )

    if (
      reduxServices.addNewMailTemplate.addNewMailTemplate.fulfilled.match(
        addNewTemplateResultAction,
      )
    ) {
      handleClearInputs()
    }
    dispatch(reduxServices.app.actions.addToast(successToastMessage))
  }

  const isAsteriskShow = addNewTemplate.assetTypeId ? TextWhite : TextDanger

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Add Template"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <Link to={`/mailTemplates`}>
                  <CButton color="info" className="btn-ovh me-1">
                    <i className="fa fa-arrow-left  me-1"></i>Back
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <CForm>
              <CRow className="mt-4 mb-4">
                <CFormLabel
                  {...formLabelProps}
                  className="col-sm-2 col-form-label text-end"
                >
                  Type:{' '}
                  <span
                    className={
                      addNewTemplate.templateTypeId ? TextWhite : TextDanger
                    }
                  >
                    *
                  </span>
                </CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    data-testid="form-select-type"
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
                  <CButton
                    color="info btn-ovh me-1"
                    size="sm"
                    onClick={() => setToggle('mailTemplateType')}
                  >
                    <i className="fa fa-plus me-1"></i>Add
                  </CButton>
                </CCol>
              </CRow>
              {showAssetType ? (
                <>
                  <CRow className="mt-4 mb-4">
                    <CFormLabel
                      {...formLabelProps}
                      className="col-sm-2 col-form-label text-end"
                    >
                      Asset Type: <span className={isAsteriskShow}>*</span>
                    </CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        data-testid="form-select-asset-type"
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
                      <span className={isAsteriskShow}>*</span>
                    </CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        className="ps-2"
                        type="email"
                        data-testid="email-address"
                        placeholder="Email Address"
                        autoComplete="off"
                        name="email"
                        value={addNewTemplate?.email}
                        maxLength={50}
                        onChange={handleInputChange}
                      />
                      {emailError && (
                        <p data-testid="error-msg" className={TextDanger}>
                          Enter a valid Email address.For multiple mail ids
                          use,without space!!
                        </p>
                      )}
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
                  <span
                    className={
                      addNewTemplate.templateName?.replace(/^\s*/, '')
                        ? TextWhite
                        : TextDanger
                    }
                  >
                    *
                  </span>
                </CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    className="ps-2"
                    data-testid="title-input"
                    type="text"
                    name="templateName"
                    autoComplete="off"
                    placeholder="Title"
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
                  Template:{' '}
                  <span
                    className={addNewTemplate.template ? TextWhite : TextDanger}
                  >
                    *
                  </span>
                </CFormLabel>
                {showEditor ? (
                  <CCol sm={10} data-testid="ckEditor-component">
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
                    data-testid="btn-save"
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isButtonEnabled}
                    onClick={handleAddNewHandbookPage}
                  >
                    Add
                  </CButton>
                  <CButton
                    data-testid="btn-clear"
                    color="warning "
                    className="btn-ovh me-1"
                    onClick={handleClearInputs}
                  >
                    Clear
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </OCard>
        </>
      )}
      {toggle === 'mailTemplateType' && (
        <MailTemplateTypeList
          backButtonHandler={() => setToggle('')}
          headerTitle={''}
          confirmButtonText={''}
        />
      )}
    </>
  )
}
export default AddNewMailTemplate
