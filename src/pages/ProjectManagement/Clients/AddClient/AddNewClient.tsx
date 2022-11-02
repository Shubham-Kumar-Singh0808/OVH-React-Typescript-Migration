import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddClientDetails } from '../../../../types/ProjectManagement/Clients/AddClient/addNewClientTypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'

const AddNewClient = (): JSX.Element => {
  const initialClientDetails = {} as AddClientDetails
  const [addClient, setAddClient] = useState(initialClientDetails)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [isActive, setIsActive] = useState(false)
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const clientCountries = useTypedSelector(
    reduxServices.addClient.selectors.clientCountries,
  )
  const history = useHistory()
  useEffect(() => {
    dispatch(reduxServices.addClient.getClientCountries())
  }, [dispatch])
  const formLabelProps = {
    htmlFor: 'inputNewClient',
    className: 'col-form-label category-label',
  }

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  const contactNameRegexReplace = /[^a-z\s]/gi
  const phoneValueRegexReplace = /\D/g

  const handleMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'mobileCode') {
      const code = value.replace(phoneValueRegexReplace, '')
      setPhoneCode(code)
    } else if (name === 'mobile') {
      const mobileNumber = value.replace(phoneValueRegexReplace, '')
      setPhoneNumber(mobileNumber)
    }
  }

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'email') {
      const personalEmail = value
      validateEmail(personalEmail)
      setAddClient((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else if (name === 'clientCode') {
      const code = value.replace(phoneValueRegexReplace, '')
      setAddClient((values) => {
        return { ...values, ...{ [name]: code } }
      })
    } else if (name === 'personName') {
      const contactPerson = value.replace(contactNameRegexReplace, '')
      setAddClient((values) => {
        return { ...values, ...{ [name]: contactPerson } }
      })
    } else if (name === 'clientStatus') {
      setIsActive(value === 'true')
      const clientStatusValue = value === 'true'
      setAddClient((values) => {
        return { ...values, ...{ [name]: clientStatusValue } }
      })
    } else {
      setAddClient((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (
      addClient.clientCode &&
      addClient.organization &&
      addClient.name &&
      addClient.personName &&
      addClient.email &&
      addClient.country &&
      addClient.address &&
      !emailError
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
    if (addClient.email) {
      validateEmail(addClient.email)
    }
  }, [addClient, emailError])

  const handleDescription = (description: string) => {
    setAddClient((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const handleClearInputs = () => {
    setAddClient({
      address: '',
      clientCode: '',
      clientStatus: true,
      country: '',
      email: '',
      gstCode: '',
      name: '',
      organization: '',
      personName: '',
      phone: '',
      description: '',
    })
    setShowEditor(false)
    setEmailError(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setPhoneCode('')
    setPhoneNumber('')
  }

  const successToastMessage = (
    <OToast toastMessage="Client Added Successfully." toastColor="success" />
  )

  const WarningToastMessage = (
    <OToast
      toastColor="danger"
      toastMessage="Already a Client is existed with the given Code."
    />
  )

  const handleAddNewClient = async () => {
    const prepareObject = {
      ...addClient,
      phone: `${phoneCode}-${phoneNumber}`,
    }
    const addClientResultAction = await dispatch(
      reduxServices.addClient.addNewClient(prepareObject),
    )
    if (
      reduxServices.addClient.addNewClient.fulfilled.match(
        addClientResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
      history.push('/clientsList')
    } else if (
      reduxServices.addClient.addNewClient.rejected.match(
        addClientResultAction,
      ) &&
      addClientResultAction.payload === 406
    ) {
      dispatch(reduxServices.app.actions.addToast(WarningToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Client"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/clientsList`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-btn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-0 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Code:
              <span className={showIsRequired(addClient.clientCode)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="clientCode"
                data-testid="clientCode-input"
                autoComplete="off"
                name="clientCode"
                placeholder="Client Code"
                maxLength={6}
                value={addClient.clientCode}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Org:
              <span className={showIsRequired(addClient.organization)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="clientOrg"
                data-testid="org-input"
                autoComplete="new-password"
                name="organization"
                placeholder="Organization"
                value={addClient.organization}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Client: <span className={showIsRequired(addClient.name)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="clientName"
                autoComplete="off"
                data-testid="clientName-input"
                name="name"
                placeholder="Client Name"
                value={addClient.name}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Contact Person:
              <span className={showIsRequired(addClient.personName)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="contactPerson"
                autoComplete="off"
                data-testid="contact-input"
                name="personName"
                placeholder="Contact Person"
                value={addClient.personName}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Email:
              <span
                className={
                  addClient.email && !emailError ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="email-address"
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Contact Person Email"
                value={addClient.email}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Country:
              <span className={showIsRequired(addClient.country)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="country"
                data-testid="country-input"
                name="country"
                value={addClient.country}
                onChange={handleInputChange}
              >
                <option value={''}>Select Country</option>
                {clientCountries &&
                  clientCountries?.length > 0 &&
                  clientCountries?.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Mobile:
            </CFormLabel>
            <CCol sm={1}>
              <CFormInput
                type="text"
                size="sm"
                id="mobileCode"
                autoComplete="new-password"
                name="mobileCode"
                placeholder="code"
                data-testid="mobileNumberCode"
                value={phoneCode}
                maxLength={3}
                onChange={handleMobile}
              />
            </CCol>
            <CCol sm={2}>
              <CFormInput
                type="text"
                placeholder="Mobile"
                size="sm"
                id="mobile"
                autoComplete="new-password"
                name="mobile"
                data-testid="mobileNumberInput"
                value={phoneNumber}
                maxLength={10}
                onChange={handleMobile}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              GST Code:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="gstCode"
                autoComplete="new-password"
                data-testid="gstCode-input"
                name="gstCode"
                placeholder="GST Code"
                value={addClient.gstCode}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Address:
              <span className={showIsRequired(addClient.address)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormTextarea
                style={{ height: '100px' }}
                type="text"
                id="address"
                autoComplete="new-password"
                data-testid="clientAddress-input"
                name="address"
                placeholder="Address"
                value={addClient.address}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Status:
            </CFormLabel>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="activeFilterStatus"
            >
              <CFormCheck
                type="radio"
                name="clientStatus"
                id="clientActive"
                data-testid="activeClient-input"
                label="Active"
                value="true"
                checked={isActive}
                onChange={handleInputChange}
                inline
              />
            </CCol>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="inactiveFilterStatus"
            >
              <CFormCheck
                type="radio"
                name="clientStatus"
                id="clientInactive"
                data-testid="inActiveClient-input"
                label="Inactive"
                value="false"
                checked={!isActive}
                onChange={handleInputChange}
                inline
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Description:
            </CFormLabel>
            {showEditor ? (
              <CCol sm={8}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addClient?.description}
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
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="add-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={handleAddNewClient}
                disabled={!isButtonEnabled}
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning "
                className="btn-ovh text-white"
                onClick={handleClearInputs}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default AddNewClient
