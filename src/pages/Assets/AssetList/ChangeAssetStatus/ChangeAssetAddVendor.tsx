import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import validator from 'validator'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { AddVendor } from '../../../../types/Assets/VendorList/AddVendorDetails/addVendorDetailsType'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OCard from '../../../../components/ReusableComponent/OCard'
import { showIsRequired } from '../../../../utils/helper'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'

const ChangeAssetVendor = ({
  setEmpToggle,
}: {
  setEmpToggle: (value: string) => void
}): JSX.Element => {
  const initialVendorDetails = {} as AddVendor
  const [addVendorDetails, setAddVendorDetails] = useState({
    ...initialVendorDetails,
  })
  const [showEditorComments, setShowEditorComments] = useState<boolean>(true)
  const [emailConfigError, setEmailConfigError] = useState<boolean>(false)
  const [isAddButtonIdEnabled, setIsAddButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const selectdepartments = useTypedSelector(
    reduxServices.addNewVendor.selectors.department,
  )
  useEffect(() => {
    dispatch(reduxServices.addNewVendor.getDepartment())
  }, [dispatch])
  const formLabelProps = {
    htmlFor: 'inputNewVendorDetails',
    className: 'col-form-label category-label',
  }

  const textWhite = 'text-white'
  const textDanger = 'text-danger'
  const vendorEmailText =
    addVendorDetails.vendorEmailId && !emailConfigError ? textWhite : textDanger

  const validateEmailId = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailConfigError(false)
    } else {
      setEmailConfigError(true)
    }
  }
  const vendorNameRegexReplace = /-_[^a-z0-9\s]/gi
  const vendorPhoneRegex = /\D/g
  const handledInputChangeItems = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'vendorEmailId') {
      const personalEmailId = value
      validateEmailId(personalEmailId)
      setAddVendorDetails((prevState) => {
        return { ...prevState, ...{ [name]: personalEmailId } }
      })
    } else if (name === 'vendorName') {
      const vendorNameText = value
        .replace(vendorNameRegexReplace, '')
        .replace(/^\s*/, '')
      setAddVendorDetails((values) => {
        return { ...values, ...{ [name]: vendorNameText } }
      })
    } else if (name === 'vendorGSTNumber') {
      const vendorsGSTNumber = value
        .replace(vendorNameRegexReplace, '')
        .replace(/^\s*/, '')
      setAddVendorDetails((values) => {
        return { ...values, ...{ [name]: vendorsGSTNumber } }
      })
    } else if (name === 'vendorPincode') {
      const presentZipValueCode = value.replace(vendorPhoneRegex, '')
      setAddVendorDetails((prevState) => {
        return { ...prevState, ...{ [name]: presentZipValueCode } }
      })
    } else if (name === 'vendorPhoneNumber') {
      const phoneNumbers = value.replace(vendorPhoneRegex, '')
      setAddVendorDetails((prevState) => {
        return { ...prevState, ...{ [name]: phoneNumbers } }
      })
    } else if (name === 'vendorFaxNumber') {
      const faxNumbers = value.replace(vendorPhoneRegex, '')
      setAddVendorDetails((prevState) => {
        return { ...prevState, ...{ [name]: faxNumbers } }
      })
    } else {
      setAddVendorDetails((values) => {
        const trimFieldValues = value.trimStart()
        return { ...values, ...{ [name]: trimFieldValues } }
      })
    }
  }
  const handleIsInternalStatusid = (isExpenseVendor: boolean) => {
    setAddVendorDetails({
      ...addVendorDetails,
      isExpenseVendor,
    })
  }

  const handleAddressText = (vendorAddress: string) => {
    setAddVendorDetails((prevState) => {
      return { ...prevState, ...{ vendorAddress } }
    })
  }

  const handleBankAddressDetails = (vendorBankDetails: string) => {
    setAddVendorDetails((prevState) => {
      return { ...prevState, ...{ vendorBankDetails } }
    })
  }

  useEffect(() => {
    if (
      addVendorDetails.departmentId &&
      addVendorDetails.vendorName &&
      addVendorDetails.vendorAddress &&
      addVendorDetails.vendorCity &&
      addVendorDetails.vendorState &&
      addVendorDetails.vendorPincode &&
      addVendorDetails.vendorCountry &&
      addVendorDetails.vendorEmailId &&
      addVendorDetails.vendorPhoneNumber &&
      !emailConfigError
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
    if (addVendorDetails.vendorEmailId) {
      validateEmailId(addVendorDetails.vendorEmailId)
    }
  }, [addVendorDetails, emailConfigError])

  const clearVendorInputs = () => {
    setAddVendorDetails({
      departmentId: '',
      isExpenseVendor: false,
      vendorAddress: '',
      vendorBankDetails: '',
      vendorCity: '',
      vendorCountry: '',
      vendorEmailId: '',
      vendorFaxNumber: '',
      vendorGSTNumber: '',
      vendorName: '',
      vendorPhoneNumber: '',
      vendorPincode: '',
      vendorState: '',
    })
    setShowEditorComments(false)
    setTimeout(() => {
      setShowEditorComments(true)
    }, 100)
  }
  const successToastMessage = (
    <OToast
      toastMessage="Vendor Details Added Successfully"
      toastColor="success"
    />
  )
  const handleAddNewVendorInformation = async () => {
    const prepareObject = {
      ...addVendorDetails,
    }
    const addVendorResultAction = await dispatch(
      reduxServices.addNewVendor.addNewVendor(prepareObject),
    )
    if (
      reduxServices.addNewVendor.addNewVendor.fulfilled.match(
        addVendorResultAction,
      )
    ) {
      setEmpToggle('')
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
      dispatch(
        reduxServices.vendorList.getVendors({
          startIndex: 0,
          endIndex: 20,
          vendorName: '',
        }),
      )
    }
  }

  const backButtonHandler = () => {
    setEmpToggle('')
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Vendor Details"
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
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Name:
            <span className={showIsRequired(addVendorDetails.vendorName)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorName"
              type="text"
              id="name"
              size="sm"
              name="vendorName"
              autoComplete="off"
              placeholder="Name"
              value={addVendorDetails.vendorName}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Address:
            <span className={showIsRequired(addVendorDetails.vendorAddress)}>
              *
            </span>
          </CFormLabel>
          {showEditorComments ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addVendorDetails?.vendorAddress}
                data-testid="vendorAddress"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleAddressText(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Bank Details:
          </CFormLabel>
          {showEditorComments ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addVendorDetails?.vendorBankDetails}
                data-testid="vendorBankDetails"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleBankAddressDetails(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            GST Number:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorGSTNumber"
              type="text"
              id="gstNumber"
              size="sm"
              name="vendorGSTNumber"
              autoComplete="off"
              value={addVendorDetails.vendorGSTNumber}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            City:
            <span className={showIsRequired(addVendorDetails.vendorCity)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorCity"
              type="text"
              id="city"
              size="sm"
              name="vendorCity"
              autoComplete="off"
              placeholder="City"
              value={addVendorDetails.vendorCity}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            State:
            <span className={showIsRequired(addVendorDetails.vendorState)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorState"
              type="text"
              id="state"
              size="sm"
              name="vendorState"
              autoComplete="off"
              placeholder="State"
              value={addVendorDetails.vendorState}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Pincode:
            <span
              className={
                addVendorDetails?.vendorPincode?.length > 5
                  ? TextWhite
                  : TextDanger
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorPincode"
              type="text"
              id="pincode"
              size="sm"
              name="vendorPincode"
              autoComplete="off"
              placeholder="Pincode"
              maxLength={6}
              value={addVendorDetails.vendorPincode}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Country:
            <span className={showIsRequired(addVendorDetails.vendorCountry)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorCountry"
              type="text"
              id="country"
              size="sm"
              name="vendorCountry"
              autoComplete="off"
              placeholder="Country"
              value={addVendorDetails.vendorCountry}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Email ID:
            <span data-testid="error-msg" className={vendorEmailText}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorEmailId"
              type="text"
              id="email"
              size="sm"
              name="vendorEmailId"
              autoComplete="off"
              placeholder="Email ID"
              value={addVendorDetails.vendorEmailId?.replace(/^\s*/, '')}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Phone Number:
            <span
              className={
                addVendorDetails?.vendorPhoneNumber?.length > 9
                  ? TextWhite
                  : TextDanger
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorPhoneNumber"
              type="text"
              id="phoneNumber"
              size="sm"
              name="vendorPhoneNumber"
              autoComplete="off"
              placeholder="Phone No."
              value={addVendorDetails.vendorPhoneNumber}
              maxLength={10}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Fax Number:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="vendorFaxNumber"
              type="text"
              id="faxNumber"
              size="sm"
              name="vendorFaxNumber"
              autoComplete="off"
              placeholder="Fax No."
              value={addVendorDetails.vendorFaxNumber}
              onChange={handledInputChangeItems}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
            <span className={showIsRequired(addVendorDetails.departmentId)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="departmentId"
              id="department"
              size="sm"
              aria-label="Department"
              name="departmentId"
              onChange={handledInputChangeItems}
              value={addVendorDetails.departmentId}
            >
              <option value={''}>Select Department</option>
              {selectdepartments &&
                selectdepartments?.length > 0 &&
                selectdepartments?.map((dept, index) => (
                  <option key={index} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Expense Vendor:
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck
              className="mb-1"
              inline
              type="checkbox"
              name="isExpenseVendor"
              id="expenseVendor"
              onChange={(event) =>
                handleIsInternalStatusid(event.target.checked)
              }
              checked={addVendorDetails.isExpenseVendor}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isAddButtonIdEnabled}
              onClick={handleAddNewVendorInformation}
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning"
              className="btn-ovh text-white"
              onClick={clearVendorInputs}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default ChangeAssetVendor
