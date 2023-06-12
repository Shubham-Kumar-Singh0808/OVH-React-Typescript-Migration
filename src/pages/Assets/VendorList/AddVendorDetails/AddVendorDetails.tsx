import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import validator from 'validator'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { AddVendor } from '../../../../types/Assets/VendorList/AddVendorDetails/addVendorDetailsType'
import { showIsRequired } from '../../../../utils/helper'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { useSelectedEmployee } from '../../../../middleware/hooks/useSelectedEmployee'

const AddVendorDetails = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const initialVendorDetails = {} as AddVendor
  const [addVendor, setAddVendor] = useState({
    ...initialVendorDetails,
  })

  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const departments = useTypedSelector(
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
  const vendorEmail =
    addVendor.vendorEmailId && !emailError ? textWhite : textDanger

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }
  const vendorNameRegexReplace = /-_[^a-z0-9\s]/gi
  const vendorPhoneRegex = /\D/g

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'vendorEmailId') {
      const personalEmail = value
      validateEmail(personalEmail)
      setAddVendor((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else if (name === 'vendorName') {
      const vendorName = value
        .replace(vendorNameRegexReplace, '')
        .replace(/^\s*/, '')
      setAddVendor((values) => {
        return { ...values, ...{ [name]: vendorName } }
      })
    } else if (name === 'vendorGSTNumber') {
      const vendorGSTNumber = value
        .replace(vendorNameRegexReplace, '')
        .replace(/^\s*/, '')
      setAddVendor((values) => {
        return { ...values, ...{ [name]: vendorGSTNumber } }
      })
    } else if (name === 'vendorPincode') {
      const presentZipValue = value.replace(vendorPhoneRegex, '')
      setAddVendor((prevState) => {
        return { ...prevState, ...{ [name]: presentZipValue } }
      })
    } else if (name === 'vendorPhoneNumber') {
      const phoneNumber = value.replace(vendorPhoneRegex, '')
      setAddVendor((prevState) => {
        return { ...prevState, ...{ [name]: phoneNumber } }
      })
    } else if (name === 'vendorFaxNumber') {
      const faxNumber = value.replace(vendorPhoneRegex, '')
      setAddVendor((prevState) => {
        return { ...prevState, ...{ [name]: faxNumber } }
      })
    } else {
      setAddVendor((values) => {
        const trimFieldValue = value.trimStart()
        return { ...values, ...{ [name]: trimFieldValue } }
      })
    }
  }

  const handleIsInternalStatus = (isExpenseVendor: boolean) => {
    setAddVendor({
      ...addVendor,
      isExpenseVendor,
    })
  }

  const handleAddress = (vendorAddress: string) => {
    setAddVendor((prevState) => {
      return { ...prevState, ...{ vendorAddress } }
    })
  }

  const handleBankAddress = (vendorBankDetails: string) => {
    setAddVendor((prevState) => {
      return { ...prevState, ...{ vendorBankDetails } }
    })
  }

  useEffect(() => {
    if (
      addVendor.departmentId &&
      addVendor.vendorName &&
      addVendor.vendorAddress &&
      addVendor.vendorCity &&
      addVendor.vendorState &&
      addVendor.vendorPincode &&
      addVendor.vendorCountry &&
      addVendor.vendorEmailId &&
      addVendor.vendorPhoneNumber &&
      !emailError
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
    if (addVendor.vendorEmailId) {
      validateEmail(addVendor.vendorEmailId)
    }
  }, [addVendor, emailError])

  const clearInputs = () => {
    setAddVendor({
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
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }

  const successToastMessage = (
    <OToast
      toastMessage="Vendor Details Added Successfully"
      toastColor="success"
    />
  )

  const handleAddNewVendor = async () => {
    const prepareObject = {
      ...addVendor,
    }
    const addVendorResultAction = await dispatch(
      reduxServices.addNewVendor.addNewVendor(prepareObject),
    )
    if (
      reduxServices.addNewVendor.addNewVendor.fulfilled.match(
        addVendorResultAction,
      )
    ) {
      setToggle('')
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

  const useSelectedEmployee = (): [boolean, string | undefined] => {
    const { vendorListFlag } = useParams<{ vendorListFlag: string }>()

    let isViewingChangeAssetScreen = true

    if (vendorListFlag) {
      isViewingChangeAssetScreen = false
    }

    return [isViewingChangeAssetScreen, vendorListFlag]
  }

  // const location = useLocation()
  // useEffect(() => {
  //   if (location.pathname === '/vendorList') {
  //     dispatch(
  //       reduxServices.addNewVendor.addNewVendor({
  //         key: 'vendorListFlag',
  //         value: 'vendorListFlag',
  //       }),
  //     )
  //     dispatch(reduxServices.bankDetails.bankNameList())
  //   } else if (location.pathname === `/employeeFinance/${employeeId}`) {
  //     dispatch(
  //       reduxServices.panDetails.bankInformation({
  //         key: 'loggedInEmpId',
  //         value: Number(employeeId),
  //       }),
  //     )
  //     dispatch(reduxServices.bankDetails.bankNameList())
  //   }
  // }, [dispatch, location.pathname])
  const history = useHistory()
  const handleClick = () => {
    history.goBack()
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
            {/* const backBtnToggle = isViewingChangeAssetScreen ? ( */}
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
              // onClick={handleClick}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
            {/* ) : (<></>) */}
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Name:
            <span className={showIsRequired(addVendor.vendorName)}>*</span>
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
              value={addVendor.vendorName}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Address:
            <span className={showIsRequired(addVendor.vendorAddress)}>*</span>
          </CFormLabel>
          {showEditor ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addVendor?.vendorAddress}
                data-testid="vendorAddress"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleAddress(editor.getData().trim())
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
          {showEditor ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addVendor?.vendorBankDetails}
                data-testid="vendorBankDetails"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleBankAddress(editor.getData().trim())
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
              value={addVendor.vendorGSTNumber}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            City:
            <span className={showIsRequired(addVendor.vendorCity)}>*</span>
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
              value={addVendor.vendorCity}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            State:
            <span className={showIsRequired(addVendor.vendorState)}>*</span>
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
              value={addVendor.vendorState}
              onChange={handledInputChange}
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
                addVendor?.vendorPincode?.length > 5 ? TextWhite : TextDanger
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
              value={addVendor.vendorPincode}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Country:
            <span className={showIsRequired(addVendor.vendorCountry)}>*</span>
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
              value={addVendor.vendorCountry}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Email ID:
            <span data-testid="error-msg" className={vendorEmail}>
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
              value={addVendor.vendorEmailId?.replace(/^\s*/, '')}
              onChange={handledInputChange}
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
                addVendor?.vendorPhoneNumber?.length > 9
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
              value={addVendor.vendorPhoneNumber}
              maxLength={10}
              onChange={handledInputChange}
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
              value={addVendor.vendorFaxNumber}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
            <span className={showIsRequired(addVendor.departmentId)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="mb-1"
              data-testid="departmentId"
              id="department"
              size="sm"
              aria-label="Department"
              name="departmentId"
              onChange={handledInputChange}
              value={addVendor.departmentId}
            >
              <option value={''}>Select Department</option>
              {departments &&
                departments?.length > 0 &&
                departments?.map((dept, index) => (
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
              onChange={(event) => handleIsInternalStatus(event.target.checked)}
              checked={addVendor.isExpenseVendor}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isAddButtonEnabled}
              onClick={handleAddNewVendor}
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning"
              className="btn-ovh text-white"
              onClick={clearInputs}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default AddVendorDetails
