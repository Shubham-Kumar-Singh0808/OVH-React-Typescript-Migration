import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddProductTypeRecord = ({
  setToggle,
}: //backButtonHandler,
{
  setToggle: (value: string) => void
  //backButtonHandler: () => void
}): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputNewVendorDetails',
    className: 'col-form-label',
  }
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [assetTypeIds, setAssetTypeId] = useState('')
  const [productNames, setProductName] = useState<string>('')
  const [nameExists, setNameExists] = useState('')
  const dispatch = useAppDispatch()
  const history = useHistory()

  const addProductTypeList = useTypedSelector(
    reduxServices.ProductTypeList.selectors.manufacturerData,
  )
  useEffect(() => {
    dispatch(reduxServices.ProductTypeList.getAllLookUpsApi())
  }, [dispatch])
  // console.log(addProductTypeList)

  const clearInputs = () => {
    setProductName('')
    setAssetTypeId('')
  }

  useEffect(() => {
    if (productNames && assetTypeIds) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [productNames, assetTypeIds])
  const successToast = (
    <OToast toastMessage="Job Added Successfully" toastColor="success" />
  )

  const addProductButtonHandler = async () => {
    const addRecord = await dispatch(
      reduxServices.ProductTypeList.AddProductTypeListRecord({
        assetTypeId: assetTypeIds,
        productName: productNames,
      }),
    )
    if (
      reduxServices.ProductTypeList.AddProductTypeListRecord.fulfilled.match(
        addRecord,
      )
    ) {
      setToggle('')
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'productName') {
      const newProduct = value
        .replace(/-_[^a-z0-9\s]/gi, '')
        .replace(/^\s*/, '')
      setProductName(newProduct)
    }
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Product Type"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-Button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Asset Type:
            <span className={assetTypeIds ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="assetTypeId"
              name="assetTypeId"
              id="assetTypeId"
              data-testid="AssetType-test"
              onChange={(e) => setAssetTypeId(e.target.value)}
              value={assetTypeIds}
              // Add onChange handler
              // value={employeeFamily?.relationShip}
              // onChange={onChangePersonNameHandler}
            >
              <option value={''}>Select Asset type</option>
              {addProductTypeList?.assetTypeList?.length > 0 &&
                addProductTypeList?.assetTypeList?.map((product, index) => (
                  <option key={index} value={product.id}>
                    {product.assetType}
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
            Product Type:
            <span className={productNames ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-2"
              data-testid="productName"
              type="text"
              id="productName"
              size="sm"
              name="productName"
              autoComplete="off"
              placeholder="productName"
              value={productNames}
              onChange={handledInputChange} // Add onChange handler
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="Add-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={
                isAddButtonEnabled
                  ? isAddButtonEnabled && nameExists.length > 0
                  : !isAddButtonEnabled
              }
              onClick={addProductButtonHandler}
            >
              Add
            </CButton>
            <CButton
              data-testid="btn-Clear"
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

export default AddProductTypeRecord
