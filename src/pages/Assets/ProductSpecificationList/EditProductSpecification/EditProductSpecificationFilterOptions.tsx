import { CRow, CFormLabel, CCol, CFormSelect, CButton } from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { UpdateProductSpecificationTypes } from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const EditProductSpecificationFilterOptions = ({
  editProductSpecification,
  setEditProductSpecification,
  setToggle,
}: {
  editProductSpecification: UpdateProductSpecificationTypes
  setEditProductSpecification: React.Dispatch<
    React.SetStateAction<UpdateProductSpecificationTypes>
  >
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const result = useTypedSelector(
    reduxServices.addNewProduct.selectors.manufactureList,
  )

  const formLabel = 'col-sm-3 col-form-label text-end'
  const [showEditor, setShowEditor] = useState<boolean>(true)
  console.log(editProductSpecification.assetType)

  const ProductTypeList = useTypedSelector(
    reduxServices.addNewProduct.selectors.productTypeList,
  )
  const onChangeProductSpecificationHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    setEditProductSpecification((prevState) => {
      return {
        ...prevState,
        ...{
          [name]: value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, ''),
        },
      }
    })
  }
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (editProductSpecification.assetTypeId) {
      dispatch(
        reduxServices.addNewProduct.getAssetTypeList(
          Number(editProductSpecification.assetTypeId),
        ),
      )
    }
  }, [dispatch, editProductSpecification.assetTypeId])
  console.log(editProductSpecification.productId)

  const handleUpdateProductSpecification = async () => {
    const updateProductSpecificationResultAction = await dispatch(
      reduxServices.addNewProduct.updateProductSpecification(
        editProductSpecification,
      ),
    )
    if (
      reduxServices.addNewProduct.updateProductSpecification.fulfilled.match(
        updateProductSpecificationResultAction,
      )
    ) {
      setToggle('')
      // dispatch(
      //   reduxServices.app.actions.addToast(
      //     getToastMessage(actionMapping.updated),
      //   ),
      // )
    }
  }
  useEffect(() => {
    // Reset the form fields when editProductSpecification changes
    if (editProductSpecification) {
      setEditProductSpecification({
        assetTypeId: '',
        productName: '',
        manufacturerId: '',
        productSpecification: '',
      });
    }
  }, [editProductSpecification]);
  return (
    <>
      <CRow className="mt-3 ">
        <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
          Asset Type:{' '}
          <span
            className={
              editProductSpecification.assetType ? TextWhite : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="id"
            data-testid="form-select1"
            name="id"
            value={editProductSpecification.assetTypeId}
            onChange={onChangeProductSpecificationHandler}
          >
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
          <span
            className={
              editProductSpecification.productId ? TextWhite : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="productId"
            data-testid="form-select1"
            name="productId"
            value={editProductSpecification.productName}
            onChange={onChangeProductSpecificationHandler}
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
            value={editProductSpecification.manufacturerId}
            onChange={onChangeProductSpecificationHandler}
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
              initData={editProductSpecification.productSpecification}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                onChangeProductSpecificationHandler(editor.getData().trim())
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
            onClick={handleUpdateProductSpecification}
            // disabled={!isButtonEnabled}
          >
            Update
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default EditProductSpecificationFilterOptions
