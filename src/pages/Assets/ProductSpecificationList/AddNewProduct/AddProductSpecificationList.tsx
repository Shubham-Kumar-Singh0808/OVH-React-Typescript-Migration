import { CButton, CCol, CFormSelect, CFormLabel, CRow } from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddProduct = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [selectAssetId, setSelectAssetId] = useState<string>('')
  const [selectProductId, setSelectProductId] = useState<string>('')
  const [manufactureType, setManufactureType] = useState('')
  const [productSpecification, setProductSpecification] = useState<string>('')

  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const getAllLookUps = useTypedSelector(
    reduxServices.addNewProduct.selectors.manufactureList,
  )

  const AssetTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.assetTypeList,
  )
  const ProductTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.productTypeList,
  )

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const dispatch = useAppDispatch()
  const [showEditor, setShowEditor] = useState<boolean>(true)

  useEffect(() => {
    dispatch(reduxServices.addNewProduct.getAllLookUps())
  }, [dispatch])

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

  const clearInputs = () => {
    setSelectAssetId('')
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setProductSpecification(' ')
    setSelectProductId('')
    setManufactureType('')
  }
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const formLabel = 'col-sm-3 col-form-label text-end'
  const handleProductSpecification = (ProductSpecification: string) => {
    setProductSpecification(ProductSpecification)
  }

  const handleAddProductSpecification = async () => {
    const addProductSpecificationAction = await dispatch(
      reduxServices.addNewProduct.addProductSpecifications({
        assetTypeId: selectAssetId,
        manufacturerId: Number(manufactureType),
        productId: Number(selectProductId),
        productSpecification,
      }),
    )
    if (
      reduxServices.addNewProduct.addProductSpecifications.fulfilled.match(
        addProductSpecificationAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="product Specification added successfully"
          />,
        ),
      )
    }
  }

  useEffect(() => {
    if (
      selectAssetId &&
      selectProductId &&
      manufactureType &&
      productSpecification
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [selectAssetId, selectProductId, manufactureType, productSpecification])
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
              data-testid="asset-type"
              name="id"
              value={selectAssetId}
              onChange={(e) => {
                setSelectAssetId(e.target.value)
              }}
            >
              <option value={''}>Select Asset Type</option>
              {getAllLookUps?.assetTypeList?.length > 0 &&
                getAllLookUps?.assetTypeList?.map((item, index) => (
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
              data-testid="product-type"
              name="productId"
              value={selectProductId}
              onChange={(e) => {
                setSelectProductId(e.target.value)
              }}
            >
              <option value={''}>Select Product Type</option>
              {AssetTypeList?.length > 0 &&
                AssetTypeList?.map((item, index) => (
                  <option key={index} value={item.assetTypeId}>
                    {item.productName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
            Manufacturer/ Brand Name:{' '}
            <span className={manufactureType ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="selectProductId"
              data-testid="manufacturer-type"
              name="selectProductId"
              value={manufactureType}
              onChange={(e) => {
                setManufactureType(e.target.value)
              }}
            >
              <option value={''}>Select Manufacturer</option>
              {ProductTypeList.length > 0 &&
                ProductTypeList?.map((product, index) => (
                  <option key={index} value={product.productId}>
                    {product.manufacturerName}
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
                initData={productSpecification}
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
              onClick={handleAddProductSpecification}
              disabled={!isAddButtonEnabled}
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
