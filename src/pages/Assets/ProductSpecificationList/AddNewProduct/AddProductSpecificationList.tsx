import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const AddProduct = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [selectAssetId, setSelectAssetId] = useState<string>('')
  const [selectProductId, setSelectProductId] = useState<string>('')

  const [selectAssetType, setSelectAssetType] = useState('')

  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const result = useTypedSelector(
    reduxServices.addNewProduct.selectors.manufactureList,
  )
  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const dispatch = useAppDispatch()
  const [showEditor, setShowEditor] = useState<boolean>(true)

  const ProductTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.productTypeList,
  )
  console.log(ProductTypeList + 'ProductTypeList')

  useEffect(() => {
    dispatch(reduxServices.addNewProduct.getAllLookUps())
  }, [dispatch])
  //   console.log(AssetTypeList + 'AssetList')

  useEffect(() => {
    if (selectAssetId) {
      dispatch(
        reduxServices.addNewProduct.getAssetTypeList(Number(selectAssetId)),
      )
    }
  }, [dispatch, selectAssetId])

  useEffect(() => {
    if (selectProductId) {
      dispatch(
        reduxServices.addNewProduct.getProductTypeList(Number(selectProductId)),
      )
    }
  }, [dispatch, selectProductId])

  // const handledInputChange = (
  //   event:
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const { name, value } = event.target
  //   if (name === 'assetType') {
  //     const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
  //     setSelectAssetType(newValue)
  //   }
  // }
  const clearInputs = () => {
    setSelectAssetId('')
  }
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const formLabel = 'col-sm-3 col-form-label text-end'
  const handleProductSpecification = (ProductSpecification: string) => {
    setAddProduct((prevState) => {
      return { ...prevState, ...{ ProductSpecification } }
    })
  }
  const [addProduct, setAddProduct] = useState({})
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Product Specification"
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
        <CRow className="mt-3 ">
          <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
            Asset Type:{' '}
            <span className={selectAssetId ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="id"
              data-testid="form-select1"
              name="id"
              value={selectAssetId}
              onChange={(e) => {
                setSelectAssetId(e.target.value)
              }}
            >
              <option value={''}>Select Asset Type</option>
              {result?.assetTypeList?.length > 0 &&
                result?.assetTypeList?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.assetType}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
            Product Type:{' '}
            <span className={selectProductId ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="productId"
              data-testid="form-select1"
              name="productId"
              value={selectProductId}
              onChange={(e) => {
                setSelectProductId(e.target.value)
              }}
            >
              <option value={''}>Select Product Type</option>
              {ProductTypeList.length > 0 &&
                ProductTypeList?.map((location, index) => (
                  <option key={index} value={location.productId}>
                    {location.productName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
            Manufacturer/ Brand Name:{' '}
            {/* <span className={selectProductId ? TextWhite : TextDanger}>*</span> */}
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectProductId"
              data-testid="form-select1"
              name="selectProductId"
              // value={selectProductId}
              // onChange={(e) => {
              //   setSelectProductId(e.target.value)
              // }}
            >
              <option value={''}>Select Manufacturer</option>
              {ProductTypeList.length > 0 &&
                ProductTypeList?.map((product, index) => (
                  <option key={index} value={product.productId}>
                    {product.productName}
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
            Product Specification:
          </CFormLabel>
          {showEditor ? (
            <CCol sm={8}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                // initData={addProduct?.}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleProductSpecification(editor.getData().trim())
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
              // onClick={handleAddNewClient}
              // disabled={!isButtonEnabled}
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning "
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

export default AddProduct
