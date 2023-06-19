import React, { useEffect, useMemo, useState } from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { number } from 'prop-types'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { dateFormat } from '../../../../constant/DateFormat'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { CheckedQuestionsOptions } from '../../../../types/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormTypes'

// eslint-disable-next-line import/named

const AddAssetList = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [poNumber, setPoNumber] = useState<string>()
  const [vendorName, setVendorName] = useState<string>()
  const [assetType, setAssetType] = useState<string>()
  const [productType, setProductType] = useState<string>()
  const [manufacturerName, setManufacturerName] = useState<string>()
  const [assetNumber, setAssetNumber] = useState<string>('RBT')
  const [assetNumberExist, setAssetNumberExist] = useState<string>('RBT')
  const [licenseNumber, setLicenseNumber] = useState<string>()
  const [invoiceNumber, setInvoiceNumber] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [datePurchase, setDateOfPurchase] = useState<string>()
  const [receivedDate, setReceivedDate] = useState<string>()
  const [warrantyStartDate, setWarrantyStartDate] = useState<string>()
  const [warrantyEndDate, setWarrantyEndDate] = useState<string>()
  const [productSpecification, setProductSpecification] = useState<boolean>()

  const [assetStatus, setAssetStatus] = useState<string>()
  const [country, setCountry] = useState<string>()
  const [isDateError, setIsDateError] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<string>()
  const [addComment, setAddComment] = useState<string>('')
  const [isShowComment, setIsShowComment] = useState<boolean>(true)
  useEffect(() => {
    if (
      poNumber &&
      vendorName &&
      assetType &&
      productType &&
      manufacturerName &&
      invoiceNumber &&
      amount &&
      datePurchase &&
      receivedDate &&
      warrantyStartDate &&
      warrantyEndDate &&
      assetStatus &&
      country
    ) {
      setAddButtonEnabled(true)
    } else {
      setAddButtonEnabled(false)
    }
  }, [
    poNumber,
    vendorName,
    assetType,
    productType,
    manufacturerName,
    invoiceNumber,
    amount,
    datePurchase,
    receivedDate,
    warrantyStartDate,
    warrantyEndDate,
    assetStatus,
    country,
  ])

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(warrantyStartDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(warrantyEndDate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsError(moment(end).isBefore(start))
  }, [warrantyStartDate, warrantyEndDate])

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
    setWarrantyEndDate('')
    setWarrantyStartDate('')
    setReceivedDate('')
    setDateOfPurchase('')
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
    setAddComment('')
    setIsShowComment(false)
    setTimeout(() => {
      setIsShowComment(true)
    }, 0)
  }
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'poNumber') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setPoNumber(newValue)
    } else if (name === 'vendorName') {
      const targetValue = value.replace(/\D/g, '').replace(/^0+/, '')
      setVendorName(targetValue)
    } else if (name === 'assetType') {
      // Handle 'assetType' input
    } else if (name === 'productType') {
      // Handle 'productType' input
    } else if (name === 'manufacturerName') {
      // Handle 'manufacturerName' input
    } else if (name === 'assetNumber') {
      // Handle 'assetNumber' input
    } else if (name === 'licenseNumber') {
      // Handle 'licenseNumber' input
    } else if (name === 'invoiceNumber') {
      // Handle 'invoiceNumber' input
    } else if (name === 'amount') {
      // Handle 'amount' input
    } else if (name === 'assetStatus') {
      // Handle 'assetStatus' input
    } else if (name === 'country') {
      // Handle 'country' input
    }
  }

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(datePurchase, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(receivedDate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsDateError(moment(end).isBefore(start))
  }, [datePurchase, receivedDate])

  const handleBankAddress = (comments: string) => {
    setAddComment(comments)
  }

  const assetListTypeList = useTypedSelector(
    reduxServices.ProductTypeList.selectors.manufacturerData,
  )
  const countriesList = useTypedSelector(
    reduxServices.country.selectors.countriesList,
  )
  const successToast = (
    <OToast toastMessage="Asset list Added Successfully" toastColor="success" />
  )
  useEffect(() => {
    dispatch(reduxServices.country.getAllCountries())
  }, [dispatch])
  useEffect(() => {
    if (assetType) {
      dispatch(reduxServices.addNewProduct.getAssetTypeList(Number(assetType)))
    }
    if (productType) {
      dispatch(
        reduxServices.addNewProduct.getProductTypeList(Number(productType)),
      )
    }
  }, [dispatch, assetType, productType])

  const assetTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.assetTypeList,
  )

  const productTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.productTypeList,
  )

  const typeChange = useTypedSelector(
    reduxServices.addAssetList.selectors.typeChange,
  )

  const handlerChangeProductSpecification = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'isChecked') {
      const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setIsChecked(newValue)
    }
  }

  // const handlerAssetNumber = (
  //   event:
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const { name, value } = event.target
  //   if (name === 'assetNumber') {
  //     const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
  //     setAssetNumber(newValue)
  //   }
  //   if (AssetNumberExists(value.trim())) {
  //     setAssetNumber(value.trim())
  //   } else {
  //     setAssetNumber('')
  //   }
  // }

  useEffect(() => {
    if (assetType && productType && manufacturerName) {
      setProductSpecification(true)
    } else {
      setProductSpecification(false)
    }
  }, [assetType, productType, manufacturerName])
  useEffect(() => {
    if (manufacturerName) {
      dispatch(
        reduxServices.addAssetList.typeChangeSpecifications({
          manufacturerId: Number(manufacturerName),
          productId: Number(productType),
        }),
      )
    }
  }, [dispatch, manufacturerName])

  const handleAddNewAssetList = async () => {
    // const addManuFactureListResultAction = await dispatch(
    //   reduxServices.addAssetList.checkAssetNumberExist(Number(assetNumber)),
    // )
    // console.log(addManuFactureListResultAction.type)
    const isAddAssetLIst = {
      amount: amount as string,
      assetNumber: assetNumber as string,
      assetTypeId: assetType as string,
      countryId: Number(country),
      invoiceNumber: invoiceNumber as string,
      manufacturerId: manufacturerName as string,
      notes: addComment,
      otherAssetNumber: licenseNumber as string,
      pSpecification: typeChange[0].productSpecification,
      poNumber: poNumber as string,
      productId: productType as string,
      purchasedDate: datePurchase as string,
      receivedDate: receivedDate as string,
      status: assetStatus as string,
      vendorId: vendorName as string,
      warrantyEndDate: warrantyStartDate as string,
      warrantyStartDate: warrantyEndDate as string,
    }

    const saveAssetDetailsResultAction = await dispatch(
      reduxServices.addAssetList.getAddAssetList(isAddAssetLIst),
    )

    if (
      reduxServices.addAssetList.getAddAssetList.fulfilled.match(
        saveAssetDetailsResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  const sortedProductTypeDetails = useMemo(() => {
    if (assetTypeList) {
      return assetTypeList
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.productName.localeCompare(sortNode2.productName),
        )
    }
    return []
  }, [assetTypeList])
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
              placeholder="Select Vendor Name"
              onChange={(e) => setVendorName(e.target.value)}
            >
              <option value={''}>Select Vendor Name</option>
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
            <span className={assetType ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="assetType"
              aria-label="Default select example"
              size="sm"
              id="assetType"
              name="assetType"
              value={assetType}
              placeholder="Select Asset Type"
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value={''}>Select Asset Type</option>
              {assetListTypeList?.assetTypeList?.length > 0 &&
                assetListTypeList?.assetTypeList?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.assetType}
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
            <span className={productType ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="productType"
              aria-label="Default select example"
              size="sm"
              id="productType"
              name="productType"
              value={productType}
              placeholder="Select Product Type"
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {sortedProductTypeDetails.map((location, index) => (
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
            <span className={manufacturerName ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="manufacturerName"
              aria-label="Default select example"
              size="sm"
              id="manufacturerName"
              name="manufacturerName"
              placeholder="Select Manufacturer Name"
              value={manufacturerName}
              onChange={(e) => setManufacturerName(e.target.value)}
            >
              <option value={''}>Select Manufacturer Type</option>
              {productTypeList.map((location, index) => (
                <option key={index} value={location.manufacturerId}>
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
            Product Specifications :
          </CFormLabel>
          {typeChange.map((item, index) => {
            return (
              <CCol sm={1} className="mt-2" key={index}>
                <CFormCheck
                  type="radio"
                  data-testid={`yes-radio`}
                  hitArea="full"
                  label={item.productSpecification}
                  inline
                  name="isChecked"
                  // value={isChecked}
                  // onChange={(e) => setIsChecked(e.target.checked)}
                  // onChange={(e) => handlerChangeProductSpecification}
                  value={item.productSpecification}
                />
              </CCol>
            )
          })}
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
              value={assetNumber}
              // onChange={(e) => setAssetNumber(e.target.value)}
              // onChange={}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            License/Asset No:
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
              value={licenseNumber}
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
              //minDate={new Date()}
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
              //minDate={new Date()}
              onChange={(date: Date) => onHandleReceivedDate(date)}
            />
            {isDateError && (
              <span className="text-danger">
                <b>Received date should be greater than purchased date</b>
              </span>
            )}
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
              // minDate={new Date()}
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
              value={warrantyEndDate}
              //minDate={new Date()}
              onChange={(date: Date) => onHandleWarrantyEndDate(date)}
            />
            {isError && (
              <span className="text-danger">
                <b>
                  Warranty end date should be greater than Warranty start date
                </b>
              </span>
            )}
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
            <CFormSelect
              data-testid="assetStatus"
              aria-label="Default select example"
              size="sm"
              id="assetStatus"
              name="assetStatus"
              placeholder="Select Status"
              value={assetStatus}
              onChange={(e) => setAssetStatus(e.target.value)}
            >
              <option value={''}>Select Asset Status</option>
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
            <span className={country ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="country"
              aria-label="Default select example"
              size="sm"
              id="country"
              name="country"
              placeholder="Select Country"
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
              data-testid="Confirm-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isAddButtonEnabled}
              onClick={handleAddNewAssetList}
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
