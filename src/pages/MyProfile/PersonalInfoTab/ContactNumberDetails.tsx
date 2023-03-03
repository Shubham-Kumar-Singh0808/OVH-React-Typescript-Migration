import {
  CCardHeader,
  CCardBody,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import {
  EmployeeContactInformation,
  EmployeeEmergencyContactInformation,
  EmployeeGeneralInformation,
} from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

const ContactNumberDetails = (props: {
  employeeDetails?: EmployeeGeneralInformation
  changeContactDetails?: (contactDetails: EmployeeContactInformation) => void
  changeEmergencyContactDetails?: (
    emergencyContactDetails: EmployeeEmergencyContactInformation,
  ) => void
  setSaveButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const selectedUserEmergencyContactDetails = {
    emergencyContactName: props.employeeDetails?.emergencyContactName,
    emergencyPhone: props.employeeDetails?.emergencyPhone,
    emergencyRelationShip: props.employeeDetails?.emergencyRelationShip,
  }

  const selectedUserContactDetails = {
    mobile: props.employeeDetails?.mobile,
    alternativeMobile: props.employeeDetails?.alternativeMobile,
    homeCode: props.employeeDetails?.homeCode,
    homeNumber: props.employeeDetails?.homeNumber,
    workCode: props.employeeDetails?.workCode,
    workNumber: props.employeeDetails?.workNumber,
  }

  const [employeeContactDetails, setEmployeeContactDetails] = useState(
    selectedUserContactDetails,
  )

  const [employeeEmergencyContactDetails, setEmployeeEmergencyContactDetails] =
    useState(selectedUserEmergencyContactDetails)

  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const phoneValueRegexReplace = /\D/gi
  const contactNameRegexReplace = /[^a-z\s]/gi
  const onChangeEmergencyContactDetailsHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'emergencyPhone') {
      const emergencyPhoneValue = value.replace(phoneValueRegexReplace, '')
      setEmployeeEmergencyContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: emergencyPhoneValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else if (name === 'emergencyContactName') {
      const emergencyContactNameValue = value.replace(
        contactNameRegexReplace,
        '',
      )
      setEmployeeEmergencyContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: emergencyContactNameValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else {
      setEmployeeEmergencyContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
      setIsUpdated(() => {
        return true
      })
    }
  }

  useEffect(() => {
    if (
      employeeContactDetails.mobile &&
      employeeEmergencyContactDetails.emergencyContactName &&
      employeeEmergencyContactDetails.emergencyPhone &&
      employeeEmergencyContactDetails.emergencyRelationShip
    ) {
      props?.setSaveButtonEnabled(true)
    } else {
      props?.setSaveButtonEnabled(false)
    }
  }, [
    employeeContactDetails.mobile,
    employeeEmergencyContactDetails.emergencyContactName,
    employeeEmergencyContactDetails.emergencyPhone,
    employeeEmergencyContactDetails.emergencyRelationShip,
  ])

  const onChangeContactDetailsHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'mobile') {
      const mobileValue = value.replace(phoneValueRegexReplace, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: mobileValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else if (name === 'alternativeMobile') {
      const alternativeMobileValue = value.replace(phoneValueRegexReplace, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: alternativeMobileValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else if (name === 'homeCode') {
      const homeCodeValue = value.replace(phoneValueRegexReplace, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: homeCodeValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else if (name === 'homeNumber') {
      const homeNumberValue = value.replace(phoneValueRegexReplace, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: homeNumberValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else if (name === 'workCode') {
      const workCodeValue = value.replace(phoneValueRegexReplace, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: workCodeValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else if (name === 'workNumber') {
      const workNumberValue = value.replace(phoneValueRegexReplace, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: workNumberValue } }
      })
      setIsUpdated(() => {
        return true
      })
    } else {
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
      setIsUpdated(() => {
        return true
      })
    }
  }

  useEffect(() => {
    if (isUpdated && props.changeContactDetails) {
      props.changeContactDetails(employeeContactDetails)
      setIsUpdated((prevState) => {
        return !prevState
      })
    }
  }, [employeeContactDetails, isUpdated])

  useEffect(() => {
    if (isUpdated && props.changeEmergencyContactDetails) {
      props.changeEmergencyContactDetails(employeeEmergencyContactDetails)
      setIsUpdated((prevState) => {
        return !prevState
      })
    }
  }, [employeeEmergencyContactDetails, isUpdated])

  const formLabelClass = 'col-sm-3 col-form-label text-end'
  const invalid = 'text-danger'
  const valid = 'text-white'

  const employeeMobileNumber =
    employeeContactDetails?.mobile && employeeContactDetails?.mobile.length > 9
      ? valid
      : invalid

  const employeeEmergencyPhoneNumber =
    employeeEmergencyContactDetails?.emergencyPhone &&
    employeeEmergencyContactDetails?.emergencyPhone.length > 9
      ? valid
      : invalid

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Contact Details</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testid="mobileNumberLabel"
            {...dynamicFormLabelProps('employeeId', formLabelClass)}
          >
            Mobile:{' '}
            <span className={employeeMobileNumber?.replace(/^\s*/, '')}>*</span>
          </CFormLabel>
          <CCol sm={1}>
            <CFormInput
              type="text"
              size="sm"
              placeholder="+91"
              data-testid="mobileNumberPlaceholder"
              aria-label="Disabled input example"
              disabled
            />
          </CCol>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              placeholder="98xxxxxxxx"
              size="sm"
              name="mobile"
              data-testid="mobileNumberInput"
              onChange={onChangeContactDetailsHandler}
              value={employeeContactDetails.mobile}
              maxLength={10}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testid="altNumberLabel"
            {...dynamicFormLabelProps('employeeId', formLabelClass)}
          >
            Alternative Mobile:
          </CFormLabel>
          <CCol sm={1}>
            <CFormInput
              type="text"
              size="sm"
              placeholder="+91"
              data-testid="altNumberPlaceholder"
              aria-label="Disabled input example"
              disabled
            />
          </CCol>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              size="sm"
              data-testid="altNumberInput"
              name="alternativeMobile"
              placeholder="98xxxxxxxx"
              value={employeeContactDetails.alternativeMobile}
              onChange={onChangeContactDetailsHandler}
              maxLength={10}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testid="homeNumberLabel"
            {...dynamicFormLabelProps('employeeId', formLabelClass)}
          >
            Home:
          </CFormLabel>
          <CCol sm={1}>
            <CFormInput
              type="text"
              size="sm"
              data-testid="homeNumberPlaceholder"
              placeholder="+91"
              aria-label="Disabled input example"
              disabled
            />
          </CCol>
          <CCol sm={2}>
            <CFormInput
              type="text"
              size="sm"
              name="homeCode"
              data-testid="homeCodeInput"
              value={employeeContactDetails.homeCode}
              onChange={onChangeContactDetailsHandler}
              maxLength={4}
              autoComplete="off"
            />
          </CCol>
          <CCol sm={3}>
            <CFormInput
              type="text"
              size="sm"
              name="homeNumber"
              data-testid="homeNumberInput"
              onChange={onChangeContactDetailsHandler}
              value={employeeContactDetails.homeNumber}
              maxLength={8}
              autoComplete="off"
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testid="workNumberLabel"
            {...dynamicFormLabelProps('employeeId', formLabelClass)}
          >
            Work:
          </CFormLabel>
          <CCol sm={1}>
            <CFormInput
              type="text"
              size="sm"
              placeholder="+91"
              data-testid="workNumberPlaceholder"
              aria-label="Disabled input example"
              disabled
            />
          </CCol>
          <CCol sm={2}>
            <CFormInput
              type="text"
              size="sm"
              data-testid="workCodeInput"
              onChange={onChangeContactDetailsHandler}
              value={employeeContactDetails.workCode}
              name="workCode"
              maxLength={4}
              autoComplete="off"
            />
          </CCol>
          <CCol sm={3}>
            <CFormInput
              type="text"
              size="sm"
              data-testid="workNumberInput"
              name="workNumber"
              onChange={onChangeContactDetailsHandler}
              value={employeeContactDetails.workNumber}
              maxLength={8}
              autoComplete="off"
            />
          </CCol>
        </CRow>
      </CCardBody>
      <CCardHeader>
        <h4 className="h4">Emergency Contact</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testid="emergencyContactNameLabel"
            className={formLabelClass}
          >
            Name:{' '}
            <span
              className={
                employeeEmergencyContactDetails?.emergencyContactName?.replace(
                  /^\s*/,
                  '',
                )
                  ? valid
                  : invalid
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              size="sm"
              name="emergencyContactName"
              id="emergencyContactName"
              data-testid="emergencyContactNameInput"
              placeholder="Name"
              onChange={onChangeEmergencyContactDetailsHandler}
              value={employeeEmergencyContactDetails.emergencyContactName}
              autoComplete="off"
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testid="emergencyMobileLabel"
            className={formLabelClass}
          >
            Mobile:{' '}
            <span className={employeeEmergencyPhoneNumber?.replace(/^\s*/, '')}>
              *
            </span>
          </CFormLabel>
          <CCol sm={1}>
            <CFormInput
              type="text"
              size="sm"
              data-testid="emergencyMobilePlaceholder"
              placeholder="+91"
              aria-label="Disabled input example"
              disabled
            />
          </CCol>
          <CCol sm={3}>
            <CFormInput
              type="text"
              id="Mobile"
              placeholder="9xxxxxxxxx"
              data-testid="emergencyMobileInput"
              size="sm"
              name="emergencyPhone"
              onChange={onChangeEmergencyContactDetailsHandler}
              value={employeeEmergencyContactDetails.emergencyPhone}
              maxLength={10}
              autoComplete="off"
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            data-testid="relationshipLabel"
            className={formLabelClass}
          >
            Relationship:
            <span
              className={
                employeeEmergencyContactDetails.emergencyRelationShip?.replace(
                  /^\s*/,
                  '',
                )
                  ? valid
                  : invalid
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Relationship"
              name="emergencyRelationShip"
              data-testid="relationShipSelect"
              id="Relationship"
              size="sm"
              onChange={onChangeEmergencyContactDetailsHandler}
              value={employeeEmergencyContactDetails.emergencyRelationShip}
            >
              <option value={''}>Select Relationship</option>
              <option value="Brother">Brother</option>
              <option value="Daughter">Daughter</option>
              <option value="Father">Father</option>
              <option value="Friend">Friend</option>
              <option value="Husband">Husband</option>
              <option value="Mother">Mother</option>
              <option value="Sister">Sister</option>
              <option value="Son">Son</option>
              <option value="Wife">Wife</option>
              <option value="Other">Other</option>
            </CFormSelect>
          </CCol>
        </CRow>
      </CCardBody>
    </>
  )
}

export default ContactNumberDetails
