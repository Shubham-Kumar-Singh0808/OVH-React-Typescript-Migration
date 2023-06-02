import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { AssetTypeAddList } from '../../../../types/Assets/AssetList/addEditListTypes'
import OToast from '../../../../components/ReusableComponent/OToast'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { showIsRequired } from '../../../../utils/helper'

const EditAddAssetList = ({
  setToggle,
  editAddAssetList,
  setEditAddAssetList,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editAddAssetList: AssetTypeAddList
  setEditAddAssetList: React.Dispatch<React.SetStateAction<AssetTypeAddList>>
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

  useEffect(() => {
    if (
      editAddAssetList.poNumber &&
      editAddAssetList.vendorId &&
      editAddAssetList.assetNumber &&
      editAddAssetList.assetTypeId &&
      editAddAssetList.amount &&
      editAddAssetList.countryId &&
      editAddAssetList.invoiceNumber &&
      editAddAssetList.otherAssetNumber &&
      editAddAssetList.manufacturerId &&
      editAddAssetList.productId &&
      editAddAssetList.warrantyStartDate &&
      editAddAssetList.warrantyEndDate &&
      editAddAssetList.notes &&
      editAddAssetList.purchasedDate &&
      editAddAssetList.receivedDate &&
      editAddAssetList.status
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editAddAssetList])

  const handleIsInternalStatus = (isExpenseVendor: boolean) => {
    setEditAddAssetList({
      ...editAddAssetList,
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
      poNumber: editAddAssetList.poNumber,
      vendorName: editAddAssetList.vendorId,
      assetType: editAddAssetList.assetTypeId,
      productType: editAddAssetList.productId,
      manufacturerName: editAddAssetList.manufacturerId,
      assetNumber: editAddAssetList.assetNumber,
      licenseNumber: editAddAssetList.licenseNumber,
      invoiceNumber: editAddAssetList.invoiceNumber,
      amount: editAddAssetList.amount,
      datePurchase: editAddAssetList.purchasedDate,
      receivedDate: editAddAssetList.receivedDate,
      warrantyStartDate: editAddAssetList.warrantyStartDate,
      warrantyEndDate: editAddAssetList.warrantyEndDate,
      assetStatus: editAddAssetList.status,
      country: editAddAssetList.countryId,
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
          startIndex: 0,
          endIndex: 20,
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
        title="Add New Asset"
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
            PO Number:
            <span className={showIsRequired(editAddAssetList.poNumber)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="poNumber"
              type="text"
              id="poNumber"
              size="sm"
              name="poNumber"
              autoComplete="off"
              placeholder="PO Number"
              value={editAddAssetList.poNumber}
              // onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Vendor Name:{' '}
            <span className={showIsRequired(editAddAssetList.vendorId)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="vendorId"
              aria-label="Default select example"
              size="sm"
              id="vendorId"
              name="vendorId"
              value={editAddAssetList.vendorId}
              // onChange={(e) => setVendorName(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {assetListTypeList?.vendorList?.length > 0 &&
                assetListTypeList?.vendorList?.map((location, index) => (
                  <option key={index} value={location.vendorId}>
                    {location.vendorName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Asset Type:{' '}
            <span className={showIsRequired(editAddAssetList.assetTypeId)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="assetType"
              aria-label="Default select example"
              size="sm"
              id="assetType"
              name="assetType"
              value={editAddAssetList.assetTypeId}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {assetListTypeList?.assetTypeList?.length > 0 &&
                assetListTypeList?.assetTypeList?.map((location, index) => (
                  <option key={index} value={location.id}>
                    {location.assetType}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Product Type:{' '}
            <span className={showIsRequired(editAddAssetList.productType)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="productType"
              aria-label="Default select example"
              size="sm"
              id="productType"
              name="productType"
              value={editAddAssetList.productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {assetTypeList.map((location, index) => (
                <option key={index} value={location.productId}>
                  {location.productName}
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
            Manufacturer Name:
            <span className={showIsRequired(editAddAssetList.manufacturerName)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="manufacturerName"
              aria-label="Default select example"
              size="sm"
              id="manufacturerName"
              name="manufacturerName"
              placeholder="Enter Manufacturer Name"
              value={editAddAssetList.manufacturerName}
              onChange={(e) => setManufacturerName(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {productTypeList.map((location, index) => (
                <option key={index} value={location.productId}>
                  {location.manufacturerName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Asset Number:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="assetNumber"
              type="text"
              id="assetNumber"
              size="sm"
              name="assetNumber"
              autoComplete="off"
              onChange={(e) => setAssetNumber(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            License/Asset No:
            <span className={showIsRequired(editAddAssetList.licenseNumber)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="licenseNumber"
              type="text"
              id="licenseNumber"
              size="sm"
              name="licenseNumber"
              placeholder="RBT"
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Invoice Number:
            <span className={showIsRequired(editAddAssetList.invoiceNumber)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="invoiceNumber"
              type="text"
              id="invoiceNumber"
              size="sm"
              name="invoiceNumber"
              autoComplete="off"
              placeholder="Invoice Number"
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Amount:
            <span className={showIsRequired(editAddAssetList.amount)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="amount"
              type="text"
              id="state"
              size="sm"
              name="amount"
              autoComplete="off"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Date of Purchase :
            <span className={showIsRequired(editAddAssetList.datePurchase)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="datePurchase"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="datePurchase"
              value={editAddAssetList.purchasedDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleDateOfPurchase(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Received Date:
            <span className={showIsRequired(editAddAssetList.receivedDate)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="receivedDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="receivedDate"
              value={editAddAssetList.receivedDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleReceivedDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Warranty Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="warrantyStartDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="warrantyStartDate"
              value={editAddAssetList.warrantyStartDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleWarrantyStartDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Warranty End Date :
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="warrantyEndDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="warrantyEndDate"
              value={editAddAssetList.warrantyEndDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleWarrantyEndDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Asset Status:
            <span className={showIsRequired(editAddAssetList.assetStatus)}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="manufacturerName"
              aria-label="Default select example"
              size="sm"
              id="assetStatus"
              name="assetStatus"
              placeholder="Enter Manufacturer Name"
              value={editAddAssetList.assetStatus}
              onChange={(e) => setAssetStatus(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              <option value={'Working'}>Working</option>
              <option value={'Not Working'}>Not Working</option>
              <option value={'Under Repair'}>Under Repair</option>
              <option value={'Idle'}>Idle</option>
              <option value={'Scrap'}>Scrap</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Country:
            <span className={showIsRequired(editAddAssetList.poNumber)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="country"
              aria-label="Default select example"
              size="sm"
              id="country"
              name="country"
              placeholder="Enter Manufacturer Name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value={''}>Select Country</option>
              {countriesList.map((location, index) => (
                <option key={index} value={location.id}>
                  {location.name}
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
            Notes:
          </CFormLabel>
          {isShowComment ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addComment}
                data-testid="notes"
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
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              // disabled={!isAddButtonEnabled}
              // onClick={handleAddNewVendor}
            >
              Confirm
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

export default EditAddAssetList
