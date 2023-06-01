import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { dateFormat } from '../../../../constant/DateFormat'

// eslint-disable-next-line import/named

const AddAssetList = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [poNumber, setPoNumber] = useState<string>()
  const [vendorName, setVendorName] = useState<string>()
  const [assetType, setAssetType] = useState<string>()
  const [productType, setProductType] = useState<string>()
  const [manufacturerName, setManufacturerName] = useState<string>()
  const [assetNumber, setAssetNumber] = useState<string>()
  const [licenseNumber, setLicenseNumber] = useState<string>()
  const [invoiceNumber, setInvoiceNumber] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [datePurchase, setDateOfPurchase] = useState<string>()
  const [receivedDate, setReceivedDate] = useState<string>()
  const [warrantyStartDate, setWarrantyStartDate] = useState<string>()

  const [warrantyEndDate, setWarrantyEndDate] = useState<string>()

  const [assetStatus, setAssetStatus] = useState<string>()
  const [country, setCountry] = useState<string>()
  // const [notes, setNotes] = useState<string>()

  const onHandleDateOfPurchase = (value: Date) => {
    setDateOfPurchase(moment(value).format(dateFormat))
  }
  const onHandleReceivedDate = (value: Date) => {
    setReceivedDate(moment(value).format(dateFormat))
  }
  const onHandleWarrantyStartDate = (value: Date) => {
    setWarrantyStartDate(moment(value).format(dateFormat))
  }
  const onHandleWarrantyEndDate = (value: Date) => {
    setWarrantyEndDate(moment(value).format(dateFormat))
  }
  const clearInputs = () => {
    setPoNumber('')
    setVendorName('')
    setAssetType('')
    setProductType('')
    setManufacturerName('')
    setAssetNumber('')
    setLicenseNumber('')
    setInvoiceNumber('')
    setAmount('')
    setAssetStatus('')
    setCountry('')
  }

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'poNumber') {
      const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setPoNumber(newValue)
    } else if (name === 'vendorName') {
      const targetValue = value.replace(/\D/g, '').replace(/^0+/, '')
      setVendorName(targetValue)
    } else if (name === 'assetType') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setAssetType(newValue)
    } else if (name === 'productType') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setProductType(newValue)
    } else if (name === 'manufacturerName') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setManufacturerName(newValue)
    } else if (name === 'assetNumber') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setAssetNumber(newValue)
    } else if (name === 'licenseNumber') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setLicenseNumber(newValue)
    } else if (name === 'invoiceNumber') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setInvoiceNumber(newValue)
    } else if (name === 'amount') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setAmount(newValue)
    } else if (name === 'assetStatus') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setAssetStatus(newValue)
    } else if (name === 'country') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setCountry(newValue)
    }
  }

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
            <span className={poNumber ? TextWhite : TextDanger}>*</span>
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
              value={poNumber}
              onChange={handledInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Vendor Name:{' '}
            <span className={vendorName ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="vendorName"
              aria-label="Default select example"
              size="sm"
              id="vendorName"
              name="vendorName"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Asset Type:{' '}
            <span className={assetType ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="assetType"
              aria-label="Default select example"
              size="sm"
              id="assetType"
              name="assetType"
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Product Type:{' '}
            <span className={productType ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="productType"
              aria-label="Default select example"
              size="sm"
              id="productType"
              name="productType"
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Manufacturer Name:
            <span className={manufacturerName ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="manufacturerName"
              id="manufacturerName"
              name="manufacturerName"
              placeholder="Enter Manufacturer Name"
              onChange={(e) => setManufacturerName(e.target.value)}
            />
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
            {/* <span className={licenseNumber ? TextWhite : TextDanger}>*</span> */}
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
            <span className={invoiceNumber ? TextWhite : TextDanger}>*</span>
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
            <span className={amount ? TextWhite : TextDanger}>*</span>
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
            <span className={datePurchase ? TextWhite : TextDanger}>*</span>
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
              value={datePurchase}
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
            <span className={receivedDate ? TextWhite : TextDanger}>*</span>
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
              value={receivedDate}
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
              value={warrantyStartDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleWarrantyEndDate(date)}
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
              value={warrantyEndDate}
              minDate={new Date()}
              onChange={(date: Date) => onHandleWarrantyStartDate(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Asset Status:
            <span className={assetStatus ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="assetStatus"
              id="assetStatus"
              name="assetStatus"
              placeholder="Select Status"
              value={assetStatus}
              onChange={(e) => setAssetStatus(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Country:
            <span className={country ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="country"
              type="text"
              id="country"
              size="sm"
              name="country"
              autoComplete="off"
              placeholder="Select Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </CCol>
        </CRow>
        {/* <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Notes:
          </CFormLabel>
          {showEditor ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addAsset?.vendorBankDetails}
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
        </CRow> */}
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

export default AddAssetList
