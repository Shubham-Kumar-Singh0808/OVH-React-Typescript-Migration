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
import { Link, useHistory, useParams } from 'react-router-dom'
import validator from 'validator'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { Client } from '../../../../types/ProjectManagement/Clients/clientsTypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'

const EditClient = (): JSX.Element => {
  const { clientId } = useParams<{ clientId: string }>()
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [isActive, setIsActive] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const initClient = {} as Client
  const [client, setClient] = useState(initClient)

  const selectedClient = useTypedSelector(
    reduxServices.clients.selectors.getClient,
  )

  const clientCountries = useTypedSelector(
    reduxServices.clients.selectors.clientCountries,
  )

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

  const onchangeMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'mobileCode') {
      const code = value.replace(phoneValueRegexReplace, '')
      setPhoneCode(code)
    } else if (name === 'mobile') {
      const mobileNumber = value.replace(phoneValueRegexReplace, '')
      setPhoneNumber(mobileNumber)
    }
  }
  const onChangeDescriptionHandler = (description: string) => {
    setClient((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  useEffect(() => {
    setIsActive(client.clientStatus)
  }, [client.clientStatus])

  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'email') {
      const personalEmail = value
      validateEmail(personalEmail)
      setClient((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else if (name === 'clientCode') {
      const code = value.replace(phoneValueRegexReplace, '')
      setClient((values) => {
        return { ...values, ...{ [name]: code } }
      })
    } else if (name === 'personName') {
      const contactPerson = value.replace(contactNameRegexReplace, '')
      setClient((values) => {
        return { ...values, ...{ [name]: contactPerson } }
      })
    } else if (name === 'clientStatus') {
      setIsActive(value === 'true')
      const clientStatusValue = value === 'true'
      setClient((values) => {
        return { ...values, ...{ [name]: clientStatusValue } }
      })
    } else {
      setClient((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (
      client.clientCode &&
      client.organization &&
      client.name &&
      client.personName &&
      client.email &&
      client.country &&
      client.address &&
      !emailError
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
    if (client.email) {
      validateEmail(client.email)
    }
  }, [client, emailError])

  useEffect(() => {
    dispatch(reduxServices.clients.getClientToEdit(Number(clientId)))
    dispatch(reduxServices.clients.getClientCountries())
  }, [dispatch])

  useEffect(() => {
    if (selectedClient != null) {
      setClient({
        id: selectedClient.id,
        clientCode: selectedClient.clientCode,
        name: selectedClient.name,
        address: selectedClient.address,
        personName: selectedClient.personName,
        email: selectedClient.email,
        country: selectedClient.country,
        phone: '',
        description: selectedClient.description,
        organization: selectedClient.organization,
        totalFixedBids: selectedClient.totalFixedBids,
        totalRetainers: selectedClient.totalRetainers,
        clientStatus: selectedClient.clientStatus,
        gstCode: selectedClient.gstCode,
      })
    }
    if (selectedClient?.phone != null) {
      const splitPhoneNumber = selectedClient.phone.split('-')
      setPhoneCode(splitPhoneNumber && splitPhoneNumber[0])
      setPhoneNumber(splitPhoneNumber && splitPhoneNumber[1])
    }
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }, [selectedClient])

  const updateClientSuccessToastMessage = (
    <OToast toastMessage="Client updated Successfully." toastColor="success" />
  )

  const handleEditClient = async () => {
    const prepareObject = {
      ...client,
      phone: `${phoneCode}-${phoneNumber}`,
    }
    const updateClientResultAction = await dispatch(
      reduxServices.clients.updateClient(prepareObject),
    )
    if (
      reduxServices.clients.updateClient.fulfilled.match(
        updateClientResultAction,
      )
    ) {
      history.push('/clientsList')
      dispatch(
        reduxServices.app.actions.addToast(updateClientSuccessToastMessage),
      )
    }
  }

  const emailAsterisk =
    client.email && !emailError ? 'text-white' : 'text-danger'

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Client"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/clientsList`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="backBtn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Client Code:
              <span className={showIsRequired(client.clientCode)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="clientCode"
                data-testid="clientCodeInput"
                name="clientCode"
                placeholder="Client Code"
                maxLength={6}
                value={client.clientCode}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Organization:
              <span className={showIsRequired(client.organization)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="clientOrg"
                data-testid="organizationInput"
                name="organization"
                placeholder="Organization"
                value={client.organization}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Client:
              <span className={showIsRequired(client.name)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="clientName"
                data-testid="clientNameInput"
                name="name"
                placeholder="Client Name"
                maxLength={50}
                value={client.name}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Contact Person:
              <span className={showIsRequired(client.personName)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="contactPerson"
                data-testid="contactInput"
                name="personName"
                placeholder="Contact Person"
                maxLength={50}
                value={client.personName}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Email:
              <span className={emailAsterisk}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="emailAddress"
                type="email"
                name="email"
                placeholder="Contact Person Email"
                maxLength={50}
                value={client.email}
                onChange={onChangeInputHandler}
              />
              {emailError && (
                <p data-testid="error-msg" className="text-danger mt-1">
                  Enter a valid Email address.
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Country:
              <span className={showIsRequired(client.country)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="country"
                data-testid="countryInput"
                name="country"
                value={client.country}
                onChange={onChangeInputHandler}
              >
                <option value={''}>Select Country</option>
                {clientCountries?.map((country, index) => (
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
                name="mobileCode"
                placeholder="code"
                data-testid="mobileNumberCode"
                value={phoneCode}
                maxLength={3}
                onChange={onchangeMobileInput}
              />
            </CCol>
            <CCol sm={2}>
              <CFormInput
                type="text"
                placeholder="Mobile"
                size="sm"
                id="mobile"
                name="mobile"
                data-testid="mobileNumberInput"
                value={phoneNumber}
                maxLength={10}
                onChange={onchangeMobileInput}
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
                data-testid="gstCodeInput"
                name="gstCode"
                placeholder="GST Code"
                maxLength={32}
                value={client.gstCode as string}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Address:
              <span className={showIsRequired(client.address)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormTextarea
                style={{ height: '100px' }}
                type="text"
                id="address"
                data-testid="clientAddressInput"
                name="address"
                placeholder="Address"
                maxLength={100}
                value={client.address}
                onChange={onChangeInputHandler}
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
                data-testid="activeClientInput"
                label="Active"
                value="true"
                checked={isActive}
                onChange={onChangeInputHandler}
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
                data-testid="inActiveClientInput"
                label="Inactive"
                value="false"
                checked={!isActive}
                onChange={onChangeInputHandler}
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
            <CCol sm={8}>
              {showEditor && (
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={client?.description}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onChangeDescriptionHandler(editor.getData().trim())
                  }}
                />
              )}
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="updateBtn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isButtonEnabled}
                onClick={handleEditClient}
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

export default EditClient
