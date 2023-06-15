/* eslint-disable import/named */
import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import validator from 'validator'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import { VendorDetails } from '../../../../types/Assets/VendorList/vendorListTypes'
import { showIsRequired } from '../../../../utils/helper'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'

const EditVendorDetails = ({
  setToggle,
  editVendorInfo,
  setEditVendorInfo,
  currentPage,
  pageSize,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editVendorInfo: VendorDetails
  setEditVendorInfo: React.Dispatch<React.SetStateAction<VendorDetails>>
  currentPage: number
  pageSize: number
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isShowComment, setIsShowComment] = useState<boolean>(true)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  const formLabelProps = {
    htmlFor: 'editVendorDetails',
    className: 'col-form-label',
  }

  const departments = useTypedSelector(
    reduxServices.addNewVendor.selectors.department,
  )

  const textWhite = 'text-white'
  const textDanger = 'text-danger'
  const vendorEmail =
    editVendorInfo.vendorEmailId && !emailError ? textWhite : textDanger

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  useEffect(() => {
    if (
      editVendorInfo.vendorName &&
      editVendorInfo.vendorAddress &&
      editVendorInfo.vendorCity &&
      editVendorInfo.vendorState &&
      editVendorInfo.vendorPincode &&
      editVendorInfo.vendorCountry &&
      editVendorInfo.vendorEmailId &&
      editVendorInfo.vendorPhoneNumber &&
      editVendorInfo.departmentId
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editVendorInfo])

  const handleIsInternalStatus = (isExpenseVendor: boolean) => {
    setEditVendorInfo({
      ...editVendorInfo,
      isExpenseVendor,
    })
  }

  const handleAddressText = (vendorAddress: string) => {
    setEditVendorInfo((prevState) => {
      return { ...prevState, ...{ vendorAddress } }
    })
  }

  const handleBankDetailsText = (vendorBankDetails: string) => {
    setEditVendorInfo((prevState) => {
      return { ...prevState, ...{ vendorBankDetails } }
    })
  }

  const vendorCityRegexReplace = /[^a-zA-Z\s]/g
  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'vendorEmailId') {
      const personalEmail = value
      validateEmail(personalEmail)
      setEditVendorInfo((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else if (name === 'vendorCity') {
      const vendorCity = value.trim()
      const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/g
      if (vendorCity === '') {
        // Show error message for empty input
        console.log('Vendor city cannot be empty')
      } else if (specialCharsRegex.test(vendorCity)) {
        // Show error message for invalid input
        console.log('Vendor city contains invalid characters')
      } else {
        setEditVendorInfo((prevState) => {
          return {
            ...prevState,
            ...{
              [name]: vendorCity
                .replace(vendorCityRegexReplace, '')
                .replace(/^\s*/, ''),
            },
          }
        })
      }
    } else if (name === 'vendorState') {
      const vendorState = value
        .replace(vendorCityRegexReplace, '')
        .replace(/^\s*/, '')
      setEditVendorInfo((prevState) => {
        return { ...prevState, ...{ [name]: vendorState } }
      })
    } else if (name === 'vendorCountry') {
      const vendorCountry = value
        .replace(vendorCityRegexReplace, '')
        .replace(/^\s*/, '')
      setEditVendorInfo((prevState) => {
        return { ...prevState, ...{ [name]: vendorCountry } }
      })
    }
    setEditVendorInfo((prevState) => {
      return {
        ...prevState,
        ...{
          [name]: value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, ''),
        },
      }
    })
  }
  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Vendor Details is successfully edited."
      toastColor="success"
    />
  )

  const updateHandler = async () => {
    const prepareObject = {
      createdBy: editVendorInfo.createdBy,
      createdDate: editVendorInfo.createdDate,
      departmentId: editVendorInfo.departmentId,
      departmentName: editVendorInfo.departmentName,
      isExpenseVendor: editVendorInfo.isExpenseVendor,
      updatedBy: editVendorInfo.updatedBy,
      updatedDate: editVendorInfo.updatedDate,
      vendorAddress: editVendorInfo.vendorAddress,
      vendorBankDetails: editVendorInfo.vendorBankDetails,
      vendorCity: editVendorInfo.vendorCity,
      vendorCountry: editVendorInfo.vendorCountry,
      vendorEmailId: editVendorInfo.vendorEmailId,
      vendorFaxNumber: editVendorInfo.vendorFaxNumber,
      vendorGSTNumber: editVendorInfo.vendorGSTNumber,
      vendorId: editVendorInfo.vendorId,
      vendorName: editVendorInfo.vendorName,
      vendorPhoneNumber: editVendorInfo.vendorPhoneNumber,
      vendorPincode: editVendorInfo.vendorPincode,
      vendorState: editVendorInfo.vendorState,
    }
    const updateVendorDetailsResultAction = await dispatch(
      reduxServices.vendorList.updateVendorDetails(prepareObject),
    )
    if (
      reduxServices.vendorList.updateVendorDetails.fulfilled.match(
        updateVendorDetailsResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.vendorList.getVendors({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          vendorName: '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  useEffect(() => {
    setIsShowComment(false)
    setTimeout(() => {
      setIsShowComment(true)
    }, 100)
  }, [])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Vendor Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
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
            <span className={showIsRequired(editVendorInfo.vendorName)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="name"
              type="text"
              id="name"
              size="sm"
              name="vendorName"
              autoComplete="off"
              placeholder="Name"
              value={editVendorInfo.vendorName}
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
            <span className={showIsRequired(editVendorInfo.vendorAddress)}>
              *
            </span>
          </CFormLabel>
          {isShowComment ? (
            <CCol sm={8}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editVendorInfo.vendorAddress}
                data-testid="address"
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
          {isShowComment ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editVendorInfo.vendorBankDetails}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleBankDetailsText(editor.getData().trim())
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
              id="vendorGSTNumber"
              size="sm"
              name="vendorGSTNumber"
              autoComplete="off"
              value={editVendorInfo.vendorGSTNumber as string}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            City:
            <span className={showIsRequired(editVendorInfo.vendorCity)}>*</span>
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
              value={editVendorInfo.vendorCity}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            State:
            <span className={showIsRequired(editVendorInfo.vendorState)}>
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
              value={editVendorInfo.vendorState}
              onChange={onChangeInputHandler}
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
                editVendorInfo?.vendorPincode?.length > 5
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
              value={editVendorInfo.vendorPincode}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Country:
            <span className={showIsRequired(editVendorInfo.vendorCountry)}>
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
              value={editVendorInfo.vendorCountry}
              onChange={onChangeInputHandler}
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
              value={editVendorInfo.vendorEmailId?.replace(/^\s*/, '')}
              onChange={onChangeInputHandler}
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
                editVendorInfo?.vendorPhoneNumber?.length > 10
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
              value={editVendorInfo.vendorPhoneNumber}
              maxLength={10}
              onChange={onChangeInputHandler}
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
              value={editVendorInfo.vendorFaxNumber as string}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
            <span
              className={showIsRequired(String(editVendorInfo.departmentId))}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="departmentName"
              id="departmentName"
              size="sm"
              aria-label="Department"
              name="departmentName"
              value={editVendorInfo.departmentId}
              onChange={onChangeInputHandler}
            >
              {departments
                .slice()
                .sort((department1, department2) =>
                  department1.name.localeCompare(department2.name),
                )
                ?.map((dept, index) => (
                  <option key={index} value={dept.id}>
                    {dept.name}
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
            Expense Vendor:
          </CFormLabel>
          <CCol sm={3} className="col-form-label">
            <CFormCheck
              className="mb-3"
              inline
              type="checkbox"
              data-testid="expenseVendor"
              name="isExpenseVendor"
              id="expenseVendor"
              onChange={(event) => handleIsInternalStatus(event.target.checked)}
              checked={editVendorInfo.isExpenseVendor}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="updateBtn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isUpdateButtonEnabled}
              onClick={updateHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditVendorDetails
